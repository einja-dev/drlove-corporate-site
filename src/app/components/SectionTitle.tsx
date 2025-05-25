import { css } from '@/styled-system/css';

const titleWrapStyle = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const enTitleStyle = css({
  fontFamily: 'Varela Round',
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: 'clamp(2rem, 4vw, 2.5rem)',
  lineHeight: '100%',
  textAlign: 'center',
  background: 'linear-gradient(98deg, #FF749D 0%, #FFB374 100%)',
  backgroundClip: 'text',
  color: 'transparent',
  opacity: 0.3,
  display: 'inline-block',

  md: {
    fontSize: 'clamp(2rem, 4vw, 2.5rem)',
  },
});

const jpTitleStyle = css({
  fontFamily: 'M+ 1p',
  fontWeight: '500',
  fontSize: 'clamp(2em, 5vw, 3rem)',
  lineHeight: '1.5em',
  textAlign: 'center',
  backgroundImage: 'linear-gradient(90deg, #FF749D 0%, #FFB374 100%)',
  backgroundClip: 'text',
  color: 'transparent',
  display: 'inline-block',
});

export function SectionTitle({ en, jp }: { en: string; jp: string }) {
  return (
    <div className={titleWrapStyle}>
      <div
        className={enTitleStyle}
        style={{
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {en}
      </div>
      <span
        className={jpTitleStyle}
        style={{
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {jp}
      </span>
    </div>
  );
}
