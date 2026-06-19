"use client";
 
import { ArrowUpRight, Sparkles, Check } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
 
const Container = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

const statesDict: Record<string, Record<string, string>> = {
  en: {
    walking: 'Walking on screen... 🐾',
    focusing: 'Pomodoro: Focusing! ⏱️',
    eating: 'Cleaning trash files... 🗑️',
    walk: 'Walk',
    focus: 'Focus',
    clean: 'Clean'
  },
  vi: {
    walking: 'Đang đi dạo trên màn hình... 🐾',
    focusing: 'Pomodoro: Đang tập trung! ⏱️',
    eating: 'Đang dọn dẹp tập tin rác... 🗑️',
    walk: 'Đi dạo',
    focus: 'Tập trung',
    clean: 'Dọn dẹp'
  },
  zh: {
    walking: '在屏幕上漫步... 🐾',
    focusing: '番茄钟：专心中！ ⏱️',
    eating: '清理垃圾文件... 🗑️',
    walk: '漫步',
    focus: '专注',
    clean: '清理'
  },
  it: {
    walking: 'Cammina sullo schermo... 🐾',
    focusing: 'Pomodoro: Concentrato! ⏱️',
    eating: 'Pulizia file spazzatura... 🗑️',
    walk: 'Cammina',
    focus: 'Concentrati',
    clean: 'Pulisci'
  },
  fr: {
    walking: 'Se promène sur l\'écran... 🐾',
    focusing: 'Pomodoro : Concentré ! ⏱️',
    eating: 'Nettoyage des fichiers... 🗑️',
    walk: 'Marcher',
    focus: 'Se concentrer',
    clean: 'Nettoyer'
  },
  ko: {
    walking: '화면을 걷는 중... 🐾',
    focusing: '뽀모도로: 집중 중! ⏱️',
    eating: '휴지통 파일 청소 중... 🗑️',
    walk: '걷기',
    focus: '집중',
    clean: '청소'
  }
};
 
