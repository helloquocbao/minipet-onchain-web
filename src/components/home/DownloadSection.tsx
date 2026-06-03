"use client";

import { useTranslation } from 'react-i18next';
import { Download } from 'lucide-react';
import { FaApple, FaWindows } from 'react-icons/fa';
import React from 'react';

const Container = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

export const DownloadSection = () => {
  const { t } = useTranslation();
  const downloads = [
    {
      platform: 'macOS',
      icon: <FaApple size={24} />,
      version: 'v1.0.0',
      ext: '.dmg',
      link: 'https://github.com/helloquocbao/mini-pet/releases/download/v1.0.0/MiniPet-v1.0.0.dmg',
      desc: t('download.macDesc'),
      color: 'bg-gray-100 dark:bg-gray-800'
    },
    {
      platform: 'Windows',
      icon: <FaWindows size={24} />,
      version: 'v1.0.0',
      ext: '.exe',
      link: '#',
      desc: t('download.winExeDesc'),
      color: 'bg-blue-50 dark:bg-blue-900/20',
      disabled: true
    },
    {
      platform: 'Windows',
      icon: <FaWindows size={24} />,
      version: 'v1.0.0',
      ext: '.zip',
      link: 'https://github.com/helloquocbao/mini-pet/releases/download/v1.0.0/MiniPet-v1.0.0-Portable.zip',
      desc: t('download.winZipDesc'),
      color: 'bg-indigo-50 dark:bg-indigo-900/20'
    }
  ];

  return (
    <section id="download" className="py-10 md:py-14 bg-white/30 dark:bg-black/10">
      <Container>
        <div className="text-center mb-8">
          <h2 className="text-[22px] sm:text-[28px] md:text-[32px] font-[900] text-[#111827] dark:text-white tracking-tight mb-2">
            {t('download.title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-[13px] sm:text-[14px] max-w-md mx-auto">
            {t('download.desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {downloads.map((d, idx) => (
            <div key={idx} className="card p-6 flex flex-col items-center text-center group">
              <div className={`w-12 h-12 rounded-xl ${d.color} flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300`}>
                <div className="text-[#111827] dark:text-white">
                  {d.icon}
                </div>
              </div>
              <h3 className="text-[18px] font-black text-[#111827] dark:text-white mb-1">{d.platform}</h3>
              <p className="text-[12px] text-gray-500 dark:text-gray-400 mb-5 sm:whitespace-nowrap">{d.desc}</p>

              <div className="w-full pt-4 border-t border-gray-100 dark:border-gray-800">
                <a
                  href={d.disabled ? "#download" : d.link}
                  aria-label={d.disabled ? `Coming Soon: MiniPet for ${d.platform} (${d.ext})` : `Download MiniPet for ${d.platform} (${d.ext})`}
                  className={`btn-dark w-full !justify-center !py-2.5 !rounded-xl flex items-center gap-2 group/btn no-underline ${d.disabled ? 'opacity-40 grayscale select-none' : ''}`}
                  onClick={(e) => { if (d.disabled) e.preventDefault(); }}
                >
                  <Download size={16} className={d.disabled ? '' : 'group-hover/btn:translate-y-0.5 transition-transform'} />
                  {d.disabled ? t('download.coming_soon') : `${t('download.btn')} ${d.ext}`}
                </a>
                <div className="mt-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  {t('download.version')} {d.version}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* macOS Troubleshooting */}
        <div className="mt-10 max-w-3xl mx-auto bg-indigo-50/50 dark:bg-indigo-900/10 rounded-3xl p-5 md:p-6 border border-indigo-100/50 dark:border-indigo-500/20 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-lg bg-indigo-500 text-white flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-500/20">
              <FaApple size={16} />
            </div>
            <div className="flex-1">
              <h3 className="text-[15px] font-black text-[#111827] dark:text-white mb-1.5">
                {t('download.troubleshooting.macTitle')}
              </h3>
              <p className="text-[12.5px] text-gray-500 dark:text-gray-400 mb-3 leading-relaxed">
                {t('download.troubleshooting.macStep1')}
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-2.5 text-[12px] font-bold text-gray-600 dark:text-gray-300">
                  <div className="w-4.5 h-4.5 rounded-full bg-indigo-100 dark:bg-indigo-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-[9px] mt-0.5 flex-shrink-0">1</div>
                  <span>{t('download.troubleshooting.macStep2')}</span>
                </div>
                <div className="flex items-start gap-2.5 text-[12px] font-bold text-gray-600 dark:text-gray-300">
                  <div className="w-4.5 h-4.5 rounded-full bg-indigo-100 dark:bg-indigo-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-[9px] mt-0.5 flex-shrink-0">2</div>
                  <span>{t('download.troubleshooting.macStep3')}</span>
                </div>
              </div>

              {/* Terminal Backup Option */}
              <div className="mt-5 pt-5 border-t border-indigo-100 dark:border-indigo-900/30">
                <p className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                  {t('download.troubleshooting.macTerminalTitle')}
                </p>
                <div className="bg-[#1a1b26] rounded-xl p-4 border border-white/5 shadow-2xl shadow-indigo-500/10 group relative">
                  {/* Terminal Header Dots */}
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="w-2 h-2 rounded-full bg-[#ff5f56]" />
                    <div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                    <div className="w-2 h-2 rounded-full bg-[#27c93f]" />
                  </div>
                  <div className="font-mono text-[11.5px] leading-relaxed">
                    <div className="text-slate-400 mb-1.5"># {t('download.troubleshooting.macTerminalStep').split(':')[0]}:</div>
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold shrink-0">$</span>
                      <code className="text-indigo-200 break-all">
                        {t('download.troubleshooting.macTerminalStep').split(':')[1]?.trim() || t('download.troubleshooting.macTerminalStep')}
                      </code>
                    </div>
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

