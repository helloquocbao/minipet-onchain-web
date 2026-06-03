"use client";

import { useTranslation } from 'react-i18next';
import { FaGithub } from 'react-icons/fa';
import Link from 'next/link';
import React from 'react';

const Container = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="relative border-t border-gray-200/60 dark:border-white/10 pt-20 pb-12 overflow-hidden bg-transparent">
      {/* Background soft blur */}
      <div className="absolute bottom-[-100px] left-[50%] -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none -z-10" />

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16">
          {/* Logo & Pitch */}
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#111827] dark:bg-white flex items-center justify-center overflow-hidden shadow-lg border border-white/10">
                <img src="/icons/icon.png" alt="MiniPet Logo" className="w-full h-full object-cover pixel-art" width="36" height="36" />
              </div>
              <span className="text-[17px] font-black text-[#111827] dark:text-white tracking-tight">MiniPet</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
              Your lightweight, cute AI-powered desktop pet companion built on Sui network and Walrus storage.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/helloquocbao/mini-pet"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] flex items-center justify-center text-gray-400 hover:text-[#111827] dark:hover:text-white transition-all hover:scale-105 hover:bg-black/[0.06] dark:hover:bg-white/[0.06]"
              >
                <FaGithub size={18} />
              </a>
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">Product</h4>
            <ul className="space-y-3 p-0 list-none m-0">
              <li><Link href="/pet-features" className="text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors no-underline">Features</Link></li>
              <li><Link href="/market" className="text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors no-underline">Pet Market</Link></li>
              <li><Link href="/custom-pet" className="text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors no-underline">Custom Creator</Link></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">Technology</h4>
            <ul className="space-y-3 p-0 list-none m-0">
              <li><a href="https://sui.io" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors no-underline">Sui Blockchain</a></li>
              <li><a href="https://walrus.xyz" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors no-underline">Walrus Storage</a></li>
              <li><a href="https://github.com/helloquocbao/mini-pet" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors no-underline">Open Source</a></li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">Disclaimer</h4>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
              <span className="font-bold text-gray-600 dark:text-gray-300">{t('footer.disclaimer')}</span> {t('footer.disclaimer_text')}
            </p>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-200/60 dark:border-white/5 pt-8 text-center sm:text-left">
          <p className="text-[12px] text-gray-500 dark:text-gray-400 font-semibold m-0">
            © 2026 MiniPet — {t('footer.copyright')}
          </p>
          <div className="flex gap-6 text-[12px] font-semibold text-gray-400">
            <span className="hover:text-indigo-500 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-indigo-500 cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};
