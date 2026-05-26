"use client";

import React, { useEffect, useState } from 'react';
import { useCurrentAccount, ConnectButton } from '@mysten/dapp-kit';
import { ShieldCheck, HelpCircle, Laptop } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { jwtToAddress, generateNonce, generateRandomness } from '@mysten/sui/zklogin';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SyncLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const account = useCurrentAccount();
  const isConnectOnly = searchParams.get('action') === 'connect';
  const [zkLoginAddress, setZkLoginAddress] = useState<string | null>(null);
  const [googleClientId, setGoogleClientId] = useState<string>('');
  const [showClientInput, setShowClientInput] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [syncStatus, _setSyncStatus] = useState<'idle' | 'success' | 'failed' | 'connected'>('idle');

  // Load Google Client ID from env or localStorage
  useEffect(() => {
    const savedId = localStorage.getItem('google_client_id') || '';
    const envId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';
    setGoogleClientId(envId || savedId);
    if (!envId && !savedId) {
      setShowClientInput(true);
    }
  }, []);

  // Parse Google OAuth redirect hash for id_token
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const idToken = params.get('id_token');
      const stateParam = params.get('state');
      if (idToken) {
        try {
          // Derive Sui address using a 128-bit constant salt for simple local testing
          const salt = BigInt("11223344556677889900112233445566");
          const derivedAddress = jwtToAddress(idToken, salt, false);
          setZkLoginAddress(derivedAddress);
          localStorage.setItem('zklogin_address', derivedAddress);
          // Clear hash from address bar
          window.history.replaceState(null, '', window.location.pathname);
          
          if (stateParam === 'connect') {
            router.push('/');
            return;
          }
        } catch (err: any) {
          console.error(err);
          setError("Lỗi giải mã token hoặc tính toán địa chỉ ví zkLogin: " + err.message);
        }
      }
    }
  }, [router]);

  const handleSyncAddress = (addressToSync: string, isManual: boolean = false) => {
    try {
      if (isManual) {
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(addressToSync)
              .then(() => console.log('[Sync] Đã copy địa chỉ ví vào clipboard để fallback sync.'))
              .catch(err => console.warn('[Sync] Không thể ghi vào clipboard (Promise rejected):', err));
          }
        } catch (clipErr) {
          console.warn('[Sync] Trình duyệt chặn quyền ghi clipboard trực tiếp:', clipErr);
        }
      }

      const syncUrl = `minipet://sync?address=${addressToSync}`;
      console.log('Syncing to app with URL:', syncUrl);
      window.location.href = syncUrl;
    } catch (err) {
      console.error(err);
    }
  };

  const handleGoogleLogin = () => {
    const clientId = googleClientId.trim();
    if (!clientId) {
      alert("Vui lòng nhập Google Client ID để bắt đầu đăng nhập bằng Google.");
      return;
    }

    // Save to localStorage if not from process.env
    if (!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
      localStorage.setItem('google_client_id', clientId);
    }

    try {
      const redirectUri = window.location.origin + '/sync-login';
      
      // 1. Generate Ephemeral Keypair
      const ephemeralKeypair = new Ed25519Keypair();
      localStorage.setItem('zklogin_ephemeral_private_key', ephemeralKeypair.getSecretKey());
      
      const ephemeralPublicKey = ephemeralKeypair.getPublicKey();
      
      // 2. Generate Randomness and Max Epoch
      const randomness = generateRandomness();
      localStorage.setItem('zklogin_randomness', randomness);
      
      const maxEpoch = 999999999; // Simple high epoch for dev testing
      localStorage.setItem('zklogin_max_epoch', maxEpoch.toString());
      
      // 3. Generate Nonce
      const nonce = generateNonce(ephemeralPublicKey, maxEpoch, randomness);
      
      // 4. Redirect to Google
      const params = new URLSearchParams({
        client_id: clientId,
        redirect_uri: redirectUri,
        response_type: 'id_token',
        scope: 'openid email profile',
        nonce: nonce,
        ...(isConnectOnly ? { state: 'connect' } : {})
      });
      
      window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
    } catch (err: any) {
      console.error(err);
      setError("Không thể khởi tạo yêu cầu zkLogin: " + err.message);
    }
  };

  const activeAddress = account?.address || zkLoginAddress;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl text-center space-y-6 animate-fade-in">
        
        {/* Decorative Top */}
        <div className="relative mx-auto w-24 h-24 flex items-center justify-center bg-indigo-500/10 rounded-full border border-indigo-500/20">
          <Laptop className="w-12 h-12 text-indigo-400" />
          <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1.5 border border-slate-900">
            <ShieldCheck className="w-4 h-4 text-white" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-200 via-blue-100 to-indigo-200 bg-clip-text text-transparent">
            {isConnectOnly ? 'Đăng nhập MiniPet' : 'Đồng bộ ví MiniPet'}
          </h1>
          <p className="text-sm text-slate-400">
            {isConnectOnly 
              ? 'Kết nối qua ví Sui extension hoặc Đăng nhập trực tiếp bằng Google (zkLogin).'
              : 'Kết nối qua ví Sui extension hoặc Đăng nhập trực tiếp bằng Google (zkLogin) để đồng bộ tài sản xuống app.'}
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs">
            {error}
          </div>
        )}

        {syncStatus === 'connected' && (
          <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-300 text-sm space-y-1.5">
            <p className="font-semibold text-indigo-200">Kết nối ví thành công! 🎉</p>
            <p className="text-xs text-slate-300">
              Hãy nhấn nút <strong>"Đồng bộ với Desktop App"</strong> ở bên dưới để hoàn tất liên kết ví với ứng dụng.
            </p>
          </div>
        )}
        {syncStatus === 'success' && (
          <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm space-y-1.5 text-left">
            <p className="font-semibold text-center">Đã gửi yêu cầu đồng bộ tới Desktop App! 🚀</p>
            <p className="text-xs text-slate-300">
              Địa chỉ ví của bạn đã được tự động copy vào clipboard làm dự phòng. Nếu ứng dụng không nhận được, bạn hãy <strong>click chuột trái 1 lần vào chú Pet</strong> trên màn hình để đồng bộ tức thì nhé!
            </p>
          </div>
        )}
        {syncStatus === 'failed' && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
            Đồng bộ thất bại. Hãy chắc chắn bạn đã mở và chạy ứng dụng MiniPet.
          </div>
        )}

        {/* Connection Options */}
        <div className="bg-slate-900/50 border border-white/5 p-6 rounded-2xl flex flex-col items-center gap-4">
          {!activeAddress ? (
            <div className="w-full space-y-4">
              {/* Option A: Google Native zkLogin */}
              <div className="space-y-3">
                <span className="text-xs text-indigo-300 font-semibold tracking-wider uppercase block text-center">Phương án A: Đăng nhập Google (zkLogin)</span>
                
                {showClientInput && (
                  <div className="space-y-2 text-left">
                    <label className="text-[11px] text-slate-400 font-medium block">Google Client ID (OAuth Web):</label>
                    <input 
                      type="text" 
                      value={googleClientId} 
                      onChange={(e) => setGoogleClientId(e.target.value)} 
                      placeholder="Nhập Google Client ID của bạn..."
                      className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-xs text-indigo-200 font-mono outline-none focus:border-indigo-500 transition-colors"
                    />
                    <a 
                      href="https://console.cloud.google.com/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[10px] text-indigo-400 hover:underline block"
                    >
                      * Hướng dẫn: Lấy Client ID từ Google Cloud Console (Thêm {window.location.origin}/sync-login vào Redirect URIs)
                    </a>
                  </div>
                )}

                <button
                  onClick={handleGoogleLogin}
                  className="w-full py-2.5 px-4 bg-white text-slate-900 hover:bg-slate-100 active:scale-[0.98] font-bold rounded-xl text-sm flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer border-none"
                >
                  <FcGoogle size={18} />
                  Đăng nhập bằng Google
                </button>
              </div>

              {/* Divider */}
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-white/10"></div>
                <span className="flex-shrink mx-4 text-slate-500 text-xs uppercase font-medium">Hoặc</span>
                <div className="flex-grow border-t border-white/10"></div>
              </div>

              {/* Option B: Wallet Extension */}
              <div className="space-y-3">
                <span className="text-xs text-indigo-300 font-semibold tracking-wider uppercase block text-center">Phương án B: Kết nối Ví Extension</span>
                <div className="flex justify-center">
                  <ConnectButton />
                </div>
                <p className="text-[10px] text-slate-500 max-w-[280px] mx-auto mt-1 text-center">
                  Sử dụng Sui Wallet, Suiet hoặc các ví extension khác đã cài trên trình duyệt của bạn.
                </p>
              </div>
            </div>
          ) : (
            <div className="w-full space-y-4">
              <span className="text-xs text-green-400 font-semibold tracking-wider uppercase flex items-center justify-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
                {zkLoginAddress ? "Google zkLogin thành công!" : "Ví Extension kết nối thành công!"}
              </span>
              <div className="w-full bg-slate-950/80 p-3 rounded-lg border border-white/5 select-all text-xs font-mono text-indigo-200 break-all text-center">
                {activeAddress}
              </div>
              {syncStatus !== 'success' && (
                <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-300 text-xs text-center">
                  Nhấp vào nút bên dưới để bắt đầu đồng bộ sang ứng dụng MiniPet.
                </div>
              )}
              <button
                onClick={() => handleSyncAddress(activeAddress, true)}
                className="w-full mt-2 py-3 px-6 bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 active:scale-[0.98] font-bold text-white rounded-xl shadow-lg hover:shadow-indigo-500/20 transition-all duration-200 cursor-pointer border-none"
              >
                Đồng bộ với Desktop App
              </button>
              
              <button
                onClick={() => {
                  setZkLoginAddress(null);
                  setError(null);
                  // Reload window to reset dapp-kit wallet connection state if connected
                  window.location.reload();
                }}
                className="text-[11px] text-slate-500 hover:text-slate-400 underline block mx-auto cursor-pointer"
              >
                Đổi tài khoản khác
              </button>
            </div>
          )}
        </div>

        {/* Helper Note */}
        <div className="text-xs text-slate-500 flex items-center justify-center gap-1">
          <HelpCircle size={14} />
          <span>Gặp sự cố? Hãy chắc chắn rằng bạn đã mở MiniPet trên máy tính.</span>
        </div>

        {/* Back to Home Button */}
        <div className="pt-2 border-t border-white/5 w-full">
          <button
            onClick={() => router.push('/')}
            className="text-xs text-slate-400 hover:text-white transition-all bg-transparent border-none cursor-pointer underline font-bold"
          >
            Quay lại trang chủ
          </button>
        </div>

      </div>
    </div>
  );
}
