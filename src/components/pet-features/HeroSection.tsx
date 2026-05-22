"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export const HeroSection = () => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <>
      {/* Back navigation */}
      <button
        onClick={() => router.push('/')}
        className="flex items-center gap-2 text-gray-500 mb-8 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-bold uppercase text-xs tracking-widest bg-transparent border-none cursor-pointer"
      >
        <ArrowLeft size={16} /> {t('custom.back')}
      </button>

      {/* Hero Section */}
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <h1 className="text-[36px] sm:text-[44px] md:text-[52px] font-[900] text-[#111827] dark:text-white tracking-tight leading-tight mb-4">
          {t('pet_features.title')}
        </h1>
        <p className="text-indigo-600 dark:text-indigo-400 font-extrabold text-[15px] sm:text-[17px] mb-6 uppercase tracking-wider">
          {t('pet_features.subtitle')}
        </p>
        <p className="text-gray-600 dark:text-gray-400 text-[15px] sm:text-[16px] leading-relaxed">
          {t('pet_features.hero_desc')}
        </p>
      </div>
    </>
  );
};
