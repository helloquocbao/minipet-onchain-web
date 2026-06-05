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
    <footer className="relative border-t border-slate-100 pt-20 md:pt-24 pb-12 overflow-hidden bg-transparent">
      {/* Background soft blur */}
      <div className="absolute bottom-[-100px] left-[50%] -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-indigo-50 blur-[100px] pointer-events-none -z-10" />

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16">
          {/* Logo & Pitch */}
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center overflow-hidden shadow-sm">
                <img src="/icons/icon.png" alt="MiniPet Logo" className="w-full h-full object-cover pixel-art" width="40" height="40" />
              </div>
              <span className="text-[18px] font-black text-slate-900 tracking-tight">MiniPet</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              Your lightweight, cute AI-powered desktop pet companion built on Sui network and Walrus storage.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/helloquocbao/mini-pet"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-200 transition-all hover:scale-105"
              >
                <FaGithub size={18} />
              </a>
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">Product</h4>
            <ul className="space-y-3 p-0 list-none m-0">
              <li><Link href="/pet-features" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors no-underline">Features</Link></li>
              <li><Link href="/market" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors no-underline">Pet Market</Link></li>
              <li><Link href="/custom-pet" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors no-underline">Custom Creator</Link></li>
              <li><Link href="/roadmap" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors no-underline">Roadmap</Link></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">Technology</h4>
            <ul className="space-y-3 p-0 list-none m-0">
              <li><a href="https://sui.io" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors no-underline">Sui Blockchain</a></li>
              <li><a href="https://walrus.xyz" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors no-underline">Walrus Storage</a></li>
              <li><a href="https://github.com/helloquocbao/mini-pet" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors no-underline">Open Source</a></li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">Disclaimer</h4>
            <p className="text-[12px] text-slate-500 leading-relaxed font-medium">
              <span className="font-bold text-slate-700">{t('footer.disclaimer')}</span> {t('footer.disclaimer_text')}
            </p>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 pt-8 text-center sm:text-left">
          <p className="text-[13px] text-slate-500 font-bold m-0">
            © 2026 MiniPet — {t('footer.copyright')}
          </p>
          <div className="flex gap-6 text-[13px] font-bold text-slate-400">
            <span className="hover:text-indigo-600 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-indigo-600 cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};
