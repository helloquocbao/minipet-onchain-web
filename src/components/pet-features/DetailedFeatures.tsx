"use client";

import { useTranslation } from 'react-i18next';
import { Clock, Sparkles, Trash2, Palette } from 'lucide-react';
import React from 'react';

export const DetailedFeatures = () => {
  const { t } = useTranslation();
  return (
    <div className="my-16">
      <div className="text-center mb-10">
        <h2 className="text-[22px] sm:text-[28px] font-[900] text-[#111827] dark:text-white tracking-tight mb-2">
          MiniPet Core Capabilities
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-[12px] sm:text-[13px] max-w-md mx-auto leading-relaxed">
          Explore the features designed to keep you focused, productive, and entertained throughout your workday.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {/* ── Live Desktop Companion ── */}
        <div className="card overflow-hidden flex flex-col group border border-white/20 dark:border-slate-800/80 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-2xl hover:border-indigo-500/20 dark:hover:border-indigo-500/20 transition-all duration-300">
          <div
            className="bg-gradient-to-br from-blue-50 to-[#e2eaff] dark:from-slate-950/50 dark:to-indigo-950/30 flex items-center justify-center overflow-hidden py-6 border-b border-white/10 dark:border-slate-850"
            style={{ minHeight: 120 }}
          >
            <img
              src="/feature-companion.png"
              alt="Live Desktop Companion"
              className="h-full w-auto object-contain max-h-[100px] transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="p-5">
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-500 border border-indigo-100/50 dark:border-indigo-900/30">
                <Sparkles size={14} />
              </div>
              <h3 className="text-[14px] font-extrabold text-[#111827] dark:text-white">{t('features.companion.title')}</h3>
            </div>
            <p className="text-[12px] text-gray-500 dark:text-gray-400 leading-relaxed pl-10">
              {t('features.companion.desc')}
            </p>
          </div>
        </div>

        {/* ── Pomodoro Timer ── */}
        <div className="card overflow-hidden flex flex-col group border border-white/20 dark:border-slate-800/80 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-2xl hover:border-rose-500/20 dark:hover:border-rose-500/20 transition-all duration-300">
          <div className="relative overflow-hidden bg-gradient-to-br from-rose-50 to-orange-50 dark:from-slate-950/50 dark:to-rose-950/30 flex items-center justify-center py-6 border-b border-white/10 dark:border-slate-850" style={{ minHeight: 120 }}>
            <img
              src="/card-pomodoro.png"
              alt="Pomodoro Timer"
              className="h-full w-auto object-contain max-h-[100px] pixel-art transition-transform duration-300 group-hover:scale-105"
              style={{ mixBlendMode: 'multiply' }}
            />
            <div className="absolute top-3 left-3 bg-rose-500 text-white text-[8px] font-bold px-2 py-0.5 rounded-full shadow flex items-center gap-1">
              <Clock size={8} /> 25:00
            </div>
            <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-[7px] font-semibold text-gray-600 px-1.5 py-0.5 rounded-full shadow-sm">{t('features.focus_mode')}</div>
          </div>
          <div className="p-5">
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-950/50 flex items-center justify-center text-rose-500 border border-rose-100/50 dark:border-rose-900/30">
                <Clock size={14} />
              </div>
              <h3 className="text-[14px] font-extrabold text-[#111827] dark:text-white">{t('features.pomodoro.title')}</h3>
            </div>
            <p className="text-[12px] text-gray-550 dark:text-gray-400 leading-relaxed pl-10">
              {t('features.pomodoro.desc')}
            </p>
          </div>
        </div>

        {/* ── File Eating System ── */}
        <div className="card overflow-hidden flex items-center bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-white/20 dark:border-slate-800/80 group p-4 hover:border-amber-500/20 dark:hover:border-amber-500/20 transition-all duration-300">
          <div className="w-16 h-16 shrink-0 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-100/50 dark:border-amber-900/20 flex items-center justify-center overflow-hidden">
            <img
              src="/card-overlay.png"
              alt="Interactive file eating system"
              className="h-12 w-12 object-contain transition-transform duration-500 group-hover:rotate-6 group-hover:scale-105"
            />
          </div>
          <div className="pl-4 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <div className="text-amber-500">
                <Trash2 size={15} />
              </div>
              <h3 className="text-[14px] font-extrabold text-[#111827] dark:text-white">{t('features.eating.title')}</h3>
            </div>
            <p className="text-[11.5px] text-gray-500 dark:text-gray-400 leading-relaxed">
              {t('features.eating.desc')}
            </p>
          </div>
        </div>

        {/* ── PetDex & Custom Pets ── */}
        <div className="card overflow-hidden flex items-center bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-white/20 dark:border-slate-800/80 group p-4 hover:border-indigo-500/20 dark:hover:border-indigo-500/20 transition-all duration-300">
          <div className="w-16 h-16 shrink-0 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100/50 dark:border-indigo-900/20 flex items-center justify-center overflow-hidden">
            <img
              src="/card-petdex.png"
              alt="PetDex library"
              className="h-12 w-12 object-contain transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-105"
            />
          </div>
          <div className="pl-4 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <div className="text-indigo-500">
                <Palette size={15} />
              </div>
              <h3 className="text-[14px] font-extrabold text-[#111827] dark:text-white">{t('features.custom.title')}</h3>
            </div>
            <p className="text-[11.5px] text-gray-500 dark:text-gray-400 leading-relaxed">
              {t('features.custom.desc')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
