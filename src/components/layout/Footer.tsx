"use client";

import { useTranslation } from 'react-i18next';
import { FaGithub } from 'react-icons/fa';
import React from 'react';

const Container = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="pt-12 pb-10">
      <Container>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-gray-200/60 dark:border-white/10 pt-8">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#111827] dark:bg-white flex items-center justify-center overflow-hidden">
              <img src="/icons/icon.png" alt="MiniPet Logo Small" className="w-full h-full object-cover pixel-art" width="32" height="32" loading="lazy" decoding="async" />
            </div>
            <span className="text-[15px] font-black text-[#111827] dark:text-white tracking-tight">MiniPet</span>
          </div>

          {/* Social icons */}
          <div className="flex gap-6">
            <a
              href="https://github.com/helloquocbao/mini-pet"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our GitHub repository"
              className="text-gray-400 hover:text-[#111827] dark:hover:text-white transition-all hover:scale-110"
            >
              <FaGithub size={20} />
            </a>
          </div>

          {/* Disclaimer */}
          <div className="max-w-2xl text-center sm:text-left">
            <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
              <span className="font-bold text-gray-600 dark:text-gray-300">{t('footer.disclaimer')}</span> {t('footer.disclaimer_text')}
            </p>
          </div>

          {/* Copyright */}
          <p className="text-[12px] text-gray-500 dark:text-gray-400 font-semibold flex-shrink-0">
            © 2026 MiniPet — {t('footer.copyright')}
          </p>
        </div>
      </Container>
    </footer>
  );
};
