import { css, cx } from '@/styled-system/css';
import Image from 'next/image';
import type React from 'react';
import { useRef, useState } from 'react';
import type { MemberCardType } from './MemberCardType';

export type FlippableMemberCardProps = {
  card: MemberCardType;
  variant: 'main' | 'sub';
  refObj?: React.Ref<HTMLDivElement>;
  className?: string;
};

const mainStyles = {
  name: (color: string) =>
    css({
      color,
      fontFamily: 'Noto Serif JP',
      fontWeight: '700',
      fontSize: '20px',
      md: { fontSize: '24px' },
    }),
  nameEn: (color: string) =>
    css({
      color,
      fontSize: '14px',
      fontWeight: '700',
      md: { fontSize: '16px' },
    }),
  desc: css({ color: '#444', fontSize: '16px', lineHeight: '1.8' }),
  textWrap: css({
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '100%',
    justifyContent: 'center',
  }),
  imgWrapper: css({
    position: 'relative',
    aspectRatio: '4 / 3',
    zIndex: 1,
    width: 'clamp(300px, 130%, 500px)',
    right: '-10%',
    sm: {
      position: 'absolute',
      width: 'clamp(400px, 67%, 600px)',
      right: '-23%',
      bottom: '0',
      margin: 0,
    },
    md: {
      width: 'clamp(400px, 60%, 600px)',
      aspectRatio: '6 / 5',
      right: '-20%',
    },
  }),
  img: css({
    width: '100%',
    height: 'auto',
    borderRadius: '24px',
    objectFit: 'cover',
  }),
  bg: css({
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
    objectFit: 'cover',
  }),
};

const subStyles = {
  name: (color: string) =>
    css({
      color,
      fontFamily: 'Noto Serif JP',
      fontWeight: '700',
      fontSize: '20px',
      md: { fontSize: '24px' },
    }),
  nameEn: (color: string) =>
    css({
      color,
      fontSize: '14px',
      fontWeight: '700',
      md: { fontSize: '16px' },
    }),
  desc: css({
    color: '#444',
    fontFamily: 'M+ 1m',
    fontSize: '15px',
    lineHeight: '1.8',
    marginBottom: '16px',
    zIndex: 2,
  }),
  textWrap: css({ display: 'flex', gap: '8px', alignItems: 'center' }),
  imgWrapper: css({
    position: 'relative',
    aspectRatio: '4 / 3',
    width: 'clamp(300px, 100%, 459px)',
    zIndex: 3,
    overflow: 'hidden',
    display: 'block',
    height: '100%',
    right: '-6%',
  }),
  img: css({ width: '100%', height: '100%', objectFit: 'cover' }),
  bg: css({
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
    objectFit: 'cover',
  }),
};

const cardContainer = css({
  perspective: '1200px',
  width: '100%',
  position: 'relative',
});
const cardInner = css({
  display: 'grid',
  width: '100%',
  position: 'relative',
});
const cardFace = css({
  gridArea: '1/1/2/2',
  backfaceVisibility: 'hidden',
  borderRadius: '24px',
  overflow: 'hidden',
  transition: 'transform 0.7s cubic-bezier(0.4,0.2,0.2,1)',
  transform: 'rotateY(0deg)',
});
const cardBack = css({
  gridArea: '1/1/2/2',
  backfaceVisibility: 'hidden',
  borderRadius: '24px',
  overflow: 'hidden',
  transition: 'transform 0.7s cubic-bezier(0.4,0.2,0.2,1)',
  transform: 'rotateY(180deg)',
});

export const FlippableMemberCard: React.FC<FlippableMemberCardProps> = ({
  card,
  variant,
  refObj,
  className,
}) => {
  const [flipped, setFlipped] = useState(false);
  const innerRef = useRef<HTMLDivElement>(null);

  const styles = variant === 'main' ? mainStyles : subStyles;
  const color = card.color || (variant === 'main' ? '#FF8A5C' : '#4EE06A');

  const handleFlip = () => {
    setFlipped((prev) => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleFlip();
    }
  };

  const variantStyle = css(
    variant === 'main'
      ? {
          boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
          borderRadius: '24px',
          background: 'none',
          padding: '40px 24px 0',
          sm: { padding: '48px 40px' },
          lg: { padding: '60px 64px' },
        }
      : {
          boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
          borderRadius: '24px',
          background: 'none',
          padding: '48px 24px 0',
          gap: '16px',
          sm: { padding: '48px 40px 0' },
          lg: { padding: '60px 64px 0' },
        }
  );

  return (
    <div
      className={cx(cardContainer, className)}
      ref={refObj}
      onClick={handleFlip}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      style={{ cursor: 'pointer' }}
      role="button"
      aria-pressed={flipped}
      aria-label="メンバーカードを裏返す"
    >
      <div className={cardInner} ref={innerRef}>
        {/* 表面 */}
        <div
          className={cx(cardFace, variantStyle)}
          style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
        >
          <Image src={card.bgImage} alt="bg" fill className={styles.bg} />
          <div className={styles.textWrap}>
            <div>
              <span className={styles.name(color)} style={{ color: card.mainColor || color }}>
                {card.name}
              </span>
              <span className={styles.nameEn(color)} style={{ color: card.mainColor || color }}>
                - {card.nameEn} -
              </span>
            </div>
            <div className={styles.desc}>{card.desc}</div>
          </div>
          <div className={styles.imgWrapper}>
            <Image
              src={card.image}
              alt={card.imageAlt}
              fill
              className={styles.img}
              style={{ objectFit: 'cover', objectPosition: 'top', width: '100%', height: '100%' }}
            />
          </div>
        </div>
        {/* 裏面 */}
        <div
          className={cx(cardBack, variantStyle)}
          style={{ transform: flipped ? 'rotateY(0deg)' : 'rotateY(180deg)' }}
        >
          <Image src={card.bgImage} alt="bg" fill className={styles.bg} />
          <div className={styles.textWrap}>
            <div>
              <span className={styles.name(color)} style={{ color: card.mainColor || color }}>
                {card.name}
              </span>
              <span className={styles.nameEn(color)} style={{ color: card.mainColor || color }}>
                - {card.nameEn} -
              </span>
            </div>
            <div className={styles.desc}>{card.backDesc}</div>
          </div>
          <div className={styles.imgWrapper}>
            <Image
              src={card.backImage}
              alt={`${card.imageAlt}（裏面）`}
              fill
              className={styles.img}
              style={{ objectFit: 'cover', objectPosition: 'top', width: '100%', height: '100%' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
