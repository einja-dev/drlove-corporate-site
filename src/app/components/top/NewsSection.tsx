'use client';
import { SectionTitle } from '@/app/components/ui/SectionTitle';
import { useFadeInOnScroll } from '@/app/hooks/useFadeInOnScroll';
import { css } from '@/styled-system/css';
import Image from 'next/image';

const sectionStyle = css({
  width: '100%',
  margin: '0 auto',
  padding: '96px 0',
  background: 'background',
  display: 'flex',
  flexDirection: 'column',
  gap: '48px',
  zIndex: 1,
});

const newsListStyle = css({
  display: 'grid',
  gridAutoFlow: 'column',
  gridAutoColumns: 'clamp(180px, 32vw, 262px)',
  gap: '16px',
  overflowX: 'auto',
  overflowY: 'hidden',
  alignItems: 'stretch',
  padding: '8px 16px',
  scrollbarWidth: 'auto',
  scrollbarGutter: 'stable',

  md: {
    gap: '24px',
  },

  '&::-webkit-scrollbar': {
    height: '8px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#eee',
    borderRadius: '4px',
  },
});

const newsCardStyle = css({
  width: 'clamp(180px, 32vw, 262px)',
  background: '#fff',
  borderRadius: '12px',
  boxShadow: '0 0 24px 0 rgba(0,0,0,0.06)',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  flex: '0 0 auto',
  transition: 'box-shadow 0.25s cubic-bezier(.4,0,.2,1), transform 0.25s cubic-bezier(.4,0,.2,1)',
  md: {
    padding: '16px',
  },
  cursor: 'pointer',
  '&:hover': {
    boxShadow: '0 8px 32px 0 rgba(97,139,255,0.18)',
    transform: 'translateY(-4px) scale(1.03)',
    '& img': {
      transform: 'scale(1.08)',
    },
  },
});
const newsImageWrap = css({
  width: '100%',
  aspectRatio: '16/9',
  borderRadius: '12px 12px 0 0',
  overflow: 'hidden',
  background: '#fff',
  flexShrink: 0,
  position: 'relative',
  transition: 'transform 0.25s cubic-bezier(.4,0,.2,1)',
  md: {
    borderRadius: '12px',
  },
  '&:hover img': {
    transform: 'scale(1.08)',
  },
});

const newsImageStyle = css({
  objectFit: 'cover',
  transition: 'transform 0.25s cubic-bezier(.4,0,.2,1)',
});

const cardContentStyle = css({
  position: 'relative',
  zIndex: 2,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  padding: '8px',
  md: {
    mt: '8px',
    gap: '1px',
    padding: 0,
  },
});

const dateStyle = css({
  fontWeight: '700',
  fontSize: '16px',
  color: '#FF749D',
  textAlign: 'left',
  lineHeight: '1.8',
});

const contentStyle = css({
  fontSize: '14px',
  color: '#444',
  lineHeight: '1.8',
  textAlign: 'left',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  lineClamp: 3,
  md: {
    fontSize: '16px',
  },
  minHeight: '5.4em',
});

const labelStyle = css({
  display: 'inline-block',
  border: '1px solid #FF749D',
  borderRadius: '8px',
  background: '#FFF',
  color: '#FF749D',
  fontWeight: 700,
  fontSize: '16px',
  fontFamily: 'inherit',
  padding: '4px 8px',
  textAlign: 'center',
  margin: '20px 0 12px 0',
  boxSizing: 'border-box',
  lineHeight: 1.6,
  boxShadow: 'none',
  alignSelf: 'flex-start',
});

const newsData = [
  {
    date: '2025/06/05',
    text: 'Nontitle Season5 4話 6/5 放送予定、乞うご期待！',
    img: '/top/news/news-2.png',
    label: 'メディア出演',
    link: 'https://www.youtube.com/@nontitle8964',
  },
  {
    date: '2025/06/01',
    text: '5/12 CEO水池愛香 ボディメイク大会に初出場で大健闘「もっと上を目指したい」',
    img: '/top/news/news-1.png',
    label: 'メディア掲載',
    link: 'https://news.yahoo.co.jp/articles/18508fbde1a4f655558d4ed759a0c3b58e0f0899',
  },
  {
    date: '2025/05/29',
    text: 'Nontitle Season5 3話 5/29 放送予定、乞うご期待！',
    img: '/top/news/news-2.png',
    label: 'メディア出演',
    link: 'https://www.youtube.com/@nontitle8964',
  },
  {
    date: '2025/05/22',
    text: 'Nontitle Season5 2話 5/22 放送予定、乞うご期待！',
    img: '/top/news/news-3.png',
    label: 'メディア出演',
    link: 'https://youtu.be/sPE8J9imqqo?si=sTIa7TMyz2QR0VvA',
  },
  {
    date: '2025/05/15',
    text: 'Nontitle Season5 1話 5/15 放送開始！高卒 vs 大卒 ディベート対決波乱の幕開け！？',
    img: '/top/news/news-4.png',
    label: 'メディア出演',
    link: 'https://youtu.be/eTeX1d5WVQY?si=qZaosRtLsSOSF1yA',
  },
];

export default function NewsSection() {
  return (
    <section className={sectionStyle} id="news">
      <SectionTitle en="NEWS" jp="ニュース" />
      <div className={newsListStyle}>
        {newsData.map((item, idx) => {
          const fadeRef = useFadeInOnScroll(0.18 + idx * 0.05);
          return (
            <a
              key={item.date + item.text}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className={newsCardStyle} ref={fadeRef}>
                <div className={newsImageWrap}>
                  <Image src={item.img} alt="news" fill className={newsImageStyle} />
                </div>
                <div className={cardContentStyle}>
                  <div className={dateStyle}>{item.date}</div>
                  <div
                    className={contentStyle}
                    style={{ WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}
                  >
                    {item.text}
                  </div>
                  <span className={labelStyle}>{item.label}</span>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
