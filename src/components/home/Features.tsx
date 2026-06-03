"use client";

import { useTranslation } from 'react-i18next';
import { Clock } from 'lucide-react';
import React from 'react';

const Container = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

export const Features = () => {
  const { t } = useTranslation();
  return (
    <section id="features" className="py-4 md:py-6 bg-gray-50/50 dark:bg-black/5 relative">
      <Container>
        {/* Section header */}
        <div className="text-center mb-3 md:mb-4">
          <h2 className="text-[15px] sm:text-[18px] md:text-[21px] font-[900] text-[#111827] dark:text-white tracking-tight leading-tight mb-1">
            {t('features.badge')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-[11px] sm:text-[12px] max-w-sm mx-auto leading-relaxed">
            {t('features.desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* ── Desktop Companion ── */}
          <div className="card overflow-hidden flex flex-col">
            <div
              className="bg-gradient-to-br from-[#dde8ff] to-[#cdd8f8] flex items-center justify-center overflow-hidden py-3.5"
              style={{ height: 90 }}
            >
              <img
                src="/feature-companion.png"
                alt="Live Desktop Companion featuring a cute pet"
                className="h-full w-auto object-contain max-h-[70px]"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="p-2.5">
              <h3 className="text-[12.5px] font-extrabold text-[#111827] dark:text-white mb-0.5">{t('features.companion.title')}</h3>
              <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed max-w-sm">
                {t('features.companion.desc')}
              </p>
            </div>
          </div>

          {/* ── Pomodoro Timer ── */}
          <div className="card overflow-hidden flex flex-col">
            {/* Image fills remaining space */}
            <div className="relative overflow-hidden bg-gradient-to-br from-rose-50 to-orange-50 flex items-center justify-center py-3.5" style={{ height: 90 }}>
              <img
                src="/card-pomodoro.png"
                alt="Pomodoro Timer interface with a focused pet"
                className="h-full w-auto object-contain max-h-[70px] pixel-art"
                style={{ mixBlendMode: 'multiply' }}
                loading="lazy"
                decoding="async"
              />
              {/* Timer pill */}
              <div className="absolute top-1.5 left-1.5 bg-rose-500 text-white text-[7px] font-bold px-1.5 py-0.5 rounded-full shadow flex items-center gap-1">
                <Clock size={6.5} /> 25:00
              </div>
              <div className="absolute top-1.5 right-1.5 bg-white/90 backdrop-blur-sm text-[6px] font-semibold text-gray-600 px-1 py-0.2 rounded-full shadow-sm">{t('features.focus_mode')}</div>
            </div>
            {/* Text always at bottom */}
            <div className="p-2.5 border-t border-gray-100/80 dark:border-gray-800">
              <h3 className="text-[12.5px] font-extrabold text-[#111827] dark:text-white mb-0.5">{t('features.pomodoro.title')}</h3>
              <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed max-w-sm">
                {t('features.pomodoro.desc')}
              </p>
            </div>
          </div>

          {/* ── File Eating System ── */}
          <div className="card overflow-hidden flex items-center bg-amber-50/30 dark:bg-amber-900/5 group p-2">
            <div className="w-16 h-16 shrink-0 rounded-xl bg-amber-100/50 dark:bg-amber-900/20 flex items-center justify-center overflow-hidden">
              <img
                src="/card-overlay.png"
                alt="Interactive file eating system illustration"
                className="h-10 w-10 object-contain transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="pl-3 flex-1">
              <h3 className="text-[12.5px] font-extrabold text-[#111827] dark:text-white mb-0.5">{t('features.eating.title')}</h3>
              <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed">
                {t('features.eating.desc')}
              </p>
            </div>
          </div>

          {/* ── PetDex & Custom Pets ── */}
          <div className="card overflow-hidden flex items-center bg-indigo-50/30 dark:bg-indigo-900/5 group p-2">
            <div className="w-16 h-16 shrink-0 rounded-xl bg-indigo-100/50 dark:bg-indigo-900/20 flex items-center justify-center overflow-hidden">
              <img
                src="/card-petdex.png"
                alt="PetDex library showing various custom pets"
                className="h-10 w-10 object-contain transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-110"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="pl-3 flex-1">
              <h3 className="text-[12.5px] font-extrabold text-[#111827] dark:text-white mb-0.5">{t('features.custom.title')}</h3>
              <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed">
                {t('features.custom.desc')}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

