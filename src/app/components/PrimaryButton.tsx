import { css } from '@/styled-system/css';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
  gradText?: boolean;
  borderRadiusType?: 'default' | 'special';
  size?: 'default' | 'small';
};

export function PrimaryButton({
  children,
  variant = 'primary',
  gradText = false,
  borderRadiusType = 'default',
  size = 'default',
  ...props
}: Props) {
  const style = css({
    display: 'inline-block',
    fontFamily: 'M+ 1m',
    fontWeight: 700,
    fontSize: size === 'small' ? '15px' : '20px',
    lineHeight: '1.5',
    padding: size === 'small' ? '10px 24px' : '20px 48px',
    border: 'none',
    borderRadius: borderRadiusType === 'special' ? '24px 8px 24px 8px' : '32px',
    background: variant === 'primary' ? 'linear-gradient(90deg, #FF749D 0%, #FFB374 100%)' : '#fff',
    color: variant === 'primary' ? '#fff' : '#FF749D',
    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
    textAlign: 'center',
    margin: '0 auto',
    _hover: {
      opacity: 0.85,
    },
  });

  return (
    <button className={style} {...props}>
      {gradText ? (
        <span
          style={{
            backgroundImage: 'linear-gradient(90deg, #FF749D 0%, #FFB374 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block',
          }}
        >
          {children}
        </span>
      ) : (
        children
      )}
    </button>
  );
}
