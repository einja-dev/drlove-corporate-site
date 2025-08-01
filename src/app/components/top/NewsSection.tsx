'use client';
import { SectionTitle } from '@/app/components/ui/SectionTitle';
import { useFadeInOnScroll } from '@/app/hooks/useFadeInOnScroll';
import { useHover } from '@/app/hooks/useHover';
import { css } from '@/styled-system/css';
import gsap from 'gsap';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

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
  alignItems: 'stretch',
  padding: '8px 16px',
  overflowX: 'auto',
  md: {
    gap: '24px',
  },
});

const newsCardStyle = css({
  width: 'clamp(180px, 32vw, 262px)',
  background: '#fff',
  borderRadius: '12px',
  boxShadow: 'card.default',
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
    boxShadow: 'card.hover',
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
  whiteSpace: 'pre-line',
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
    date: '2025/07/24',
    text: 'Nontitle Season5 第11話\n「マジで色々ありすぎた。まったく予想できんかった」',
    img: '/top/news/news-20250724-nontitle-s5-ep11.jpg',
    label: 'メディア出演',
    link: 'https://youtu.be/r8lUS9OutLY?si=rxLCrJASd_NhLfUs',
  },
  {
    date: '2025/07/17',
    text: 'Nontitle Season5 第10話\n「俺達は変われる。変わらなきゃいけない」',
    img: '/top/news/news-20250717-nontitle-s5-ep10.jpg',
    label: 'メディア出演',
    link: 'https://youtu.be/C6DftrxBXkI?si=lVHI2iqVE1uUx_X0',
  },
  {
    date: '2025/07/10',
    text: 'Nontitle Season5 第9話\n「なんでお前はそれをやらないんだ！起業にエンタメ枠なんていらねーんだよ！」',
    img: '/top/news/news-20250710-nontitle-s5-ep9.jpg',
    label: 'メディア出演',
    link: 'https://youtu.be/PCEuOP-ujh0?si=fGSTLeqmqz2ZxM4T',
  },
  {
    date: '2025/07/03',
    text: 'Nontitle Season5 第8話\n「どうも新メンバーです！ていうか暗いな！もっとワクワクしながら進めようぜ！」',
    img: '/top/news/news-20250703-nontitle-s5-ep8.jpg',
    label: 'メディア出演',
    link: 'https://youtu.be/aHIa0BK54UQ?si=HU8VPiuh6l8V3uR1',
  },
  {
    date: '2025/06/26',
    text: 'Nontitle Season5 第7話\n「俺は喋るしかできないっす。だからここだけは任せてください。もう誰もクビにしたくないです」',
    img: '/top/news/news-20250626-nontitle-s5-ep7.jpg',
    label: 'メディア出演',
    link: 'https://youtu.be/NtyWeWwSEvY?si=r0ELzBiCMQAY3NlX',
  },
  {
    date: '2025/06/19',
    text: 'Nontitle Season5 第6話\n「リーダー決めようぜ。俺やりたいぜ。」',
    img: '/top/news/news-20250619-nontitle-s5-ep6.jpg',
    label: 'メディア出演',
    link: 'https://youtu.be/cngKiaIEvlI?si=gojrZ8rXHGFUesT8',
  },
  {
    date: '2025/06/12',
    text: 'Nontitle Season5 第5話\n「母の命を救えなかったときに誓ったの！この事業を通して二度とそういう人を出さないって！」',
    img: '/top/news/news-20250612-nontitle-s5-ep5.jpg',
    label: 'メディア出演',
    link: 'https://youtu.be/IlG3rTtwjto?si=IVbdJcbcmgWvp3iP',
  },
  {
    date: '2025/06/05',
    text: 'Nontitle Season5 第4話\n「誰クビにする？こっから負けない為に」',
    img: '/top/news/news-20250605-nontitle-s5-ep4.jpg',
    label: 'メディア出演',
    link: 'https://youtu.be/Uv2u8hVwDCM?si=aZ_Bxktaa8SQCxCD',
  },
  {
    date: '2025/06/01',
    text: 'CEO水池愛香 ボディメイク大会に初出場で大健闘「もっと上を目指したい」',
    img: '/top/news/news-20250601-aika-bodymake.png',
    label: 'メディア掲載',
    link: 'https://news.yahoo.co.jp/articles/18508fbde1a4f655558d4ed759a0c3b58e0f0899',
  },
  {
    date: '2025/05/29',
    text: 'Nontitle Season5 第3話\n「勝ちました絶対に。クビが出るのはあっちです」',
    img: '/top/news/news-20250529-nontitle-s5-ep3.jpg',
    label: 'メディア出演',
    link: 'https://youtu.be/gDPzVPZk2cc?si=SiylHa-HFsiziaHf',
  },
  {
    date: '2025/05/22',
    text: 'Nontitle Season5 第2話\n「お前もう本当ウザいって。結果が全てなんだからそこで勝負しろよ」',
    img: '/top/news/news-20250522-nontitle-s5-ep2.jpg',
    label: 'メディア出演',
    link: 'https://youtu.be/sPE8J9imqqo?si=7flp3JfBTyYStNO-',
  },
  {
    date: '2025/05/15',
    text: 'Nontitle Season5 第1話\n【大炎上！！高卒VS大卒】論破したら一枠追加！選ばれた7名は誰！？',
    img: '/top/news/news-20250515-nontitle-s5-ep1.jpg',
    label: 'メディア出演',
    link: 'https://youtu.be/eTeX1d5WVQY?si=qZaosRtLsSOSF1yA',
  },
];

// 子コンポーネント化
function NewsCard({ item, threshold }: { item: (typeof newsData)[number]; threshold: number }) {
  const fadeRef = useFadeInOnScroll(threshold);
  const [hoverRef, isHover] = useHover<HTMLDivElement>();
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!imgRef.current) return;
    gsap.to(imgRef.current, {
      scale: isHover ? 1.08 : 1,
      duration: 0.25,
      ease: 'power2.out',
    });
  }, [isHover]);

  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div className={newsCardStyle} ref={fadeRef}>
        <div ref={hoverRef} className={newsImageWrap}>
          <Image ref={imgRef} src={item.img} alt="news" fill className={newsImageStyle} />
        </div>
        <div className={cardContentStyle}>
          <div className={dateStyle}>{item.date}</div>
          <div className={contentStyle} title={item.text} style={{ WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
            {item.text}
          </div>
          <span className={labelStyle}>{item.label}</span>
        </div>
      </div>
    </a>
  );
}

export default function NewsSection() {
  return (
    <section className={sectionStyle} id="news">
      <SectionTitle en="NEWS" jp="ニュース" />
      <div className={newsListStyle} >
        {newsData.map((item, idx) => (
          <NewsCard key={item.date + item.text} item={item} threshold={0.18 + idx * 0.05} />
        ))}
      </div>
    </section>
  );
}
