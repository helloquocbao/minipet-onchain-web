"use client";

import { useTranslation } from 'react-i18next';
import { Download, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import { FaApple, FaWindows } from 'react-icons/fa';
import React, { useState } from 'react';

const Container = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

export const DownloadSection = () => {
  const { t } = useTranslation();
  const [showMacHelp, setShowMacHelp] = useState(false);

  const downloads = [
    {
      platform: 'macOS',
      icon: <FaApple size={22} />,
      version: 'v1.0.0',
      ext: '.dmg',
      link: 'https://github.com/helloquocbao/mini-pet/releases/download/v1.0.0/MiniPet-v1.0.0.dmg',
      desc: t('download.macDesc'),
      color: 'bg-slate-500/10 text-slate-700 dark:text-slate-350 border-slate-500/20'
    },
    {
      platform: 'Windows',
      icon: <FaWindows size={22} />,
      version: 'v1.0.0',
      ext: '.exe',
      link: '#',
      desc: t('download.winExeDesc'),
      color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
      disabled: true
    },
    {
      platform: 'Windows',
      icon: <FaWindows size={22} />,
      version: 'v1.0.0',
      ext: '.zip',
      link: 'https://github.com/helloquocbao/mini-pet/releases/download/v1.0.0/MiniPet-v1.0.0-Portable.zip',
      desc: t('download.winZipDesc'),
      color: 'bg-indigo-500/10 text-indigo-650 dark:text-indigo-400 border-indigo-500/20'
    }
  ];

  return (
    <section id="download" className="pb-20 md:pb-24 bg-transparent relative overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[35rem] bg-violet-500/5 dark:bg-violet-500/2 rounded-full blur-[130px] pointer-events-none -z-10 animate-glow-pulse" />
      
      {/* Visual background separation lines */}
      <div className="section-divider" />

      <Container className="pt-20 md:pt-24">
        {/* Section Header */}
        <div className="text-center mb-16 animate-gentle-float">
          <h2 className="text-[28px] sm:text-[36px] font-[950] text-[#111827] dark:text-white tracking-tight mb-4">
            {t('download.title')}
          </h2>
          <p className="text-[var(--text-muted)] text-[14px] max-w-md mx-auto leading-relaxed">
            {t('download.desc')}
          </p>
        </div>

        {/* Downloads Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20">
          {downloads.map((d, idx) => (
            <div
              key={idx}
              className={`glass-card p-8 rounded-3xl flex flex-col justify-between items-center text-center group ${
                d.disabled ? 'opacity-70 grayscale-[30%]' : ''
              }`}
            >
              {/* Platform icon container */}
              <div className={`w-14 h-14 rounded-2xl ${d.color} border flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300 shadow-sm`}>
                {d.icon}
              </div>
              
              <h3 className="text-[18px] font-black text-[#111827] dark:text-white mb-2">{d.platform}</h3>
              <p className="text-[12px] text-gray-500 dark:text-gray-400 mb-6 max-w-[200px] leading-relaxed">{d.desc}</p>
              
              <div className="w-full pt-6 border-t border-slate-200/25 dark:border-white/5">
                <a
                  href={d.disabled ? "#download" : d.link}
                  aria-label={d.disabled ? `Coming Soon: MiniPet for ${d.platform} (${d.ext})` : `Download MiniPet for ${d.platform} (${d.ext})`}
                  className={`group/btn relative inline-flex items-center justify-center gap-2 w-full py-3 rounded-full text-[12px] font-extrabold no-underline transition-all duration-300 active:scale-[0.98] ${
                    d.disabled
                      ? 'bg-slate-250 dark:bg-zinc-800 text-slate-600 dark:text-zinc-350 cursor-not-allowed pointer-events-none'
                      : 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-[0_0_20px_rgba(139,92,246,0.2)] hover:shadow-[0_0_35px_rgba(139,92,246,0.4)]'
                  }`}
                  onClick={(e) => { if (d.disabled) e.preventDefault(); }}
                >
                  <Download size={14} className={d.disabled ? '' : 'group-hover/btn:translate-y-0.5 transition-transform duration-300'} />
                  <span>{d.disabled ? t('download.coming_soon') : `${t('download.btn')} ${d.ext}`}</span>
                </a>
                <div className="mt-3.5 text-[9px] font-bold text-gray-400 uppercase tracking-widest font-mono">
                  {t('download.version')} {d.version}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* macOS Troubleshooting Panel */}
        <div className="max-w-3xl mx-auto glass-card rounded-[2.2rem] overflow-hidden">
          <div className="p-6 md:p-8">
            <button
              onClick={() => setShowMacHelp(!showMacHelp)}
              className="w-full flex items-center justify-between text-left font-bold text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer border-none bg-transparent"
            >
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/10 dark:bg-indigo-550/15 text-indigo-500 flex items-center justify-center shadow-sm">
                  <FaApple size={16} />
                </div>
                <span className="text-[14px] sm:text-[15px] font-black">{t('download.troubleshooting.macTitle')}</span>
              </div>
              {showMacHelp ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
            </button>
            
            {showMacHelp && (
              <div className="mt-6 pl-13 border-t border-slate-200/25 dark:border-white/5 pt-6 animate-gentle-float">
                <p className="text-[13px] text-gray-500 dark:text-gray-400 mb-5 leading-relaxed font-medium">
                  {t('download.troubleshooting.macStep1')}
                </p>
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3.5 text-[12.5px] font-bold text-gray-650 dark:text-gray-300">
                    <div className="w-5.5 h-5.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-[10px] mt-0.5 flex-shrink-0 font-mono font-bold">1</div>
                    <span>{t('download.troubleshooting.macStep2')}</span>
                  </div>
                  <div className="flex items-start gap-3.5 text-[12.5px] font-bold text-gray-650 dark:text-gray-300">
                    <div className="w-5.5 h-5.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-[10px] mt-0.5 flex-shrink-0 font-mono font-bold">2</div>
                    <span>{t('download.troubleshooting.macStep3')}</span>
                  </div>
                </div>
                
                {/* Terminal option block */}
                <div className="pt-6 border-t border-slate-200/25 dark:border-white/5">
                  <p className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.15em] mb-3.5 flex items-center gap-1.5 font-mono">
                    <AlertCircle size={12} className="animate-pulse" />
                    {t('download.troubleshooting.macTerminalTitle')}
                  </p>
                  
                  {/* Console Frame */}
                  <div className="bg-slate-950/95 rounded-2xl p-5 border border-white/5 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-xl rounded-full pointer-events-none" />
                    
                    {/* Header Dots */}
                    <div className="flex items-center gap-2 mb-3.5 border-b border-white/5 pb-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                      <span className="text-[9px] font-mono text-gray-500 ml-2">zsh</span>
                    </div>
                    
                    <div className="font-mono text-[12px] leading-relaxed">
                      <div className="text-slate-500 mb-2"># {t('download.troubleshooting.macTerminalStep').split(':')[0]}:</div>
                      <div className="flex items-start gap-2.5">
                        <span className="text-indigo-400 font-bold shrink-0">$</span>
                        <code className="text-indigo-100 break-all select-all hover:text-white transition-colors cursor-pointer">
                          {t('download.troubleshooting.macTerminalStep').split(':')[1]?.trim() || t('download.troubleshooting.macTerminalStep')}
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      </Container>
    </section>
  );
};
