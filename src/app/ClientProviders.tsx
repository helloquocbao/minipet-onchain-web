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

  // Pre-warm / awaken the Render free backend service silently on startup
  React.useEffect(() => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:10000';
    console.log('[Pre-warm] Waking up backend service at:', backendUrl);
    fetch(`${backendUrl}/health`)
      .then(res => res.json())
      .then(data => console.log('[Pre-warm] Backend is awake:', data.status))
      .catch(err => console.warn('[Pre-warm] Backend ping sent (waking up in progress...):', err.message));
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
