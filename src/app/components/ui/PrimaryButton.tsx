import { css } from '@/styled-system/css';

type Props = {
  children: React.ReactNode;
  size?: 'default' | 'large';
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

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
  transition: 'background 0.3s, color 0.3s',
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
    transition: 'opacity 0.3s',
  },
  _hover: {
    background: 'linear-gradient(90deg, #FF749D 0%, #FFB374 100%)',
    color: '#fff',
  },
});

const primaryButtonLargeStyle = css({
  fontSize: '16px',
  padding: '12px 20px',
  lineHeight: '1',
  md: {
    fontSize: '20px',
    padding: '20px 32px',
  },
});

export const primaryButtonTextStyle = css({
  backgroundImage: 'linear-gradient(90deg, #FF749D 0%, #FFB374 100%)',
  backgroundClip: 'text' as unknown as string,
  color: 'transparent' as unknown as string,
  display: 'inline-block',
  fontWeight: 500,
  fontSize: '16px',
  position: 'relative',
  top: '1px',
  whiteSpace: 'nowrap',
  lg: {
    fontSize: '20px',
  },
  '.large &': {
    fontSize: '20px',
    lg: {
      fontSize: '20px',
    },
    '@media (max-width: 767px)': {
      fontSize: '16px',
    },
  },
  _hover: {
    backgroundImage: 'none',
    color: '#fff',
  },
});

export function PrimaryButton({ children, size = 'default', className = '', ...props }: Props) {
  const classNames = [primaryButtonBaseStyle];
  if (size === 'large') classNames.push(primaryButtonLargeStyle);
  if (size === 'large') classNames.push('large');
  if (className) classNames.push(className);
  return (
    <button className={[...classNames, 'primary-button'].join(' ')} {...props}>
      <span className={[primaryButtonTextStyle, 'primary-button__text'].join(' ')}>{children}</span>
    </button>
  );
}
