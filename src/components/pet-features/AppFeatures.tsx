"use client";

import { useTranslation } from 'react-i18next';
import { Store, Palette, HardDrive, KeyRound, Monitor, MessageCircle, Brain, Bot, Cpu, Eye, Workflow, ShieldCheck } from 'lucide-react';
import React from 'react';

const aiFeatures = [
  {
    icon: Bot,
    color: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    title: { vi: 'On-Chain Task Agent', en: 'On-Chain Task Agent' },
    desc: {
      vi: 'Ra lệnh bằng ngôn ngữ tự nhiên: "Swap 10 SUI sang USDC". Agent tự phân tích ý định, tạo PTB và thực thi on-chain.',
      en: 'Command in natural language: "Swap 10 SUI to USDC". Agent parses intent, builds PTB, and executes on-chain.',
    },
  },
  {
    icon: Workflow,
    color: 'bg-orange-50 text-orange-600 border-orange-100',
    title: { vi: 'Auto-Trade Agent', en: 'Auto-Trade Agent' },
    desc: {
      vi: 'Thiết lập chiến lược DCA, limit order. AI Agent tự động thực hiện giao dịch 24/7 theo điều kiện bạn đặt.',
      en: 'Set DCA strategies, limit orders. AI Agent autonomously executes trades 24/7 based on your conditions.',
    },
  },
  {
    icon: Brain,
    color: 'bg-purple-50 text-purple-600 border-purple-100',
    title: { vi: 'Wallet Health Monitor', en: 'Wallet Health Monitor' },
    desc: {
      vi: 'Agent liên tục audit ví: phát hiện token rác, approve đáng ngờ, cảnh báo rủi ro và đề xuất hành động bảo vệ.',
      en: 'Agent continuously audits wallet: detects spam tokens, suspicious approvals, alerts risks and suggests protective actions.',
    },
  },
  {
    icon: ShieldCheck,
    color: 'bg-rose-50 text-rose-600 border-rose-100',
    title: { vi: 'Scam Detection Agent', en: 'Scam Detection Agent' },
    desc: {
      vi: 'Mỗi giao dịch được AI quét real-time. Phát hiện contract độc hại, phishing link, rug pull trước khi bạn ký.',
      en: 'Every transaction is AI-scanned in real-time. Detects malicious contracts, phishing links, rug pulls before you sign.',
    },
  },
  {
    icon: Cpu,
    color: 'bg-teal-50 text-teal-600 border-teal-100',
    title: { vi: 'Local LLM Engine', en: 'Local LLM Engine' },
    desc: {
      vi: 'AI chạy hoàn toàn offline trên máy qua llama-server. Không gửi dữ liệu ra ngoài, bảo mật tuyệt đối.',
      en: 'AI runs fully offline on-device via llama-server. Zero data leakage, absolute privacy.',
    },
  },
  {
    icon: Eye,
    color: 'bg-sky-50 text-sky-600 border-sky-100',
    title: { vi: 'Portfolio Insight Agent', en: 'Portfolio Insight Agent' },
    desc: {
      vi: 'Agent phân tích danh mục đầu tư, theo dõi P&L, đề xuất rebalance dựa trên biến động thị trường.',
      en: 'Agent analyzes your portfolio, tracks P&L, suggests rebalancing based on market movements.',
    },
  },
];

const platformFeatures = [
  {
    icon: Monitor,
    color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    title: { vi: 'Desktop Companion', en: 'Desktop Companion' },
    desc: {
      vi: 'Pet pixel sống trên desktop. Vật lý trọng lực, kéo thả file, hoạt động offline.',
      en: 'Pixel pet lives on desktop. Physics gravity, drag-and-drop, works offline.',
    },
  },
  {
    icon: Store,
    color: 'bg-violet-50 text-violet-600 border-violet-100',
    title: { vi: 'NFT Marketplace', en: 'NFT Marketplace' },
    desc: {
      vi: 'Mua bán Pet NFT trên SUI. Giao dịch an toàn qua smart contract.',
      en: 'Buy and sell Pet NFTs on SUI. Safe trading via smart contracts.',
    },
  },
  {
    icon: Palette,
    color: 'bg-pink-50 text-pink-600 border-pink-100',
    title: { vi: 'Custom Pet Creator', en: 'Custom Pet Creator' },
    desc: {
      vi: 'Thiết kế spritesheet riêng, upload và mint thành NFT độc nhất.',
      en: 'Design your own spritesheet, upload and mint as a unique NFT.',
    },
  },
  {
    icon: KeyRound,
    color: 'bg-amber-50 text-amber-600 border-amber-100',
    title: { vi: 'zkLogin (Google Sign-In)', en: 'zkLogin (Google Sign-In)' },
    desc: {
      vi: 'Đăng nhập bằng Google, không cần ví crypto. Zero-Knowledge Proof trên SUI.',
      en: 'Sign in with Google, no crypto wallet needed. ZK Proof on SUI.',
    },
  },
  {
    icon: HardDrive,
    color: 'bg-cyan-50 text-cyan-600 border-cyan-100',
    title: { vi: 'Walrus Storage', en: 'Walrus Storage' },
    desc: {
      vi: 'Lưu trữ phi tập trung vĩnh viễn trên Walrus Protocol.',
      en: 'Permanent decentralized storage on Walrus Protocol.',
    },
  },
  {
    icon: MessageCircle,
    color: 'bg-blue-50 text-blue-600 border-blue-100',
    title: { vi: 'AI Chat Companion', en: 'AI Chat Companion' },
    desc: {
      vi: 'Trò chuyện với Pet bằng AI local. Hỏi đáp, ra lệnh, tất cả offline.',
      en: 'Chat with your Pet via local AI. Q&A, commands, all offline.',
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
