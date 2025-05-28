import { PrimaryButton } from '@/app/components/ui/PrimaryButton';
import styles from './inquiry.module.css';

export default function InquiryPage() {
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
            <form className={styles.form}>
              <div className={styles.field}>
                <label htmlFor="name" className={styles.label}>
                  お名前 <span className={styles.required}>*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="山田 太郎"
                  required
                  className={styles.input}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="company" className={styles.label}>
                  会社名
                </label>
                <input
                  id="company"
                  type="text"
                  placeholder="株式会社サンプル"
                  className={styles.input}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="email" className={styles.label}>
                  メールアドレス <span className={styles.required}>*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  required
                  className={styles.input}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="message" className={styles.label}>
                  お問い合わせ内容 <span className={styles.required}>*</span>
                </label>
                <textarea
                  id="message"
                  placeholder="お問い合わせ内容をご記入ください..."
                  required
                  rows={5}
                  className={styles.textarea}
                />
              </div>

              <div className={styles.buttonWrapper} style={{ textAlign: 'center' }}>
                <PrimaryButton type="submit" size="large">
                  送信する
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
