"use client";

import React, { useEffect, useState } from 'react';
import { useCurrentAccount, ConnectButton } from '@mysten/dapp-kit';
import { ShieldCheck, HelpCircle, Laptop } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { generateNonce, generateRandomness } from '@mysten/sui/zklogin';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { suiClient } from '../../services/blockchain/sui';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';

export default function SyncLoginPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const account = useCurrentAccount();
  const isConnectOnly = searchParams.get('action') === 'connect' || (typeof window !== 'undefined' && window.location.hash.includes('state=connect'));
  const [zkLoginAddress, setZkLoginAddress] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('zklogin_address') || null;
    }
    return null;
  });
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
        (async () => {
          try {
            // Get salt and address from Enoki API
            const enokiRes = await fetch('https://api.enoki.mystenlabs.com/v1/zklogin', {
              headers: {
                'Authorization': 'Bearer enoki_public_b1c00104f51636649e30132176038cd8',
                'zklogin-jwt': idToken,
              },
            });
            if (!enokiRes.ok) throw new Error('Enoki API failed: ' + await enokiRes.text());
            const enokiData = (await enokiRes.json()).data;
            const salt = enokiData.salt;
            const address = enokiData.address;

            setZkLoginAddress(address);
            sessionStorage.setItem('zklogin_address', address);
            localStorage.setItem('zklogin_address', address);
            sessionStorage.setItem('zklogin_jwt', idToken);
            localStorage.setItem('zklogin_jwt', idToken);

            // Copy ephemeral session items from localStorage to sessionStorage if needed
            const epk = localStorage.getItem('zklogin_ephemeral_private_key');
            if (epk) sessionStorage.setItem('zklogin_ephemeral_private_key', epk);
            const rand = localStorage.getItem('zklogin_randomness');
            if (rand) sessionStorage.setItem('zklogin_randomness', rand);
            const maxEpoch = localStorage.getItem('zklogin_max_epoch');
            if (maxEpoch) sessionStorage.setItem('zklogin_max_epoch', maxEpoch);
            sessionStorage.setItem('zklogin_salt', salt);
            localStorage.setItem('zklogin_salt', salt);

            // Clear hash from address bar
            window.history.replaceState(null, '', window.location.pathname);
            
            if (stateParam === 'connect') {
              router.push('/');
              return;
            }
          } catch (err: any) {
            console.error(err);
            setError(t('sync.error_decode') + err.message);
          }
        })();
      }
    }
  }, [router]);

  const handleSyncAddress = (addressToSync: string, isManual: boolean = false) => {
    try {
      let syncUrl = `minipet://sync?address=${addressToSync}`;

      // Check if we have a zkLogin session
      const jwt = sessionStorage.getItem('zklogin_jwt') || localStorage.getItem('zklogin_jwt');
      if (jwt) {
        const epk = sessionStorage.getItem('zklogin_ephemeral_private_key') || localStorage.getItem('zklogin_ephemeral_private_key');
        const rand = sessionStorage.getItem('zklogin_randomness') || localStorage.getItem('zklogin_randomness');
        const epoch = sessionStorage.getItem('zklogin_max_epoch') || localStorage.getItem('zklogin_max_epoch');
        const salt = sessionStorage.getItem('zklogin_salt') || localStorage.getItem('zklogin_salt');
        
        if (epk && rand && epoch) {
          const payloadObj = { jwt, ephemeralPrivateKey: epk, randomness: rand, maxEpoch: epoch, salt };
          const base64Payload = Buffer.from(JSON.stringify(payloadObj)).toString('base64');
          syncUrl += `&zkloginPayload=${base64Payload}`;
        }
      }

      console.log('Syncing to app with URL:', syncUrl);
      // Copy to clipboard FIRST (synchronously start), then redirect
      if (isManual && navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(syncUrl).catch(err => console.warn('[Sync] Clipboard write failed:', err));
      }
      // Delay redirect slightly to let clipboard write complete
      setTimeout(() => { window.location.href = syncUrl; }, 200);
    } catch (err) {
      console.error(err);
    }
  };

  const handleGoogleLogin = async () => {
    const clientId = googleClientId.trim();
    if (!clientId) {
      alert(t('sync.alert_enter_client_id'));
      return;
    }

    // Save to localStorage if not from process.env
    if (!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
      localStorage.setItem('google_client_id', clientId);
    }

    try {
      const redirectUri = window.location.origin + '/sync-login';
      
      // 1. Fetch current epoch from SUI to compute valid maxEpoch
      const { epoch } = await suiClient.getLatestSuiSystemState();
      const maxEpoch = Number(epoch) + 2; // valid for ~2 epochs

      // 2. Salt will be fetched from Enoki after Google login returns JWT

      // 3. Generate Ephemeral Keypair
      const ephemeralKeypair = new Ed25519Keypair();
      const epkSecret = ephemeralKeypair.getSecretKey();
      sessionStorage.setItem('zklogin_ephemeral_private_key', epkSecret);
      localStorage.setItem('zklogin_ephemeral_private_key', epkSecret);
      const ephemeralPublicKey = ephemeralKeypair.getPublicKey();
      
      // 4. Generate Randomness and Max Epoch
      const randomness = generateRandomness();
      sessionStorage.setItem('zklogin_randomness', randomness);
      localStorage.setItem('zklogin_randomness', randomness);
      sessionStorage.setItem('zklogin_max_epoch', maxEpoch.toString());
      localStorage.setItem('zklogin_max_epoch', maxEpoch.toString());
      
      // 5. Generate Nonce using actual maxEpoch
      const nonce = generateNonce(ephemeralPublicKey, maxEpoch, randomness);
      
      // 6. Redirect to Google
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
      setError(t('sync.error_init') + err.message);
    }
  };

  const activeAddress = account?.address || zkLoginAddress;
  
  // For sync: use the currently active address on the web (same logic as useActiveAddress)
  const syncAddress = account?.address || zkLoginAddress;

  // Nếu người dùng chỉ muốn Đăng nhập (Connect) từ Web App, ta không hiện giao diện Sync
  if (isConnectOnly && !error) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center text-white">
        <div className="w-16 h-16 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mb-6"></div>
        <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-200 to-blue-200 bg-clip-text text-transparent">
          {t('sync.connecting')}
        </h2>
        <p className="text-slate-500 text-sm mt-2">{t('sync.loading_wait')}</p>
      </div>
    );
  }

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
            {isConnectOnly ? t('sync.login_title') : t('sync.sync_title')}
          </h1>
          <p className="text-sm text-slate-400">
            {isConnectOnly ? t('sync.login_desc') : t('sync.sync_desc')}
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs">
            {error}
          </div>
        )}

        {syncStatus === 'connected' && (
          <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-300 text-sm space-y-1.5">
            <p className="font-semibold text-indigo-200">{t('sync.connect_success')}</p>
            <p className="text-xs text-slate-300">
              {t('sync.connect_success_detail')}
            </p>
          </div>
        )}
        {syncStatus === 'success' && (
          <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm space-y-1.5 text-left">
            <p className="font-semibold text-center">{t('sync.sync_success')}</p>
            <p className="text-xs text-slate-300">
              {t('sync.sync_success_detail')}
            </p>
          </div>
        )}
        {syncStatus === 'failed' && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
            {t('sync.sync_failed')}
          </div>
        )}

        {/* Connection Options */}
        <div className="bg-slate-900/50 border border-white/5 p-6 rounded-2xl flex flex-col items-center gap-4">
          {!activeAddress ? (
            <div className="w-full space-y-4">
              {/* Option A: Google Native zkLogin */}
              <div className="space-y-3">
                <span className="text-xs text-indigo-300 font-semibold tracking-wider uppercase block text-center">{t('sync.option_a')}</span>
                
                {showClientInput && (
                  <div className="space-y-2 text-left">
                    <label className="text-[11px] text-slate-400 font-medium block">{t('sync.google_client_id_label')}</label>
                    <input 
                      type="text" 
                      value={googleClientId} 
                      onChange={(e) => setGoogleClientId(e.target.value)} 
                      placeholder={t('sync.google_client_id_placeholder')}
                      className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-xs text-indigo-200 font-mono outline-none focus:border-indigo-500 transition-colors"
                    />
                    <a 
                      href="https://console.cloud.google.com/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[10px] text-indigo-400 hover:underline block"
                    >
                      {t('sync.google_client_id_guide').replace('{{origin}}', window.location.origin)}
                    </a>
                  </div>
                )}

                <button
                  onClick={handleGoogleLogin}
                  className="w-full py-2.5 px-4 bg-white text-slate-900 hover:bg-slate-100 active:scale-[0.98] font-bold rounded-xl text-sm flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer border-none"
                >
                  <FcGoogle size={18} />
                  {t('sync.google_login_btn')}
                </button>
              </div>

              {/* Divider */}
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-white/10"></div>
                <span className="flex-shrink mx-4 text-slate-500 text-xs uppercase font-medium">{t('wallet.or')}</span>
                <div className="flex-grow border-t border-white/10"></div>
              </div>

              {/* Option B: Wallet Extension */}
              <div className="space-y-3">
                <span className="text-xs text-indigo-300 font-semibold tracking-wider uppercase block text-center">{t('sync.option_b')}</span>
                <div className="flex justify-center">
                  <ConnectButton />
                </div>
                <p className="text-[10px] text-slate-500 max-w-[280px] mx-auto mt-1 text-center">
                  {t('wallet.extension_desc')}
                </p>
              </div>
            </div>
          ) : (
            <div className="w-full space-y-4">
              <span className="text-xs text-green-400 font-semibold tracking-wider uppercase flex items-center justify-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
                {zkLoginAddress ? t('wallet.social_login_a') + " " + t('wallet.recommend') : t('wallet.extension_login_b')}
              </span>
              <div className="w-full bg-slate-950/80 p-3 rounded-lg border border-white/5 select-all text-xs font-mono text-indigo-200 break-all text-center">
                {activeAddress}
              </div>
              {syncStatus !== 'success' && (
                <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-300 text-xs text-center">
                  {t('sync.connect_success_detail')}
                </div>
              )}
              <button
                onClick={() => handleSyncAddress(syncAddress!, true)}
                className="w-full mt-2 py-3 px-6 bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 active:scale-[0.98] font-bold text-white rounded-xl shadow-lg hover:shadow-indigo-500/20 transition-all duration-200 cursor-pointer border-none"
              >
                {t('sync.sync_desktop_btn')}
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
                {t('sync.change_account')}
              </button>
            </div>
          )}
        </div>

        {/* Helper Note */}
        <div className="text-xs text-slate-500 flex items-center justify-center gap-1">
          <HelpCircle size={14} />
          <span>{t('sync.troubleshoot')}</span>
        </div>

        {/* Back to Home Button */}
        <div className="pt-2 border-t border-white/5 w-full">
          <button
            onClick={() => router.push('/')}
            className="text-xs text-slate-400 hover:text-white transition-all bg-transparent border-none cursor-pointer underline font-bold"
          >
            {t('sync.back_home')}
          </button>
        </div>

      </div>
    </div>
  );
}
