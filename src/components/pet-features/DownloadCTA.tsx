"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Monitor } from 'lucide-react';
import { FaApple, FaWindows } from 'react-icons/fa';

export const DownloadCTA = () => {
  const { i18n } = useTranslation();

  return (
    <div className="card p-10 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-br from-indigo-500 to-indigo-700 text-white border-none shadow-2xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.15),transparent_60%)] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[80px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      
      <div className="relative max-w-xl text-center md:text-left">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-extrabold tracking-widest uppercase mb-4">
          <Monitor size={12} />
          {i18n.language === 'vi' ? 'Sẵn sàng trải nghiệm?' : 'Ready to start?'}
        </div>
        <h2 className="text-[26px] sm:text-[32px] font-black tracking-tight leading-tight mb-3">
          {i18n.language === 'vi' ? 'Nhận MiniPet ngay hôm nay!' : 'Adopt your screen pet today!'}
        </h2>
        <p className="text-[13.5px] text-indigo-100 leading-relaxed">
          {i18n.language === 'vi' 
            ? 'MiniPet hoàn toàn miễn phí, mã nguồn mở và hoạt động riêng tư. Tải bản cài đặt cho macOS hoặc Windows và kết nối với người bạn mới.'
            : 'MiniPet is 100% free, open-source, and private. Download for macOS or Windows and start walking alongside your new companion.'}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3.5 w-full md:w-auto shrink-0 relative">
        <a
          href="https://github.com/helloquocbao/mini-pet/releases/download/v1.0.0/MiniPet-v1.0.0.dmg"
          className="bg-white hover:bg-gray-50 text-indigo-900 py-3.5 px-6 rounded-2xl font-black text-[13px] flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 active:scale-98 shadow-lg no-underline"
        >
          <FaApple size={18} />
          <span>macOS (.dmg)</span>
        </a>
        <a
          href="https://github.com/helloquocbao/mini-pet/releases/download/v1.0.0/MiniPet-v1.0.0-Portable.zip"
          className="bg-indigo-800 hover:bg-indigo-900 text-white py-3.5 px-6 rounded-2xl font-black text-[13px] border border-indigo-600 flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 active:scale-98 shadow-lg no-underline"
        >
          <FaWindows size={18} />
          <span>Windows (.zip)</span>
        </a>
      </div>
    </div>
  );
};
