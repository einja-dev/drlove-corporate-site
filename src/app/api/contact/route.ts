import { sendSlackNotification } from '@/integrations/slack';
import { contactSchema } from '@/schemas/contact';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
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

    // Slack通知を送信
    await sendSlackNotification(contactData);

    return NextResponse.json({
      success: true,
      message: 'お問い合わせを受け付けました'
    });

  } catch (error) {
    console.error('お問い合わせ処理エラー:', error);

    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}
