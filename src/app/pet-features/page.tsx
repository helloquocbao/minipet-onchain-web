import React from 'react';
import type { Metadata } from 'next';
import { Hero } from '../../components/home/Hero';
import { Features } from '../../components/home/Features';
import { DownloadSection } from '../../components/home/DownloadSection';
import { AnimatorPlayground } from '../../components/pet-features/AnimatorPlayground';
import { InteractionGuide } from '../../components/pet-features/InteractionGuide';

export const metadata: Metadata = {
  title: 'MiniPet Features - Interactive AI Companions & Pomodoro Focus Timer',
  description: 'Discover the capabilities of MiniPet: smart AI chat companions, Pomodoro focus timer, drag-to-delete system, multi-pet playground, and customized Sui pet NFTs.',
  keywords: 'minipet features, desktop pet, desktop cat companion, pomodoro timer, ai companion app, sui nft pet, pixel art animator',
};

export default function PetFeaturesPage() {
  return (
    <div className="pt-20 pb-20 min-h-screen bg-transparent relative overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-indigo-200/10 dark:bg-indigo-900/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-pink-200/10 dark:bg-pink-900/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <Hero />

      <div className="container mx-auto px-4 max-w-6xl relative my-16">
        {/* Animator Playground & Interaction Steps Guide */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <AnimatorPlayground />
          <InteractionGuide />
        </div>
      </div>

      <Features />
      <DownloadSection />
    </div>
  );
}
