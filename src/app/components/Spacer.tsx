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
  ({ size, orientation = 'vertical', asChild = false, className = '', style, ...rest }, ref) => {
    // Determine if `size` is a primitive (string/number) or responsive object
    const isResponsive = typeof size === 'object';

    // dynamic class when responsive object provided
    const dynamicClass = isResponsive
      ? css(
          orientation === 'horizontal'
            ? {
                width: size,
                flexShrink: 0,
                flexBasis: size,
                display: 'inline-block',
              }
            : {
                height: size,
                flexShrink: 0,
                flexBasis: size,
                display: 'block',
              }
        )
      : '';

    // inline fallback style for primitive sizes (e.g., '32px'), or for responsive: use base value
    const inlineSizeStyle: React.CSSProperties =
      (() => {
        if (!size) return {};
        if (!isResponsive)
          return orientation === 'horizontal' ? { width: size, flexBasis: size } : { height: size, flexBasis: size };

        // responsive object: use `base` if available, else first key as inline fallback
        const obj = size as Record<string, Primitive>;
        const baseVal =
          obj.base ??
          obj.sm ??
          obj.md ??
          obj.lg ??
          obj.xl ??
          obj['2xl'] ??
          Object.values(obj)[0];

        return orientation === 'horizontal'
          ? { width: baseVal, flexBasis: baseVal }
          : { height: baseVal, flexBasis: baseVal };
      })();

    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={`${dynamicClass} ${className}`.trim()}
        style={{ ...inlineSizeStyle, ...style }}
        {...rest}
      />
    );
  }
);
Spacer.displayName = 'Spacer';
