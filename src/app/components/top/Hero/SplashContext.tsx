import { createContext, useContext } from 'react';

export const SplashContext = createContext<{
  splashCompleted: boolean;
  setSplashCompleted: (v: boolean) => void;
}>({
  splashCompleted: false,
  setSplashCompleted: () => {},
});

export const useSplashCompleted = () => useContext(SplashContext);
