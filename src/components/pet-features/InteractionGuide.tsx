"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import { MousePointerClick, Info } from 'lucide-react';

export const InteractionGuide = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="lg:col-span-5 bg-white dark:bg-gray-900 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl border border-gray-100 dark:border-gray-800 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-10 h-10 rounded-xl bg-indigo-500 text-white flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <MousePointerClick size={20} />
          </div>
          <h2 className="text-xl font-black text-gray-900 dark:text-white">
            {t('pet_features.how_to.title')}
          </h2>
        </div>

        <div className="space-y-4">
          {[1, 2, 3, 4].map((step) => (
            <div 
              key={step}
              className="flex gap-4 items-start bg-gray-50/50 dark:bg-gray-800/10 p-4 rounded-2xl border border-gray-100/50 dark:border-gray-800/50"
            >
              <div className="w-6 h-6 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black text-[10px] shrink-0 mt-0.5">
                {step}
              </div>
              <p className="text-[13px] font-bold text-gray-600 dark:text-gray-300 leading-relaxed">
                {t(`pet_features.how_to.step${step}`)}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 p-4 bg-indigo-50/30 dark:bg-indigo-900/10 rounded-2xl border border-indigo-100/30 dark:border-indigo-900/30 flex gap-3 items-start">
        <Info size={16} className="text-indigo-500 shrink-0 mt-0.5" />
        <p className="text-[11.5px] text-gray-500 dark:text-gray-400 leading-relaxed font-bold">
          {i18n.language === 'vi' 
            ? "Tất cả các hành động của Pet đều tự động hoạt động mượt mà dựa trên máy trạng thái tích hợp trong app desktop, không làm phiền trải nghiệm làm việc của bạn."
            : "All pet activities execute seamlessly using a built-in state machine in the desktop app, designed to keep your screen lively without interrupting your work."}
        </p>
      </div>
    </div>
  );
};
