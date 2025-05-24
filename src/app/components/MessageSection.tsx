import Image from 'next/image';
import { css } from '../../../styled-system/css';

export default function MessageSection() {
  return (
    <section
      className={css({
        background: '#fff',
        width: '100%',
        maxWidth: '1536px',
        margin: '0 auto',
        padding: '40px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        md: {
          padding: '80px',
          gap: '48px',
        },
      })}
    >
      {/* コンテンツラッパー */}
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
              心にもうひとり、味方のいる日常へ。
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
          <p
            className={css({
              maxWidth: '100%',
              fontFamily: 'Noto Serif JP, serif',
              fontWeight: 500,
              lineHeight: 2.4,
              color: '#444',
              textAlign: 'left',
              fontSize: 'clamp(0.9rem, 1.2vw, 2rem)',
              md: {
                maxWidth: '68%',
              },
            })}
          >
            心の悩みも、見た目の悩みも、言葉にできずに抱え込んでしまう。
            <br />
            ライフステージによっても、その悩みは形を変えながら我々に付き纏います。
            <br />
            恋愛、職場、人間関係、自分自身との向き合い。
            <br />
            現代人の多くが、「誰にも言えないモヤモヤ」を抱えて生きています。
            <br />
            <br />
            心の奥の感情を言語化
            <br />
            あなたが前に進むための「言葉」「行動」「外見」
            <br />
            <br />
            アナタに寄り添い愛をもたらす
          </p>
        </div>
      </div>
    </section>
  );
}
