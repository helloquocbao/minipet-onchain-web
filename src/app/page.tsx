import React from 'react';
import type { Metadata } from 'next';
import { Hero } from '../components/home/Hero';
import { Features } from '../components/home/Features';
import { DownloadSection } from '../components/home/DownloadSection';

export const metadata: Metadata = {
  title: 'MiniPet - Your Cute Desktop Pixel Companion & AI Assistant',
  description: 'MiniPet is a lightweight open-source desktop app that brings cute pixel pet friends to your workspace. Boost productivity with Pomodoro focus timers, chat with smart AI companions, and enjoy web3 integration on Sui.',
  keywords: 'minipet, desktop pet app, pixel pet, pomodoro timer, virtual companion, sui blockchain, web3 nft pet, desktop cat companion',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <DownloadSection />
    </>
  );
}
