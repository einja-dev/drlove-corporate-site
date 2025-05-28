import CompanyLogoSection from '@/app/components/CompanyLogoSection';
import CompanySection from '@/app/components/top/CompanySection';
import ContentLinkSection from '@/app/components/top/ContentLinkSection';
import GallerySection from '@/app/components/top/GallerySection';
import HeroSection2 from '@/app/components/top/Hero/HeroSection2';
import SplashWrapper2 from '@/app/components/top/Hero/SplashWrapper2';
import MemberSection from '@/app/components/top/MemberSection/MemberSection';
import MessageSection from '@/app/components/top/MessageSection';
import NewsSection from '@/app/components/top/NewsSection';
import OurServiceSection from '@/app/components/top/OurServiceSection';
import RecruitSection from '@/app/components/top/RecruitSection';

export default function Home() {
  return (
    <>
      <SplashWrapper2>
        <HeroSection2 />
      </SplashWrapper2>
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
