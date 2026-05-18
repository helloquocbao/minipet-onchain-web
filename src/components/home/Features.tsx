import { useTranslation } from 'react-i18next';
import { Clock } from 'lucide-react';
import React from 'react';

const Container = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

export const Features = () => {
  const { t } = useTranslation();
  return (
    <section id="features" className="py-20 bg-gray-50/50 dark:bg-black/5 relative">
      <Container>
        {/* Section header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-[28px] sm:text-[34px] md:text-[40px] font-[900] text-[#111827] dark:text-white tracking-tight leading-tight mb-3">
            {t('features.badge')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-[15px] sm:text-[16px] max-w-md mx-auto leading-relaxed">
            {t('features.desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {/* Top 2 Cards: Main Features */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {/* ── Desktop Companion ── */}
            <div className="card overflow-hidden flex flex-col">
              <div
                className="flex-1 bg-gradient-to-br from-[#dde8ff] to-[#cdd8f8] flex items-center justify-center overflow-hidden"
                style={{ minHeight: 160 }}
              >
                <img
                  src="/feature-companion.png"
                  alt="Live Desktop Companion featuring a cute pet"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  width="400"
                  height="240"
                />
              </div>
              <div className="p-4 md:p-6">
                <h3 className="text-[17px] font-extrabold text-[#111827] dark:text-white mb-1.5">{t('features.companion.title')}</h3>
                <p className="text-[13px] text-gray-600 dark:text-gray-400 leading-relaxed max-w-sm">
                  {t('features.companion.desc')}
                </p>
              </div>
            </div>

            {/* ── Pomodoro Timer ── */}
            <div className="card overflow-hidden flex flex-col">
              {/* Image fills remaining space */}
              <div className="relative flex-1 overflow-hidden bg-gradient-to-br from-rose-50 to-orange-50" style={{ minHeight: 160 }}>
                <img
                  src="/card-pomodoro.png"
                  alt="Pomodoro Timer interface with a focused pet"
                  className="w-full h-full object-cover pixel-art"
                  style={{ mixBlendMode: 'multiply' }}
                  loading="lazy"
                  decoding="async"
                  width="400"
                  height="240"
                />
                {/* Timer pill */}
                <div className="absolute top-3 left-3 bg-rose-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow flex items-center gap-1">
                  <Clock size={9} /> 25:00
                </div>
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[9px] font-semibold text-gray-600 px-2 py-0.5 rounded-full shadow-sm">{t('features.focus_mode')}</div>
              </div>
              {/* Text always at bottom */}
              <div className="p-4 md:p-6 border-t border-gray-100/80">
                <h3 className="text-[15px] font-extrabold text-[#111827] mb-1.5">{t('features.pomodoro.title')}</h3>
                <p className="text-[13px] text-gray-600 dark:text-gray-400 leading-relaxed max-w-sm">
                  {t('features.pomodoro.desc')}
                </p>
              </div>
            </div>
          </div>

          {/* Side Card: Multi-Pet Support */}
          <div className="md:col-span-1 card overflow-hidden flex flex-col group">
            <div className="flex-1 relative bg-[#f1f4ff] dark:bg-indigo-900/10 overflow-hidden min-h-[220px]">
              <div className="absolute inset-0 flex items-center justify-center p-8 transition-transform duration-700 group-hover:scale-110">
                <img
                  src="/card-context.png"
                  alt="Multiple MiniPet characters interacting on a desktop"
                  className="w-full h-full object-contain"
                  loading="lazy"
                  decoding="async"
                  width="300"
                  height="300"
                />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-[16px] font-extrabold text-[#111827] dark:text-white mb-1.5">{t('features.multi.title')}</h3>
              <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed">
                {t('features.multi.desc')}
              </p>
            </div>
          </div>

          {/* Bottom 2 Cards: Interaction & PetDex */}
          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {/* ── File Eating System ── */}
            <div className="card overflow-hidden flex items-center bg-amber-50/30 dark:bg-amber-900/5 group">
              <div className="w-1/3 h-full relative overflow-hidden flex items-center justify-center">
                <img
                  src="/card-overlay.png"
                  alt="Interactive file eating system illustration"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                  width="200"
                  height="200"
                />
              </div>
              <div className="p-6 w-2/3">
                <h3 className="text-[17px] font-extrabold text-[#111827] dark:text-white mb-1.5">{t('features.eating.title')}</h3>
                <p className="text-[13px] text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t('features.eating.desc')}
                </p>
              </div>
            </div>

            {/* ── PetDex & Custom Pets ── */}
            <div className="card overflow-hidden flex items-center bg-indigo-50/30 dark:bg-indigo-900/5 group">
              <div className="w-1/3 h-full relative overflow-hidden flex items-center justify-center">
                <img
                  src="/card-petdex.png"
                  alt="PetDex library showing various custom pets"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                  width="200"
                  height="200"
                />
              </div>
              <div className="p-6 w-2/3">
                <h3 className="text-[17px] font-extrabold text-[#111827] dark:text-white mb-1.5">{t('features.custom.title')}</h3>
                <p className="text-[13px] text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t('features.custom.desc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
