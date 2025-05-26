'use client';
import { useFadeInOnScroll } from '@/app/hooks/useFadeInOnScroll';
import { css } from '@/styled-system/css';
import { splitTextWithEmptyLines } from '@/utils/text';
import Image from 'next/image';
import { useLayoutEffect, useRef, useState } from 'react';
import { SectionTitle } from './SectionTitle';
import { Spacer } from './Spacer';
import { WbrTextWrapper } from './WbrTextWrapper';

/* ---------- styles ---------- */
const sectionStyle = css({
  width: '100%',
  position: 'relative',
  background: 'background',
  overflow: 'hidden',
  padding: '32px 32px 80px', // extra bottom padding
  zIndex: 2,
  borderRadius: '0 0 40px 40px',
  // Downward-only shadow: y‑offset 24px, blur 32px, negative spread to avoid top shadow
  boxShadow: '0 24px 32px -16px rgba(0,0,0,0.15)',
  md: { padding: '64px 64px 96px' }, // extra bottom padding for md+
});

const contentWrapper = css({
  position: 'relative',
  zIndex: 1,
  width: '100%',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '48px', // narrower gap on small screens
  paddingTop: '48px',
  md: {
    gap: '48px', // narrower on md and up
    paddingTop: '64px',
  },
});

const rowBase = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px', // モバイル時は8px
  alignItems: 'center',
  width: '100%',
  position: 'relative',
  overflow: 'visible',
  md: { gap: '60px', flexDirection: 'row' }, // md以上は60px
});
const rowReverse = css({ md: { flexDirection: 'row-reverse' } });

const leftCol = css({
  flex: 1,
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
});

const rightCol = css({
  /* base (column layout) */
  width: '100%', // stretch to full width when stacked
  maxWidth: '300px',
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '16px',

  /* md ≥768 px */
  md: {
    marginTop: 0,
    flexBasis: '38%', // allow up to 38% of row width
    maxWidth: '420px', // larger absolute cap
  },

  /* lg ≥1024 px */
  lg: {
    maxWidth: '550px',
  },

  /* xl ≥1280 px */
  xl: {
    maxWidth: '600px',
  },
});

const wbrText = css({
  fontWeight: 400,
  fontSize: '15px',
  color: '#444',
  lineHeight: '2',
  wordBreak: 'keep-all',
  whiteSpace: 'normal',
  lineBreak: 'strict',
});

const sectionSubTitle = css({
  fontWeight: '500',
  fontSize: 'clamp(2em, 3.4vw, 3rem)',
  lineHeight: '1.5em',
  textAlign: 'left',
  backgroundImage: 'linear-gradient(90deg, #FF749D 0%, #FFB374 100%)',
  backgroundClip: 'text',
  color: 'transparent',
  display: 'inline-block',
  fontFamily: 'Noto Serif JP, serif',
});

const videoFill = css({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const serviceTitleWrap = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '100%',
  margin: '0 0 8px 0',
});
const serviceTitleText = css({
  fontFamily: 'Noto Serif JP, serif',
  fontWeight: 700,
  fontSize: '20px',
  color: '#444',
  textAlign: 'left',
  lineHeight: '1.8em',
});
const serviceTitleBars = css({
  display: 'flex',
  flexDirection: 'row',
  gap: '8px',
  marginTop: '8px',
  justifyContent: 'flex-start',
});
const serviceTitleBar = css({
  height: '4px',
  borderRadius: '24px',
  background: 'linear-gradient(135deg, #FF749D 0%, #FFB374 100%)',
});
/* ---------- /styles ---------- */

/* ---- mask styles ---- */
const videoMask = css({
  position: 'relative',
  width: '100%',
  paddingTop: '160%', // マイルドな縦長 (約 10:16)
  overflow: 'hidden',
});
/* --------------------- */

/* ---------- service data ---------- */
const rawServiceContents = [
  {
    id: 'main-1',
    video: '/videos/serviceImage1.mp4',
    titleImage: '/top/service/drlove-ai.png',
    text: `心や見た目の悩みは、言葉にできないまま<wbr>抱え込んでしまうことがあります。恋愛や仕事、人間関係、そして自分自身との向き合い。
人生の節目ごとに形を変えながら、モヤモヤはそっと心に積もっていきます。

「何に悩んでいるのか自分でもわからない」
「つらいけど、誰かに相談するのは勇気がいる」

そんな日常に潜む"心のつまずき"に対して、<wbr>Dr.Love AIは対話を通じて<wbr>あなたの感情をやさしく言語化し、整理し、見つめ直すお手伝いをします。
ただ話を聞くだけではなく、あなたの現在地とこれからを照らす「言葉」、今できる「行動」、そして見た目を通じた「自己表現」までをトータルでサポートします。

一人で抱え込まない社会へ。
Dr.Love AIは、心の深い部分からあなたに寄り添いながら、より良い人生の一歩を共に探していきます。`,
  },
  {
    id: 'sub-1',
    video: '/videos/serviceImage2.mp4',
    title: '24時間あなたの心に寄り添う',
    text: `気持ちがうまく整理できないときや、<wbr>誰にも相談できずに抱え込んでしまったとき。<wbr>LINEで話しかけていただくだけで、<wbr><span class="nb">Dr. Love AI</span>が<wbr>あなたの想いを丁寧に受けとめ、<wbr>やさしく言葉にしていきます。

つらさや不安、理由のわからないモヤモヤを<wbr>ひとつずつ言語化しながら、少し心が軽くなったり、自分らしい考え方や選択肢に気づけるよう<wbr>サポートします。

また、占いや診断コンテンツなども充実しており、"楽しみながら自分を知る"<wbr>ことができるのも特徴です。

誰にも言えなかった気持ちを、もうひとりで抱えなくていい。
Dr.Love AIが、いつでもあなたのそばにいます。`,
  },
  {
    id: 'main-2',
    video: '/videos/serviceImage3.mp4',
    title: 'あなた専属の相談相手',
    text: `Dr.Love AIは、<wbr>あなたの骨格タイプ・顔立ち・パーソナルカラーなどをもとに、<wbr>"今のあなた"にぴったりな<wbr>美容サロンを複数提案し、予約までまるごとサポートします。

さらに、肌質や予算、好みに合わせて、おすすめのコスメを複数ご提案。
そのままECサイトで購入できる<wbr>リンクも自動でお届けするので、迷わず行動に移せます。

毎月、自分の変化を楽しめる<wbr>「美容サブスクボックス」<wbr>では、外見を整えるだけでなく、心の充実にもつながる"自分磨き"体験をお届け。
ただ消費するのではなく、「気づき」と「前向きな変化」を実感しながら続けられる設計です。

そして、本格的に外見を整えたい方には、半年〜1年かけて最短距離で自己変革を叶える<wbr>「外見プロデュースパック」<wbr>もご用意。

骨格診断やパーソナルカラー分析をベースに、ヘア・スキンケア・ファッション・サロン・コスメまで一貫してプロデュース。
"見た目"から始まる新しい自分へ、しっかりと伴走していきます。`,
  },
];

