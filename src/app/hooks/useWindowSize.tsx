'use client';
import { debounce } from 'lodash-es';
import {
  type FC,
  type PropsWithChildren,
  createContext,
  useContext,
  useLayoutEffect,
  useState,
} from 'react';

// ブレークポイント定義
export const breakpoints = {
  '2xs': 0,
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};
export type BreakpointCode = keyof typeof breakpoints;

// Context型
interface WindowSizeContextType {
  width: number;
  height: number;
}

const WindowSizeContext = createContext<WindowSizeContextType | undefined>(undefined);

// Provider
export const WindowSizeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [size, setSize] = useState<WindowSizeContextType>({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const updateSize = (): void => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    const debounceResize = debounce(updateSize, 200);
    window.addEventListener('resize', debounceResize);
    updateSize();
    return () => window.removeEventListener('resize', debounceResize);
  }, []);

  return <WindowSizeContext.Provider value={size}>{children}</WindowSizeContext.Provider>;
};

function getWindowSizeType(width: number): BreakpointCode {
  if (width < breakpoints.xs) return '2xs';
  if (width < breakpoints.sm) return 'xs';
  if (width < breakpoints.md) return 'sm';
  if (width < breakpoints.lg) return 'md';
  if (width < breakpoints.xl) return 'lg';
  if (width < breakpoints['2xl']) return 'xl';
  return '2xl';
}
function windowSizeTypeGreaterThan(sizeType: BreakpointCode, width: number): boolean {
  return width > breakpoints[sizeType];
}
function windowSizeTypeLessThan(sizeType: BreakpointCode, width: number): boolean {
  return width <= breakpoints[sizeType];
}

export const useWindowSize = () => {
  const size = useContext(WindowSizeContext);
  const width = size?.width || 0;
  return {
    ...size,
    sizeType: size ? getWindowSizeType(size.width) : 'xs',
    sizeTypeGreaterThan: (sizeType: BreakpointCode) => windowSizeTypeGreaterThan(sizeType, width),
    sizeTypeLessThan: (sizeType: BreakpointCode) => windowSizeTypeLessThan(sizeType, width),
    isSP: width < breakpoints.sm,
  };
};
