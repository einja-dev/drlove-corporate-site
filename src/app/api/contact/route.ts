import { addToGoogleSheet } from '@/integrations/googleSheets';
import { sendSlackNotification } from '@/integrations/slack';
import { contactSchema } from '@/schemas/contact';
import { checkRateLimit, getClientIP } from '@/utils/rateLimit';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // IPベースレート制限チェック
    const clientIP = getClientIP(request);

    const rateLimitResult = checkRateLimit(clientIP, {
      maxAttempts: 3,           // 3回まで
      windowMs: 60 * 60 * 1000, // 1時間
      blockDurationMs: 60 * 60 * 1000, // 1時間ブロック
    });

    if (!rateLimitResult.allowed) {

      return NextResponse.json(
        {
          error: `送信制限に達しました。${Math.ceil((rateLimitResult.retryAfter || 0) / 60)}分後に再度お試しください。`,
          retryAfter: rateLimitResult.retryAfter,
        },
        {
          status: 429,
          headers: {
            'Retry-After': rateLimitResult.retryAfter?.toString() || '3600',
          }
        }
      );
    }

    // リクエストボディの取得
    const body = await request.json();

    // Zodバリデーション
    const validationResult = contactSchema.safeParse(body);

    if (!validationResult.success) {
      const firstError = validationResult.error.issues[0];
      return NextResponse.json(
        {
          error: firstError.message,
          field: firstError.path[0], // エラーが発生したフィールド名
        },
        { status: 400 }
      );
    }

    const contactData = validationResult.data;

    // 並列でSlack通知とGoogle Sheets追加を実行
    const results = await Promise.allSettled([
      sendSlackNotification(contactData),
      addToGoogleSheet(contactData),
    ]);

    // エラーチェック
    const failedOperations = [];

    if (results[0].status === 'rejected') {
      console.error('Slack通知エラー:', results[0].reason);
      failedOperations.push('Slack通知');
    }

    if (results[1].status === 'rejected') {
      console.error('Google Sheets追加エラー:', results[1].reason);
      failedOperations.push('Google Sheets');
    }

    // 両方失敗した場合はエラーを返す
    if (failedOperations.length === 2) {
      return NextResponse.json(
        { error: '送信処理中にエラーが発生しました' },
        { status: 500 }
      );
    }

    // 部分的に成功した場合は警告付きで成功を返す
    let message = 'お問い合わせを受け付けました';
    if (failedOperations.length > 0) {
      message += `（${failedOperations.join(', ')}で一部エラーが発生しましたが、お問い合わせは正常に処理されました）`;
    }

    return NextResponse.json({
      success: true,
      message,
    });

  } catch (error) {
    console.error('お問い合わせ処理エラー:', error);

    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}
