"use client";

import React from 'react';
import '../i18n'; // Initialize i18n client-side
import { WalletWrapper } from '../components/web3/WalletWrapper';
import { PageLayout } from '../components/layout/PageLayout';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export function ClientProviders({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = React.useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <WalletWrapper>
      <PageLayout>
        <Navbar isDark={isDark} toggleTheme={toggleTheme} />
        {children}
        <Footer />
      </PageLayout>
    </WalletWrapper>
  );
}
