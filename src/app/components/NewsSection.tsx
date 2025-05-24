import Image from 'next/image';
import { css } from '../../../styled-system/css';
import { SectionTitle } from './SectionTitle';

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
  display: 'flex',
  flexDirection: 'row',
  padding: '8px 0',
  alignItems: 'stretch',
  justifyContent: 'flex-start',
  width: '100%',
  overflowX: 'scroll',
  flexWrap: 'nowrap',
  paddingBottom: '8px',
  scrollbarWidth: 'auto',
  scrollbarGutter: 'stable',
  '& > div': {
    marginLeft: '16px',
  },
  '&::-webkit-scrollbar': {
    height: '16px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#eee',
    borderRadius: '8px',
  },
  md: {
    '& > div': {
      marginLeft: '24px',
    },
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
  md: {
    padding: '16px',
  },
});
const newsImageWrap = css({
  width: '100%',
  aspectRatio: '230/160',
  borderRadius: '12px 12px 0 0',
  overflow: 'hidden',
  background: '#fff',
  flexShrink: 0,
  position: 'relative',
  md: {
    borderRadius: '12px',
  },
});

const newsImageStyle = css({
  objectFit: 'cover',
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
  fontFamily: 'M+ 1m',
  fontWeight: '700',
  fontSize: '16px',
  color: '#FF749D',
  textAlign: 'left',
  lineHeight: '1.8',
});

const contentStyle = css({
  fontFamily: 'Noto Serif CJK JP',
  fontWeight: '500',
  fontSize: '16px',
  color: '#444',
  lineHeight: '1.8',
  textAlign: 'left',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  lineClamp: 3,
});

const newsData = [
  {
    date: '2025/06/12',
    text: 'ニュース内容が入るよ3ぎょうぐらい。ニュース内容が入るよ3ぎょうぐらい。',
    img: '/figma-assets/news_card1.png',
  },
  {
    date: '2025/06/01',
    text: '新サービスをリリースしました。詳細はお知らせページをご覧ください。',
    img: '/figma-assets/news_card2.png',
  },
  {
    date: '2025/05/20',
    text: 'AIカウンセリング機能がアップデートされました。',
    img: '/figma-assets/news_card3.png',
  },
  {
    date: '2025/05/01',
    text: 'Dr.LoveのWebサイトを公開しました。',
    img: '/figma-assets/news_card4.png',
  },
];

export default function NewsSection() {
  return (
    <section className={sectionStyle} id="news">
      <SectionTitle en="NEWS" jp="ニュース" />
      <div className={newsListStyle}>
        <div className={newsCardStyle}>
          <div className={newsImageWrap}>
            <Image
              src="/figma-assets/news_card1_mainimg.png"
              alt="news"
              fill
              className={newsImageStyle}
            />
          </div>
          <div className={cardContentStyle}>
            <div className={dateStyle}>2025/06/12</div>
            <div className={contentStyle}>
              ニュース内容が入るよ3ぎょうぐらい。ニュース内容が入るよ3ぎょうぐらい。
            </div>
          </div>
        </div>
        {newsData.map((item) => (
          <div className={newsCardStyle} key={item.date}>
            <div className={newsImageWrap}>
              <Image src={item.img} alt="news" fill className={newsImageStyle} />
            </div>
            <div className={cardContentStyle}>
              <div className={dateStyle}>{item.date}</div>
              <div className={contentStyle}>{item.text}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
