"use client";

import dynamic from 'next/dynamic';
import React from 'react';

const ClientProviders = dynamic(
  () => import('./ClientProviders').then((mod) => mod.ClientProviders),
  { ssr: false }
);

export function ClientProvidersWrapper({ children }: { children: React.ReactNode }) {
  return <ClientProviders>{children}</ClientProviders>;
}
