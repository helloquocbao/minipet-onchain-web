"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Monitor } from 'lucide-react';
import { FaApple, FaWindows } from 'react-icons/fa';

export const DownloadCTA = () => {
  const { i18n } = useTranslation();

  return (
    <div className="bg-gradient-to-r from-indigo-600/90 to-purple-600/90 backdrop-blur-md rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-white/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.12),transparent_60%)] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-[80px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      
      <div className="relative max-w-xl text-center md:text-left">
        <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-2.5 py-0.5 rounded-md text-[9px] font-extrabold tracking-widest uppercase mb-3 border border-white/5">
          <Monitor size={10} />
          {i18n.language === 'vi' ? 'Sẵn sàng trải nghiệm?' : 'Ready to start?'}
        </div>
        <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-tight mb-2 text-white">
          {i18n.language === 'vi' ? 'Nhận MiniPet ngay hôm nay!' : 'Adopt your screen pet today!'}
        </h2>
        <p className="text-[12.5px] text-indigo-100/90 leading-relaxed font-medium">
          {i18n.language === 'vi' 
            ? 'MiniPet hoàn toàn miễn phí, mã nguồn mở và hoạt động riêng tư. Tải bản cài đặt cho macOS hoặc Windows và kết nối với người bạn mới.'
            : 'MiniPet is 100% free, open-source, and private. Download for macOS or Windows and start walking alongside your new companion.'}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0 relative">
        <a
          href="https://github.com/helloquocbao/mini-pet/releases/download/v1.0.0/MiniPet-v1.0.0.dmg"
          className="bg-white hover:bg-gray-50 text-indigo-900 py-2.5 px-5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all hover:scale-102 hover:-translate-y-0.5 active:scale-98 shadow-sm no-underline cursor-pointer"
        >
          <FaApple size={16} />
          <span>macOS (.dmg)</span>
        </a>
        <a
          href="https://github.com/helloquocbao/mini-pet/releases/download/v1.0.0/MiniPet-v1.0.0-Portable.zip"
          className="bg-indigo-800/80 hover:bg-indigo-900/95 text-white py-2.5 px-5 rounded-xl font-bold text-xs border border-indigo-600/50 flex items-center justify-center gap-2 transition-all hover:scale-102 hover:-translate-y-0.5 active:scale-98 shadow-sm no-underline cursor-pointer"
        >
          <FaWindows size={16} />
          <span>Windows (.zip)</span>
        </a>
      </div>
    </div>
  );
};
