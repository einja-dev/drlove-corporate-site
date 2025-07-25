import CompanyLogoSection from '@/app/components/CompanyLogoSection';
import CompanySection from '@/app/components/top/CompanySection';
import ContentLinkSection from '@/app/components/top/ContentLinkSection';
import GallerySection from '@/app/components/top/GallerySection';
import HeroSection from '@/app/components/top/Hero/HeroSection';
import SplashWrapper from '@/app/components/top/Hero/SplashWrapper';
import MemberSection from '@/app/components/top/MemberSection/MemberSection';
import MessageSection from '@/app/components/top/MessageSection';
import NewsSection from '@/app/components/top/NewsSection';
import OurServiceSection from '@/app/components/top/OurServiceSection';
import RecruitSection from '@/app/components/top/RecruitSection';

export default function Page() {
  return (
    <>
      <SplashWrapper>
        <HeroSection />
      </SplashWrapper>
      <MessageSection />
      <ContentLinkSection />
      <OurServiceSection />
      <CompanyLogoSection />
      <MemberSection />
      <NewsSection />
      <RecruitSection />
      <CompanySection />
      <GallerySection />
    </>
  );
}
