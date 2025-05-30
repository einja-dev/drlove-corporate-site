'use client';
import { useFadeInOnScroll } from '@/app/hooks/useFadeInOnScroll';
import { useWindowSize } from '@/app/hooks/useWindowSize';
import { css } from '@/styled-system/css';
import Image from 'next/image';

const messageCatchEn = 'Bloom from pain.';
const messageCatchJp = '痛みから咲く。';

const messageLead = `人生はいつも思い通りじゃない、<spbr>傷つくことも泣きたい夜もある。
でもあなたの物語はあなたが主役。
笑えない日々を超えて<spbr>笑顔で立ち上がったその瞬間にこそ、<spbr>本当の愛と幸せがあなたを抱きしめに来る。

現代の日本には、
精神疾患、虐待、依存、孤独、そして自殺など、<spbr>深刻な社会課題が数多く存在しています。
私たちは、それらの多くが「人とのすれ違い」<spbr>から生まれていると考えています。

Dr.Loveは、<spbr><strong>"1人で抱え込まない社会作り"</strong>をビジョンに掲げ、
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

const wbrText = css({
  fontFamily: 'Noto Serif JP, serif',
  fontWeight: 500,
  lineHeight: 2.4,
  color: '#444',
  textAlign: 'left',
  fontSize: 'clamp(0.8rem, 3vw, 1.2rem)',
  whiteSpace: 'normal',
  lineBreak: 'strict',
  wordBreak: 'keep-all',
  overflowWrap: 'break-word',
  xs: {
    fontSize: 'clamp(0.9rem, 1.45vw, 1.5rem)',
  },
});

export default function MessageSection() {
  const { sizeTypeLessThan } = useWindowSize();
  const lines = sizeTypeLessThan('xs')
    ? messageLead
        .replace(/<spbr>/g, '\n')
        .replace(/<wbr>/g, '\u200B')
        .split(/\n/)
        .map((line) => addNoBreak(line.trim()))
    : messageLead
        .replace(/<spbr>/g, '')
        .replace(/<wbr>/g, '\u200B')
        .split(/\n/)
        .map((line) => addNoBreak(line.trim()));
  const setHeadingRef = useFadeInOnScroll(0.9); // 見出し用
  const setLineRef = useFadeInOnScroll(0.01); // 本文用

  return (
    <section
      id="message-section"
      className={css({
        background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, #fff 100%)',
        zIndex: 10,
        position: 'relative',
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
          padding: '64px 4px 64px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '32px 32px 0 0',
          sm: { padding: '80px 24px' },
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
            maxWidth: '1440px',
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
              lineHeight: 1.8,
              fontSize: '28px',
              color: '#444',
              textAlign: 'left',
              marginBottom: '16px',
              xs: {
                fontSize: 'clamp(1.5rem, 4vw, 4rem)',
              },
              md: {
                fontSize: 'clamp(1.4rem, 3.4vw, 4.5rem)',
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
                  width: '270px',
                  height: '100%',
                  top: '-10px',
                  left: '-4px',
                  xs: {
                    top: '20px',
                    left: '-2px',
                    width: '100%',
                  },
                  md: {
                    left: '-4px',
                    top: '24px',
                  },
                  lg: {
                    left: '0',
                    top: '32px',
                  },
                  xl: {
                    left: '0',
                    top: '40px',
                  },
                })}
              >
                <Image
                  src="/top/message/watercolor-bg.png"
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
                  whiteSpace: sizeTypeLessThan('xs') ? undefined : 'nowrap',
                })}
              >
                {sizeTypeLessThan('xs') ? (
                  <>
                    <span>{messageCatchEn}</span>
                    <br />
                    <span>{messageCatchJp}</span>
                  </>
                ) : (
                  <span>{`${messageCatchEn} ${messageCatchJp}`}</span>
                )}
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
                  style={{ height: '0.7em', minHeight: '1.5em' }}
                  ref={setLineRef}
                />
              ) : (
                <div
                  key={`line-${i}`}
                  ref={setLineRef}
                  style={{ opacity: 0, transform: 'translateY(20px)' }}
                  className={wbrText}
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
