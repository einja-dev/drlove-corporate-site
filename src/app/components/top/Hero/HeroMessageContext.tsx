import { createContext, useContext } from 'react';

export const HeroMessageContext = createContext<{
  showMessage: boolean;
  setShowMessage: (v: boolean) => void;
}>({
  showMessage: false,
  setShowMessage: () => {},
});

export const useHeroMessage = () => useContext(HeroMessageContext);
