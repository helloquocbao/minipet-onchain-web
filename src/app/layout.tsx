import type { Metadata } from 'next';
import React from 'react';
import '../index.css';

export const metadata: Metadata = {
  title: 'MiniPet - Your Cute Desktop Pixel Companion',
  description: 'MiniPet is a lightweight desktop app that brings cute pixel friends to your workspace. Boost productivity with Pomodoro and enjoy interactive desktop pets.',
  keywords: 'minipet, minipets, mini pet, mini pets, mini pet app, mini pet apps, virtual pet, qbao, desktop pet, pixel pet, pomodoro timer, desktop companion, screen pet, interactive pet, minipet official, minipet website',
  robots: 'index, follow, max-image-preview:large',
  alternates: {
    canonical: 'https://onchain.minipet.xyz',
    languages: {
      'en': 'https://onchain.minipet.xyz/?lang=en',
      'vi': 'https://onchain.minipet.xyz/?lang=vi',
      'zh': 'https://onchain.minipet.xyz/?lang=zh',
      'fr': 'https://onchain.minipet.xyz/?lang=fr',
      'it': 'https://onchain.minipet.xyz/?lang=it',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://onchain.minipet.xyz',
    title: 'MiniPet - Your Cute Desktop Pixel Companion',
    description: 'MiniPet is a lightweight desktop app that brings cute pixel friends to your workspace.',
    images: [
      {
        url: 'https://onchain.minipet.xyz/icons/icon.png',
        width: 512,
        height: 512,
        alt: 'MiniPet Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MiniPet - Your Cute Desktop Pixel Companion',
    description: 'MiniPet is a lightweight desktop app that brings cute pixel friends to your workspace.',
    images: ['https://onchain.minipet.xyz/icons/icon.png'],
  },
};

import { ClientProvidersWrapper } from './ClientProvidersWrapper';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;800;900&display=swap" rel="stylesheet" />
        <link rel="preload" href="/cat/spritesheet.webp" as="image" />
        <link rel="preload" href="/icons/icon.png" as="image" />
      </head>
      <body className="antialiased">
        <ClientProvidersWrapper>
          {children}
        </ClientProvidersWrapper>
      </body>
    </html>
  );
}
