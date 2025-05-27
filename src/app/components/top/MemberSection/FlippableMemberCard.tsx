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

const styles = {
  name: (color: string) =>
    css({
      color,
      fontFamily: 'Noto Serif JP',
      fontWeight: '700',
      fontSize: '20px',
      zIndex: 1,
      md: { fontSize: '24px' },
    }),
  nameEn: (color: string) =>
    css({
      color,
      fontSize: '14px',
      fontWeight: '700',
      zIndex: 1,
      md: { fontSize: '16px' },
    }),
  desc: css({
    color: '#444',
    fontSize: '16px',
    lineHeight: '1.8',
    textAlign: 'left',
    marginBottom: '16px',
  }),
  textWrap: css({
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  }),
  imgWrapper: css({
    position: 'relative',
    aspectRatio: '4 / 3',
    zIndex: 3,
    overflow: 'hidden',
    display: 'block',
    width: '100%',
    maxWidth: '480px',
    height: 'auto',
    margin: '0 auto',
    right: '-6%',
  }),
  img: css({
    width: '100%',
    height: 'auto',
    aspectRatio: '4 / 3',
    objectFit: 'cover',
    borderRadius: '24px',
    display: 'block',
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

const mainImageStyles = {
  imgWrapper: (isBack: boolean) =>
    css({
      position: 'relative',
      aspectRatio: '4 / 3',
      zIndex: 1,
      width: isBack ? 'clamp(300px, 120%, 560px)' : 'clamp(300px, 120%, 560px)',
      right: isBack ? '-8%' : '-20%',
      sm: {
        position: 'absolute',
        width: isBack ? 'clamp(400px, 60%, 600px)' : 'clamp(400px, 67%, 600px)',
        right: isBack ? '-12%' : '-20%',
        bottom: '0',
        margin: 0,
      },
      md: {
        width: isBack ? 'clamp(400px, 55%, 580px)' : 'clamp(400px, 60%, 600px)',
        aspectRatio: '6 / 5',
        right: isBack ? '-12%' : '-20%',
      },
    }),
  img: css({
    width: '100%',
    height: 'auto',
    borderRadius: '24px',
    objectFit: 'cover',
  }),
};

const cardContainer = css({
  perspective: '1200px',
  width: '100%',
  position: 'relative',
  borderRadius: '24px',
});
const cardInner = css({
  display: 'grid',
  width: '100%',
  position: 'relative',
});
const cardCommon = (isMain: boolean) =>
  css({
    borderRadius: '24px',
    overflow: 'hidden',
    transition: 'transform 0.7s cubic-bezier(0.4,0.2,0.2,1)',
    background: 'none',
    boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
    padding: {
      base: '40px 24px 0 24px',
      sm: isMain ? '48px 24px 40px 24px' : '48px 24px 0 24px',
      lg: isMain ? '60px 48px 40px 48px' : '60px 48px 0 48px',
    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  });
const cardFaceClass = (isBack: boolean, isMain: boolean) =>
  css({
    gridArea: '1/1/2/2',
    backfaceVisibility: 'hidden',
    transform: isBack ? 'rotateY(180deg)' : 'rotateY(0deg)',
  });

export const FlippableMemberCard: React.FC<FlippableMemberCardProps> = ({
  card,
  variant,
  refObj,
  className,
}) => {
  const [flipped, setFlipped] = useState(false);
  const innerRef = useRef<HTMLDivElement>(null);

  const isMain = variant === 'main';
  const color = card.mainColor || card.color || '#FF8A5C';
  const imgWrapperClassFace = isMain ? mainImageStyles.imgWrapper(false) : styles.imgWrapper;
  const imgWrapperClassBack = isMain ? mainImageStyles.imgWrapper(true) : styles.imgWrapper;
  const imgClass = isMain ? mainImageStyles.img : styles.img;

  const handleFlip = () => {
    setFlipped((prev) => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleFlip();
    }
  };

  return (
    <button
      type="button"
      className={cx(cardContainer, className)}
      ref={refObj as React.Ref<HTMLButtonElement>}
      onClick={handleFlip}
      onKeyDown={handleKeyDown}
      style={{ cursor: 'pointer' }}
      aria-pressed={flipped}
      aria-label="メンバーカードを裏返す"
    >
      <div className={cardInner} ref={innerRef}>
        {/* 表面 */}
        <div
          className={cx(cardCommon(isMain), cardFaceClass(false, isMain))}
          style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
        >
          <Image src={card.bgImage} alt="bg" fill className={styles.bg} />
          <div className={styles.textWrap}>
            <div className={css({ display: 'flex', alignItems: 'center', gap: '4px', zIndex: 1 })}>
              <span className={styles.name(color)}>{card.name}</span>
              <span className={styles.nameEn(color)}>- {card.nameEn} -</span>
            </div>
            <div className={styles.desc}>{card.desc}</div>
          </div>
          <div className={cx(imgWrapperClassFace, card.imageWrapperClassName)}>
            <Image
              src={card.image}
              alt={card.imageAlt}
              fill
              className={imgClass}
              style={{ objectFit: 'cover', objectPosition: 'top', width: '100%', height: '100%' }}
            />
          </div>
        </div>
        {/* 裏面 */}
        <div
          className={cx(cardCommon(isMain), cardFaceClass(true, isMain))}
          style={{ transform: flipped ? 'rotateY(0deg)' : 'rotateY(180deg)' }}
        >
          <Image src={card.bgImage} alt="bg" fill className={styles.bg} />
          <div className={styles.textWrap}>
            <div className={css({ display: 'flex', alignItems: 'center', gap: '4px', zIndex: 1 })}>
              <span className={styles.name(color)}>{card.name}</span>
              <span className={styles.nameEn(color)}>- {card.nameEn} -</span>
            </div>
            <div className={styles.desc}>{card.backDesc}</div>
          </div>
          <div className={cx(imgWrapperClassBack, card.backImageWrapperClassName)}>
            <Image
              src={card.backImage}
              alt={`${card.imageAlt}（裏面）`}
              fill
              className={imgClass}
              style={{ objectFit: 'cover', objectPosition: 'top', width: '100%', height: '100%' }}
            />
          </div>
        </div>
      </div>
    </button>
  );
};
