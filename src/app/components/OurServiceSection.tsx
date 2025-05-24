import Image from 'next/image';
import React from 'react';
import { css } from '../../../styled-system/css';
import { SectionTitle } from './SectionTitle';

const sectionStyle = css({
  width: '100%',
  position: 'relative',
  background: 'background',
  overflow: 'hidden',
  padding: '32px',
  zIndex: 1,
  md: {
    padding: '64px',
  },
});

const bgImageStyle = css({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  zIndex: 0,
  pointerEvents: 'none',
});

const contentWrapper = css({
  position: 'relative',
  zIndex: 1,
  width: '100%',
  maxWidth: '1000px',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '64px',
  padding: '64px 0 0 0',
  md: {
    gap: '80px',
    padding: '96px 0 0 0',
  },
});

const mainRow = css({
  display: 'flex',
  flexDirection: 'column',

  gap: '64px',
  alignItems: 'center',
  width: '100%',
  position: 'relative',
  overflow: 'visible',
  md: {
    gap: '80px',
    flexDirection: 'row',
  },
});

const leftCol = css({
  flex: 1,
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  alignItems: 'flex-start',
  justifyContent: 'center',
});

const rightCol = css({
  width: '180px',
  flexShrink: 0,
  minWidth: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '16px',
  md: { marginTop: 0 },
  lg: {
    width: '320px',
    height: '640px',
  },
});

const phoneImage = css({
  width: '180px',
  height: '360px',
  maxWidth: '100%',
  boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
  borderRadius: '32px',
  lg: {
    width: '320px',
    height: '640px',
  },
});

const sectionText = css({
  fontFamily: 'M+ 1m, sans-serif',
  fontWeight: 400,
  fontSize: '15px',
  color: '#444',
  lineHeight: '2',
  marginBottom: '8px',
});

const sectionSubTitle = css({
  fontFamily: 'Iwata Maru Gothic Std, sans-serif',
  fontWeight: 700,
  fontSize: '24px',
  color: '#FF749D',
  margin: '24px 0 8px 0',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

// サービスセクションの内容を配列で管理
const serviceContents = [
  {
    id: 'main-1',
    video: '/videos/serviceImage1.mp4',
    title: 'Dr. Love AI',
    texts: [
      'Dr. Love AIは、あなたの中にある言葉にならない感情や、誰にも打ち明けられない思いに、そっと耳を傾けるAIパートナーです。',
      '「何に悩んでいるのか自分でもわからない」\n「つらいけど、誰かに相談するのは勇気がいる」',
      'そんな日常に潜む"心のつまずき"に対して、Dr.Love AIは対話を通じてあなたの感情をやさしく言語化し、整理し、見つめ直すお手伝いをします。ただ話を聞くだけではなく、あなたの現在地とこれからを照らす「言葉」、今できる「行動」、そして見た目を通じた「自己表現」までをトータルでサポートします。一人で抱え込まない社会へ。Dr.Love AIは、心の深い部分からあなたに寄り添いながら、より良い人生の一歩を共に探していきます。',
    ],
  },
  {
    id: 'sub-1',
    video: '/videos/serviceImage2.mp4',
    title: '24時間寄り添いサポート',
    texts: [
      'Dr.Love AIは、あなたの骨格タイプ・顔立ち・パーソナルカラーなどをもとに、"今のあなた"にぴったりな美容サロンを複数提案し、予約までまるごとサポートします。',
      'さらに、肌質や予算、好みに合わせて、おすすめのコスメを複数ご提案。そのままECサイトで購入できるリンクも自動でお届けするので、迷わず行動に移せます。',
      '毎月、自分の変化を楽しめる「美容サブスクボックス」では、外見を整えるだけでなく、心の充実にもつながる"自分磨き"体験をお届け。\nただ消費するのではなく「気づき」と「前向きな変化」を実感しながら続けられる設計です。',
      'そして、本格的に外見を整えたい方には、半年〜1年かけて最短距離で自己変革を叶える「外見プロデュースパック」もご用意。骨格診断やパーソナルカラー分析をベースに、ヘア・スキンケア・ファッション・サロン・コスメまで一貫してプロデュース。"見た目"から始まる新しい自分へ、しっかりと伴走していきます。',
    ],
  },
  {
    id: 'main-2',
    video: '/videos/serviceImage3.mp4',
    title: 'あなたに合わせた商品を提案',
    texts: [
      'Dr.Love AIは、あなたの骨格タイプ・顔立ち・パーソナルカラーなどをもとに、"今のあなた"にぴったりな美容サロンを複数提案し、予約までまるごとサポートします。',
      'さらに、肌質や予算、好みに合わせて、おすすめのコスメを複数ご提案。そのままECサイトで購入できるリンクも自動でお届けするので、迷わず行動に移せます。',
      '毎月、自分の変化を楽しめる「美容サブスクボックス」では、外見を整えるだけでなく、心の充実にもつながる"自分磨き"体験をお届け。\nただ消費するのではなく「気づき」と「前向きな変化」を実感しながら続けられる設計です。',
      'そして、本格的に外見を整えたい方には、半年〜1年かけて最短距離で自己変革を叶える「外見プロデュースパック」もご用意。骨格診断やパーソナルカラー分析をベースに、ヘア・スキンケア・ファッション・サロン・コスメまで一貫してプロデュース。"見た目"から始まる新しい自分へ、しっかりと伴走していきます。',
    ],
  },
];

// 反転用row
const mainRowReverse = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '64px',
  alignItems: 'center',
  width: '100%',
  position: 'relative',
  overflow: 'visible',
  md: {
    gap: '80px',
    flexDirection: 'row-reverse',
  },
});

export default function OurServiceSection() {
  return (
    <section className={sectionStyle} id="service">
      <div className={contentWrapper}>
        <SectionTitle en="OUR SERVICE" jp="サービス" />
        {/* 上部2カラム */}
        {serviceContents.map((content, idx) => (
          <div
            key={content.id}
            className={idx % 2 === 0 ? mainRow : mainRowReverse}
            style={{ position: 'relative', overflow: 'visible' }}
          >
            {idx === 0 && (
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: 0,
                  width: '120vw',
                  height: '100%',
                  transform: 'translateX(-50%)',
                  zIndex: 0,
                  pointerEvents: 'none',
                }}
              >
                <Image
                  src="/images/watercolor-bg.png"
                  alt="背景"
                  fill
                  style={{ objectFit: 'cover' }}
                  className={bgImageStyle}
                  priority
                />
              </div>
            )}
            <div className={leftCol} style={{ position: 'relative', zIndex: 1 }}>
              <div className={sectionSubTitle}>{content.title}</div>
              {content.texts.map((text) => (
                <div className={sectionText} key={text}>
                  {text.split('\n').map((line) => (
                    <React.Fragment key={line}>
                      {line}
                      {line !== text.split('\n').at(-1) && <br />}
                    </React.Fragment>
                  ))}
                </div>
              ))}
            </div>
            <div className={rightCol} style={{ position: 'relative', zIndex: 1 }}>
              <video src={content.video} className={phoneImage} autoPlay loop muted playsInline />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
