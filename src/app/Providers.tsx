import type { PropsWithChildren } from 'react';
import { WindowSizeProvider } from './hooks/useWindowSize';

export function Providers({ children }: PropsWithChildren) {
  return <WindowSizeProvider>{children}</WindowSizeProvider>;
}
