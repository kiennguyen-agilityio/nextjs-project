import { CustomClassType } from '@/types/components';

export const DisableIcon = ({ customClass = 'w-4 h-4' }: CustomClassType) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={customClass}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
    />
  </svg>
);
