'use client';
import { useBreakPoint } from '@/app/hooks/useBreakPoint';
import { useFadeInOnScroll } from '@/app/hooks/useFadeInOnScroll';
import { css } from '@/styled-system/css';
import Image from 'next/image';
import { useEffect } from 'react';

const messageCatch = 'Bloom from pain. 痛みから咲く。';

const messageLead = `人生はいつも思い通りじゃない、<spbr>傷つくことも泣きたい夜もある。
でもあなたの物語はあなたが主役。
笑えない日々を超えて<spbr>笑顔で立ち上がったその瞬間にこそ、<spbr>本当の愛と幸せがあなたを抱きしめに来る。

現代の日本には、
精神疾患、虐待、依存、孤独、そして自殺など、<spbr>深刻な社会課題が数多く存在しています。
私たちは、それらの多くが「人とのすれ違い」<spbr>から生まれていると考えています。

Dr.Loveは、<spbr>「1人で抱え込まない社会作り」をビジョンに掲げ、
<strong>"世代間の負の連鎖を断ち切り、</strong> <spbr><strong>連鎖の始まりを阻止する"</strong> <spbr>ことをミッションとしています。

人と人とのすれ違いを、<spbr>分かり合いに変えるための小さな第一歩を届けたい。
自分の気持ちを素直に言葉にし、<spbr>自分自身を理解し、大切にできる人を増やしたい。

そしてその先に、<spbr>愛の循環が広がっていくことで、
やがて他者の気持ちにも自然と寄り添える、<spbr>あたたかい社会が育まれていくと信じています。

Dr.Loveは、「相談することが当たり前」<spbr>になる文化をつくり、
悩める人々の心の拠り所になることを、<spbr>本気で目指しています。

悩みを抱えるすべての人に寄り添い、
心に小さな光を灯すように、<spbr>自信を取り戻すきっかけを届け続けること。

それこそが、Dr.Loveの存在意義です。`;

// 直前 1 文字と句読点をノーブレークで包み、その後に <wbr> を挿入
const addNoBreak = (text: string) => text;

export default function MessageSection() {
  const { isSP } = useBreakPoint();
  const lines = isSP
    ? messageLead
        .replace(/<spbr>/g, '\n')
        .split(/\n/)
        .map((line) => addNoBreak(line.trim()))
    : messageLead
        .replace(/<spbr>/g, '')
        .split(/\n/)
        .map((line) => addNoBreak(line.trim()));
  const setHeadingRef = useFadeInOnScroll(0.9); // 見出し用
  const setLineRef = useFadeInOnScroll(0.01); // 本文用

  // lines配列の中身を確認
  useEffect(() => {
    console.log('lines:', lines);
  }, [lines]);

  return (
    <section
      id="message-section"
      className={css({
        background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, #fff 100%)',
        zIndex: 1,
        width: '100vw',
        padding: '16px',

        md: {
          padding: '24px',
        },
      })}
    >
      <div
        className={css({
          background: 'background',
          width: '100%',
          margin: '0 auto',
          padding: '64px 4px 80px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '40px',
          sm: { padding: '80px 24px 96px' },
          md: {
            padding: '96px 80px 120px',
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
          {/* Catch copy */}
          <h2
            ref={setHeadingRef}
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
                fontSize: 'clamp(1.4rem, 3vw, 4.5rem)',
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

          {/* Lead lines */}
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
              line.trim() === '' ? (
                <div
                  key={`empty-${i}`}
                  style={{ height: '1.5em', minHeight: '3em' }}
                  ref={setLineRef}
                />
              ) : (
                <div
                  key={`line-${i}`}
                  ref={setLineRef}
                  style={{ opacity: 0, transform: 'translateY(20px)' }}
                  className={css({
                    fontFamily: 'Noto Serif JP, serif',
                    fontWeight: 500,
                    lineHeight: 2.4,
                    color: '#444',
                    textAlign: 'left',
                    fontSize: '0.8rem',
                    whiteSpace: 'normal', // ← 自動折り返し
                    lineBreak: 'strict',
                    wordBreak: 'keep-all',
                    overflowWrap: 'break-word', // 長い英単語だけ分割。句読点だけの行を防ぐ
                    xs: {
                      fontSize: 'clamp(0.9rem, 1.6vw, 2rem)',
                    },
                  })}
                  dangerouslySetInnerHTML={{ __html: line }}
                />
              )
            )}
          </div>
        </div>
      </div>
      <style jsx global>{`
        .nb {
          white-space: nowrap;
        }
      `}</style>
    </section>
  );
}
