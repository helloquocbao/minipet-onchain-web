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
      platform: 'macOS (Apple Silicon)',
      icon: <FaApple size={22} />,
      version: 'v1.0.0',
      ext: '.dmg',
      link: 'https://github.com/helloquocbao/minipet-app/releases/latest',
      desc: t('download.macDesc'),
      color: 'bg-slate-500/10 text-slate-700 dark:text-slate-350 border-slate-500/20'
    },
    {
      platform: 'Windows',
      icon: <FaWindows size={22} />,
      version: '',
      ext: '',
      link: '#',
      desc: t('download.winDevDesc'),
      color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
      disabled: true
    },
    {
      platform: 'macOS (Intel)',
      icon: <FaApple size={22} />,
      version: '',
      ext: '',
      link: '#',
      desc: t('download.intelDevDesc'),
      color: 'bg-indigo-500/10 text-indigo-650 dark:text-indigo-400 border-indigo-500/20',
      disabled: true
    }
  ];

  return (
    <section id="download" className="pb-10 md:pb-20 bg-transparent relative overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[35rem] bg-indigo-50 rounded-full blur-[100px] pointer-events-none -z-10" />
      
      <div className="section-divider bg-slate-100" />

      <Container className="pt-10 md:pt-20">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-[28px] sm:text-[36px] font-[900] text-slate-900 tracking-tight mb-4">
            {t('download.title')}
          </h2>
          <p className="text-slate-500 text-[15px] sm:text-[17px] max-w-md mx-auto leading-relaxed">
            {t('download.desc')}
          </p>
        </div>

        {/* Downloads Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {downloads.map((d, idx) => (
            <div
              key={idx}
              className={`bg-white border border-slate-100 shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_40px_-5px_rgba(0,0,0,0.08)] p-5 sm:p-6 rounded-[1.75rem] flex flex-col justify-between items-center text-center group transition-all duration-300 hover:-translate-y-1 ${
                d.disabled ? 'opacity-70 grayscale-[30%]' : ''
              }`}
            >
              {/* Platform icon container */}
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl ${d.color.replace(/dark:[^\s]+ /g, '').replace('bg-', 'bg-').replace('/10', '/5')} border border-slate-100 flex items-center justify-center mb-4 sm:mb-5 transition-transform group-hover:scale-110 duration-300 shadow-sm`}>
                {d.icon}
              </div>
              
              <h3 className="text-[15px] sm:text-[17px] font-black text-slate-900 mb-1 sm:mb-2">{d.platform}</h3>
              <p className="text-[12px] sm:text-[13px] text-slate-500 mb-4 sm:mb-5 max-w-[200px] leading-relaxed">{d.desc}</p>
              
              <div className="w-full pt-6 border-t border-slate-100">
                <a
                  href={d.disabled ? "#download" : d.link}
                  aria-label={d.disabled ? `Coming Soon: MiniPet for ${d.platform} (${d.ext})` : `Download MiniPet for ${d.platform} (${d.ext})`}
                  className={`group/btn relative inline-flex items-center justify-center gap-2 w-full py-3 sm:py-3.5 rounded-full text-[12px] sm:text-[13px] font-bold no-underline transition-all duration-300 active:scale-[0.98] ${
                    d.disabled
                      ? 'bg-slate-50 text-slate-400 cursor-not-allowed pointer-events-none'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20'
                  }`}
                  onClick={(e) => { if (d.disabled) e.preventDefault(); }}
                >
                  <Download size={16} className={d.disabled ? '' : 'group-hover/btn:translate-y-0.5 transition-transform duration-300'} />
                  <span>{d.disabled ? t('download.coming_soon') : `${t('download.btn')} ${d.ext}`}</span>
                </a>
                <div className="mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                  {d.version ? `${t('download.version')} ${d.version}` : t('download.coming_soon')}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* macOS Troubleshooting Panel */}
        <div className="max-w-3xl mx-auto bg-white border border-slate-100 shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] rounded-[1.75rem] overflow-hidden">
          <div className="p-5 md:p-6">
            <button
              onClick={() => setShowMacHelp(!showMacHelp)}
              className="w-full flex items-center justify-between text-left font-bold text-slate-700 hover:text-indigo-600 transition-colors cursor-pointer border-none bg-transparent"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-sm border border-indigo-100">
                  <FaApple size={18} />
                </div>
                <span className="text-[15px] sm:text-[16px] font-black">{t('download.troubleshooting.macTitle')}</span>
              </div>
              {showMacHelp ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
            </button>
            
            {showMacHelp && (
              <div className="mt-6 pl-14 border-t border-slate-100 pt-6">
                <p className="text-[14px] text-slate-500 mb-5 leading-relaxed font-medium">
                  {t('download.troubleshooting.macStep1')}
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3.5 text-[13px] font-bold text-slate-700">
                    <div className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-[11px] flex-shrink-0 font-mono font-bold border border-indigo-100">1</div>
                    <span className="mt-0.5">{t('download.troubleshooting.macStep2')}</span>
                  </div>
                  <div className="flex items-start gap-3.5 text-[13px] font-bold text-slate-700">
                    <div className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-[11px] flex-shrink-0 font-mono font-bold border border-indigo-100">2</div>
                    <span className="mt-0.5">{t('download.troubleshooting.macStep3')}</span>
                  </div>
                </div>
                
                {/* Terminal option block */}
                <div className="pt-6 border-t border-slate-100">
                  <p className="text-[11px] font-bold text-indigo-600 uppercase tracking-[0.15em] mb-4 flex items-center gap-1.5 font-mono">
                    <AlertCircle size={14} className="animate-pulse" />
                    {t('download.troubleshooting.macTerminalTitle')}
                  </p>
                  
                  {/* Console Frame */}
                  <div className="bg-slate-900 rounded-2xl p-5 shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-xl rounded-full pointer-events-none" />
                    
                    {/* Header Dots */}
                    <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-3">
                      <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                      <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                      <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                      <span className="text-[10px] font-mono text-slate-500 ml-2">zsh</span>
                    </div>
                    
                    <div className="font-mono text-[13px] leading-relaxed">
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
