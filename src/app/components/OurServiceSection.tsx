'use client';
import { css } from '@/styled-system/css';
import { splitTextWithEmptyLines } from '@/utils/text';
import gsap from 'gsap';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { SectionTitle } from './SectionTitle';
import { Spacer } from './Spacer';

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
  lg: {
    width: '480px',
    height: '640px',
  },
});

const sectionText = css({
  fontFamily: 'M+ 1m, sans-serif',
  fontWeight: 400,
  fontSize: '15px',
  color: '#444',
  lineHeight: '2',
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
const rawServiceContents = [
  {
    id: 'main-1',
    video: '/videos/serviceImage1.mp4',
    title: 'Dr. Love AI',
    text: `心や見た目の悩みは、言葉にできないまま抱え込んでしまうことがあります。恋愛や仕事、人間関係、そして自分自身との向き合い。
  人生の節目ごとに形を変えながら、モヤモヤはそっと心に積もっていきます。

「何に悩んでいるのか自分でもわからない」
「つらいけど、誰かに相談するのは勇気がいる」

そんな日常に潜む"心のつまずき"に対して、Dr.Love AIは対話を通じてあなたの感情をやさしく言語化し、整理し、見つめ直すお手伝いをします。
ただ話を聞くだけではなく、あなたの現在地とこれからを照らす「言葉」、今できる「行動」、そして見た目を通じた「自己表現」までをトータルでサポートします。

一人で抱え込まない社会へ。
Dr.Love AIは、心の深い部分からあなたに寄り添いながら、より良い人生の一歩を共に探していきます。`,
  },
  {
    id: 'sub-1',
    video: '/videos/serviceImage2.webm',
    title: '24時間寄り添いサポート',
    text: `気持ちがうまく整理できないときや、誰にも相談できずに抱え込んでしまったとき。
            LINEで話しかけていただくだけで、Dr. Love AIがあなたの想いを丁寧に受けとめ、やさしく言葉にしていきます。

            つらさや不安、理由のわからないモヤモヤをひとつずつ言語化しながら、
            少し心が軽くなったり、自分らしい考え方や選択肢に気づけるようサポートします。

            また、占いや診断コンテンツなども充実しており、
            "楽しみながら自分を知る"ことができるのも特徴です。

            誰にも言えなかった気持ちを、もうひとりで抱えなくていい。
            Dr.Love AIが、いつでもあなたのそばにいます。`,
  },
  {
    id: 'main-2',
    video: '/videos/serviceImage3.webm',
    title: 'あなたに合わせた商品を提案',
    text: `Dr.Love AIは、あなたの骨格タイプ・顔立ち・パーソナルカラーなどをもとに、
            "今のあなた"にぴったりな美容サロンを複数提案し、予約までまるごとサポートします。

            さらに、肌質や予算、好みに合わせて、おすすめのコスメを複数ご提案。
            そのままECサイトで購入できるリンクも自動でお届けするので、迷わず行動に移せます。

            毎月、自分の変化を楽しめる「美容サブスクボックス」では、
            外見を整えるだけでなく、心の充実にもつながる"自分磨き"体験をお届け。
            ただ消費するのではなく、「気づき」と「前向きな変化」を実感しながら続けられる設計です。

            そして、本格的に外見を整えたい方には、
            半年〜1年かけて最短距離で自己変革を叶える「外見プロデュースパック」もご用意。
            骨格診断やパーソナルカラー分析をベースに、
            ヘア・スキンケア・ファッション・サロン・コスメまで一貫してプロデュース。
            "見た目"から始まる新しい自分へ、しっかりと伴走していきます。`,
  },
];

const serviceContents = rawServiceContents.map(({ text, ...rest }) => ({
  ...rest,
  texts: Array.isArray(text)
    ? text.flatMap((t) => splitTextWithEmptyLines(t))
    : splitTextWithEmptyLines(text),
}));

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
  // SectionTitle用ref
  const sectionTitleRef = useRef<HTMLDivElement | null>(null);
  // SectionTitleアニメーション
  useEffect(() => {
    const handler = () => {
      if (!sectionTitleRef.current) return;
      const rect = sectionTitleRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // 画面の50%分だけ下に来てから開始
      const offset = windowHeight * 0.5;
      const scrolled = windowHeight - rect.top;
      const progress = Math.min(1, Math.max(0, (scrolled - offset) / rect.height));
      if (progress > 0) {
        gsap.to(sectionTitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        });
      } else {
        gsap.to(sectionTitleRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: 'power2.in',
        });
      }
    };
    window.addEventListener('scroll', handler);
    window.addEventListener('resize', handler);
    handler();
    return () => {
      window.removeEventListener('scroll', handler);
      window.removeEventListener('resize', handler);
    };
  }, []);

  return (
    <section className={sectionStyle} id="service">
      <div className={contentWrapper}>
        {/* SectionTitleをdivでラップしrefと初期スタイルを付与 */}
        <div
          ref={sectionTitleRef}
          style={{ opacity: 0, transform: 'translateY(20px)', willChange: 'opacity, transform' }}
        >
          <SectionTitle en="OUR SERVICE" jp="サービス" />
        </div>
        {/* 上部2カラム */}
        {serviceContents.map((content, idx) => {
          // 各テキスト行のref配列を用意
          const linesRef = useRef<(HTMLDivElement | null)[]>([]);
          const sectionRef = useRef<HTMLDivElement | null>(null);
          // 動画用refを追加
          const videoRef = useRef<HTMLVideoElement | null>(null);
          // refを安定化させるコールバック
          const setLineRef = (i: number) => (el: HTMLDivElement | null) => {
            linesRef.current[i] = el;
          };

          // sectionSubTitle用ref
          const subTitleRef = useRef<HTMLDivElement | null>(null);
          useEffect(() => {
            let detach: (() => void) | null = null;
            const handler = () => {
              if (!sectionRef.current) return;
              const rect = sectionRef.current.getBoundingClientRect();
              const windowHeight = window.innerHeight;
              const total = rect.height;
              const scrolled = windowHeight - rect.top;
              const offset = windowHeight * 0.3; // 画面の30%分だけ下に来てから開始
              const progress = Math.min(1, Math.max(0, (scrolled - offset) / total));
              const linesToShow = Math.ceil(progress * content.texts.length);
              linesRef.current.forEach((el, i) => {
                if (!el) return;
                if (i < linesToShow) {
                  gsap.to(el, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    delay: i * 0.01,
                    ease: 'power2.out',
                  });
                } else {
                  gsap.to(el, { opacity: 0, y: 20, duration: 0.3, ease: 'power2.in' });
                }
              });
              // 動画の表示判定
              if (videoRef.current) {
                const vRect = videoRef.current.getBoundingClientRect();
                const vCenter = vRect.top + vRect.height / 2;
                const wCenter = windowHeight / 2;
                const threshold = windowHeight * 0.4; // 画面高さの15%分
                // progressが0.3以上、かつ中央付近
                if (progress > 0.3 && Math.abs(vCenter - wCenter) < threshold) {
                  gsap.to(videoRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                  });
                } else {
                  gsap.to(videoRef.current, {
                    opacity: 0,
                    y: 20,
                    duration: 0.5,
                    ease: 'power2.in',
                  });
                }
              }
            };
            // Lenis対応
            type LenisType = {
              on?: (event: string, fn: () => void) => void;
              off?: (event: string, fn: () => void) => void;
            };
            const win = window as unknown as { lenis?: LenisType };
            const lenis = win.lenis;
            if (lenis && typeof lenis.on === 'function' && typeof lenis.off === 'function') {
              lenis.on('scroll', handler);
              detach = () => {
                lenis.off?.('scroll', handler);
              };
            } else {
              window.addEventListener('scroll', handler);
              window.addEventListener('resize', handler);
              detach = () => {
                window.removeEventListener('scroll', handler);
                window.removeEventListener('resize', handler);
              };
            }
            handler();
            return () => {
              if (detach) detach();
            };
          }, [content.texts.length]);

          // sectionSubTitleアニメーション
          useEffect(() => {
            const subTitleHandler = () => {
              if (!subTitleRef.current) return;
              const rect = subTitleRef.current.getBoundingClientRect();
              const windowHeight = window.innerHeight;
              const offset = windowHeight * 0.5;
              const scrolled = windowHeight - rect.top;
              const progress = Math.min(1, Math.max(0, (scrolled - offset) / rect.height));
              if (progress > 0) {
                gsap.to(subTitleRef.current, {
                  opacity: 1,
                  y: 0,
                  duration: 0.8,
                  ease: 'power2.out',
                });
              } else {
                gsap.to(subTitleRef.current, {
                  opacity: 0,
                  y: 20,
                  duration: 0.5,
                  ease: 'power2.in',
                });
              }
            };
            window.addEventListener('scroll', subTitleHandler);
            window.addEventListener('resize', subTitleHandler);
            subTitleHandler();
            return () => {
              window.removeEventListener('scroll', subTitleHandler);
              window.removeEventListener('resize', subTitleHandler);
            };
          }, []);

          return (
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
              <div className={leftCol} style={{ position: 'relative', zIndex: 1 }} ref={sectionRef}>
                {/* sectionSubTitleにrefと初期スタイルを付与 */}
                <div
                  className={sectionSubTitle}
                  ref={subTitleRef}
                  style={{
                    opacity: 0,
                    transform: 'translateY(20px)',
                    willChange: 'opacity, transform',
                  }}
                >
                  {content.title}
                </div>
                <Spacer size="32px" />
                {content.texts.map((text, i) =>
                  text === '' ? (
                    <div
                      className={sectionText}
                      key={`empty-${i}-${content.title}`}
                      style={{
                        height: '1.5em',
                        opacity: 0,
                        transform: 'translateY(20px)',
                        willChange: 'opacity, transform',
                      }}
                      ref={setLineRef(i)}
                    />
                  ) : (
                    <div
                      className={sectionText}
                      key={`${text}-${i}-${content.title}`}
                      ref={setLineRef(i)}
                      style={{
                        opacity: 0,
                        transform: 'translateY(20px)',
                        willChange: 'opacity, transform',
                      }}
                    >
                      {text}
                    </div>
                  )
                )}
              </div>
              <div className={rightCol} style={{ position: 'relative', zIndex: 1 }}>
                <video
                  ref={videoRef}
                  src={content.video}
                  className={phoneImage}
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{
                    opacity: 0,
                    transform: 'translateY(20px)',
                    willChange: 'opacity, transform',
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
