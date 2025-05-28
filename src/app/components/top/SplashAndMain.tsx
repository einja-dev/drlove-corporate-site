'use client';

import CompanyLogoSection from '@/app/components/CompanyLogoSection';
import CompanySection from '@/app/components/top/CompanySection';
import ContentLinkSection from '@/app/components/top/ContentLinkSection';
import GallerySection from '@/app/components/top/GallerySection';
import HeroSection from '@/app/components/top/Hero/HeroSection';
import SplashAnimationLogoOnly from '@/app/components/top/Hero/SplashAnimationLogoOnly';
import MemberSection from '@/app/components/top/MemberSection/MemberSection';
import MessageSection from '@/app/components/top/MessageSection';
import NewsSection from '@/app/components/top/NewsSection';
import OurServiceSection from '@/app/components/top/OurServiceSection';
import RecruitSection from '@/app/components/top/RecruitSection';
import { useState } from 'react';

export default function SplashAndMain() {
  const [splashDone, setSplashDone] = useState(false);
  return (
    <>
      {/* スプラッシュは常に最前面 */}
      {!splashDone && <SplashAnimationLogoOnly onFinish={() => setSplashDone(true)} />}
      {/* HeroSection以下は常にDOMに載せておく */}
      <div
        style={{
          visibility: splashDone ? 'visible' : 'hidden',
          pointerEvents: splashDone ? 'auto' : 'none',
        }}
      >
        <HeroSection animate={true} />
        <MessageSection />
        <ContentLinkSection />
        <OurServiceSection />
        <CompanyLogoSection />
        <MemberSection />
        <NewsSection />
        <RecruitSection />
        <CompanySection />
        <GallerySection />
      </div>
    </>
  );
}
