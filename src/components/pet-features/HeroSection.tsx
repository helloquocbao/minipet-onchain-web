"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';


export const HeroSection = () => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <>
      {/* Back navigation */}
      <button
        onClick={() => router.push('/')}
        className="text-gray-400 mb-6 hover:text-indigo-600 dark:hover:text-indigo-400 font-bold uppercase text-[10px] tracking-widest bg-transparent border-none cursor-pointer transition-all hover:scale-102"
      >
        {t('custom.back')}
      </button>

      {/* Hero Section */}
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <h1 className="text-[36px] sm:text-[44px] md:text-[48px] font-black tracking-tight leading-none mb-3 bg-gradient-to-r from-gray-900 via-indigo-950 to-gray-900 dark:from-white dark:via-indigo-100 dark:to-white bg-clip-text text-transparent">
          {t('pet_features.title')}
        </h1>
        <p className="text-indigo-500 dark:text-indigo-400 font-black text-[12px] sm:text-[13px] mb-4 uppercase tracking-widest">
          {t('pet_features.subtitle')}
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-[14px] sm:text-[15px] leading-relaxed max-w-2xl mx-auto font-medium">
          {t('pet_features.hero_desc')}
        </p>
      </div>
    </>
  );
};
