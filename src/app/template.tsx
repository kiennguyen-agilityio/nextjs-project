'use client';
import { ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import Toast from '@/components/common/Toast';

type TemplateProps = {
  children: ReactNode;
};

export default function Template({ children }: TemplateProps) {
  const searchParams = useSearchParams();
  const success = searchParams.get('success');
  const message = searchParams.get('message');

  return (
    <div>
      {success && message && (
        <div className="fixed top-5 right-5 z-50">
          <Toast
            type={success === 'true' ? 'success' : 'error'}
            message={decodeURIComponent(message)}
          />
        </div>
      )}
      {children}
    </div>
  );
}
