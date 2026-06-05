"use client";

import { useTranslation } from 'react-i18next';
import { ArrowUpRight, Check, Monitor, Sparkles } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import React, { useState } from 'react';

const Container = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

export const Hero = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith('vi') ? 'vi' : 'en';
  const [companionState, setCompanionState] = useState<'Walking' | 'Focusing' | 'Eating'>('Walking');

  return (
    <section id="hero" className="pt-24 pb-20 md:pt-32 md:pb-24 overflow-hidden relative min-h-[90dvh] flex items-center bg-transparent">
      {/* Background soft mesh gradients */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none -z-10 animate-glow-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-1/4 right-1/10 w-[30rem] h-[30rem] bg-rose-500/10 dark:bg-rose-500/5 rounded-full blur-[150px] pointer-events-none -z-10 animate-glow-pulse" style={{ animationDuration: '12s' }} />
      
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Right — app mockup (Order first on mobile so user sees the core app visuals immediately!) */}
          <div className="lg:col-span-5 relative flex justify-center items-center order-1 lg:order-2 py-2 lg:py-4">
            <div className="absolute w-[90%] h-[90%] bg-indigo-500/10 dark:bg-pink-500/5 blur-[100px] rounded-full -z-10" />
            <div className="w-full max-w-[340px] sm:max-w-[420px] transition-all hover:scale-[1.01]">
              {/* Glass Mockup Window */}
              <div className="glass-card rounded-[1.8rem] sm:rounded-[2.2rem] backdrop-blur-xl overflow-hidden relative group">
                {/* Mockup Title bar */}
                <div className="bg-slate-50/40 dark:bg-slate-900/40 px-4 sm:px-5 py-2.5 sm:py-3.5 flex items-center justify-between border-b border-slate-200/30 dark:border-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-rose-400/80" />
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-400/80" />
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-400/80" />
                  </div>
                  <span className="text-[8px] sm:text-[9.5px] font-mono font-bold text-gray-500 dark:text-gray-400 tracking-wider">minipet_companion.exe</span>
                  <span className="flex items-center gap-1 text-[7px] sm:text-[8px] font-mono font-extrabold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />LIVE
                  </span>
                </div>

                {/* Mockup Canvas */}
                <div className="p-6 sm:p-8 relative min-h-[180px] sm:min-h-[240px] flex flex-col items-center justify-center">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                  <div className="relative z-10 hero-float flex flex-col items-center">
                    <div className="cat-sprite-frame z-20 scale-90 sm:scale-100 transition-transform duration-500 hover:scale-105" style={{ willChange: 'transform' }} role="img" aria-label="Animated pixel art cat companion" />
                    {/* Simulated Pet Speech bubble */}
                    <div className="bg-slate-950/80 dark:bg-white/80 text-white dark:text-slate-900 text-[8.5px] sm:text-[9.5px] font-bold px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl shadow-xl border border-white/10 dark:border-slate-200/20 mt-3 transition-all duration-500 backdrop-blur-md">
                      {companionState === 'Walking' && (lang === 'vi' ? 'Đang đi dạo trên màn hình... 🐾' : 'Walking on screen... 🐾')}
                      {companionState === 'Focusing' && (lang === 'vi' ? 'Chế độ Pomodoro: Đang tập trung! ⏱️' : 'Pomodoro: Focusing! ⏱️')}
                      {companionState === 'Eating' && (lang === 'vi' ? 'Đang dọn dẹp file rác... 🗑️' : 'Cleaning trash files... 🗑️')}
                    </div>
                  </div>
                </div>

                {/* Mockup Controls & Stats */}
                <div className="bg-slate-50/20 dark:bg-slate-900/20 px-4 sm:px-5 py-3 sm:py-4 border-t border-slate-200/20 dark:border-white/5 flex items-center justify-between gap-2">
                  <div className="flex gap-1.5">
                    <button onClick={() => setCompanionState('Walking')} className={`px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[8px] sm:text-[9px] font-bold border transition-all duration-300 cursor-pointer ${companionState === 'Walking' ? 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/25' : 'bg-transparent text-gray-500 border-slate-200/50 dark:border-white/5 hover:bg-slate-100/50 dark:hover:bg-white/5'}`}>
                      {lang === 'vi' ? 'Đi dạo' : 'Walk'}
                    </button>
                    <button onClick={() => setCompanionState('Focusing')} className={`px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[8px] sm:text-[9px] font-bold border transition-all duration-300 cursor-pointer ${companionState === 'Focusing' ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/25' : 'bg-transparent text-gray-500 border-slate-200/50 dark:border-white/5 hover:bg-slate-100/50 dark:hover:bg-white/5'}`}>
                      {lang === 'vi' ? 'Tập trung' : 'Focus'}
                    </button>
                    <button onClick={() => setCompanionState('Eating')} className={`px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[8px] sm:text-[9px] font-bold border transition-all duration-300 cursor-pointer ${companionState === 'Eating' ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/25' : 'bg-transparent text-gray-500 border-slate-200/50 dark:border-white/5 hover:bg-slate-100/50 dark:hover:bg-white/5'}`}>
                      {lang === 'vi' ? 'Dọn rác' : 'Clean'}
                    </button>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 text-[8px] sm:text-[9px] font-mono text-gray-400 font-bold">
                    <span>RAM: {lang === 'vi' ? 'Tối ưu' : 'Optimized'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Ambient Badges (Made smaller on mobile to prevent overlapping) */}
            <div className="absolute top-4 -right-4 sm:top-10 sm:-right-6 bg-white/80 dark:bg-slate-900/80 border border-emerald-500/25 shadow-xl rounded-full px-2.5 py-1 sm:px-3.5 sm:py-1.5 flex items-center gap-1 text-[8px] sm:text-[9px] font-extrabold text-emerald-600 dark:text-emerald-450 z-20 backdrop-blur-md animate-gentle-float">
              <Check size={10} />zkLogin Secured
            </div>
            <div className="absolute bottom-4 -left-4 sm:bottom-12 sm:-left-6 bg-white/80 dark:bg-slate-900/80 border border-indigo-500/25 shadow-xl rounded-full px-2.5 py-1 sm:px-3.5 sm:py-1.5 flex items-center gap-1 text-[8px] sm:text-[9px] font-extrabold text-indigo-600 dark:text-indigo-400 z-20 backdrop-blur-md animate-gentle-float-delayed">
              <Monitor size={10} />Tauri Engine
            </div>
          </div>

          {/* Left copy (Order second on mobile) */}
          <div className="lg:col-span-7 text-center lg:text-left z-10 order-2">
            {/* Version Badge */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50/80 dark:bg-white/5 border border-indigo-100/50 dark:border-white/10 text-[9px] font-bold text-indigo-600 dark:text-indigo-400 mb-4 lg:mb-6 tracking-[0.18em] uppercase backdrop-blur-md shadow-sm">
              <Sparkles size={10} className="animate-spin text-purple-500" style={{ animationDuration: '3s' }} />
              <span>v1.2.0 Desktop Release</span>
            </div>

            {/* Cinematic Headline */}
            <h1 className="text-[#111827] dark:text-white font-[950] leading-[1.1] sm:leading-[1.05] tracking-tight mb-4 sm:mb-6 text-[32px] sm:text-[54px] lg:text-[64px]">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-550 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
                {t('hero.title1')} {t('hero.title2')}
              </span>
              <br />
              <span className="text-gray-900 dark:text-white">{t('hero.title3')}</span>
            </h1>

            {/* Description */}
            <p className="text-[var(--text-muted)] text-[13.5px] sm:text-[16px] leading-relaxed mb-6 sm:mb-10 max-w-xl mx-auto lg:mx-0 font-medium">
              {t('hero.desc')}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 mb-6 sm:mb-10">
              <a
                href="#download"
                onClick={(e) => { e.preventDefault(); document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="group relative inline-flex items-center gap-2.5 sm:gap-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-full pl-5 pr-2 py-2 sm:pl-6 sm:pr-2.5 sm:py-2.5 text-[12px] sm:text-[13px] font-bold no-underline hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_0_30px_rgba(139,92,246,0.35)] hover:shadow-[0_0_50px_rgba(139,92,246,0.55)] cursor-pointer"
              >
                <span>{t('hero.getFree')}</span>
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]">
                  <ArrowUpRight size={13} />
                </span>
              </a>
              <a
                href="https://github.com/helloquocbao/mini-pet"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View MiniPet source code on GitHub"
                className="group relative inline-flex items-center gap-2.5 sm:gap-3 bg-slate-800/10 hover:bg-slate-800/15 dark:bg-white/5 dark:hover:bg-white/10 text-gray-800 dark:text-gray-300 border border-slate-300/80 dark:border-white/10 rounded-full pl-5 pr-2 py-2 sm:pl-6 sm:pr-2.5 sm:py-2.5 text-[12px] sm:text-[13px] font-bold no-underline hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] backdrop-blur-md shadow-sm"
              >
                <span>{t('hero.source')}</span>
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-800/10 dark:bg-white/5 flex items-center justify-center group-hover:rotate-12 transition-transform duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]">
                  <FaGithub size={13} />
                </span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3 text-[9px] font-bold text-gray-600 dark:text-gray-400 tracking-wider uppercase">
              <span className="flex items-center gap-1.5 bg-slate-800/5 dark:bg-white/5 border border-slate-200 dark:border-white/5 px-2.5 py-1 rounded-full backdrop-blur-md">
                <Check size={11} className="text-emerald-600 dark:text-emerald-500" /> {t('hero.noAds')}
              </span>
              <span className="flex items-center gap-1.5 bg-slate-800/5 dark:bg-white/5 border border-slate-200 dark:border-white/5 px-2.5 py-1 rounded-full backdrop-blur-md">
                <Check size={11} className="text-emerald-600 dark:text-emerald-500" /> {t('hero.noAccount')}
              </span>
              <span className="flex items-center gap-1.5 bg-slate-800/5 dark:bg-white/5 border border-slate-200 dark:border-white/5 px-2.5 py-1 rounded-full backdrop-blur-md">
                <Check size={11} className="text-emerald-600 dark:text-emerald-500" /> {t('hero.privacy')}
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
