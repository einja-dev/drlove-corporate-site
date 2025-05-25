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
  (
    {
      size, // デフォはトークン
      orientation = 'vertical',
      asChild = false,
      className,
      style,
      ...rest
    },
    ref
  ) => {
    /* 1) 静的側 ― 位置・flex 抑制だけクラスで */
    const staticClass = css({
      display: 'block',
      flexShrink: 0,
      width: orientation === 'horizontal' ? '1px' : '100%',
      height: orientation === 'horizontal' ? '100%' : '1px',
    });

    /* 2) 動的側 ― 高さ / 幅 を inline style で直書き */
    const dynamicStyle: Record<string, string> = { ...(style as Record<string, string>) };

    if (typeof size === 'number') {
      if (orientation === 'horizontal') dynamicStyle.width = `${size}px`;
      else dynamicStyle.height = `${size}px`;
    } else if (typeof size === 'string') {
      if (orientation === 'horizontal') dynamicStyle.width = size;
      else dynamicStyle.height = size;
    } else {
      // レスポンシブオブジェクト { base, md ... }
      for (const [bp, val] of Object.entries(size)) {
        const px = typeof val === 'number' ? `${val}px` : val;
        const prop = orientation === 'horizontal' ? 'width' : 'height';
        dynamicStyle[`--${bp}-${prop}`] = px;
      }
      // 基本高さは CSS カスタムプロパティで操作
      const baseVal = size.base;
      if (baseVal !== undefined) {
        const px = typeof baseVal === 'number' ? `${baseVal}px` : baseVal;
        if (orientation === 'horizontal') dynamicStyle.width = px;
        else dynamicStyle.height = px;
      }
    }

    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={`${staticClass} ${className ?? ''}`}
        style={dynamicStyle as React.CSSProperties}
        {...rest}
      />
    );
  }
);
Spacer.displayName = 'Spacer';
