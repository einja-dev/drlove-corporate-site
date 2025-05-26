import { css } from '@/styled-system/css';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
  gradText?: boolean;
  borderRadiusType?: 'default' | 'special';
  size?: 'default' | 'small' | 'large';
  gradientBorder?: boolean;
};

const primaryButtonBaseStyle = css({
  position: 'relative',
  border: 'none',
  borderRadius: '50px',
  background: '#fff',
  color: '#FF749D',
  fontFamily: "'M PLUS 1p', 'M+ 1p', sans-serif",
  fontWeight: 700,
  fontSize: '15px',
  padding: '6px 24px',
  zIndex: 1,
  cursor: 'pointer',
  overflow: 'hidden',
  _before: {
    content: '""',
    position: 'absolute',
    inset: 0,
    borderRadius: '50px',
    padding: '1.5px',
    background: 'linear-gradient(90deg, #FF749D 0%, #FFB374 100%)',
    mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)' as unknown as string,
    maskComposite: 'exclude' as unknown as string,
    WebkitMask:
      'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)' as unknown as string,
    WebkitMaskComposite: 'xor' as unknown as string,
    pointerEvents: 'none',
    zIndex: 0,
  },
});

const primaryButtonLargeStyle = css({
  fontSize: '20px',
  padding: '16px 48px',
  '@media (max-width: 767px)': {
    fontSize: '16px',
    padding: '10px 28px',
  },
});

export const primaryButtonTextStyle = css({
  backgroundImage: 'linear-gradient(90deg, #FF749D 0%, #FFB374 100%)',
  backgroundClip: 'text' as unknown as string,
  color: 'transparent' as unknown as string,
  display: 'inline-block',
  fontWeight: 700,
  fontSize: '16px',
  position: 'relative',
  top: '1px',

  lg: {
    fontSize: '20px',
  },
  '.large &': {
    fontSize: '24px',
    lg: {
      fontSize: '28px',
    },
    '@media (max-width: 767px)': {
      fontSize: '16px',
    },
  },
});

export function PrimaryButton({
  children,
  gradText,
  borderRadiusType,
  size = 'default',
  ...props
}: Props) {
  const classNames = [primaryButtonBaseStyle];
  if (size === 'large') classNames.push(primaryButtonLargeStyle);
  if (size === 'large') classNames.push('large');
  return (
    <button className={classNames.join(' ')} {...props}>
      <span className={primaryButtonTextStyle}>{children}</span>
    </button>
  );
}
