import { css, cx } from '@/styled-system/css';
import Image from 'next/image';
import type React from 'react';
import type { MemberCardType } from './MemberCardType';

type Props = {
  card: MemberCardType;
  refObj?: React.Ref<HTMLDivElement>;
  className?: string;
};

const subNameStyle = (color: string) =>
  css({
    color,
    fontFamily: 'Noto Serif JP',
    fontWeight: '700',
    fontSize: '20px',
    md: {
      fontSize: '24px',
    },
  });
const subNameEnStyle = (color: string) =>
  css({
    color,
    fontSize: '14px',
    fontWeight: '700',
    md: {
      fontSize: '16px',
    },
  });
const subDescStyle = css({
  color: '#444',
  fontFamily: 'M+ 1m',
  fontSize: '15px',
  lineHeight: '1.8',
  marginBottom: '16px',
  zIndex: 2,
});
const subBgStyle = css({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  zIndex: 0,
  objectFit: 'cover',
});
const imageWrapper = css({
  position: 'relative',
  aspectRatio: '4 / 3',
  width: 'clamp(300px, 100%, 459px)',
  zIndex: 3,
  overflow: 'hidden',
  display: 'block',
  height: '100%',
  right: '-6%',
});
const contentWrapClassName = css({ display: 'flex', gap: '8px', alignItems: 'center' });

export const SubMemberCard: React.FC<Props> = ({ card, refObj, className }) => {
  return (
    <div className={cx(className)} ref={refObj}>
      <Image src={card.bgImage!} alt="bg" fill className={subBgStyle} />
      <div
        className={contentWrapClassName}
        style={{ zIndex: 2, position: 'relative', width: '100%' }}
      >
        <span
          className={subNameStyle(card.color || '#4EE06A')}
          style={{ color: card.color || '#4EE06A' }}
        >
          {card.name}
        </span>
        <span
          className={subNameEnStyle(card.color || '#4EE06A')}
          style={{ color: card.color || '#4EE06A' }}
        >
          - {card.nameEn} -
        </span>
      </div>
      <div className={subDescStyle}>{card.desc}</div>
      <div className={imageWrapper}>
        <Image
          src={card.image}
          alt={card.imageAlt}
          fill
          style={{ objectFit: 'cover', objectPosition: 'top', width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
};
