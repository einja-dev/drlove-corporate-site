// テキストを「1行ごと＋空行（空文字）」の配列に変換
// 空行は空文字として残す（改行だけの行のみ）
export function splitTextWithEmptyLines(text: string): string[] {
  return text.split('\n').map((line) => (line.trim() === '' ? '' : line.trim()));
}
