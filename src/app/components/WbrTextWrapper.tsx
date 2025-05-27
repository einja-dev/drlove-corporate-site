'use client';
import { css } from '@/styled-system/css';
import React from 'react';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
};

export const WbrTextWrapper = React.forwardRef<HTMLDivElement, Props>(
  ({ className, ...rest }, ref) => {
    const mergedClass = [
      css({
        lineHeight: '2',
        wordBreak: 'keep-all',
        whiteSpace: 'normal',
        lineBreak: 'strict',
      }),
      'wbrText',
      className,
    ]
      .filter(Boolean)
      .join(' ');
    return <div ref={ref} className={mergedClass} {...rest} />;
  }
);
WbrTextWrapper.displayName = 'WbrTextWrapper';
