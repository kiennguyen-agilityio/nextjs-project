import type { ReactNode } from 'react';

// components
import Spinner from '@/components/common/Spinner';

type ButtonProps = {
  children: ReactNode;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  type?: 'button' | 'submit';
  variant?:
    | 'outline'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning';
  customClass?: string;
  name?: string;
  value?: string;
  ariaLabel?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
};

export const Button = ({
  children,
  startIcon,
  endIcon,
  type = 'button',
  variant = 'primary',
  customClass = '',
  name,
  value,
  ariaLabel = 'button',
  disabled = false,
  loading = false,
  onClick,
}: ButtonProps): JSX.Element => {
  const baseClass = 'flex items-center rounded p-2';

  let stateClass = '';
  let hoverClass = '';
  switch (variant) {
    case 'primary':
      stateClass = 'bg-[#4270ec] text-white';
      hoverClass = 'hover:bg-blue-600';
      break;
    case 'secondary':
      stateClass = 'bg-white text-[#62656e]';
      hoverClass = 'hover:bg-gray-300';
      break;
    case 'success':
      stateClass = 'bg-green-600 text-white';
      hoverClass = 'hover:bg-green-700';
      break;
    case 'warning':
      stateClass = 'bg-amber-400 text-black';
      hoverClass = 'hover:bg-amber-500';
      break;
    case 'error':
      stateClass = 'bg-rose-500 text-white';
      hoverClass = 'hover:bg-rose-600';
      break;
    case 'outline':
      stateClass = 'border border-gray-200 dark:border-gray-700';
      hoverClass = 'hover:bg-gray-100';
      break;
    default:
      break;
  }

  const disabledClass =
    disabled || loading
      ? 'hover:cursor-not-allowed hover:opacity-70'
      : hoverClass;

  return (
    <button
      type={type}
      name={name}
      value={value}
      aria-label={ariaLabel}
      className={`${baseClass} ${stateClass} ${disabledClass} ${customClass}`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {startIcon && !loading && <span className="mr-2">{startIcon}</span>}
      {loading && <Spinner />}
      {loading ? <span className="ml-2">{children}</span> : children}
      {endIcon && !loading && <span className="ml-2">{endIcon}</span>}
    </button>
  );
};

export default Button;
