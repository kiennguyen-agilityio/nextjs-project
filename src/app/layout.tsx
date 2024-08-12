import type { Metadata } from 'next';
import { ReactNode, Suspense } from 'react';
import { Inter } from 'next/font/google';

// components
import SideNav from '@/components/SideNav';

import './globals.css';
import Template from './template';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next.js Boilerplate',
  description: 'Next.js 14+ boilerplate app',
  icons: [
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
  ],
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
          <div className="w-full flex-none md:w-64">
            <SideNav />
          </div>
          <Suspense fallback="loading...">
            <div className="flex-grow p-6 md:overflow-y-auto md:p-4">
              <Template>{children}</Template>
            </div>
          </Suspense>
        </div>
      </body>
    </html>
  );
}
