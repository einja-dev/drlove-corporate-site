import type { PropsWithChildren } from 'react';
import LenisProvider from './components/LenisProvider';
import { WindowSizeProvider } from './hooks/useWindowSize';

export function Providers({ children }: PropsWithChildren) {
  return (
    <LenisProvider>
      <WindowSizeProvider>{children}</WindowSizeProvider>
    </LenisProvider>
  );
}
