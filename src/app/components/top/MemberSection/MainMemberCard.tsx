import { css, cx } from '@/styled-system/css';
import Image from 'next/image';
import type React from 'react';
import type { MemberCardType } from './MemberCardType';

type Props = {
  card: MemberCardType;
  refObj?: React.Ref<HTMLDivElement>;
  className?: string;
};

const nameStyle = (color: string) =>
  css({
    color,
    fontFamily: 'Noto Serif JP',
    fontWeight: '700',
    fontSize: '20px',
    md: {
      fontSize: '24px',
    },
  });
const nameEnStyle = (color: string) =>
  css({
    color,
    fontSize: '14px',
    fontWeight: '700',
    md: {
      fontSize: '16px',
    },
  });
const mainDescStyle = css({
  color: '#444',
  fontSize: '16px',
  lineHeight: '1.8',
});
const mainTextWrap = css({
  position: 'relative',
  zIndex: 2,
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  width: '100%',
  justifyContent: 'center',
});
const mainImgWrapper = css({
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
});
const mainImgStyle = css({
  width: '100%',
  height: 'auto',
  borderRadius: '24px',
  objectFit: 'cover',
});
const mainBgStyle = css({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  zIndex: 0,
  objectFit: 'cover',
});

export const MainMemberCard: React.FC<Props> = ({ card, refObj, className }) => {
  return (
    <div className={cx(className)} ref={refObj}>
      <Image src={card.bgImage!} alt="bg" fill className={mainBgStyle} />
      <div className={mainTextWrap}>
        <div>
          <span
            className={nameStyle(card.color || '#FF8A5C')}
            style={{ color: card.mainColor || '#FF8A5C' }}
          >
            {card.name}
          </span>
          <span
            className={nameEnStyle(card.color || '#FF8A5C')}
            style={{ color: card.mainColor || '#FF8A5C' }}
          >
            - {card.nameEn} -
          </span>
        </div>
        <pre className={mainDescStyle}>{card.desc}</pre>
      </div>
      <div className={mainImgWrapper}>
        <Image
          src={card.image}
          alt={card.imageAlt}
          fill
          className={mainImgStyle}
          style={{ objectFit: 'cover', objectPosition: 'top', width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
};
