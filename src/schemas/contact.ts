import { z } from 'zod';

// HTMLタグやスクリプトを検出する正規表現
const noHtmlRegex = /^[^<>]*$/;
const noScriptRegex = /^(?!.*(<script|javascript:|on\w+\s*=)).*$/i;

export const contactSchema = z.object({
  name: z
    .string()
    .min(1, 'お名前は必須です')
    .max(30, 'お名前は30文字以内で入力してください')
    .regex(/^[^\s].*[^\s]$|^[^\s]$/, 'お名前の前後に空白は使用できません')
    .regex(noHtmlRegex, 'HTMLタグは使用できません')
    .regex(noScriptRegex, 'スクリプトは使用できません'),

  email: z
    .string()
    .email('メールアドレスの形式が不正です'),

  company: z
    .string()
    .max(50, '会社名は50文字以内で入力してください')
    .regex(noHtmlRegex, 'HTMLタグは使用できません')
    .regex(noScriptRegex, 'スクリプトは使用できません')
    .optional(),

  message: z
    .string()
    .min(10, 'お問い合わせ内容は10文字以上で入力してください')
    .max(2000, 'お問い合わせ内容は2000文字以内で入力してください')
    .regex(noHtmlRegex, 'HTMLタグは使用できません')
    .regex(noScriptRegex, 'スクリプトは使用できません'),
});

export type ContactFormData = z.infer<typeof contactSchema>;
