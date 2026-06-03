"use client";

import { useTranslation } from 'react-i18next';
import { Download, Check } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import React from 'react';

const Container = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

export const Hero = () => {
  const { t } = useTranslation();
  return (
    <section id="hero" className="pt-16 pb-8 md:pt-20 md:pb-12 overflow-hidden relative">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-center">
          {/* Left copy */}
          <div className="z-10 order-2 md:order-1 text-center md:text-left">
            <h1 className="text-[#111827] dark:text-white font-[900] leading-[1.08] tracking-tight mb-3 text-[28px] sm:text-[36px] lg:text-[44px]">
              {t('hero.title1')}<br />
              {t('hero.title2')}<br />
              {t('hero.title3')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-[13px] sm:text-[14px] leading-relaxed mb-5 max-w-xs mx-auto md:mx-0">
              {t('hero.desc')}
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-2.5 mb-4">
              <a
                href="#download"
                onClick={(e) => { e.preventDefault(); document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="btn-dark !rounded-xl !py-2 !px-5 !text-[12.5px] no-underline"
              >
                <Download size={14} /> {t('hero.getFree')}
              </a>
              <a
                href="https://github.com/helloquocbao/mini-pet"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View MiniPet source code on GitHub"
                className="btn-ghost !rounded-xl !py-2 !px-5 !text-[12.5px]"
              >
                <FaGithub size={14} /> {t('hero.source')}
              </a>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start items-center gap-3.5 text-[11px] font-semibold text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <Check size={12} className="text-green-500" /> {t('hero.noAds')}
              </span>
              <span className="flex items-center gap-1">
                <Check size={12} className="text-green-500" /> {t('hero.noAccount')}
              </span>
              <span className="flex items-center gap-1">
                <Check size={12} className="text-green-500" /> {t('hero.privacy')}
              </span>
            </div>
          </div>

          {/* Right — pet image */}
          <div className="relative flex justify-center items-center order-1 md:order-2 py-2">
            {/* Outer ambient glow (Moved to back) */}
            <div className="absolute inset-[-35%] bg-gradient-to-tr from-blue-300/30 via-purple-300/20 to-pink-300/30 blur-[90px] rounded-full z-0" />

            {/* Circular gradient orb */}
            <div className="hero-orb z-10 w-48 h-48 sm:w-56 sm:h-56">
              {/* Animated Cat Sprite Frame - TOP LAYER */}
              <div
                className="cat-sprite-frame relative z-20 transition-transform duration-500 hover:scale-110"
                style={{ willChange: 'transform' }}
                role="img"
                aria-label="Animated pixel art cat companion"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

