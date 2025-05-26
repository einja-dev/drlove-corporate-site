'use client';
import { css, cva } from '@/styled-system/css';
import { useState } from 'react';

// --- UI部品 ---
const cardStyle = css({
  borderRadius: 'lg',
  border: '1px solid',
  borderColor: 'gray.200',
  background: 'white',
  color: 'gray.900',
  boxShadow: 'sm',
});
const cardHeaderStyle = css({ p: 6, pb: 2 });
const cardTitleStyle = css({ fontSize: '2xl', fontWeight: 'bold', mb: 1 });
const cardDescStyle = css({ fontSize: 'sm', color: 'gray.500' });
const cardContentStyle = css({ p: 6, pt: 0 });

const labelStyle = css({
  fontSize: 'sm',
  fontWeight: 'medium',
  mb: 1,
  color: 'gray.800',
  display: 'block',
});
const inputStyle = cva({
  base: {
    display: 'flex',
    h: 10,
    w: 'full',
    rounded: 'md',
    border: '1px solid',
    borderColor: 'gray.300',
    bg: 'white',
    px: 3,
    py: 2,
    fontSize: 'base',
    outline: 'none',
    _placeholder: { color: 'gray.400' },
    _focusVisible: {
      ring: 2,
      ringColor: 'blue.500',
      borderColor: 'blue.500',
    },
    _disabled: { opacity: 0.5, cursor: 'not-allowed' },
    md: { fontSize: 'sm' },
  },
});
const textareaStyle = cva({
  base: {
    display: 'flex',
    minH: '80px',
    w: 'full',
    rounded: 'md',
    border: '1px solid',
    borderColor: 'gray.300',
    bg: 'white',
    px: 3,
    py: 2,
    fontSize: 'base',
    outline: 'none',
    resize: 'none',
    _placeholder: { color: 'gray.400' },
    _focusVisible: {
      ring: 2,
      ringColor: 'blue.500',
      borderColor: 'blue.500',
    },
    _disabled: { opacity: 0.5, cursor: 'not-allowed' },
    md: { fontSize: 'sm' },
  },
});
const buttonStyle = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    rounded: 'md',
    fontSize: 'sm',
    fontWeight: 'medium',
    transition: 'colors',
    h: 10,
    px: 4,
    py: 2,
    bg: 'blue.600',
    color: 'white',
    _hover: { bg: 'blue.700' },
    _focusVisible: { outline: 'none', ring: 2, ringColor: 'blue.500' },
    _disabled: { opacity: 0.5, cursor: 'not-allowed' },
    w: 'full',
  },
});

// --- メインフォーム ---
export default function CompanyFormSection() {
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    message: '',
  });

  return (
    <div
      className={css({ minH: '100vh', bg: 'gray.50', py: 12, px: 4, sm: { px: 6 }, lg: { px: 8 } })}
    >
      <div className={css({ maxW: '2xl', mx: 'auto' })}>
        <div className={css({ textAlign: 'center', mb: 8 })}>
          <h1 className={css({ fontSize: '3xl', fontWeight: 'bold', color: 'gray.900', mb: 2 })}>
            お問い合わせ
          </h1>
          <p className={css({ color: 'gray.600' })}>
            ご質問やご相談がございましたら、お気軽にお問い合わせください。
          </p>
        </div>
        <div className={cardStyle}>
          <div className={cardHeaderStyle}>
            <div className={cardTitleStyle}>お問い合わせフォーム</div>
            <div className={cardDescStyle}>
              必須項目（<span className={css({ color: 'red.500' })}>*</span>）をご入力ください。
            </div>
          </div>
          <div className={cardContentStyle}>
            <form className={css({ display: 'flex', flexDirection: 'column', gap: 6 })}>
              {/* お名前 */}
              <div className={css({ display: 'flex', flexDirection: 'column', gap: 2 })}>
                <label htmlFor="name" className={labelStyle}>
                  お名前 <span className={css({ color: 'red.500' })}>*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  className={inputStyle()}
                  placeholder="山田 太郎"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                />
              </div>
              {/* 会社名 */}
              <div className={css({ display: 'flex', flexDirection: 'column', gap: 2 })}>
                <label htmlFor="company" className={labelStyle}>
                  会社名
                </label>
                <input
                  id="company"
                  type="text"
                  className={inputStyle()}
                  placeholder="株式会社サンプル"
                  value={form.company}
                  onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                />
              </div>
              {/* メールアドレス */}
              <div className={css({ display: 'flex', flexDirection: 'column', gap: 2 })}>
                <label htmlFor="email" className={labelStyle}>
                  メールアドレス <span className={css({ color: 'red.500' })}>*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className={inputStyle()}
                  placeholder="example@email.com"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                />
              </div>
              {/* お問い合わせ内容 */}
              <div className={css({ display: 'flex', flexDirection: 'column', gap: 2 })}>
                <label htmlFor="message" className={labelStyle}>
                  お問い合わせ内容 <span className={css({ color: 'red.500' })}>*</span>
                </label>
                <textarea
                  id="message"
                  required
                  className={textareaStyle()}
                  placeholder="お問い合わせ内容をご記入ください..."
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                />
              </div>
              {/* 送信ボタン */}
              <div className={css({ pt: 4 })}>
                <button type="submit" className={buttonStyle()} disabled>
                  送信する
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className={css({ mt: 8, textAlign: 'center', fontSize: 'sm', color: 'gray.500' })}>
          <p>お問い合わせいただいた内容については、2-3営業日以内にご返信いたします。</p>
        </div>
      </div>
    </div>
  );
}
