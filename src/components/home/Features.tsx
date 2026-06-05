"use client";

import { useTranslation } from 'react-i18next';
import { 
  Clock, Cpu, Shield, Coins, Terminal, FileText, Database, 
  LogIn, Laptop, Send, ShieldCheck
} from 'lucide-react';
import { FaGoogle } from 'react-icons/fa';
import React from 'react';

const Container = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

export const Features = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith('vi') ? 'vi' : 'en';

  return (
    <section id="features" className="pb-20 md:pb-24 bg-transparent relative">
      {/* Visual background separation lines */}
      <div className="section-divider" />

      <Container className="pt-20 md:pt-24">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700/60 text-[9.5px] font-bold uppercase tracking-wider text-slate-600 dark:text-zinc-300 mb-4">
            <Laptop size={11} className="text-slate-500 dark:text-zinc-400" />
            <span>Tauri Desktop Companion & On-Chain Integration</span>
          </div>
          <h2 className="text-[28px] sm:text-[38px] font-black text-gray-900 dark:text-white tracking-tight leading-tight mb-4">
            {lang === 'vi' ? 'Tổng Quan Chức Năng Trên Desktop & On-Chain' : 'Desktop Interface & On-Chain Overview'}
          </h2>
          <p className="text-gray-500 dark:text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {lang === 'vi' 
              ? 'Trải nghiệm sự kết hợp mượt mà giữa hoạt ảnh thú cưng trực quan ngay trên màn hình máy tính của bạn và các giao thức giao dịch, bảo mật ví on-chain trên mạng lưới SUI.'
              : 'Experience a seamless fusion between interactive desktop animations and robust on-chain transaction protocols powered by the SUI blockchain.'}
          </p>
        </div>

        {/* Dynamic Command Center Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto mb-28">
          
          {/* Left Column: On-Chain Capabilities Overview */}
          <div className="lg:col-span-5 flex flex-col gap-4 justify-center">
            
            {/* Card 1: AI Agent */}
            <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800/80 shadow-sm relative group hover:border-slate-350 dark:hover:border-zinc-700 transition-all duration-200">
              <div className="flex gap-4">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-slate-50 dark:bg-zinc-800 border border-slate-100 dark:border-zinc-700 text-slate-600 dark:text-zinc-350">
                  <Cpu size={16} />
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-gray-900 dark:text-white transition-colors">
                    {t('features.companion.title')}
                  </h3>
                  <p className="text-[11.5px] text-gray-500 dark:text-zinc-400 leading-relaxed mt-1">
                    {lang === 'vi' ? 'Trợ lý AI tự ký duyệt giao dịch, hoán đổi tài sản trực tiếp từ ô chat.' : 'Query balances, swap assets, and sign transactions instantly from chat.'}
                  </p>
                  <span className="inline-block mt-3 text-[8px] font-mono font-bold text-slate-500 dark:text-zinc-400 bg-slate-50 dark:bg-zinc-800/60 border border-slate-200/50 dark:border-zinc-800 px-2 py-0.5 rounded">
                    SUI MOVE PTB / DESKTOP CHAT
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2: zkLogin Wallet */}
            <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800/80 shadow-sm relative group hover:border-slate-350 dark:hover:border-zinc-700 transition-all duration-200">
              <div className="flex gap-4">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-slate-50 dark:bg-zinc-800 border border-slate-100 dark:border-zinc-700 text-slate-600 dark:text-zinc-350">
                  <LogIn size={16} />
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-gray-900 dark:text-white transition-colors">
                    {lang === 'vi' ? 'Đồng Bộ Ví zkLogin Tiện Lợi' : 'zkLogin Wallet Authentication'}
                  </h3>
                  <p className="text-[11.5px] text-gray-500 dark:text-zinc-400 leading-relaxed mt-1">
                    {lang === 'vi' 
                      ? 'Kết nối ví an toàn bằng tài khoản Google. Ký giao dịch ngoại tuyến trực tiếp qua Google OAuth.'
                      : 'Securely sync your wallet using Google zkLogin. Authenticate and execute transactions without writing down seed phrases.'}
                  </p>
                  <span className="inline-block mt-3 text-[8px] font-mono font-bold text-slate-500 dark:text-zinc-400 bg-slate-50 dark:bg-zinc-800/60 border border-slate-200/50 dark:border-zinc-800 px-2 py-0.5 rounded">
                    GOOGLE OAUTH / zkLOGIN
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3: Custom Minting & Walrus */}
            <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800/80 shadow-sm relative group hover:border-slate-350 dark:hover:border-zinc-700 transition-all duration-200">
              <div className="flex gap-4">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-slate-50 dark:bg-zinc-800 border border-slate-100 dark:border-zinc-700 text-slate-600 dark:text-zinc-350">
                  <Coins size={16} />
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-gray-900 dark:text-white transition-colors">
                    {t('features.custom.title')}
                  </h3>
                  <p className="text-[11.5px] text-gray-500 dark:text-zinc-400 leading-relaxed mt-1">
                    {lang === 'vi' ? 'Tự thiết kế pet cục bộ, tải dữ liệu lên Walrus và đúc thành Sui NFT.' : 'Design custom pet locally, load metadata to Walrus and mint as a Sui NFT.'}
                  </p>
                  <span className="inline-block mt-3 text-[8px] font-mono font-bold text-slate-500 dark:text-zinc-400 bg-slate-50 dark:bg-zinc-800/60 border border-slate-200/50 dark:border-zinc-800 px-2 py-0.5 rounded">
                    WALRUS PROTOCOL / SUI NFT
                  </span>
                </div>
              </div>
            </div>

            {/* Card 4: Focus-to-Earn */}
            <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800/80 shadow-sm relative group hover:border-slate-350 dark:hover:border-zinc-700 transition-all duration-200">
              <div className="flex gap-4">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-slate-50 dark:bg-zinc-800 border border-slate-100 dark:border-zinc-700 text-slate-600 dark:text-zinc-350">
                  <Clock size={16} />
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-gray-900 dark:text-white transition-colors">
                    {t('features.pomodoro.title')}
                  </h3>
                  <p className="text-[11.5px] text-gray-500 dark:text-zinc-400 leading-relaxed mt-1">
                    {lang === 'vi' ? 'Làm việc tập trung cùng thú cưng để khai thác token tiện ích MIPET on-chain.' : 'Execute focus cycles beside your pet and earn MIPET token yield directly on SUI.'}
                  </p>
                  <span className="inline-block mt-3 text-[8px] font-mono font-bold text-slate-500 dark:text-zinc-400 bg-slate-50 dark:bg-zinc-800/60 border border-slate-200/50 dark:border-zinc-800 px-2 py-0.5 rounded">
                    POMODORO YIELD / MIPET MINE
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Unified macOS App Simulator */}
          <div className="lg:col-span-7 flex items-center justify-center relative">
            <div className="absolute w-[95%] h-[95%] bg-indigo-500/[0.02] blur-[100px] rounded-full -z-10" />
            
            {/* macOS Window Shell */}
            <div className="w-full bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 shadow-xl rounded-2xl overflow-hidden flex flex-col transition-all duration-300 min-h-[480px]">
              
              {/* Window Header Title Bar */}
              <div className="bg-slate-50 dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800 px-4 py-3 flex items-center gap-4 text-xs font-medium">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                </div>
                <span className="text-gray-400 font-mono text-[9.5px] tracking-widest font-bold">minipet.app</span>
                <span className="ml-auto flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500 text-[8.5px] font-bold uppercase font-mono tracking-wider">
                  Client Connected
                </span>
              </div>

              {/* Window Workspace Content Area */}
              <div className="flex flex-1 items-stretch divide-x divide-slate-200 dark:divide-zinc-800">
                
                {/* 1. Left App Sidebar */}
                <div className="w-[190px] sm:w-[220px] bg-slate-50/50 dark:bg-zinc-900/20 p-4 flex flex-col gap-5 select-none shrink-0">
                  
                  {/* zkLogin Wallet section */}
                  <div className="space-y-2">
                    <span className="text-[8.5px] font-bold text-gray-400 uppercase tracking-widest block">Wallet (zkLogin)</span>
                    <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800/80 rounded-lg p-2.5 shadow-sm space-y-1.5 font-mono text-[9px]">
                      <div className="flex items-center gap-1 text-slate-700 dark:text-zinc-300">
                        <FaGoogle className="text-amber-500 shrink-0" size={10} />
                        <span className="font-bold truncate">Google Login</span>
                      </div>
                      <div className="text-gray-400 truncate">0x9a2c...8f2b</div>
                      <div className="font-bold text-slate-900 dark:text-white border-t border-slate-100 dark:border-zinc-800 pt-1.5 mt-1.5 flex justify-between">
                        <span>Balance:</span>
                        <span className="text-emerald-500">24.5 SUI</span>
                      </div>
                    </div>
                  </div>

                  {/* Pomodoro Yield status */}
                  <div className="space-y-2">
                    <span className="text-[8.5px] font-bold text-gray-400 uppercase tracking-widest block">Pomodoro Miner</span>
                    <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800/80 rounded-lg p-2.5 shadow-sm flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full border-2 border-rose-500/20 flex items-center justify-center shrink-0">
                        <Clock size={11} className="text-rose-500" />
                      </div>
                      <div className="font-mono text-[9px]">
                        <span className="font-bold text-rose-500 block leading-none">24:15</span>
                        <span className="text-[7.5px] text-emerald-500 font-extrabold mt-0.5 block leading-none">+12.4 MIPET</span>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Cleaner */}
                  <div className="space-y-2">
                    <span className="text-[8.5px] font-bold text-gray-400 uppercase tracking-widest block">Trash devourer</span>
                    <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800/80 rounded-lg p-2.5 shadow-sm space-y-2">
                      <div className="flex items-center gap-1.5 text-[9px] text-amber-600 dark:text-amber-400 font-bold font-mono truncate">
                        <FileText size={10} />
                        <span>cache.tmp (1.2GB)</span>
                      </div>
                      <button className="w-full py-1 text-center bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 font-mono font-black text-[8px] rounded hover:bg-amber-500/15 transition-colors cursor-default">
                        DEVOUR
                      </button>
                    </div>
                  </div>

                </div>

                {/* 2. Main Canvas & Chat Area */}
                <div className="flex-1 p-4 bg-white dark:bg-zinc-950 flex flex-col justify-between relative overflow-hidden">
                  
                  {/* Subtle retro canvas grid */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808003_1px,transparent_1px),linear-gradient(to_bottom,#80808003_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

                  {/* On-Chain Verification Stats (Floating top right) */}
                  <div className="absolute top-4 right-4 z-20 flex flex-col gap-1.5 items-end">
                    <div className="bg-white/95 dark:bg-zinc-900/95 border border-slate-200 dark:border-zinc-800/80 rounded-lg p-2 shadow-sm font-mono text-[8px] text-gray-400 min-w-[100px] select-none">
                      <div className="font-bold text-slate-800 dark:text-zinc-200 mb-0.5 truncate">SuiPet NFT #942</div>
                      <div className="flex justify-between">
                        <span>Level:</span>
                        <span className="text-indigo-500 font-bold">15</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Perfection:</span>
                        <span className="text-emerald-500 font-bold">98,240</span>
                      </div>
                      <div className="border-t border-slate-100 dark:border-zinc-800/60 pt-1 mt-1 flex items-center gap-1 text-[7px] text-emerald-600 dark:text-emerald-400 font-bold uppercase">
                        <ShieldCheck size={8} />Walrus Verified
                      </div>
                    </div>
                  </div>

                  {/* Chat bubbles container */}
                  <div className="space-y-3 z-10 max-w-[70%] mt-2 flex flex-col">
                    
                    {/* User Command bubble */}
                    <div className="self-start bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-850 p-2.5 rounded-xl rounded-tl-none font-mono text-[9px] text-slate-800 dark:text-zinc-200">
                      <span className="text-[7.5px] text-gray-400 font-bold block mb-0.5">User Prompt</span>
                      <span>swap 10 SUI to USDC</span>
                    </div>

                    {/* Companion response bubble */}
                    <div className="self-start bg-indigo-600 text-white p-3 rounded-xl rounded-tl-none font-mono text-[9px] shadow-sm border border-indigo-500/25">
                      <span className="text-[7.5px] text-indigo-200 font-bold block mb-0.5">MiniPet Agent</span>
                      <p>✓ Splitting SUI gas coin...</p>
                      <p className="text-emerald-350 font-bold">✓ Executed successfully!</p>
                      <p className="text-[7.5px] text-indigo-300">Tx: 0x9a2c...8f2b</p>
                    </div>

                  </div>

                  {/* Pixel Pet companion sitting on the workspace canvas */}
                  <div className="flex justify-center items-center mt-3 z-10">
                    <div className="cat-sprite-frame z-20 scale-105" role="img" aria-label="Pixel Companion" />
                  </div>

                  {/* App Text Input Bar simulation */}
                  <div className="border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900 px-3 py-2 rounded-lg flex items-center justify-between text-[10px] text-gray-400 select-none z-10 mt-3 shrink-0">
                    <span>Chat with MiniPet...</span>
                    <Send size={11} className="text-indigo-500 hover:text-indigo-600 transition-colors shrink-0" />
                  </div>

                </div>

              </div>

            </div>
          </div>

        </div>

        {/* Zone 2: How It Works */}
        <div className="mb-24 relative">
          <div className="text-center mb-16">
            <h3 className="text-[24px] sm:text-[32px] font-black text-gray-900 dark:text-white tracking-tight leading-tight">
              {lang === 'vi' ? 'Quy Trình Hoạt Động' : 'How It Works'}
            </h3>
            <p className="text-slate-500 dark:text-zinc-400 text-xs sm:text-sm max-w-md mx-auto mt-3 font-medium">
              {lang === 'vi' ? 'Chỉ với 3 bước đơn giản để có một trợ lý AI đồng hành' : 'Get your custom AI companion running in 3 simple steps'}
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* Timeline connector track line */}
            <div className="hidden md:block absolute top-[52px] left-[15%] right-[15%] h-[1.5px] bg-gradient-to-r from-orange-400/20 via-amber-400/25 to-emerald-400/20 -z-10" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              
              {/* Step 1 */}
              <div className="bg-white/60 dark:bg-[#1c1c1e]/60 backdrop-blur-md border border-slate-200 dark:border-zinc-800/80 shadow-sm p-8 rounded-2xl group hover:-translate-y-1.5 hover:border-orange-300 dark:hover:border-orange-900/50 hover:shadow-[0_12px_30px_-10px_rgba(249,115,22,0.06)] dark:hover:shadow-[0_12px_30px_-10px_rgba(249,115,22,0.15)] transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-black text-[13px] mb-6 shadow-sm border border-orange-400/20 group-hover:scale-110 transition-transform duration-300">1</div>
                <h4 className="text-[15px] font-bold text-gray-900 dark:text-white mb-2.5">{lang === 'vi' ? 'Tải app & Tải Mô hình' : 'Download Client'}</h4>
                <p className="text-slate-550 dark:text-zinc-400 text-[12px] leading-relaxed font-medium">
                  {lang === 'vi' ? 'Tải ứng dụng MiniPet cho máy tính của bạn. Mô hình AI Qwen (được huấn luyện tối ưu dữ liệu SUI blockchain) sẽ tự động chạy offline.' : 'Download the client for your platform. The Qwen AI model (fine-tuned on SUI blockchain data) runs fully offline.'}
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-white/60 dark:bg-[#1c1c1e]/60 backdrop-blur-md border border-slate-200 dark:border-zinc-800/80 shadow-sm p-8 rounded-2xl group hover:-translate-y-1.5 hover:border-amber-300 dark:hover:border-amber-900/50 hover:shadow-[0_12px_30px_-10px_rgba(245,158,11,0.06)] dark:hover:shadow-[0_12px_30px_-10px_rgba(245,158,11,0.15)] transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center font-black text-[13px] mb-6 shadow-sm border border-amber-400/20 group-hover:scale-110 transition-transform duration-300">2</div>
                <h4 className="text-[15px] font-bold text-gray-900 dark:text-white mb-2.5">{lang === 'vi' ? 'Đồng bộ Ví & zkLogin' : 'Connect Wallet'}</h4>
                <p className="text-slate-550 dark:text-zinc-400 text-[12px] leading-relaxed font-medium">
                  {lang === 'vi' ? 'Sử dụng zkLogin kết nối ví an toàn qua tài khoản Google của bạn để quản lý các tài sản NFT pet trực tiếp.' : 'Use Google zkLogin to securely sync your wallet address and authenticate on-chain assets.'}
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-white/60 dark:bg-[#1c1c1e]/60 backdrop-blur-md border border-slate-200 dark:border-zinc-800/80 shadow-sm p-8 rounded-2xl group hover:-translate-y-1.5 hover:border-emerald-300 dark:hover:border-emerald-900/50 hover:shadow-[0_12px_30px_-10px_rgba(16,185,129,0.06)] dark:hover:shadow-[0_12px_30px_-10px_rgba(16,185,129,0.15)] transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-black text-[13px] mb-6 shadow-sm border border-emerald-400/20 group-hover:scale-110 transition-transform duration-300">3</div>
                <h4 className="text-[15px] font-bold text-gray-900 dark:text-white mb-2.5">{lang === 'vi' ? 'Đồng hành & Giao dịch' : 'Interact & Transact'}</h4>
                <p className="text-slate-550 dark:text-zinc-400 text-[12px] leading-relaxed font-medium">
                  {lang === 'vi' ? 'Nhập tin nhắn để nói chuyện với Pet của bạn, kích hoạt Pomodoro hoặc ra lệnh thực hiện giao dịch ví an toàn.' : 'Chat with your pet companion, activate focus sessions, or trigger offline token transfers.'}
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* Zone 3: Bento Tech Stack Cards */}
        <div className="relative">
          <div className="text-center mb-16">
            <h3 className="text-[24px] sm:text-[32px] font-black text-gray-900 dark:text-white tracking-tight leading-tight">
              {lang === 'vi' ? 'Cấu trúc Công nghệ Core' : 'Robust Web3 Tech Stack'}
            </h3>
            <p className="text-slate-500 dark:text-zinc-400 text-xs sm:text-sm max-w-sm mx-auto mt-3 font-medium">
              {lang === 'vi' ? 'Công nghệ hiện đại đem lại hiệu suất tối ưu và bảo mật tối đa' : 'Empowering virtual pet economy with state-of-the-art tools'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            
            {/* Tauri Card */}
            <div className="bg-gradient-to-b from-white to-slate-50/50 dark:from-[#1c1c1e] dark:to-[#121214] border border-slate-200/80 dark:border-zinc-800/80 shadow-sm p-8 rounded-2xl group relative overflow-hidden flex flex-col justify-between min-h-[260px] hover:-translate-y-1.5 hover:border-orange-300 dark:hover:border-orange-900/50 hover:shadow-[0_12px_30px_-10px_rgba(249,115,22,0.06)] dark:hover:shadow-[0_12px_30px_-10px_rgba(249,115,22,0.15)] transition-all duration-300">
              <div className="pointer-events-none absolute -right-12 -top-12 w-28 h-28 bg-orange-500/10 dark:bg-orange-500/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />
              <div>
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-600 dark:bg-orange-550/15 dark:text-orange-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Terminal size={17} />
                </div>
                <h4 className="text-[16px] font-bold text-gray-900 dark:text-white mb-2.5">Tauri Native Engine</h4>
                <p className="text-slate-550 dark:text-zinc-400 text-[12px] leading-relaxed font-medium">
                  {lang === 'vi' ? 'Giao diện ứng dụng máy tính siêu nhẹ, tối ưu hóa tài nguyên phần cứng và chạy siêu tốc với Rust backend.' : 'Native desktop shell keeping CPU and memory footprint extremely low via Rust sidecar.'}
                </p>
              </div>
              <div className="mt-6 flex">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[9px] font-mono font-bold tracking-wider bg-orange-50/80 dark:bg-orange-950/20 border border-orange-100/50 dark:border-orange-900/50 text-orange-600 dark:text-orange-400 uppercase">
                  RUST / WRAPPER
                </span>
              </div>
            </div>

            {/* Sui Card */}
            <div className="bg-gradient-to-b from-white to-slate-50/50 dark:from-[#1c1c1e] dark:to-[#121214] border border-slate-200/80 dark:border-zinc-800/80 shadow-sm p-8 rounded-2xl group relative overflow-hidden flex flex-col justify-between min-h-[260px] hover:-translate-y-1.5 hover:border-cyan-300 dark:hover:border-cyan-900/50 hover:shadow-[0_12px_30px_-10px_rgba(6,182,212,0.06)] dark:hover:shadow-[0_12px_30px_-10px_rgba(6,182,212,0.15)] transition-all duration-300">
              <div className="pointer-events-none absolute -right-12 -top-12 w-28 h-28 bg-cyan-500/10 dark:bg-cyan-500/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />
              <div>
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-600 dark:bg-cyan-550/15 dark:text-cyan-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield size={17} />
                </div>
                <h4 className="text-[16px] font-bold text-gray-900 dark:text-white mb-2.5">Sui Blockchain</h4>
                <p className="text-slate-550 dark:text-zinc-400 text-[12px] leading-relaxed font-medium">
                  {lang === 'vi' ? 'Lưu trữ thực quyền NFT, tích hợp hàm ngẫu nhiên xác định chỉ số hiếm và giao dịch zkLogin an toàn qua Google.' : 'True on-chain ownership secured by smart contracts, leveraging zkLogin authentication and VRF random module.'}
                </p>
              </div>
              <div className="mt-6 flex">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[9px] font-mono font-bold tracking-wider bg-cyan-50/80 dark:bg-cyan-950/20 border border-cyan-100/50 dark:border-cyan-900/50 text-cyan-600 dark:text-cyan-400 uppercase">
                  MOVE / ACCOUNT
                </span>
              </div>
            </div>

            {/* Walrus Card */}
            <div className="bg-gradient-to-b from-white to-slate-50/50 dark:from-[#1c1c1e] dark:to-[#121214] border border-slate-200/80 dark:border-zinc-800/80 shadow-sm p-8 rounded-2xl group relative overflow-hidden flex flex-col justify-between min-h-[260px] hover:-translate-y-1.5 hover:border-rose-300 dark:hover:border-rose-900/50 hover:shadow-[0_12px_30px_-10px_rgba(244,63,94,0.06)] dark:hover:shadow-[0_12px_30px_-10px_rgba(244,63,94,0.15)] transition-all duration-300">
              <div className="pointer-events-none absolute -right-12 -top-12 w-28 h-28 bg-rose-500/10 dark:bg-rose-500/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />
              <div>
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 dark:bg-rose-550/15 dark:text-rose-450 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Database size={17} />
                </div>
                <h4 className="text-[16px] font-bold text-gray-900 dark:text-white mb-2.5">Walrus Protocol</h4>
                <p className="text-slate-550 dark:text-zinc-400 text-[12px] leading-relaxed font-medium">
                  {lang === 'vi' ? 'Giao thức lưu trữ phi tập trung của Mysten Labs dùng để lưu trữ file hình ảnh pet và siêu dữ liệu an toàn.' : 'Decentralized storage protocol by Mysten Labs holding asset spritesheets and rich metadata blobs securely.'}
                </p>
              </div>
              <div className="mt-6 flex">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[9px] font-mono font-bold tracking-wider bg-rose-50/80 dark:bg-rose-950/20 border border-rose-100/50 dark:border-rose-900/50 text-rose-600 dark:text-rose-450 uppercase">
                  WALRUS / STORAGE
                </span>
              </div>
            </div>

          </div>
        </div>

      </Container>
    </section>
  );
};
