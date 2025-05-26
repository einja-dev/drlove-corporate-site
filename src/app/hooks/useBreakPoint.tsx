import { breakpoints, useWindowSize } from './useWindowSize';

export const useBreakPoint = () => {
  const { width } = useWindowSize();
  return {
    isSP: (width ?? 0) < breakpoints.sm,
  };
};
