"use client";

import { useTranslation } from 'react-i18next';
import { ShieldCheck, Zap, Sparkles } from 'lucide-react';
import React from 'react';

export const AgentHero = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('vi') ? 'vi' : 'en';

  return (
    <section className="pt-16 pb-10 md:pt-24 md:pb-20 bg-transparent relative overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-indigo-50/80 rounded-full blur-[100px] pointer-events-none -z-10" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[10px] font-bold uppercase tracking-wider text-indigo-600 mb-6">
            <Sparkles size={12} className="text-indigo-500" />
            <span>{lang === 'vi' ? 'Sức mạnh Web3 AI' : 'Web3 AI Power'}</span>
          </div>
          
          <h1 className="text-[36px] sm:text-[48px] lg:text-[56px] font-[900] text-slate-900 tracking-tight leading-[1.1] mb-6 max-w-3xl mx-auto">
            {lang === 'vi' ? (
              <>Vệ sĩ thông minh của bạn<br />trên không gian <span className="text-indigo-600">On-Chain</span>.</>
            ) : (
              <>Your intelligent guardian<br />for the <span className="text-indigo-600">On-Chain</span> space.</>
            )}
          </h1>
          
          <p className="text-slate-500 text-[15px] sm:text-[17px] leading-relaxed max-w-2xl mx-auto font-medium mb-10">
            {lang === 'vi' 
              ? 'Không chỉ là một thú cưng ảo, MiniPet là một AI Agent được huấn luyện đặc biệt để bảo vệ tài sản, rà soát mã nguồn thông minh, và giao dịch tự động thay bạn.'
              : 'More than just a virtual pet, MiniPet is a specialized AI Agent trained to protect assets, audit smart contracts, and execute transactions autonomously on your behalf.'}
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-[12px] font-bold text-slate-600 tracking-wider uppercase font-mono">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-emerald-500" />
              <span>{lang === 'vi' ? 'Cảnh báo lừa đảo' : 'Phishing Detection'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-amber-500" />
              <span>{lang === 'vi' ? 'Tự động giao dịch' : 'Autonomous Trading'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