const serviceContents = rawServiceContents.map(({ text, ...rest }) => ({
  ...rest,
  texts: splitTextWithEmptyLines(text.replace(/<wbr>/g, '\u200B').replace(/、/g, '、\u200B')),
}));
/* ---------- /service data ---------- */

/* ---------- Main component ---------- */
export default function OurServiceSection() {
  const setTitleRef = useFadeInOnScroll(0.15); // Section title

  return (
    <section className={sectionStyle} id="service">
      <div className={contentWrapper}>
        <div ref={setTitleRef}>
          <SectionTitle en="OUR SERVICE" jp="サービス" />
        </div>

        {serviceContents.map((content, idx) => (
          <ServiceBlock key={content.id} idx={idx} {...content} />
        ))}
      </div>
    </section>
  );
}

/* ---------- Service block (in same file) ---------- */
type ServiceBlockProps = {
  idx: number;
  id: string;
  title?: string;
  titleImage?: string;
  video: string;
  texts: string[];
};

function ServiceBlock({ idx, title, titleImage, video, texts }: ServiceBlockProps) {
  const setSubTitleRef = useFadeInOnScroll(0.25);
  const setLineRef = useFadeInOnScroll(0.4);
  // 小さい画面でも確実に発火するよう threshold 0 & rootMargin -15%
  const setVideoRef = useFadeInOnScroll();

  const RowClass = idx % 2 === 0 ? rowBase : `${rowBase} ${rowReverse}`;

  return (
    <div className={RowClass}>
      {/* watercolor background for the first block */}
      {/* {idx === 0 && (
        <Image
          src="/images/watercolor-bg.png"
          alt=""
          fill
          className={`${bgImageStyle} ${bgLeftHalf}`}
          priority
        />
      )} */}

      {/* text */}
      <div className={leftCol}>
        <div ref={setSubTitleRef} className={sectionSubTitle}>
          {titleImage ? (
            <Image
              src={titleImage}
              alt={title || ''}
              width={220}
              height={40}
              style={{ height: '40px', width: 'auto', maxWidth: '100%' }}
            />
          ) : (
            <ServiceTitleWithBars title={title} />
          )}
        </div>
        <Spacer size="24px" />
        {texts.map((t, i) =>
          t === '' ? (
            <div
              key={`empty-${title || ''}-${i}`}
              className={wbrText}
              ref={setLineRef}
              style={{ height: '1.5em' }}
            />
          ) : (
            <WbrTextWrapper
              key={`${title || ''}-${i}`}
              ref={setLineRef}
              dangerouslySetInnerHTML={{ __html: t }}
            />
          )
        )}
      </div>

      {/* video */}
      <div className={rightCol}>
        <div className={videoMask}>
          <video
            ref={setVideoRef}
            src={video}
            className={videoFill}
            style={idx === 0 ? { transform: 'scale(1.07)' } : undefined}
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      </div>
    </div>
  );
}

// 見出し下のバーをテキスト幅に合わせて比率で表示するコンポーネント
function ServiceTitleWithBars({ title }: { title?: string }) {
  const textRef = useRef<HTMLSpanElement>(null);
  const [barWidth, setBarWidth] = useState<number>(236);
  useLayoutEffect(() => {
    if (textRef.current) {
      setBarWidth(textRef.current.offsetWidth);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // 比率: 114:26:44
  const total = 114 + 26 + 44;
  const w1 = (114 / total) * barWidth;
  const w2 = (26 / total) * barWidth;
  const w3 = (44 / total) * barWidth;
  return (
    <div className={serviceTitleWrap}>
      <span ref={textRef} className={serviceTitleText}>
        {title}
      </span>
      <div className={serviceTitleBars} style={{ width: barWidth }}>
        <div className={serviceTitleBar} style={{ width: w1 }} />
        <div className={serviceTitleBar} style={{ width: w2 }} />
        <div className={serviceTitleBar} style={{ width: w3 }} />
      </div>
    </div>
  );
}
