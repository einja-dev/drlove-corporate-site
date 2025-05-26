'use client';
import { useUserAgent } from '@/app/hooks/useUserAgent';
import React from 'react';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
};

export const WbrTextWrapper = React.forwardRef<HTMLDivElement, Props>(
  ({ className, ...rest }, ref) => {
    const { isIosSafari } = useUserAgent();
    const mergedClass = isIosSafari ? [className, 'wbrText'].filter(Boolean).join(' ') : className;
    return <div ref={ref} className={mergedClass} {...rest} />;
  }
);
WbrTextWrapper.displayName = 'WbrTextWrapper';
