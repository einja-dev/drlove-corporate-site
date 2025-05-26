import { css } from '@/styled-system/css';
import { Slot } from '@radix-ui/react-slot';
/* Spacer.tsx — css + 直書き style 併用版 */
import * as React from 'react';

type BpKey = 'base' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

type Primitive = string | number;
type ResponsiveSize = string | number | Partial<Record<BpKey, Primitive>>;

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  size: ResponsiveSize;
  orientation?: 'vertical' | 'horizontal';
  asChild?: boolean;
}

export const Spacer = React.forwardRef<HTMLDivElement, Props>(
  ({ size, orientation = 'vertical', asChild = false, className, style, ...rest }, ref) => {
    // styled-systemのcss関数でレスポンシブpropsに対応
    const dynamicClass = css(
      orientation === 'horizontal'
        ? { width: size, height: '100%', display: 'block', flexShrink: 0 }
        : { height: size, width: '100%', display: 'block', flexShrink: 0 }
    );

    const Comp = asChild ? Slot : 'div';
    return (
      <Comp ref={ref} className={`${dynamicClass} ${className ?? ''}`} style={style} {...rest} />
    );
  }
);
Spacer.displayName = 'Spacer';
