import { NextRequest } from 'next/server';

// 簡易的なメモリストレージ（本番環境では Redis などを推奨）
const submissionLog = new Map<string, number[]>();

/**
 * リクエストからクライアントIPアドレスを取得
 */
export function getClientIP(request: NextRequest): string {
  // プロキシ経由の場合のIPを優先取得
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const connectionIP = request.headers.get('x-connecting-ip');

  // 複数IPがある場合は最初のものを使用
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  if (realIP) {
    return realIP.trim();
  }

  if (connectionIP) {
    return connectionIP.trim();
  }

  // フォールバック
  return 'unknown';
}

/**
 * レート制限設定
 */
interface RateLimitConfig {
  maxAttempts: number;    // 最大試行回数
  windowMs: number;       // 時間窓（ミリ秒）
  blockDurationMs: number; // ブロック期間（ミリ秒）
}

/**
 * デフォルト設定
 */
const DEFAULT_CONFIG: RateLimitConfig = {
  maxAttempts: 3,              // 3回まで
  windowMs: 60 * 60 * 1000,    // 1時間
  blockDurationMs: 60 * 60 * 1000, // 1時間ブロック
};

/**
 * IPベースレート制限チェック
 */
export function checkRateLimit(
  ip: string,
  config: Partial<RateLimitConfig> = {}
): { allowed: boolean; retryAfter?: number; remainingAttempts?: number } {
  const settings = { ...DEFAULT_CONFIG, ...config };
  const now = Date.now();

  // IPの送信履歴を取得
  const submissions = submissionLog.get(ip) || [];

  // 設定された時間窓内の送信をフィルタ
  const recentSubmissions = submissions.filter(
    time => now - time < settings.windowMs
  );

  // 制限チェック
  if (recentSubmissions.length >= settings.maxAttempts) {
    // 最後の送信からブロック期間が経過しているかチェック
    const lastSubmission = Math.max(...recentSubmissions);
    const retryAfter = lastSubmission + settings.blockDurationMs - now;

    if (retryAfter > 0) {
      return {
        allowed: false,
        retryAfter: Math.ceil(retryAfter / 1000), // 秒単位で返す
      };
    }

    // ブロック期間が過ぎているので、古い記録をクリア
    submissionLog.set(ip, []);
  }

  // 新しい送信時刻を記録
  recentSubmissions.push(now);
  submissionLog.set(ip, recentSubmissions);

  return {
    allowed: true,
    remainingAttempts: settings.maxAttempts - recentSubmissions.length,
  };
}
