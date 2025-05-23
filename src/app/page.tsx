import { css } from '../../styled-system/css';
import CompanyLogoSection from './components/CompanyLogoSection';
import CompanySection from './components/CompanySection';
import ContentLinkSection from './components/ContentLinkSection';
import FooterSection from './components/FooterSection';
import GallerySection from './components/GallerySection';
import HeaderSection from './components/HeaderSection';
import HeroSection from './components/HeroSection';
import MemberSection from './components/MemberSection';
import MessageSection from './components/MessageSection';
import NewsSection from './components/NewsSection';
import OurServiceSection from './components/OurServiceSection';
import RecruitSection from './components/RecruitSection';

const mainContainer = css({
  width: '100%',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: '#fff',
});

const contentWrapper = css({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0',
});

export default function Home() {
  return (
    <div className={mainContainer}>
      <HeaderSection />
      <main className={contentWrapper}>
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
      </main>
      <FooterSection />
    </div>
  );
}
