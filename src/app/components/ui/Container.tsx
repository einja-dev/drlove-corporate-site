import { css, cx } from '@/styled-system/css';
import type { ElementType, FC, PropsWithChildren } from 'react';

// 型定義
interface Props {
  as?: ElementType;
  maxWidth?: string;
  largeMaxWidth?: string;
  className?: string;
  noPadding?: boolean;
  id?: string;
}

export const Container: FC<PropsWithChildren<Props>> = ({
  children,
  as: CustomTag = 'div',
  maxWidth = '1200px',
  noPadding = false,
  className,
  id,
}) => (
  <CustomTag
    className={cx(
      css({
        width: '100%',
        marginRight: 'auto',
        marginLeft: 'auto',
        ...(noPadding
          ? {}
          : {
              paddingRight: '16px',
              paddingLeft: '16px',
              md: {
                paddingRight: '32px',
                paddingLeft: '32px',
              },
            }),
      }),
      className
    )}
    style={{
      maxWidth: maxWidth,
    }}
    id={id}
  >
    {children}
  </CustomTag>
);
