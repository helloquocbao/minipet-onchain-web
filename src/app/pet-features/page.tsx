import React from 'react';
import type { Metadata } from 'next';
import { AnimatorPlayground } from '../../components/pet-features/AnimatorPlayground';
import { InteractionGuide } from '../../components/pet-features/InteractionGuide';
import { DetailedFeatures } from '../../components/pet-features/DetailedFeatures';

export const metadata: Metadata = {
  title: 'MiniPet Features - Interactive AI Companions & Pomodoro Focus Timer',
  description: 'Discover the capabilities of MiniPet: smart AI chat companions, Pomodoro focus timer, drag-to-delete system, multi-pet playground, and customized Sui pet NFTs.',
  keywords: 'minipet features, desktop pet, desktop cat companion, pomodoro timer, ai companion app, sui nft pet, pixel art animator',
};

export default function PetFeaturesPage() {
  return (
    <div className="pt-24 pb-20 min-h-screen bg-transparent relative overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-indigo-200/10 dark:bg-indigo-900/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-pink-200/10 dark:bg-pink-900/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 max-w-6xl relative">
        {/* Page title header */}
        <div className="text-center mb-12">
          <span className="text-[10px] font-extrabold tracking-widest text-indigo-500 uppercase bg-indigo-500/10 dark:bg-indigo-500/20 px-3 py-1 rounded-full border border-indigo-500/20">
            Interactive Showcase
          </span>
          <h1 className="text-[32px] sm:text-[42px] font-[950] text-[#111827] dark:text-white tracking-tight mt-4 mb-3 leading-tight">
            Explore All Features
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-[13px] sm:text-[14px] max-w-xl mx-auto leading-relaxed">
            Interact with pixel companions directly inside your browser. Experience focus cycles, drag-and-drop cleaning systems, and live animations.
          </p>
        </div>

        {/* Animator Playground & Interaction Steps Guide */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          <AnimatorPlayground />
          <InteractionGuide />
        </div>

        <DetailedFeatures />
      </div>
    </div>
  );
}
