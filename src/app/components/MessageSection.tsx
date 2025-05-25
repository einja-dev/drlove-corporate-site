'use client';
import { css } from '@/styled-system/css';
import type Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    lenis?: InstanceType<typeof Lenis>;
  }
}

const messageCatch = 'Bloom from pain. 痛みから咲く。';

const messageLead = `人生はいつも思い通りじゃない、傷つくことも泣きたい夜もある。
でもあなたの物語はあなたが主役。
笑えない日々を超えて笑顔で立ち上がったその瞬間にこそ、本当の愛と幸せがあなたを抱きしめに来る。

現代の日本には、
精神疾患、虐待、依存、孤独、そして自殺など、深刻な社会課題が数多く存在しています。
私たちは、それらの多くが「人とのすれ違い」から生まれていると考えています。

Dr.Loveは、「1人で抱え込まない社会作り」をビジョンに掲げ、
"世代間の負の連鎖を断ち切り、連鎖の始まりを阻止する"ことをミッションとしています。

人と人とのすれ違いを、分かり合いに変えるための小さな第一歩を届けたい。
自分の気持ちを素直に言葉にし、自分自身を理解し、大切にできる人を増やしたい。

そしてその先に、愛の循環が広がっていくことで、
やがて他者の気持ちにも自然と寄り添える、あたたかい社会が育まれていくと信じています。

Dr.Loveは、「相談することが当たり前」になる文化をつくり、
悩める人々の心の拠り所になることを、本気で目指しています。

悩みを抱えるすべての人に寄り添い、
心に小さな光を灯すように、自信を取り戻すきっかけを届け続けること。
それこそが、Dr.Loveの存在意義です。`;

export default function MessageSection() {
  const lines = messageLead.split(/\n/).map((line) => (line.trim() === '' ? null : line));
  const [visibleLines, setVisibleLines] = useState(0);
  const linesRef = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const [showHeading, setShowHeading] = useState(false);
  const [headingFinished, setHeadingFinished] = useState(false);

  useEffect(() => {
    // Lenisのscrollイベントを使う
    let detach: (() => void) | null = null;
    const handler = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // セクションの上端が画面下端で0、下端が画面下端で1
      const total = rect.height;
      const scrolled = windowHeight - rect.top;
      const progress = Math.min(1, Math.max(0, scrolled / total));

      const linesToShow = Math.ceil(progress * lines.length);
      setVisibleLines(linesToShow);
      setShowHeading(progress > 0.2);
    };
    // Lenisインスタンスがwindowにある前提
    const lenis = window.lenis;
    if (lenis && typeof lenis.on === 'function') {
      lenis.on('scroll', handler);
      detach = () => lenis.off('scroll', handler);
    } else {
      // Fallback: 通常のscrollイベント
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
  }, [lines.length]);

  useEffect(() => {
    if (!headingFinished) return; // 見出しが描画完了してから本文アニメーション
    linesRef.current.forEach((el, i) => {
      if (el) {
        if (i < visibleLines) {
          gsap.to(el, { opacity: 1, y: 0, duration: 0.6, delay: i * 0.01, ease: 'power2.out' });
        } else {
          gsap.to(el, { opacity: 0, y: 20, duration: 0.3, ease: 'power2.in' });
        }
      }
    });
  }, [visibleLines, headingFinished]);

  useEffect(() => {
    // 見出しアニメーション（showHeadingに応じて表示・非表示）
    if (headingRef.current) {
      if (showHeading) {
        setHeadingFinished(false);
        gsap.to(headingRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power2.out',
          delay: 0.1,
          onComplete: () => setHeadingFinished(true),
        });
      } else {
        gsap.to(headingRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: () => setHeadingFinished(false),
        });
      }
    }
  }, [showHeading]);

  useEffect(() => {
    if (headingFinished) {
      setVisibleLines(0);
    }
  }, [headingFinished]);

  return (
    <section
      ref={sectionRef}
      className={css({
        background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, #fff 100%)',
        zIndex: 1,
        width: '100vw',
        padding: '16px',
        md: {
          padding: '40px',
        },
      })}
    >
      <div
        className={css({
          background: 'background',
          width: '100%',
          margin: '0 auto',
          padding: '80px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '40px',
          md: {
            padding: '96px 80px',
            gap: '48px',
          },
        })}
      >
        <div
          className={css({
            position: 'relative',
            zIndex: 1,
            width: '100%',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
            md: {
              gap: '48px',
            },
          })}
        >
          {/* キャッチコピー */}
          <h2
            ref={headingRef}
            className={css({
              position: 'relative',
              display: 'inline-block',
              fontFamily: 'Noto Serif JP, serif',
              fontWeight: 'bold',
              fontSize: 'clamp(1.5rem, 5vw, 4rem)',
              lineHeight: 1.8,
              color: '#444',
              textAlign: 'left',
              marginBottom: '16px',
              md: {
                fontSize: 'clamp(1.4rem, 3vw, 4rem)',
                marginBottom: '24px',
              },
            })}
          >
            <div
              className={css({
                position: 'relative',
                display: 'inline-block',
              })}
            >
              <div
                className={css({
                  position: 'absolute',
                  display: 'inline-block',
                  width: '75%',
                  height: '100%',
                  top: '4px',
                  left: '8px',
                  xs: {
                    top: '16px',
                    width: '100%',
                  },
                  md: {
                    left: '16px',
                    top: '24px',
                  },
                  lg: {
                    left: '16px',
                    top: '32px',
                  },
                  xl: {
                    left: '16px',
                    top: '40px',
                  },
                })}
              >
                <Image
                  src="/images/watercolor-bg.png"
                  alt=""
                  aria-hidden="true"
                  fill
                  style={{
                    objectFit: 'contain',
                    zIndex: 0,
                    opacity: 0.5,
                    pointerEvents: 'none',
                  }}
                  priority
                />
              </div>

              <span
                className={css({
                  position: 'relative',
                  zIndex: 1,
                })}
              >
                {messageCatch}
              </span>
            </div>
          </h2>

          {/* リード文（1行ずつアニメーション表示） */}
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              width: '100%',
              md: {
                gap: '2px',
              },
            })}
          >
            {lines.map((line, i) =>
              line === null ? (
                <div key={`empty-${i}`} style={{ height: '1.5em' }} />
              ) : (
                <div
                  key={`${line}-${i}`}
                  ref={(el) => {
                    linesRef.current[i] = el;
                  }}
                  style={{
                    opacity: headingFinished && i < visibleLines ? 1 : 0,
                    transform:
                      headingFinished && i < visibleLines ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'opacity 0.6s, transform 0.6s',
                  }}
                  className={css({
                    fontFamily: 'Noto Serif JP, serif',
                    fontWeight: 500,
                    lineHeight: 2.4,
                    color: '#444',
                    textAlign: 'left',
                    fontSize: 'clamp(0.9rem, 1.2vw, 2rem)',
                    whiteSpace: 'pre-line',
                  })}
                >
                  {line}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
