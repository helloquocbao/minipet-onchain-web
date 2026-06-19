"use client";

import React from 'react';
import { X } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { useWallets, useConnectWallet } from '@mysten/dapp-kit';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { suiClient } from '../../services/blockchain/sui';

interface WalletConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WalletConnectModal({ isOpen, onClose }: WalletConnectModalProps) {
  const { t, i18n } = useTranslation();
  const wallets = useWallets();
  const { mutate: connectWallet } = useConnectWallet();
  const [googleClientId, setGoogleClientId] = React.useState<string>('');
  const [showClientInput, setShowClientInput] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (isOpen) {
      const savedId = localStorage.getItem('google_client_id') || '';
      const envId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';
      setGoogleClientId(envId || savedId);
    }
  }, [isOpen]);

  const handleSelectWallet = (wallet: any) => {
    connectWallet(
      { wallet },
      {
        onSuccess: () => {
          onClose();
        },
        onError: (err: any) => {
          console.error("Wallet connection error:", err);
          alert(t('sync.sync_failed') + ": " + err.message);
        },
      }
    );
  };

  const handlezkLoginClick = async () => {
    const clientId = googleClientId.trim();
    if (!clientId) {
      setShowClientInput(true);
      return;
    }

    if (!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
      localStorage.setItem('google_client_id', clientId);
    }

    onClose();

    try {
      const redirectUri = window.location.origin + '/sync-login';
      const { Ed25519Keypair } = await import('@mysten/sui/keypairs/ed25519');
      const { generateNonce, generateRandomness } = await import('@mysten/sui/zklogin');
      
      // Fetch current epoch for valid maxEpoch
      const { epoch } = await suiClient.getLatestSuiSystemState();
      const maxEpoch = Number(epoch) + 2;

      // Fixed salt stored in sessionStorage for consistency
      const salt = '30041975020919453004197502091945';
      sessionStorage.setItem('zklogin_salt', salt);

      const ephemeralKeypair = new Ed25519Keypair();
      localStorage.setItem('zklogin_ephemeral_private_key', ephemeralKeypair.getSecretKey());
      
      const randomness = generateRandomness();
      localStorage.setItem('zklogin_randomness', randomness);
      localStorage.setItem('zklogin_max_epoch', maxEpoch.toString());
      
      const nonce = generateNonce(ephemeralKeypair.getPublicKey(), maxEpoch, randomness);
      
      const params = new URLSearchParams({
        client_id: clientId,
        redirect_uri: redirectUri,
        response_type: 'id_token',
        scope: 'openid email profile',
        nonce: nonce,
        state: 'connect'
      });
      
      window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
    } catch (err: any) {
      console.error(err);
      alert(t('sync.error_init') + err.message);
    }
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
                  {t('wallet.social_login_a')}
                </span>

                {/* Highly Recommended Badge & Explanation */}
                <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-3 text-xs text-indigo-300 space-y-1">
                  <div className="font-extrabold flex items-center gap-1.5 text-indigo-200">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                    </span>
                    {i18n.language === 'vi' ? 'Ưu Tiên Khuyên Dùng (100% Free Gas!)' : 'Highly Recommended (100% Sponsored Gas!)'}
                  </div>
                  <div className="text-[10.5px] text-slate-400 leading-normal font-medium">
                    {i18n.language === 'vi'
                      ? 'Đăng nhập Google để nhận tài trợ 100% phí gas cho mọi giao dịch (Mint slot, Custom Pet, Faucet...). Trải nghiệm ứng dụng hoàn toàn miễn phí!'
                      : 'Login with Google to get 100% gas fees sponsored for all transactions (Mint slot, Custom Pet, Faucet...). Enjoy a fully free experience!'}
                  </div>
                </div>
                
                {showClientInput && (
                  <div className="space-y-2 text-left bg-slate-950/50 p-3 rounded-xl border border-indigo-500/30 mb-3">
                    <label className="text-[11px] text-slate-400 font-medium block">{t('sync.google_client_id_label')}</label>
                    <input 
                      type="text" 
                      value={googleClientId} 
                      onChange={(e) => setGoogleClientId(e.target.value)} 
                      placeholder={t('sync.google_client_id_placeholder')}
                      className="w-full bg-slate-900 border border-white/10 rounded-lg p-2.5 text-xs text-indigo-200 font-mono outline-none focus:border-indigo-500 transition-colors"
                    />
                    <a 
                      href="https://console.cloud.google.com/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[9px] text-indigo-400 hover:underline block mt-1"
                    >
                      * {t('sync.google_client_id_guide').replace('{{origin}}', window.location.origin)}
                    </a>
                  </div>
                )}

                <button
                  onClick={handlezkLoginClick}
                  className="w-full flex items-center justify-between p-4 rounded-2xl bg-white text-slate-900 hover:bg-slate-100 active:scale-[0.99] transition-all duration-200 font-bold text-sm cursor-pointer border-none group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                      <FcGoogle size={22} />
                    </div>
                    <div className="text-left">
                      <div className="text-slate-900 font-black">{t('sync.google_login_btn')}</div>
                      <div className="text-[10px] text-slate-500 font-medium">{t('wallet.social_login_desc')}</div>
                    </div>
                  </div>
                  <span className="text-[10px] bg-indigo-500/10 text-indigo-600 px-2 py-0.5 rounded-md font-extrabold group-hover:bg-indigo-500/25 transition-all">
                    {t('wallet.recommend')}
                  </span>
                </button>
              </div>

              {/* Divider */}
              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-white/10"></div>
                <span className="flex-shrink mx-3 text-[10px] text-slate-500 uppercase font-bold tracking-wider">{t('wallet.or')}</span>
                <div className="flex-grow border-t border-white/10"></div>
              </div>

              {/* Option B: Wallet Extensions */}
              <div className="space-y-2">
                <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider block">
                  {t('wallet.extension_login_b')}
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
                          <div className="text-[9px] text-slate-500">{t('wallet.extension_desc')} ({wallet.version})</div>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="text-center py-6 px-4 bg-slate-950/30 rounded-2xl border border-dashed border-white/5">
                      <div className="text-xs text-slate-400 font-semibold">{t('wallet.no_extension')}</div>
                      <a
                        href="https://chrome.google.com/webstore/detail/sui-wallet/opffplechnddgebcedknjanceedoccom"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-2.5 text-[10px] text-indigo-400 hover:underline font-bold"
                      >
                        {t('wallet.download_extension')}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-[10px] text-slate-500">
                {t('wallet.safe_note')}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
