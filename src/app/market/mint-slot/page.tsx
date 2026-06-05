"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useActiveAddress } from '../../../hooks/useActiveAddress';
import { useTransactionExecutor } from '../../../hooks/useTransactionExecutor';
import { Transaction } from '@mysten/sui/transactions';
import { PACKAGE_ID, FUNCTIONS, MODULES, suiClient, GLOBAL_CONFIG_ID, PET_TOKEN_TYPE } from '../../../services/blockchain/sui';
import {
  ArrowLeft, Sparkles, CheckCircle2, Palette, ShieldCheck,
  Layers, Cpu, Zap, Star, ArrowRight, Gift, Lock, Globe
} from 'lucide-react';

export default function MintSlotDetailPage() {
  const router = useRouter();
  const { i18n } = useTranslation();
  const isVi = i18n.language?.startsWith('vi');
  const activeAddress = useActiveAddress();
  const { execute: signAndExecuteTransaction } = useTransactionExecutor();
  const [slotPrice, setSlotPrice] = useState('10000000000000');
  const [buying, setBuying] = useState(false);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const configObj = await suiClient.getObject({
          id: GLOBAL_CONFIG_ID,
          options: { showContent: true },
        });
        const fields = (configObj.data?.content as any)?.fields;
        if (fields?.base_slot_fee) setSlotPrice(fields.base_slot_fee);
      } catch (e) {
        console.error(e);
      }
    };
    fetchPrice();
  }, []);

  const handleBuy = async () => {
    if (!activeAddress) {
      alert(isVi ? 'Vui lòng kết nối ví trước!' : 'Please connect your wallet first!');
      return;
    }
    setBuying(true);
    try {
      const tx = new Transaction();
      const coins = await suiClient.getCoins({ owner: activeAddress, coinType: PET_TOKEN_TYPE });
      if (coins.data.length === 0) {
        alert(isVi ? 'Bạn cần token MIPET để mua Mint Slot!' : 'You need MIPET tokens to buy a Mint Slot!');
        setBuying(false);
        return;
      }
      const coinObjects = coins.data.map((c) => tx.object(c.coinObjectId));
      if (coinObjects.length > 1) tx.mergeCoins(coinObjects[0], coinObjects.slice(1));
      tx.moveCall({
        target: `${PACKAGE_ID}::${MODULES.PET_NFT}::${FUNCTIONS.BUY_MINT_SLOT}`,
        arguments: [tx.object(GLOBAL_CONFIG_ID), coinObjects[0]],
      });
      signAndExecuteTransaction({ transaction: tx }, {
        onSuccess: async (res) => {
          const txRes = await suiClient.waitForTransaction({ digest: res.digest, options: { showEffects: true } });
          if (txRes.effects?.status?.status === 'success') {
            alert(isVi ? '🎉 Mua Mint Slot thành công! Vào Custom Pet để tạo pet của bạn.' : '🎉 Mint Slot purchased! Go to Custom Pet to create yours.');
            router.push('/custom-pet');
          } else {
            alert(isVi ? 'Giao dịch thất bại.' : 'Transaction failed.');
          }
          setBuying(false);
        },
        onError: (err) => {
          console.error(err);
          alert(err.message || 'Error');
          setBuying(false);
        },
      });
    } catch (e: any) {
      alert(e.message || 'Error');
      setBuying(false);
    }
  };

  const benefits = [
    {
      icon: <Palette size={20} className="text-violet-500" />,
      bg: 'bg-violet-50 dark:bg-violet-950/30',
      border: 'border-violet-100 dark:border-violet-900/40',
      title: isVi ? 'Tự do thiết kế ngoại hình' : 'Full Design Freedom',
      desc: isVi
        ? 'Upload spritesheet pixel-art của riêng bạn. Chọn tên, màu sắc, và phong cách độc nhất không ai có.'
        : 'Upload your own pixel-art spritesheet. Choose a unique name, style, and look that no one else has.',
    },
    {
      icon: <ShieldCheck size={20} className="text-emerald-500" />,
      bg: 'bg-emerald-50 dark:bg-emerald-950/30',
      border: 'border-emerald-100 dark:border-emerald-900/40',
      title: isVi ? 'NFT onchain thực sự' : 'True On-Chain NFT',
      desc: isVi
        ? 'Pet của bạn được đúc thành NFT trực tiếp trên SUI Blockchain. Không ai có thể xóa hay thay đổi quyền sở hữu của bạn.'
        : 'Your pet is minted as an NFT directly on the SUI Blockchain — immutable, truly owned by you.',
    },
    {
      icon: <Layers size={20} className="text-indigo-500" />,
      bg: 'bg-indigo-50 dark:bg-indigo-950/30',
      border: 'border-indigo-100 dark:border-indigo-900/40',
      title: isVi ? '9 hành động hoạt hình' : '9 Animated Actions',
      desc: isVi
        ? 'Pet của bạn sẽ có đầy đủ 9 hành động: đi dạo, chạy, nhảy, ngủ, chào hỏi, u sầu, gõ búa và hơn thế nữa.'
        : 'Your pet gets all 9 actions: idle, run, picked up, greet, sad, dizzy, save money, sleep, and hammering.',
    },
    {
      icon: <Cpu size={20} className="text-cyan-500" />,
      bg: 'bg-cyan-50 dark:bg-cyan-950/30',
      border: 'border-cyan-100 dark:border-cyan-900/40',
      title: isVi ? 'Tích hợp Desktop Tauri' : 'Tauri Desktop Integration',
      desc: isVi
        ? 'Sync pet xuống app desktop MiniPet. Pet sống động chạy trên màn hình, hỗ trợ Pomodoro và dọn file rác.'
        : 'Sync your pet to the MiniPet desktop app. It walks on screen, supports Pomodoro focus & file cleanup.',
    },
    {
      icon: <Zap size={20} className="text-amber-500" />,
      bg: 'bg-amber-50 dark:bg-amber-950/30',
      border: 'border-amber-100 dark:border-amber-900/40',
      title: isVi ? 'Nhẹ, nhanh, tiết kiệm' : 'Lightweight & Fast',
      desc: isVi 
        ? 'App MiniPet chỉ tiêu tốn lượng tài nguyên siêu nhỏ (RAM & CPU), hoàn toàn không ảnh hưởng đến hiệu suất máy.'
        : 'MiniPet uses minimal system resources (RAM & CPU) — your system performance is completely unaffected.',
    },
    {
      icon: <Globe size={20} className="text-blue-500" />,
      bg: 'bg-blue-50 dark:bg-blue-950/30',
      border: 'border-blue-100 dark:border-blue-900/40',
      title: isVi ? 'Lưu trữ Walrus phi tập trung' : 'Decentralized Walrus Storage',
      desc: isVi
        ? 'Spritesheet và metadata của pet được lưu trên Walrus — hạ tầng lưu trữ phi tập trung của hệ sinh thái SUI.'
        : 'Spritesheets and metadata are stored on Walrus — the decentralized storage layer of the SUI ecosystem.',
    },
  ];

  const steps = [
    { num: '01', title: isVi ? 'Mua Mint Slot' : 'Buy Mint Slot', desc: isVi ? 'Thanh toán bằng MIPET token để nhận NFT Mint Slot về ví.' : 'Pay with MIPET tokens to receive the Mint Slot NFT.' },
    { num: '02', title: isVi ? 'Upload Spritesheet' : 'Upload Spritesheet', desc: isVi ? 'Vào trang Custom Pet, upload file PNG spritesheet 9 hành động của bạn.' : 'Go to Custom Pet, upload your 9-action PNG spritesheet.' },
    { num: '03', title: isVi ? 'Đặt tên & Mint' : 'Name & Mint', desc: isVi ? 'Đặt tên độc nhất cho pet. Xác nhận giao dịch mint NFT lên SUI.' : 'Give your pet a unique name. Confirm the mint transaction on SUI.' },
    { num: '04', title: isVi ? 'Sync Desktop' : 'Sync to Desktop', desc: isVi ? 'Mở app MiniPet, sync ví để pet của bạn sống động trên màn hình.' : 'Open MiniPet app, sync your wallet and watch your pet come alive.' },
  ];

  const rarityTiers = [
    { label: isVi ? 'Bình thường' : 'Normal', color: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300', chance: '70%' },
    { label: isVi ? 'Hiếm' : 'Rare', color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300', chance: '20%' },
    { label: isVi ? 'Cực hiếm' : 'Super Rare', color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-300', chance: '8%' },
    { label: isVi ? 'Huyền thoại' : 'Legendary', color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-300', chance: '2%' },
  ];

  return (
    <div className="pt-24 pb-20 min-h-screen container mx-auto px-4 max-w-4xl relative">
      {/* Background */}
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-amber-200/10 dark:bg-amber-900/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 right-0 w-[300px] h-[300px] bg-violet-200/10 dark:bg-violet-900/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-2 text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-100 transition-colors cursor-pointer bg-transparent border-none"
      >
        <ArrowLeft size={16} />
        {isVi ? 'Quay lại Cửa Hàng' : 'Back to Market'}
      </button>

      {/* Hero card */}
      <div className="relative rounded-3xl overflow-hidden bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border border-amber-200/50 dark:border-amber-900/30 shadow-xl mb-8">
        {/* Top gradient strip */}
        <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400" />

        <div className="p-6 sm:p-8 flex flex-col sm:flex-row gap-8 items-center">
          {/* Banana visual */}
          <div className="w-36 h-36 flex-shrink-0 rounded-2xl bg-gradient-to-br from-amber-50 to-yellow-100 dark:from-amber-950/40 dark:to-yellow-950/30 border border-amber-200/60 dark:border-amber-900/40 flex items-center justify-center select-none shadow-inner">
            <div className="flex flex-col items-center">
              <div className="flex gap-0.5 -mb-1.5">
                <span className="text-2xl" style={{ transform: 'rotate(-25deg)' }}>🍌</span>
                <span className="text-2xl" style={{ transform: 'rotate(25deg)' }}>🍌</span>
              </div>
              <span className="text-5xl">🍌</span>
              <div className="flex gap-0.5 -mt-1.5">
                <span className="text-xl" style={{ transform: 'rotate(15deg) scaleX(-1)' }}>🍌</span>
                <span className="text-xl" style={{ transform: 'rotate(-15deg)' }}>🍌</span>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 text-[10px] font-black text-amber-600 dark:text-amber-400 uppercase tracking-widest mb-3">
              <Gift size={10} />
              {isVi ? 'Custom Mint Slot' : 'Custom Mint Slot'}
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-2 leading-tight">
              {isVi ? 'Tạo Pet Của Riêng Bạn' : 'Create Your Own Pet'}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-5 leading-relaxed max-w-lg">
              {isVi
                ? 'Mint Slot cho phép bạn tạo một NFT pet hoàn toàn độc nhất trên SUI Blockchain với spritesheet pixel-art của chính bạn.'
                : 'A Mint Slot lets you create a completely unique pet NFT on the SUI Blockchain using your own pixel-art spritesheet.'}
            </p>
            <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
              <button
                onClick={handleBuy}
                disabled={buying}
                className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-white font-black py-2.5 px-5 rounded-xl text-sm transition-all shadow-lg shadow-amber-400/20 hover:shadow-amber-400/40 hover:-translate-y-0.5 cursor-pointer border-none"
              >
                <Sparkles size={15} />
                {buying
                  ? (isVi ? 'Đang xử lý...' : 'Processing...')
                  : `${isVi ? 'Mua ngay' : 'Buy Now'} — ${Number(slotPrice) / 1_000_000_000} MIPET`}
              </button>
              <button
                onClick={() => router.push('/custom-pet')}
                className="flex items-center gap-2 bg-white/60 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300 font-bold py-2.5 px-5 rounded-xl text-sm transition-all border border-gray-200 dark:border-slate-700 cursor-pointer"
              >
                {isVi ? 'Xem Custom Pet' : 'Go to Custom Pet'}
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Rarity odds */}
      <div className="mb-8 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/60 dark:border-slate-800/40 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Star size={16} className="text-amber-500" />
          <h2 className="text-sm font-black text-gray-800 dark:text-white uppercase tracking-wider">
            {isVi ? 'Tỷ lệ độ hiếm khi mint' : 'Rarity Drop Rates'}
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {rarityTiers.map((r) => (
            <div key={r.label} className="text-center p-3 rounded-xl bg-white/50 dark:bg-slate-950/30 border border-gray-100 dark:border-slate-800">
              <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black mb-2 ${r.color}`}>{r.label}</span>
              <div className="text-xl font-black text-gray-800 dark:text-white">{r.chance}</div>
              <div className="text-[9px] text-gray-400 font-semibold mt-0.5">{isVi ? 'xác suất' : 'chance'}</div>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-3 font-medium text-center">
          {isVi
            ? '* Tỷ lệ được xác định ngẫu nhiên onchain khi mint. Huyền thoại cực kỳ hiếm.'
            : '* Rarity is determined randomly on-chain at mint time. Legendary is extremely rare.'}
        </p>
      </div>

      {/* Benefits grid */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-5">
          <CheckCircle2 size={16} className="text-emerald-500" />
          <h2 className="text-sm font-black text-gray-800 dark:text-white uppercase tracking-wider">
            {isVi ? 'Quyền lợi khi sở hữu Mint Slot' : 'What You Get With a Mint Slot'}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {benefits.map((b, i) => (
            <div key={i} className={`rounded-2xl border p-4 ${b.bg} ${b.border} transition-all hover:-translate-y-0.5 hover:shadow-sm`}>
              <div className="flex items-center gap-3 mb-2.5">
                <div className="w-9 h-9 rounded-xl bg-white/70 dark:bg-slate-900/50 flex items-center justify-center shadow-sm border border-white/80 dark:border-slate-800/60 flex-shrink-0">
                  {b.icon}
                </div>
                <h3 className="text-xs font-black text-gray-800 dark:text-gray-100 leading-tight">{b.title}</h3>
              </div>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed font-medium">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div className="mb-8 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/60 dark:border-slate-800/40 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-5">
          <Lock size={16} className="text-indigo-500" />
          <h2 className="text-sm font-black text-gray-800 dark:text-white uppercase tracking-wider">
            {isVi ? 'Cách hoạt động' : 'How It Works'}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s, i) => (
            <div key={i} className="relative">
              <div className="flex items-start gap-3">
                <span className="text-2xl font-black text-gray-200 dark:text-slate-700 select-none leading-none">{s.num}</span>
                <div>
                  <div className="text-xs font-black text-gray-800 dark:text-gray-100 mb-1">{s.title}</div>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed font-medium">{s.desc}</p>
                </div>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-3 -right-2 text-gray-300 dark:text-slate-700">
                  <ArrowRight size={14} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CTA bottom */}
      <div className="flex flex-col items-center gap-3 text-center">
        <p className="text-xs text-gray-400 dark:text-gray-500 font-semibold max-w-md">
          {isVi
            ? 'Chỉ cần MIPET token. Không cần tài khoản. Quyền sở hữu hoàn toàn thuộc về bạn trên blockchain.'
            : 'Only MIPET tokens needed. No account. Full ownership on the SUI blockchain.'}
        </p>
        <button
          onClick={handleBuy}
          disabled={buying}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-white font-black py-3 px-8 rounded-2xl text-sm transition-all shadow-xl shadow-amber-400/20 hover:shadow-amber-400/40 hover:-translate-y-0.5 cursor-pointer border-none"
        >
          <Sparkles size={16} />
          {buying ? (isVi ? 'Đang xử lý...' : 'Processing...') : (isVi ? `Mua Mint Slot — ${Number(slotPrice) / 1_000_000_000} MIPET` : `Buy Mint Slot — ${Number(slotPrice) / 1_000_000_000} MIPET`)}
        </button>
      </div>
    </div>
  );
}