export const Hero = () => {
  const { t, i18n } = useTranslation();
  const [companionState, setCompanionState] = useState<'Walking' | 'Focusing' | 'Eating'>('Walking');
  
  const currentLangCode = i18n.language?.startsWith('vi') ? 'vi' :
                          i18n.language?.startsWith('zh') ? 'zh' :
                          i18n.language?.startsWith('it') ? 'it' :
                          i18n.language?.startsWith('fr') ? 'fr' :
                          i18n.language?.startsWith('ko') ? 'ko' : 'en';
                          
  const langText = statesDict[currentLangCode] || statesDict['en'];

  return (
    <section id="hero" className="pt-16 pb-10 md:pt-24 md:pb-20 overflow-hidden relative min-h-[80dvh] flex items-center bg-transparent">
      {/* Background soft mesh gradients */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-indigo-50/50 to-transparent pointer-events-none -z-10" />
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/10 w-[30rem] h-[30rem] bg-pink-500/5 rounded-full blur-[150px] pointer-events-none -z-10" />
      
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Left copy */}
          <div className="lg:col-span-6 text-center lg:text-left z-10">
            {/* Version Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[10px] font-extrabold text-indigo-600 mb-6 tracking-widest uppercase shadow-sm">
              <Sparkles size={12} className="text-purple-500" />
              <span>v1.2.0 Desktop Release</span>
            </div>
 
            {/* Cinematic Headline */}
            <h1 className="text-slate-900 font-[900] leading-[1.1] tracking-tight mb-5 text-[36px] sm:text-[48px] lg:text-[56px]">
              {t('hero.title1')} <span className="text-indigo-600">{t('hero.title2')}</span><br />
              {t('hero.title3')}
            </h1>
 
            {/* Description */}
            <p className="text-slate-500 text-[14px] sm:text-[15px] leading-relaxed mb-7 max-w-xl mx-auto lg:mx-0 font-medium">
              {t('hero.desc')}
            </p>
 
            {/* CTAs */}
            <div className="flex flex-row justify-center lg:justify-start gap-2 sm:gap-4 mb-8 w-full px-2 sm:px-0">
              <a
                href="#download"
                onClick={(e) => { e.preventDefault(); document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="flex-1 sm:flex-none group relative flex items-center justify-center gap-1.5 sm:gap-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-2 py-3 sm:px-6 sm:py-3.5 text-[12px] sm:text-[14px] font-bold no-underline hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-md shadow-indigo-500/20 cursor-pointer whitespace-nowrap"
              >
                <span>{t('hero.getFree')}</span>
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowUpRight size={14} className="hidden sm:block" />
                </span>
              </a>
              <a
                href="https://github.com/helloquocbao/mini-pet"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View MiniPet source code on GitHub"
                className="flex-1 sm:flex-none group relative flex items-center justify-center gap-1.5 sm:gap-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-full px-2 py-3 sm:px-6 sm:py-3.5 text-[12px] sm:text-[14px] font-bold no-underline hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-sm cursor-pointer whitespace-nowrap"
              >
                <span>{t('hero.source')}</span>
                <span className="group-hover:rotate-12 transition-transform">
                  <FaGithub size={16} />
                </span>
              </a>
            </div>
 
            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4 text-[10px] font-bold text-slate-500 tracking-wider uppercase">
              <span className="flex items-center gap-1.5">
                <Check size={12} className="text-indigo-500" /> {t('hero.noAds')}
              </span>
              <span className="flex items-center gap-1.5">
                <Check size={12} className="text-indigo-500" /> {t('hero.noAccount')}
              </span>
              <span className="flex items-center gap-1.5">
                <Check size={12} className="text-indigo-500" /> {t('hero.privacy')}
              </span>
            </div>
          </div>
 
          {/* Right — app mockup */}
          <div className="lg:col-span-6 relative flex justify-center items-center py-0 lg:py-4 mt-4 lg:mt-0">
            <div className="hidden lg:block absolute w-[120%] h-[120%] bg-indigo-50/50 rounded-full blur-[80px] -z-10" />
            <div className="w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[400px] mx-auto transition-transform hover:-translate-y-2 duration-500">
              {/* Clean White Mockup Window */}
              <div className="bg-transparent lg:bg-white lg:rounded-[1.75rem] lg:border lg:border-slate-100 lg:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden relative group">
                {/* Mockup Title bar */}
                <div className="hidden lg:flex bg-slate-50/80 px-5 py-4 items-center justify-between border-b border-slate-100">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-slate-400 tracking-wider">minipet_companion.exe</span>
                  <span className="flex items-center gap-1.5 text-[9px] font-mono font-black text-emerald-500 bg-emerald-50 px-2.5 py-1 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />LIVE
                  </span>
                </div>
 
                {/* Mockup Canvas */}
                <div className="p-0 lg:p-6 relative min-h-0 lg:min-h-[260px] flex flex-col items-center justify-center lg:bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] lg:bg-[size:20px_20px] bg-transparent">
                  <div className="relative z-10 hero-float flex flex-col items-center">
                    <div className={`cat-sprite-frame ${companionState === 'Walking' ? 'anim-walking' : companionState === 'Focusing' ? 'anim-focusing' : 'anim-eating'} z-20 scale-75 lg:scale-110 drop-shadow-2xl transition-transform duration-500 hover:scale-125`} style={{ willChange: 'transform' }} role="img" aria-label="Animated pixel art cat companion" />
                    {/* Simulated Pet Speech bubble */}
                    <div className="bg-slate-900 text-white text-[11px] font-bold px-4 py-2.5 rounded-2xl shadow-xl -mt-2 lg:mt-6 relative">
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-900 rotate-45" />
                      <span className="relative z-10">
                        {companionState === 'Walking' && langText.walking}
                        {companionState === 'Focusing' && langText.focusing}
                        {companionState === 'Eating' && langText.eating}
                      </span>
                    </div>
                  </div>
                </div>
 
                {/* Mockup Controls & Stats */}
                <div className="hidden lg:flex bg-white px-6 py-5 border-t border-slate-100 items-center justify-between gap-2">
                  <div className="flex gap-2">
                    <button onClick={() => setCompanionState('Walking')} className={`px-4 py-1.5 rounded-full text-[11px] font-bold transition-all cursor-pointer border ${companionState === 'Walking' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}>
                      {langText.walk}
                    </button>
                    <button onClick={() => setCompanionState('Focusing')} className={`px-4 py-1.5 rounded-full text-[11px] font-bold transition-all cursor-pointer border ${companionState === 'Focusing' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}>
                      {langText.focus}
                    </button>
                    <button onClick={() => setCompanionState('Eating')} className={`px-4 py-1.5 rounded-full text-[11px] font-bold transition-all cursor-pointer border ${companionState === 'Eating' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}>
                      {langText.clean}
                    </button>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 font-bold bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                    <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400"/>zkLogin Secured</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
 
        </div>
      </Container>
    </section>
  );
};
