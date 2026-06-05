"use client";

import React from 'react';
import '../i18n'; // Initialize i18n client-side
import { WalletWrapper } from '../components/web3/WalletWrapper';
import { PageLayout } from '../components/layout/PageLayout';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export function ClientProviders({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  return (
    <WalletWrapper>
      <PageLayout>
        <Navbar />
        {children}
        <Footer />
      </PageLayout>
    </WalletWrapper>
  );
}
