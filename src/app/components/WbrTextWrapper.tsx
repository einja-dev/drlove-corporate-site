'use client';
import React from 'react';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
};

export const WbrTextWrapper = React.forwardRef<HTMLDivElement, Props>(
  ({ className, ...rest }, ref) => {
    const mergedClass = [className, 'wbrText'].filter(Boolean).join(' ');
    return <div ref={ref} className={mergedClass} {...rest} />;
  }
);
WbrTextWrapper.displayName = 'WbrTextWrapper';
