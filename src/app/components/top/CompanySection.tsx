'use client';
import { PrimaryButton } from '@/app/components/ui/PrimaryButton';
import { SectionTitle } from '@/app/components/ui/SectionTitle';
import { useFadeInOnScroll } from '@/app/hooks/useFadeInOnScroll';
import { css } from '@/styled-system/css';
import Link from 'next/link';

const sectionStyle = css({
  width: '100%',
  margin: '0 auto',
  // Narrower horizontal padding on small screens
  padding: '64px 24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '40px',
  background: 'background',
  zIndex: 1,

  // Restore larger padding from md and up
  md: {
    padding: '96px 80px',
  },
});

const tableStyle = css({
  width: '100%',
  maxWidth: '900px',
  margin: '0 auto',
  borderCollapse: 'collapse',
  background: 'none',
});

const thStyle = css({
  fontWeight: '700',
  fontSize: '16px',
  color: '#444',
  background: '#FFF5F1',
  padding: '16px 24px',
  textAlign: 'left',
  borderBottom: '1px solid #FFB2B2',
  whiteSpace: 'nowrap',
});

const tdStyle = css({
  fontWeight: '400',
  fontSize: '16px',
  color: '#444',
  background: '#fff',
  padding: '16px 24px',
  textAlign: 'left',
  borderBottom: '1px solid #FFB2B2',
});

const contactLinkStyle = css({
  display: 'block',
  margin: '48px auto 0',
  textAlign: 'center',
  fontWeight: 500,
  fontSize: '18px',
  color: '#618BFF',
  textDecoration: 'none',
  letterSpacing: '0.05em',
});

const companyInfo = [
  { label: '会社名', value: 'Dr. Love株式会社' },
  { label: '設立', value: '2025年8月2日' },
  { label: '代表', value: '水池 愛香' },
];

export default function CompanySection() {
  const fadeTitleRef = useFadeInOnScroll(0.15);
  const fadeTableRef = useFadeInOnScroll(0.18);
  const fadeButtonRef = useFadeInOnScroll(0.22);
  return (
    <section className={sectionStyle} id="company">
      <div ref={fadeTitleRef}>
        <SectionTitle en="COMPANY" jp="会社概要" />
      </div>
      <table className={tableStyle} ref={fadeTableRef}>
        <tbody>
          {companyInfo.map((item, i) => (
            <tr key={item.label}>
              <th className={thStyle} style={i === 0 ? { borderTop: '1px solid #FFB2B2' } : {}}>
                {item.label}
              </th>
              <td className={tdStyle} style={i === 0 ? { borderTop: '1px solid #FFB2B2' } : {}}>
                {item.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link
        href="/inquiry"
        style={{ textAlign: 'center', textDecoration: 'none' }}
        ref={fadeButtonRef}
      >
        <PrimaryButton size="large">お問い合わせ</PrimaryButton>
      </Link>
    </section>
  );
}
