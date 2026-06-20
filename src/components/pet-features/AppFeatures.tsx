"use client";

import { useTranslation } from 'react-i18next';
import { Store, Palette, HardDrive, KeyRound, Monitor, MessageCircle, Brain, Bot, Cpu, Eye, Workflow, ShieldCheck } from 'lucide-react';
import React from 'react';

const aiFeatures = [
  {
    icon: Brain,
    color: 'bg-purple-50 text-purple-600 border-purple-100',
    title: { vi: 'Local AI Chat (Offline LLM)', en: 'Local AI Chat (Offline LLM)' },
    desc: {
      vi: 'AI chạy 100% offline trên máy qua llama-server + Qwen 2.5 0.5B (train trên SUI docs). Không cần API key, không gửi dữ liệu ra ngoài.',
      en: 'AI runs 100% offline via llama-server + Qwen 2.5 0.5B (trained on SUI docs). No API keys, zero data leakage.',
    },
  },
  {
    icon: ShieldCheck,
    color: 'bg-rose-50 text-rose-600 border-rose-100',
    title: { vi: 'Security Agent (Token Scanner)', en: 'Security Agent (Token Scanner)' },
    desc: {
      vi: 'Tự động phát hiện khi bạn copy địa chỉ SUI. Quét TreasuryCap, UpgradeCap, supply — cảnh báo scam/honeypot real-time.',
      en: 'Auto-detects when you copy a SUI address. Scans TreasuryCap, UpgradeCap, supply — warns about scams/honeypots in real-time.',
    },
  },
  {
    icon: Eye,
    color: 'bg-sky-50 text-sky-600 border-sky-100',
    title: { vi: 'Blockchain Monitor (5 Agents)', en: 'Blockchain Monitor (5 Agents)' },
    desc: {
      vi: '5 agent chạy song song: theo dõi số dư, phát hiện NFT lừa đảo, cảnh báo gas thấp, nhắc nhở idle, và quản lý event cursor.',
      en: '5 agents run concurrently: balance tracking, phishing NFT detection, low-gas alerts, idle reminders, and event cursor management.',
    },
  },
  {
    icon: Workflow,
    color: 'bg-orange-50 text-orange-600 border-orange-100',
    title: { vi: 'Agent Trade Engine', en: 'Agent Trade Engine' },
    desc: {
      vi: 'Agent tự tạo ví Ed25519, theo dõi giá SUI/USD, tính EMA crossover và tự ký + submit giao dịch on-chain.',
      en: 'Agent generates its own Ed25519 wallet, monitors SUI/USD price, calculates EMA crossover, and autonomously signs + submits on-chain tx.',
    },
  },
  {
    icon: Bot,
    color: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    title: { vi: 'Simulated Trading Mode', en: 'Simulated Trading Mode' },
    desc: {
      vi: 'Chế độ paper-trading an toàn chạy song song với real execution. Cấu hình budget, cooldown, slippage riêng từng ví.',
      en: 'Safe paper-trading mode runs alongside real execution. Configure budget, cooldown, slippage per wallet independently.',
    },
  },
  {
    icon: Cpu,
    color: 'bg-teal-50 text-teal-600 border-teal-100',
    title: { vi: 'Auto-Download từ HuggingFace', en: 'Auto-Download from HuggingFace' },
    desc: {
      vi: 'Model AI & engine tự tải từ HuggingFace lần đầu sử dụng. Không cần cài đặt gì thêm.',
      en: 'AI model & engine auto-downloaded from HuggingFace on first use. No manual setup needed.',
    },
  },
];

