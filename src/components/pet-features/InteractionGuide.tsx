"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import { MousePointerClick, Info } from 'lucide-react';

export const InteractionGuide = () => {
  const { t } = useTranslation();

  return (
    <div className="lg:col-span-5 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/50 dark:border-slate-800/40 shadow-sm rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-9 h-9 rounded-xl bg-indigo-500 text-white flex items-center justify-center shadow-md shadow-indigo-500/10">
            <MousePointerClick size={16} />
          </div>
          <h2 className="text-lg md:text-xl font-extrabold text-gray-900 dark:text-white">
            {t('pet_features.how_to.title')}
          </h2>
        </div>

        <div className="space-y-3">
          {[1, 2, 3, 4].map((step) => (
            <div 
              key={step}
              className="flex gap-3.5 items-start bg-white/50 dark:bg-slate-950/20 backdrop-blur border border-white/60 dark:border-slate-800/40 p-3.5 rounded-2xl shadow-sm"
            >
              <div className="w-5 h-5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black text-[9px] shrink-0 mt-0.5">
                {step}
              </div>
              <p className="text-[12px] font-bold text-gray-600 dark:text-gray-300 leading-relaxed">
                {t(`pet_features.how_to.step${step}`)}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 p-4 bg-indigo-50/30 dark:bg-indigo-950/10 rounded-xl border border-indigo-100/20 dark:border-indigo-900/20 flex gap-3 items-start">
        <Info size={16} className="text-indigo-500 shrink-0 mt-0.5" />
        <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed font-bold">
          {t('pet_features.how_to.note')}
        </p>
      </div>
    </div>
  );
};
