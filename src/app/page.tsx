import CompanyLogoSection from './components/CompanyLogoSection';
import CompanySection from './components/CompanySection';
import ContentLinkSection from './components/ContentLinkSection';
import GallerySection from './components/GallerySection';
import HeroSection from './components/HeroSection';
import MemberSection from './components/MemberSection';
import MessageSection from './components/MessageSection';
import NewsSection from './components/NewsSection';
import OurServiceSection from './components/OurServiceSection';
import RecruitSection from './components/RecruitSection';

export default function Home() {
  return (
    <>
      <HeroSection />
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
