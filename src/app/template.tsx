import FooterSection from '@/app/components/FooterSection';
import HeaderSection from '@/app/components/HeaderSection';
import { css } from '@/styled-system/css';
import type React from 'react';

const mainContainer = css({
  width: '100%',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: '#fff',
  position: 'relative',
});

const contentWrapper = css({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0',
  marginTop: '60px',
  lg: {
    marginTop: '72px',
  },
});

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className={mainContainer}>
      <HeaderSection />
      <main className={contentWrapper}>{children}</main>
      <FooterSection />
    </div>
  );
}
