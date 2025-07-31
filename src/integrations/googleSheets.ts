import type { ContactFormData } from '@/schemas/contact';
import { JWT } from 'google-auth-library';
import { GoogleSpreadsheet } from 'google-spreadsheet';

export async function addToGoogleSheet(data: ContactFormData): Promise<void> {
  try {
    // 環境変数の確認
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;

    if (!privateKey || !clientEmail || !spreadsheetId) {
      throw new Error('Google Sheets認証情報が不足しています');
    }

    const serviceAccountAuth = new JWT({
      email: clientEmail,
      key: privateKey.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    // スプレッドシートに接続
    const doc = new GoogleSpreadsheet(spreadsheetId, serviceAccountAuth);
    await doc.loadInfo();

    // シートを取得（最初のシートを使用）
    const sheet = doc.sheetsByIndex[0];

    if (!sheet) {
      throw new Error('スプレッドシートにシートが見つかりません');
    }

    // スプレッドシートに追加するデータ
    const currentDate = new Date().toLocaleString('ja-JP', {
      timeZone: 'Asia/Tokyo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    const rowData = {
      '送信日時': currentDate,
      'お名前': data.name,
      '会社名': data.company || '',
      'メールアドレス': data.email,
      'お問い合わせ内容': data.message,
    };

    // 行を追加
    await sheet.addRow(rowData);

  } catch (error) {
    console.error('Google Sheetsへのデータ追加に失敗しました:', error);
    throw error;
  }
}
