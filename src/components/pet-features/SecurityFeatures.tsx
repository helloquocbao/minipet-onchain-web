"use client";

import { useTranslation } from 'react-i18next';
import { ShieldAlert, Fingerprint, Lock, Activity } from 'lucide-react';
import React from 'react';

export const SecurityFeatures = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('vi') ? 'vi' : 'en';

  return (
    <section className="pb-10 md:pb-24 bg-transparent relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Scam Warning Feature */}
        <div className="flex flex-col md:flex-row gap-10 lg:gap-16 items-center mb-24">
          <div className="flex-1 space-y-5 order-2 md:order-1">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 border border-rose-100 shadow-sm">
              <ShieldAlert size={24} />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
              {lang === 'vi' ? 'Cảnh Báo Lừa Đảo Trực Tiếp' : 'Real-Time Phishing Detection'}
            </h2>
            <p className="text-slate-500 text-[14px] sm:text-[15px] leading-relaxed">
              {lang === 'vi' 
                ? 'Mỗi giao dịch hoặc đường link bạn click vào đều được AI quét qua cơ sở dữ liệu các hợp đồng độc hại trên SUI. Nếu phát hiện rủi ro, Pet sẽ lập tức cảnh báo để bảo vệ tài sản của bạn.'
                : 'Every transaction or link you interact with is pre-scanned against a database of malicious smart contracts on SUI. If a risk is detected, your Pet immediately alerts you.'}
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 text-[12px] font-bold text-rose-600 bg-rose-50 border border-rose-100 px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                {lang === 'vi' ? 'Cảnh báo mã độc' : 'Malicious Code Alert'}
              </span>
            </div>
          </div>
          
          <div className="flex-1 w-full max-w-md mx-auto order-1 md:order-2">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_8px_40px_-5px_rgba(0,0,0,0.08)] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 blur-2xl rounded-full -z-10" />
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 mb-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-100/50 flex-shrink-0 flex items-center justify-center">
                  <Fingerprint size={18} className="text-indigo-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-bold text-slate-900 truncate">Approve Transaction</p>
                  <p className="text-[11px] text-slate-500 font-mono truncate">0x4f...9d2a::nft::mint</p>
                </div>
              </div>
              
              <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4 shadow-sm relative transform transition-transform group-hover:scale-[1.02]">
                <div className="flex items-start gap-3">
                  <ShieldAlert size={20} className="text-rose-500 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-[13px] font-black text-rose-700 mb-1">
                      {lang === 'vi' ? 'Phát hiện Hợp đồng Lừa đảo!' : 'Phishing Contract Detected!'}
                    </h4>
                    <p className="text-[12px] text-rose-600/80 leading-relaxed font-medium">
                      {lang === 'vi' 
                        ? 'Hợp đồng này có dấu hiệu rút cạn tài sản (Drainer). Bạn nên huỷ giao dịch.' 
                        : 'This contract exhibits wallet-drainer signatures. You should reject this transaction.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Safe Wallet Check Feature */}
        <div className="flex flex-col md:flex-row gap-10 lg:gap-16 items-center">
          <div className="flex-1 w-full max-w-md mx-auto">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_8px_40px_-5px_rgba(0,0,0,0.08)] relative overflow-hidden group">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/10 blur-2xl rounded-full -z-10" />
              
              <div className="space-y-3">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-[14px] font-black text-slate-900">Wallet Health Scan</h4>
                  <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full uppercase tracking-wider">Secure</span>
                </div>
                
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center justify-between transition-colors hover:border-emerald-200">
                  <div className="flex items-center gap-3">
                    <Lock size={16} className="text-slate-400" />
                    <span className="text-[13px] font-bold text-slate-700">Token Approvals</span>
                  </div>
                  <span className="text-[12px] font-mono text-slate-500">0 Active</span>
                </div>
                
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center justify-between transition-colors hover:border-emerald-200">
                  <div className="flex items-center gap-3">
                    <Activity size={16} className="text-slate-400" />
                    <span className="text-[13px] font-bold text-slate-700">Dusting Attacks</span>
                  </div>
                  <span className="text-[12px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">Clean</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-5">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-sm">
              <Lock size={24} />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
              {lang === 'vi' ? 'Kiểm Tra An Toàn Ví Toàn Diện' : 'Comprehensive Wallet Health Check'}
            </h2>
            <p className="text-slate-500 text-[14px] sm:text-[15px] leading-relaxed">
              {lang === 'vi' 
                ? 'MiniPet liên tục theo dõi các quyền truy cập (approvals) mà bạn đã cấp, phát hiện các token rác (dusting attacks) và thu hồi quyền truy cập từ các hợp đồng không sử dụng để đảm bảo ví của bạn luôn ở trạng thái an toàn tuyệt đối.'
                : 'MiniPet continuously monitors your token approvals, detects dusting attacks, and prompts you to revoke permissions from unused contracts to ensure your wallet remains perfectly secure.'}
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 text-[12px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {lang === 'vi' ? 'Bảo mật 24/7' : '24/7 Monitoring'}
              </span>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};
