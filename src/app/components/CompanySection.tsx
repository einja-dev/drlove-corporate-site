import { css } from '../../../styled-system/css';
import { SectionTitle } from './SectionTitle';

const sectionStyle = css({
  width: '100%',
  maxWidth: '1280px',
  margin: '0 auto',
  padding: '96px 80px',
  display: 'flex',
  flexDirection: 'column',
  gap: '40px',
  background: 'background',
  zIndex: 1,
});

const tableStyle = css({
  width: '100%',
  maxWidth: '900px',
  margin: '0 auto',
  borderCollapse: 'collapse',
  background: 'none',
});

const thStyle = css({
  fontFamily: 'M+ 1m',
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
  fontFamily: 'M+ 1m',
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
  fontFamily: 'M+ 1m',
  fontWeight: 500,
  fontSize: '18px',
  color: '#618BFF',
  textDecoration: 'none',
  letterSpacing: '0.05em',
});

const companyInfo = [
  { label: '会社名', value: 'Dr. Love AI株式会社' },
  { label: '所在地', value: '東京都渋谷区○○-○○-○○' },
  { label: '設立', value: '2025年4月1日' },
  { label: '代表', value: '山田 太郎' },
];

export default function CompanySection() {
  return (
    <section className={sectionStyle} id="company">
      <SectionTitle en="COMPANY" jp="会社概要" />
      <table className={tableStyle}>
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
      <a href="#contact" className={contactLinkStyle}>
        Dr. Love AIに関するお問い合わせはコチラ
      </a>
    </section>
  );
}