const platformFeatures = [
  {
    icon: Monitor,
    color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    title: { vi: 'Desktop Companion', en: 'Desktop Companion' },
    desc: {
      vi: 'Pet pixel sống trên desktop với vật lý trọng lực. Kéo thả file để "ăn" → chuyển vào thùng rác.',
      en: 'Pixel pet lives on desktop with gravity physics. Drag files to "eat" → moves to trash.',
    },
  },
  {
    icon: Store,
    color: 'bg-violet-50 text-violet-600 border-violet-100',
    title: { vi: 'NFT Marketplace', en: 'NFT Marketplace' },
    desc: {
      vi: 'Adopt Pet NFT trên SUI. Hệ thống gacha rarity: Normal 70%, Rare 20%, Super Rare 8%, Legendary 2%.',
      en: 'Adopt Pet NFTs on SUI. Gacha rarity system: Normal 70%, Rare 20%, Super Rare 8%, Legendary 2%.',
    },
  },
  {
    icon: Palette,
    color: 'bg-pink-50 text-pink-600 border-pink-100',
    title: { vi: 'Custom Pet Creator', en: 'Custom Pet Creator' },
    desc: {
      vi: 'Thiết kế spritesheet riêng, upload lên Walrus và mint thành NFT độc nhất trên SUI.',
      en: 'Design your own spritesheet, upload to Walrus and mint as a unique NFT on SUI.',
    },
  },
  {
    icon: KeyRound,
    color: 'bg-amber-50 text-amber-600 border-amber-100',
    title: { vi: 'Pomodoro Focus Timer', en: 'Pomodoro Focus Timer' },
    desc: {
      vi: 'Pet gõ búa khi bạn focus, ngủ khi break. Cấu hình thời gian work/break tùy ý.',
      en: 'Pet hammers during focus, sleeps during break. Configurable work/break durations.',
    },
  },
  {
    icon: HardDrive,
    color: 'bg-cyan-50 text-cyan-600 border-cyan-100',
    title: { vi: 'Walrus Storage', en: 'Walrus Storage' },
    desc: {
      vi: 'Lưu trữ spritesheet phi tập trung vĩnh viễn trên Walrus Protocol. Không bao giờ mất.',
      en: 'Permanent decentralized spritesheet storage on Walrus Protocol. Never lost.',
    },
  },
  {
    icon: MessageCircle,
    color: 'bg-blue-50 text-blue-600 border-blue-100',
    title: { vi: 'Wallet Sync & Deep-link', en: 'Wallet Sync & Deep-link' },
    desc: {
      vi: 'Kết nối ví web với desktop app qua deep-link (minipet://). Pet tự sync skin từ NFT bạn sở hữu.',
      en: 'Connect web wallet to desktop app via deep-link (minipet://). Pet auto-syncs skins from your owned NFTs.',
    },
  },
];

export const AppFeatures = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('vi') ? 'vi' : 'en';

  return (
    <section className="pb-12 md:pb-24 bg-transparent relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* AI Agentic Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[10px] font-bold uppercase tracking-wider text-indigo-600 mb-4">
            <Cpu size={12} />
            <span>AI-Powered</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
            {lang === 'vi' ? 'AI Agentic — Trợ Lý Web3 Tự Chủ' : 'AI Agentic — Autonomous Web3 Assistant'}
          </h2>
          <p className="text-slate-500 text-[14px] sm:text-[15px] mt-3 max-w-2xl mx-auto">
            {lang === 'vi'
              ? 'Pet không chỉ dễ thương — nó là một AI Agent thực thụ: hiểu ngôn ngữ tự nhiên, tự ra quyết định và hành động on-chain thay bạn.'
              : 'Your Pet is not just cute — it\'s a real AI Agent: understands natural language, makes decisions, and acts on-chain autonomously.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {aiFeatures.map((f, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-indigo-50 p-6 shadow-[0_4px_20px_-4px_rgba(79,70,229,0.08)] hover:shadow-[0_8px_30px_-4px_rgba(79,70,229,0.15)] transition-shadow"
            >
              <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl border ${f.color} mb-4`}>
                <f.icon size={20} />
              </div>
              <h3 className="text-[16px] font-bold text-slate-900 mb-2">{f.title[lang]}</h3>
              <p className="text-slate-500 text-[13px] leading-relaxed">{f.desc[lang]}</p>
            </div>
          ))}
        </div>

        {/* Platform Features Section */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
            {lang === 'vi' ? 'Nền Tảng & Hệ Sinh Thái' : 'Platform & Ecosystem'}
          </h2>
          <p className="text-slate-500 text-[14px] sm:text-[15px] mt-3 max-w-xl mx-auto">
            {lang === 'vi'
              ? 'Blockchain, lưu trữ phi tập trung, desktop app — hạ tầng hoàn chỉnh cho AI Agent hoạt động.'
              : 'Blockchain, decentralized storage, desktop app — complete infrastructure for AI Agent operations.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {platformFeatures.map((f, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-100 p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] transition-shadow"
            >
              <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl border ${f.color} mb-4`}>
                <f.icon size={20} />
              </div>
              <h3 className="text-[16px] font-bold text-slate-900 mb-2">{f.title[lang]}</h3>
              <p className="text-slate-500 text-[13px] leading-relaxed">{f.desc[lang]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
