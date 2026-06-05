"use client";

import { useTranslation } from 'react-i18next';
import { Terminal, Send, ArrowRightLeft } from 'lucide-react';
import React from 'react';

export const AutonomousTransactions = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('vi') ? 'vi' : 'en';

  return (
    <section className="pb-12 md:pb-32 bg-transparent relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        <div className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-[2.5rem] p-8 md:p-12 shadow-[0_8px_40px_-12px_rgba(79,70,229,0.15)] relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row gap-12 items-center relative z-10">
            
            {/* Left Content */}
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 mb-2">
                <ArrowRightLeft size={24} />
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                {lang === 'vi' ? 'Giao Dịch Tự Động Thay Chủ Nhân' : 'Autonomous On-Chain Transactions'}
              </h2>
              <p className="text-slate-500 text-[15px] sm:text-[16px] leading-relaxed">
                {lang === 'vi' 
                  ? 'Bỏ qua các bước rườm rà. Chỉ cần nói với Pet của bạn bằng ngôn ngữ tự nhiên, ví dụ: "Đổi 50 SUI sang USDC". AI sẽ tự động phân tích ý định, khởi tạo Programmable Transaction Block (PTB) trên SUI, tìm tuyến đường (route) hoán đổi tối ưu nhất và thực thi ngay lập tức.'
                  : 'Skip the complex UI. Just tell your Pet in natural language: "Swap 50 SUI to USDC". The AI instantly parses the intent, compiles a Programmable Transaction Block (PTB) on SUI, finds the optimal routing, and executes the trade securely.'}
              </p>
              
              <ul className="space-y-3 pt-4">
                <li className="flex items-center gap-3 text-[14px] font-bold text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">✓</div>
                  {lang === 'vi' ? 'Giao tiếp bằng ngôn ngữ tự nhiên' : 'Understands Natural Language'}
                </li>
                <li className="flex items-center gap-3 text-[14px] font-bold text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">✓</div>
                  {lang === 'vi' ? 'Tối ưu hóa phí gas và trượt giá (Slippage)' : 'Optimizes Gas & Slippage Rates'}
                </li>
                <li className="flex items-center gap-3 text-[14px] font-bold text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">✓</div>
                  {lang === 'vi' ? 'Sử dụng SUI Move PTB (Giao dịch gộp)' : 'Leverages SUI Move PTBs'}
                </li>
              </ul>
            </div>
            
            {/* Right Interactive Mockup */}
            <div className="flex-1 w-full max-w-md mx-auto">
              <div className="bg-slate-900 rounded-[2rem] p-6 shadow-2xl relative border border-slate-800 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                <div className="absolute top-4 right-4 flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                </div>
                
                <div className="flex items-center gap-3 mb-8 border-b border-slate-800 pb-4 mt-2">
                  <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                    <Terminal size={18} className="text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-[14px] font-bold text-white">Agent Shell</p>
                    <p className="text-[11px] font-mono text-emerald-400">Connected to SUI Mainnet</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6 relative">
                  <div className="absolute left-4 top-4 bottom-4 w-px bg-slate-800 -z-10" />
                  
                  {/* User Message */}
                  <div className="bg-slate-800 text-slate-200 text-[13px] p-3.5 rounded-2xl rounded-tl-sm w-[85%] border border-slate-700 shadow-sm relative ml-8">
                    <div className="absolute -left-10 top-2 w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-bold text-white">U</div>
                    Swap 50 SUI to USDC via Cetus
                  </div>
                  
                  {/* AI Response */}
                  <div className="bg-indigo-600 text-white text-[13px] p-4 rounded-2xl rounded-tr-sm w-[90%] ml-auto border border-indigo-500 shadow-md relative mt-4">
                    <div className="absolute -right-2 top-2 w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                    <p className="font-mono text-[11px] text-indigo-200 mb-2 border-b border-indigo-500/50 pb-2">Analyzing Intent... Building PTB</p>
                    <div className="space-y-1.5 mb-3 font-mono text-[12px]">
                      <div className="flex justify-between items-center bg-indigo-700/50 p-2 rounded-lg">
                        <span className="opacity-80">Route</span>
                        <span className="font-bold text-emerald-300">Cetus Pool</span>
                      </div>
                      <div className="flex justify-between items-center bg-indigo-700/50 p-2 rounded-lg">
                        <span className="opacity-80">Est. Received</span>
                        <span className="font-bold">~42.8 USDC</span>
                      </div>
                    </div>
                    <button className="w-full py-2 bg-white text-indigo-600 rounded-xl font-bold text-[12px] flex items-center justify-center gap-2 hover:bg-indigo-50 transition-colors">
                      <Send size={14} /> Execute Transaction
                    </button>
                  </div>
                </div>

              </div>
            </div>
            
          </div>
        </div>
        
      </div>
    </section>
  );
};
