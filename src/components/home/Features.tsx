"use client";

import { useTranslation } from 'react-i18next';
import { 
  Clock, Cpu, Shield, Terminal, Database, 
  Laptop, ShieldCheck
} from 'lucide-react';
import React from 'react';

const Container = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

export const Features = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('vi') ? 'vi' : 'en';

  return (
    <section id="features" className="pb-10 md:pb-20 bg-transparent relative">
      <div className="section-divider bg-slate-100" />

      <Container className="pt-10 md:pt-20">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-4">
            <Laptop size={12} className="text-slate-500" />
            <span>Tauri Desktop Companion & On-Chain Integration</span>
          </div>
          <h2 className="text-[28px] sm:text-[36px] font-black text-slate-900 tracking-tight leading-tight mb-4">
            {lang === 'vi' ? 'Tổng Quan Chức Năng Trên Desktop & On-Chain' : 'Desktop Interface & On-Chain Overview'}
          </h2>
          <p className="text-slate-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {lang === 'vi' 
              ? 'Trải nghiệm sự kết hợp mượt mà giữa hoạt ảnh thú cưng trực quan ngay trên màn hình máy tính của bạn và các giao thức giao dịch, bảo mật ví on-chain trên mạng lưới SUI.'
              : 'Experience a seamless fusion between interactive desktop animations and robust on-chain transaction protocols powered by the SUI blockchain.'}
          </p>
        </div>

        {/* Premium Bento Grid Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-7xl mx-auto mb-16">
          
          {/* Bento Item 1: Large Main Feature (Spans 2 columns) */}
          <div className="lg:col-span-2 relative group rounded-3xl overflow-hidden bg-white border border-slate-100 shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] p-4 sm:p-5 md:p-6 transition-all duration-500 hover:shadow-[0_8px_40px_-5px_rgba(0,0,0,0.08)] hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50 pointer-events-none" />
            
            <div className="relative z-10 w-full h-full flex flex-col md:flex-row gap-6 md:gap-8 items-center">
              <div className="flex-1 space-y-4">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/20">
                  <Cpu size={20} />
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-slate-900 tracking-tight leading-tight">
                  {lang === 'vi' ? 'Trợ Lý AI & Tự Động Hóa' : 'AI Agent & On-Chain Automation'}
                </h3>
                <p className="text-slate-500 leading-relaxed text-[12px] sm:text-[13px] lg:text-[14px]">
                  {lang === 'vi' 
                    ? 'Hoán đổi token, kiểm tra số dư và ký duyệt giao dịch an toàn ngay trong khung chat của pet. Mọi thứ được xử lý tự động với SUI Move PTB.' 
                    : 'Instantly swap assets, query wallet balances, and sign secure transactions directly from your pet chat. Powered by SUI Move PTBs.'}
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <span className="px-4 py-1.5 text-[11px] font-bold font-mono text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-full">SUI MOVE PTB</span>
                  <span className="px-4 py-1.5 text-[11px] font-bold font-mono text-purple-600 bg-purple-50 border border-purple-100 rounded-full">LLM CHAT</span>
                </div>
              </div>
              <div className="flex-1 w-full max-w-sm mx-auto md:max-w-none">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden group-hover:scale-[1.03] transition-transform duration-700">
                  <div className="p-3.5 border-b border-slate-800 bg-slate-900 flex items-center gap-2">
                     <div className="flex gap-2"><div className="w-3 h-3 rounded-full bg-[#ff5f56]"/><div className="w-3 h-3 rounded-full bg-[#ffbd2e]"/><div className="w-3 h-3 rounded-full bg-[#27c93f]"/></div>
                     <span className="text-xs font-mono text-slate-400 font-bold ml-3 tracking-wider">minipet-agent</span>
                  </div>
                  <div className="p-4 sm:p-6 space-y-4 bg-[url('https://transparenttextures.com/patterns/cubes.png')] bg-slate-900 min-h-[160px] sm:min-h-[220px] flex flex-col justify-end relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/90 pointer-events-none" />
                    <div className="relative z-10 flex gap-3 text-[11px] sm:text-[13px] font-mono text-slate-300 bg-slate-800 p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border border-slate-700/50 w-[95%] sm:w-[90%] shadow-lg transform -translate-y-1 sm:-translate-y-2 opacity-90">
                      <span className="text-emerald-400">❯</span>
                      <span>swap 10 SUI to USDC</span>
                    </div>
                    <div className="relative z-10 flex gap-2 text-[11px] sm:text-[13px] font-mono text-white bg-indigo-600 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-indigo-500/50 w-[98%] sm:w-[95%] ml-auto shadow-xl shadow-indigo-500/20">
                      <div className="space-y-2">
                        <p className="flex items-center gap-2 opacity-90"><span className="animate-pulse block w-2 h-2 bg-white rounded-full"/> Splitting SUI gas coin...</p>
                        <p className="text-emerald-300 font-bold flex items-center gap-2"><span>✓</span> Executed successfully!</p>
                        <p className="text-[10px] text-indigo-200 mt-1 opacity-80">Tx: 0x9a2c...8f2b</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bento Item 2: Tauri Desktop Engine */}
          <div className="relative group rounded-3xl overflow-hidden bg-white border border-slate-100 shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] p-4 sm:p-5 md:p-6 transition-all duration-500 hover:shadow-[0_8px_40px_-5px_rgba(0,0,0,0.08)] hover:-translate-y-1 flex flex-col">
            <div className="absolute inset-0 bg-gradient-to-b from-orange-50/30 to-white pointer-events-none" />
            
            <div className="relative z-10 flex-1 flex flex-col">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-orange-500 text-white shadow-lg shadow-orange-500/20 mb-5">
                <Laptop size={20} />
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 mb-3 tracking-tight">
                {lang === 'vi' ? 'Desktop Engine Siêu Nhẹ' : 'Tauri Desktop Companion'}
              </h3>
              <p className="text-slate-500 text-[12px] sm:text-[13px] leading-relaxed flex-1">
                {lang === 'vi' 
                  ? 'Chạy mượt mà trên khay hệ thống với backend Rust siêu tối ưu. Tiêu tốn cực kỳ ít dung lượng RAM.' 
                  : 'Runs natively in your system tray using Rust sidecar. Uses minimal RAM and CPU for uninterrupted focus.'}
              </p>
              
              <div className="mt-8 flex justify-center items-center p-6 bg-slate-50 rounded-[1.5rem] border border-slate-100 relative overflow-hidden transition-colors duration-500">
                <div className="absolute inset-0 bg-[radial-gradient(#80808010_1px,transparent_1px)] bg-[size:12px_12px]" />
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-14 h-14 rounded-full bg-white border border-orange-200 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-500 group-hover:border-orange-400">
                    <span className="text-[11px] font-black text-orange-600 tracking-wider">RUST</span>
                  </div>
                  <div className="relative w-16 h-1 bg-slate-200 rounded-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-rose-400 w-full h-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 ease-out" />
                  </div>
                  <div className="w-14 h-14 rounded-full bg-white border border-rose-200 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-500 group-hover:border-rose-400">
                    <span className="text-[11px] font-black text-rose-600 tracking-wider">WEB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bento Item 3: Intelligent Alerts */}
          <div className="relative group rounded-3xl overflow-hidden bg-white border border-slate-100 shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] p-4 sm:p-5 md:p-6 transition-all duration-500 hover:shadow-[0_8px_40px_-5px_rgba(0,0,0,0.08)] hover:-translate-y-1 flex flex-col">
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/30 to-white pointer-events-none" />
            
            <div className="relative z-10 flex-1 flex flex-col">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 mb-5">
                <ShieldCheck size={20} />
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 mb-3 tracking-tight">
                {lang === 'vi' ? 'Thông Báo Thông Minh' : 'Intelligent Alerts'}
              </h3>
              <p className="text-slate-500 text-[12px] sm:text-[13px] leading-relaxed flex-1">
                {lang === 'vi' 
                  ? 'Nhận popup thông báo về sự kiện on-chain, trạng thái giao dịch hoặc các khung giờ tập trung trực tiếp trên màn hình.' 
                  : 'Get instant notifications for block events, transaction completions, and focus timers via system toasts.'}
              </p>
              
              <div className="mt-8 space-y-4 relative">
                <div className="absolute left-8 top-8 bottom-4 w-px bg-slate-100 -z-10" />
                
                <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-100 flex items-center gap-3 sm:gap-4 transform transition-all duration-500 shadow-sm group-hover:shadow-md group-hover:translate-x-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100 text-emerald-500">
                    <ShieldCheck size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] sm:text-[13px] font-bold text-slate-900 truncate">Tx Verified</p>
                    <p className="text-[10px] sm:text-[11px] font-medium text-slate-500 truncate mt-0.5">10 SUI swapped to USDC</p>
                  </div>
                  <div className="text-[9px] sm:text-[10px] font-bold text-slate-400">now</div>
                </div>
                
                <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-100 flex items-center gap-3 sm:gap-4 transform transition-all duration-500 shadow-sm group-hover:shadow-md group-hover:translate-x-4 delay-75">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-50 flex items-center justify-center shrink-0 border border-amber-100 text-amber-500">
                    <Clock size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] sm:text-[13px] font-bold text-slate-900 truncate">Focus Complete</p>
                    <p className="text-[10px] sm:text-[11px] font-medium text-slate-500 truncate mt-0.5 font-mono text-emerald-600">+12.4 MIPET</p>
                  </div>
                  <div className="text-[9px] sm:text-[10px] font-bold text-slate-400">2m</div>
                </div>
              </div>
            </div>
          </div>
          
        </div>

        {/* Zone 2: How It Works */}
        <div className="mb-16 relative">
          <div className="text-center mb-16">
            <h3 className="text-[24px] sm:text-[30px] font-black text-slate-900 tracking-tight leading-tight">
              {lang === 'vi' ? 'Quy Trình Hoạt Động' : 'How It Works'}
            </h3>
            <p className="text-slate-500 text-sm max-w-md mx-auto mt-3 font-medium">
              {lang === 'vi' ? 'Chỉ với 3 bước đơn giản để có một trợ lý AI đồng hành' : 'Get your custom AI companion running in 3 simple steps'}
            </p>
          </div>

          <div className="relative max-w-7xl mx-auto">
            <div className="hidden md:block absolute top-[52px] left-[15%] right-[15%] h-px bg-slate-200 -z-10" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              
              {/* Step 1 */}
              <div className="bg-white border border-slate-100 shadow-sm p-4 sm:p-5 rounded-2xl group hover:-translate-y-1.5 hover:shadow-md transition-all duration-300">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-[11px] sm:text-[12px] mb-3 sm:mb-4 border border-indigo-100 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">1</div>
                <h4 className="text-[14px] sm:text-[15px] font-bold text-slate-900 mb-1.5 sm:mb-2">{lang === 'vi' ? 'Tải app & Tải Mô hình' : 'Download Client'}</h4>
                <p className="text-slate-500 text-[12px] sm:text-[13px] leading-relaxed font-medium">
                  {lang === 'vi' ? 'Tải ứng dụng MiniPet cho máy tính của bạn. Mô hình AI Qwen (được huấn luyện tối ưu dữ liệu SUI blockchain) sẽ tự động chạy offline.' : 'Download the client for your platform. The Qwen AI model (fine-tuned on SUI blockchain data) runs fully offline.'}
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-white border border-slate-100 shadow-sm p-4 sm:p-5 rounded-2xl group hover:-translate-y-1.5 hover:shadow-md transition-all duration-300">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-[11px] sm:text-[12px] mb-3 sm:mb-4 border border-indigo-100 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">2</div>
                <h4 className="text-[14px] sm:text-[15px] font-bold text-slate-900 mb-1.5 sm:mb-2">{lang === 'vi' ? 'Đồng bộ Ví & zkLogin' : 'Connect Wallet'}</h4>
                <p className="text-slate-500 text-[12px] sm:text-[13px] leading-relaxed font-medium">
                  {lang === 'vi' ? 'Sử dụng zkLogin kết nối ví an toàn qua tài khoản Google của bạn để quản lý các tài sản NFT pet trực tiếp.' : 'Use Google zkLogin to securely sync your wallet address and authenticate on-chain assets.'}
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-white border border-slate-100 shadow-sm p-4 sm:p-5 rounded-2xl group hover:-translate-y-1.5 hover:shadow-md transition-all duration-300">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-[11px] sm:text-[12px] mb-3 sm:mb-4 border border-indigo-100 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">3</div>
                <h4 className="text-[14px] sm:text-[15px] font-bold text-slate-900 mb-1.5 sm:mb-2">{lang === 'vi' ? 'Giao dịch Tự Động' : 'Go Autonomous'}</h4>
                <p className="text-slate-500 text-[12px] sm:text-[13px] leading-relaxed font-medium">
                  {lang === 'vi' ? 'Nhập tin nhắn để nói chuyện với Pet của bạn, kích hoạt Pomodoro hoặc ra lệnh thực hiện giao dịch ví an toàn.' : 'Chat with your pet companion, activate focus sessions, or trigger offline token transfers.'}
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* Zone 3: Bento Tech Stack Cards */}
        <div className="relative">
          <div className="text-center mb-16">
            <h3 className="text-[24px] sm:text-[30px] font-black text-slate-900 tracking-tight leading-tight">
              {lang === 'vi' ? 'Cấu trúc Công nghệ Core' : 'Robust Web3 Tech Stack'}
            </h3>
            <p className="text-slate-500 text-sm max-w-sm mx-auto mt-3 font-medium">
              {lang === 'vi' ? 'Công nghệ hiện đại đem lại hiệu suất tối ưu và bảo mật tối đa' : 'Empowering virtual pet economy with state-of-the-art tools'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            
            {/* Tauri Card */}
            <div className="bg-white border border-slate-100 shadow-sm p-5 rounded-2xl group relative overflow-hidden flex flex-col justify-between min-h-[200px] hover:-translate-y-1.5 hover:shadow-md transition-all duration-300">
              <div>
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-orange-100">
                  <Terminal size={18} />
                </div>
                <h4 className="text-[15px] font-bold text-slate-900 mb-2">Tauri Native Engine</h4>
                <p className="text-slate-500 text-[13px] leading-relaxed font-medium">
                  {lang === 'vi' ? 'Giao diện ứng dụng máy tính siêu nhẹ, tối ưu hóa tài nguyên phần cứng và chạy siêu tốc với Rust backend.' : 'Native desktop shell keeping CPU and memory footprint extremely low via Rust sidecar.'}
                </p>
              </div>
              <div className="mt-6 flex">
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider bg-orange-50 border border-orange-100 text-orange-600 uppercase">
                  RUST / WRAPPER
                </span>
              </div>
            </div>

            {/* Sui Card */}
            <div className="bg-white border border-slate-100 shadow-sm p-5 rounded-2xl group relative overflow-hidden flex flex-col justify-between min-h-[200px] hover:-translate-y-1.5 hover:shadow-md transition-all duration-300">
              <div>
                <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-cyan-100">
                  <Shield size={18} />
                </div>
                <h4 className="text-[15px] font-bold text-slate-900 mb-2">Sui Blockchain</h4>
                <p className="text-slate-500 text-[13px] leading-relaxed font-medium">
                  {lang === 'vi' ? 'Lưu trữ thực quyền NFT, tích hợp hàm ngẫu nhiên xác định chỉ số hiếm và giao dịch zkLogin an toàn qua Google.' : 'True on-chain ownership secured by smart contracts, leveraging zkLogin authentication and VRF random module.'}
                </p>
              </div>
              <div className="mt-6 flex">
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider bg-cyan-50 border border-cyan-100 text-cyan-600 uppercase">
                  MOVE / ACCOUNT
                </span>
              </div>
            </div>

            {/* Walrus Card */}
            <div className="bg-white border border-slate-100 shadow-sm p-5 rounded-2xl group relative overflow-hidden flex flex-col justify-between min-h-[200px] hover:-translate-y-1.5 hover:shadow-md transition-all duration-300">
              <div>
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-rose-100">
                  <Database size={18} />
                </div>
                <h4 className="text-[15px] font-bold text-slate-900 mb-2">Walrus Protocol</h4>
                <p className="text-slate-500 text-[13px] leading-relaxed font-medium">
                  {lang === 'vi' ? 'Giao thức lưu trữ phi tập trung của Mysten Labs dùng để lưu trữ file hình ảnh pet và siêu dữ liệu an toàn.' : 'Decentralized storage protocol by Mysten Labs holding asset spritesheets and rich metadata blobs securely.'}
                </p>
              </div>
              <div className="mt-6 flex">
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider bg-rose-50 border border-rose-100 text-rose-600 uppercase">
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
