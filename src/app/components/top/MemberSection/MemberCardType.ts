import type React from 'react';

export type MemberCardType = {
  name: string;
  nameEn: string;
  desc: React.ReactNode;
  image: string;
  imageAlt: string;
  bgImage: string;
  mainColor?: string;
  color?: string;
  backImage: string;
  backDesc: React.ReactNode;
  imageWrapperClassName?: string;
  backImageWrapperClassName?: string;
};
