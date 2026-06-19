import React from 'react';
import type { Metadata } from 'next';
import { AgentHero } from '../../components/pet-features/AgentHero';
import { SecurityFeatures } from '../../components/pet-features/SecurityFeatures';
import { AutonomousTransactions } from '../../components/pet-features/AutonomousTransactions';
import { AnimatorPlayground } from '../../components/pet-features/AnimatorPlayground';
import { AppFeatures } from '../../components/pet-features/AppFeatures';

export const metadata: Metadata = {
  title: 'MiniPet AI Agent Features - Web3 Guardian & Autonomous Trading',
  description: 'Explore the Web3 AI Agent capabilities of MiniPet on SUI: real-time scam detection, wallet health auditing, and autonomous on-chain transactions via natural language.',
  keywords: 'minipet ai agent, web3 guardian, sui blockchain, autonomous transactions, phishing detection, crypto safety',
};

export default function PetFeaturesPage() {
  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden flex flex-col">
      {/* Background gradients that inherit from the body styling */}
      <AgentHero />
      
      <div className="section-divider bg-slate-100" />
      <div className="pt-10 md:pt-20 pb-10 md:pb-20 bg-transparent relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
              Interactive Pixel Pet
            </h2>
            <p className="text-slate-500 text-[14px] sm:text-[15px] mt-3">
              Xem thử các animation trực tiếp của MiniPet.
            </p>
          </div>
          <AnimatorPlayground />
        </div>
      </div>
      
      <div className="section-divider bg-slate-100" />
      <div className="pt-10 md:pt-20">
        <SecurityFeatures />
      </div>
      
      <div className="section-divider bg-slate-100" />
      <div className="pt-10 md:pt-20">
        <AutonomousTransactions />
      </div>
      
      <div className="section-divider bg-slate-100" />
      <div className="pt-10 md:pt-20">
        <AppFeatures />
      </div>
    </div>
  );
}
