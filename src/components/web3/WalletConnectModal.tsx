"use client";

import React from 'react';
import { X } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { useWallets, useConnectWallet } from '@mysten/dapp-kit';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface WalletConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WalletConnectModal({ isOpen, onClose }: WalletConnectModalProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const wallets = useWallets();
  const { mutate: connectWallet } = useConnectWallet();

  const handleSelectWallet = (wallet: any) => {
    connectWallet(
      { wallet },
      {
        onSuccess: () => {
          onClose();
        },
        onError: (err: any) => {
          console.error("Lỗi kết nối ví:", err);
          alert("Không thể kết nối ví: " + err.message);
        },
      }
    );
  };

  const handlezkLoginClick = () => {
    onClose();
    // Chuyển hướng người dùng sang trang sync-login
    router.push('/sync-login');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-md z-0 pointer-events-auto cursor-pointer"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.4 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-slate-900/90 text-white p-6 shadow-2xl backdrop-blur-xl z-10 pointer-events-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-all cursor-pointer border-none"
              aria-label="Close modal"
            >
              <X size={16} />
            </button>

            {/* Header */}
            <div className="text-center mt-2 mb-6">
              <h2 className="text-xl font-black bg-gradient-to-r from-indigo-200 via-blue-100 to-indigo-200 bg-clip-text text-transparent">
                {t('wallet.modal_title') || 'Kết nối ví của bạn'}
              </h2>
              <p className="text-xs text-slate-400 mt-1.5 max-w-[280px] mx-auto">
                {t('wallet.modal_subtitle') || 'Chọn phương thức phù hợp để liên kết tài sản của bạn với MiniPet'}
              </p>
            </div>

            <div className="space-y-5">
              {/* Option A: Social Login (zkLogin) */}
              <div className="space-y-2">
                <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider block">
                  Phương án A: Không cần ví (Sui zkLogin)
                </span>
                <button
                  onClick={handlezkLoginClick}
                  className="w-full flex items-center justify-between p-4 rounded-2xl bg-white text-slate-900 hover:bg-slate-100 active:scale-[0.99] transition-all duration-200 font-bold text-sm cursor-pointer border-none group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                      <FcGoogle size={22} />
                    </div>
                    <div className="text-left">
                      <div className="text-slate-900 font-black">Đăng nhập bằng Google</div>
                      <div className="text-[10px] text-slate-500 font-medium">Bảo mật bằng zkLogin, cực kỳ nhanh gọn</div>
                    </div>
                  </div>
                  <span className="text-[10px] bg-indigo-500/10 text-indigo-600 px-2 py-0.5 rounded-md font-extrabold group-hover:bg-indigo-500/25 transition-all">
                    Khuyên dùng
                  </span>
                </button>
              </div>

              {/* Divider */}
              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-white/10"></div>
                <span className="flex-shrink mx-3 text-[10px] text-slate-500 uppercase font-bold tracking-wider">Hoặc</span>
                <div className="flex-grow border-t border-white/10"></div>
              </div>

              {/* Option B: Wallet Extensions */}
              <div className="space-y-2">
                <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider block">
                  Phương án B: Ví Sui Extension (Ví Slug)
                </span>
                <div className="max-h-[220px] overflow-y-auto pr-1 space-y-2 scrollbar-thin scrollbar-thumb-slate-800">
                  {wallets && wallets.length > 0 ? (
                    wallets.map((wallet) => (
                      <button
                        key={wallet.name}
                        onClick={() => handleSelectWallet(wallet)}
                        className="w-full flex items-center gap-3 p-3 rounded-2xl bg-slate-950/40 hover:bg-slate-950/80 border border-white/5 hover:border-indigo-500/40 active:scale-[0.99] transition-all duration-200 cursor-pointer text-left"
                      >
                        <div className="w-8 h-8 rounded-lg overflow-hidden bg-white/5 flex items-center justify-center p-1.5 border border-white/10">
                          {wallet.icon ? (
                            <img src={wallet.icon} alt={wallet.name} className="w-full h-full object-contain" />
                          ) : (
                            <div className="w-full h-full rounded-md bg-gradient-to-br from-indigo-500 to-blue-500" />
                          )}
                        </div>
                        <div>
                          <div className="font-extrabold text-xs text-slate-100">{wallet.name}</div>
                          <div className="text-[9px] text-slate-500">Bản cài đặt Extension ({wallet.version})</div>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="text-center py-6 px-4 bg-slate-950/30 rounded-2xl border border-dashed border-white/5">
                      <div className="text-xs text-slate-400 font-semibold">Chưa phát hiện thấy ví Extension nào</div>
                      <a
                        href="https://chrome.google.com/webstore/detail/sui-wallet/opffplechnddgebcedknjanceedoccom"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-2.5 text-[10px] text-indigo-400 hover:underline font-bold"
                      >
                        Tải Sui Wallet trên Chrome Web Store →
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-[10px] text-slate-500">
                MiniPet không bao giờ lưu trữ khóa riêng tư của bạn. Giao dịch luôn an toàn.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
