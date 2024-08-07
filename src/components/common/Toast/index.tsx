'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// icons
import { CheckIcon } from '@/icons/Check';
import { CloseIcon } from '@/icons/CloseIcon';

// constants
import { DEFAULT_DURATION } from '@/constants/defaultValue';

type ToastProps = {
  type: 'success' | 'error';
  message: string;
  autoDismiss?: boolean;
  duration?: number;
};

const Toast = ({
  type,
  message,
  autoDismiss = true,
  duration = DEFAULT_DURATION,
}: ToastProps) => {
  const [showToast, setShowToast] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (autoDismiss) {
      const timer = setTimeout(() => {
        setShowToast(false);
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.delete('success');
        newUrl.searchParams.delete('message');
        router.push(newUrl.toString());
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [autoDismiss, duration, router]);

  if (!showToast) return null;

  const backgroundColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  return (
    <div
      className={`fixed top-5 right-5 z-50 flex items-center ${backgroundColor} text-white text-sm font-bold px-4 py-3 rounded-lg`}
      role="alert"
    >
      <span className="mr-2">
        {type === 'success' ? <CheckIcon /> : <CloseIcon />}
      </span>
      <span>{message}</span>
      <button
        onClick={() => setShowToast(false)}
        className="ml-4"
        aria-label="Close"
      >
        <svg
          className="fill-current h-6 w-6 text-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M14.348 14.849a1.2 1.2 0 01-1.697 0L10 12.199l-2.651 2.65a1.2 1.2 0 01-1.697-1.697l2.651-2.651-2.65-2.651a1.2 1.2 0 011.697-1.697L10 8.803l2.651-2.65a1.2 1.2 0 011.697 1.697L11.399 10l2.65 2.651a1.2 1.2 0 010 1.698z" />
        </svg>
      </button>
    </div>
  );
};

export default Toast;
