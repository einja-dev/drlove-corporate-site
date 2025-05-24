import Image from 'next/image';
import Link from 'next/link';
import { css } from '../../../styled-system/css';

const sectionStyle = css({
  width: '100%',
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '24px',
  padding: '32px 24px',
  background: 'background',
  zIndex: 1,
  position: 'relative',

  md: {
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '32px',
    padding: '64px 24px',
  },
  lg: {
    padding: '80px',
  },
});

const cardStyle = css({
  position: 'relative',
  width: '100%',
  height: '200px',
  borderRadius: '32px',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
  background: '#fff',
  transform: 'skewX(-8deg)',
  margin: '0 auto',
  padding: '40px 64px',
  md: {
    flexDirection: 'column',
    height: '360px',
    padding: '40px 16px',
  },
  lg: {
    height: '500px',
  },
});

const cardMarginTopStyle = css({
  md: {
    marginTop: '60px',
    marginLeft: '-10px',
  },
});

const memberImgStyle = css({
  position: 'absolute',
  right: '-160px',
  bottom: '-160px',
  width: '320px',
  height: 'auto',
  transform: 'translateX(-50%) skewX(8deg)',
  zIndex: 3,
  pointerEvents: 'none',

  md: {
    left: '50%',
    bottom: '-60px',
  },
  lg: {
    left: '50%',
    bottom: '0',
  },
});

const labelStyle = (color: string) =>
  css({
    transform: 'skewX(12deg)',
    fontFamily: 'M+ 1m, sans-serif',
    fontWeight: 500,
    fontSize: '32px',
    lineHeight: '1.8',
    color: color || '#4EE06A',
    zIndex: 4,
    whiteSpace: 'nowrap',
  });

const items = [
  {
    label: 'サービス',
    labelColor: '#FF8A5C',
    bg: '/images/service-bg.png',
    person: '/images/service-person-mask.png',
    href: '#service',
  },
  {
    label: 'メンバー紹介',
    labelColor: '#618BFF',
    bg: '/images/member-bg.png',
    person: '/images/member-person-mask.png',
    href: '#member',
  },
  {
    label: 'ニュース',
    labelColor: '#4EE06A',
    bg: '/images/news-bg.png',
    person: '/images/news-person-mask.png',
    href: '#news',
  },
];

export default function ContentLinkSection() {
  return (
    <section className={sectionStyle}>
      {items.map((item, idx) => (
        <Link href={item.href} key={item.label} style={{ textDecoration: 'none' }} scroll={true}>
          <div
            className={`${cardStyle}${idx === 1 ? ` ${cardMarginTopStyle}` : ''}`}
            style={{
              backgroundImage: `url(${item.bg})`,
              backgroundSize: '120% 100%',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundColor: '#fff',
            }}
          >
            <span className={labelStyle(item.labelColor)}>{item.label}</span>
            <Image
              src={item.person}
              alt="マスク"
              width={320}
              height={400}
              className={memberImgStyle}
              priority
            />
          </div>
        </Link>
      ))}
    </section>
  );
}
