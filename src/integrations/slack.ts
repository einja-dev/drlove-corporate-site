import type { ContactFormData } from '@/schemas/contact';
import { IncomingWebhook } from '@slack/webhook';

export async function sendSlackNotification(data: ContactFormData): Promise<void> {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;

  if (!webhookUrl) {
    throw new Error('SLACK_WEBHOOK_URL環境変数が設定されていません');
  }

  const webhook = new IncomingWebhook(webhookUrl);

  const message = {
    text: '🔔 新しいお問い合わせが届きました！',
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: '📧 新しいお問い合わせ',
        },
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*お名前:*\n${data.name}`,
          },
          {
            type: 'mrkdwn',
            text: `*会社名:*\n${data.company || 'なし'}`,
          },
          {
            type: 'mrkdwn',
            text: `*メールアドレス:*\n${data.email}`,
          },
          {
            type: 'mrkdwn',
            text: `*送信日時:*\n${new Date().toLocaleString('ja-JP')}`,
          },
        ],
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*お問い合わせ内容:*\n${data.message}`,
        },
      },
      {
        type: 'divider',
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: '💡 速やかに対応をお願いします',
          },
        ],
      },
    ],
  };

  try {
    await webhook.send(message);
  } catch (error) {
    console.error('Slack通知の送信に失敗しました:', error);
    throw error;
  }
}
