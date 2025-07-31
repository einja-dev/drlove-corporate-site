'use client';
import { PrimaryButton } from '@/app/components/ui/PrimaryButton';
import { useState } from 'react';
import styles from './inquiry.module.css';

export default function InquiryPage() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitMessage('お問い合わせありがとうございます。ご入力いただいた内容を送信しました。');
        setFormData({ name: '', company: '', email: '', message: '' });
      } else if (response.status === 429) {
        // レート制限エラーの場合
        setSubmitMessage(`送信制限に達しています。${result.error || '時間をおいて再度お試しください。'}`);
      } else {
        setSubmitMessage(`エラー: ${result.error}`);
      }
    } catch (error) {
      console.error('送信エラー:', error);
      setSubmitMessage('送信に失敗しました。しばらく時間をおいて再度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1 className={styles.title}>お問い合わせ</h1>
          <p className={styles.description}>
            ご質問やご相談がございましたら、お気軽にお問い合わせください。
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>お問い合わせフォーム</h2>
            <p className={styles.cardDescription}>
              必須項目（<span className={styles.required}>*</span>）をご入力ください。
            </p>
          </div>

          <div className={styles.cardContent}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.field}>
                <label htmlFor="name" className={styles.label}>
                  お名前 <span className={styles.required}>*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="山田 太郎"
                  required
                  className={styles.input}
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="company" className={styles.label}>
                  会社名
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="株式会社サンプル"
                  className={styles.input}
                  value={formData.company}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="email" className={styles.label}>
                  メールアドレス <span className={styles.required}>*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@email.com"
                  required
                  className={styles.input}
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="message" className={styles.label}>
                  お問い合わせ内容 <span className={styles.required}>*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="お問い合わせ内容をご記入ください..."
                  required
                  rows={5}
                  className={styles.textarea}
                  value={formData.message}
                  onChange={handleInputChange}
                />
              </div>

              {submitMessage && (
                <div className={styles.message} style={{
                  padding: '12px',
                  borderRadius: '4px',
                  backgroundColor: submitMessage.includes('エラー') || submitMessage.includes('制限') || submitMessage.includes('失敗') ? '#fef2f2' : '#f0fdf4',
                  color: submitMessage.includes('エラー') || submitMessage.includes('制限') || submitMessage.includes('失敗') ? '#dc2626' : '#166534',
                  marginBottom: '16px'
                }}>
                  {submitMessage}
                </div>
              )}

              <div className={styles.buttonWrapper} style={{ textAlign: 'center' }}>
                <PrimaryButton type="submit" size="large" disabled={isSubmitting}>
                  {isSubmitting ? '送信中...' : '送信する'}
                </PrimaryButton>
              </div>
            </form>
          </div>
        </div>

        <div className={styles.footer}>
          <p>お問い合わせいただいた内容については、2-3営業日以内にご返信いたします。</p>
        </div>
      </div>
    </div>
  );
}
