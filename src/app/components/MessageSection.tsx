import Image from 'next/image';
import { css } from '../../../styled-system/css';

const messageCatch = 'Bloom from pain. 痛みから咲く。';

const messageLead = `人生はいつも思い通りじゃない、傷つくことも泣きたい夜もある。
でもあなたの物語はあなたが主役。
笑えない日々を超えて笑顔で立ち上がったその瞬間にこそ、本当の愛と幸せがあなたを抱きしめに来る。

現代の日本には、精神疾患、虐待、依存、孤独、そして自殺など、深刻な社会課題が数多く存在しています。
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
  return (
    <section
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
          padding: '64px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '40px',
          md: {
            padding: '80px',
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
            className={css({
              position: 'relative',
              display: 'inline-block',
              fontFamily: 'Noto Serif JP, serif',
              fontWeight: 600,
              fontSize: 'clamp(1rem, 4vw, 4rem)',
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
                  width: '100%',
                  height: '100%',
                  left: '8px',
                  top: '16px',
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

          {/* リード文 */}
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              width: '100%',
              md: {
                gap: '32px',
              },
            })}
          >
            <pre
              className={css({
                maxWidth: '100%',
                fontFamily: 'Noto Serif JP, serif',
                fontWeight: 500,
                lineHeight: 2.4,
                color: '#444',
                textAlign: 'left',
                fontSize: 'clamp(0.9rem, 1.2vw, 2rem)',
              })}
            >
              {messageLead}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
