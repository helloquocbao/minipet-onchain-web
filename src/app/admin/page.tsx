"use client";

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ConnectButton, useSignPersonalMessage } from '@mysten/dapp-kit';
import { useActiveAddress } from '../../hooks/useActiveAddress';
import { useTransactionExecutor } from '../../hooks/useTransactionExecutor';
import { Transaction } from '@mysten/sui/transactions';
import {
  PACKAGE_ID,
  GLOBAL_CONFIG_ID,
  ADMIN_CAP_ID,
  FUNCTIONS,
  MODULES,
  TREASURY_CAP_ID,
  PET_TOKEN_PACKAGE_ID,
  suiClient
} from '../../services/blockchain/sui';
import { WalrusService } from '../../services/walrus';
import { Settings, Plus, Info, Activity, Upload, Loader2, Check, Coins, Layers, Lock, ShieldAlert } from 'lucide-react';

export default function AdminPage() {
  const activeAddress = useActiveAddress();
  const { t } = useTranslation();
  const { execute: signAndExecuteTransaction } = useTransactionExecutor();
  const { mutateAsync: signPersonalMessage } = useSignPersonalMessage();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'store' | 'economy' | 'settings'>('dashboard');

  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [adminAddress, setAdminAddress] = useState<string | null>(null);
  const [verifyingAdmin, setVerifyingAdmin] = useState<boolean>(false);

  const [template, setTemplate] = useState({
    name: '',
    pet_type: 'balanced',
    description: '',
    image_url: '',
    image_blob_id: '',
    sprite_url_normal: '',
    sprite_blob_id_normal: '',
    sprite_url_rare: '',
    sprite_blob_id_rare: '',
    sprite_url_super_rare: '',
    sprite_blob_id_super_rare: '',
    sprite_url_legendary: '',
    sprite_blob_id_legendary: '',
    price: '1000000000'
  });

  const [selectedFiles, setSelectedFiles] = useState<{
    image: File | null;
    sprite_normal: File | null;
    sprite_rare: File | null;
    sprite_super_rare: File | null;
    sprite_legendary: File | null;
  }>({
    image: null,
    sprite_normal: null,
    sprite_rare: null,
    sprite_super_rare: null,
    sprite_legendary: null,
  });

  const [previews, setPreviews] = useState<{
    image: string;
    sprite_normal: string;
    sprite_rare: string;
    sprite_super_rare: string;
    sprite_legendary: string;
  }>({
    image: '',
    sprite_normal: '',
    sprite_rare: '',
    sprite_super_rare: '',
    sprite_legendary: '',
  });

  const [uploading, setUploading] = useState({
    image: false,
    sprite_normal: false,
    sprite_rare: false,
    sprite_super_rare: false,
    sprite_legendary: false
  });
  const [uploadDone, setUploadDone] = useState({
    image: false,
    sprite_normal: false,
    sprite_rare: false,
    sprite_super_rare: false,
    sprite_legendary: false
  });

  const [tokenMint, setTokenMint] = useState({
    amount: '1000000000000',
    recipient: ''
  });

  const [config, setConfig] = useState({
    baseFee: '10000000000000',
    treasury: ''
  });

  // Global Config Stats
  const [globalStats, setGlobalStats] = useState({
    customMintLimit: 0,
    customMintCount: 0,
    baseSlotFee: '0',
    treasuryAddress: '',
  });
  const [increaseAmount, setIncreaseAmount] = useState('10');

  const fetchGlobalConfig = async () => {
    try {
      const res = await suiClient.getObject({
        id: GLOBAL_CONFIG_ID,
        options: { showContent: true }
      });
      if (res.data?.content && res.data.content.dataType === 'moveObject') {
        const fields = (res.data.content.fields as any);
        const limit = Number(fields.custom_mint_limit || 0);
        const count = Number(fields.custom_mint_count || 0);
        const fee = fields.base_slot_fee || '0';
        const treasury = fields.treasury_address || '';

        setGlobalStats({
          customMintLimit: limit,
          customMintCount: count,
          baseSlotFee: fee,
          treasuryAddress: treasury,
        });

        setConfig({
          baseFee: fee,
          treasury: treasury,
        });
      }
    } catch (err) {
      console.error("Failed to load global config:", err);
    }
  };

  useEffect(() => {
    const verifyAdmin = async () => {
      if (!activeAddress) {
        setIsAdmin(null);
        setVerifyingAdmin(false);
        return;
      }
      try {
        setVerifyingAdmin(true);
        const res = await suiClient.getObject({
          id: ADMIN_CAP_ID,
          options: { showOwner: true }
        });
        const ownerObj = res.data?.owner as any;
        if (ownerObj && ownerObj.AddressOwner) {
          const ownerAddr = ownerObj.AddressOwner;
          setAdminAddress(ownerAddr);
          if (activeAddress.toLowerCase() === ownerAddr.toLowerCase()) {
            setIsAdmin(true);
            fetchGlobalConfig();
          } else {
            setIsAdmin(false);
          }
        } else {
          setIsAdmin(false);
        }
      } catch (err) {
        console.error("Failed to verify admin status:", err);
        setIsAdmin(false);
      } finally {
        setVerifyingAdmin(false);
      }
    };

    verifyAdmin();
  }, [activeAddress]);

  const handleFileSelect = (file: File, type: 'image' | 'sprite_normal' | 'sprite_rare' | 'sprite_super_rare' | 'sprite_legendary') => {
    setSelectedFiles(prev => ({ ...prev, [type]: file }));
    setPreviews(prev => ({ ...prev, [type]: URL.createObjectURL(file) }));
    setUploadDone(prev => ({ ...prev, [type]: false }));
  };

  const handleCreateTemplate = async () => {
    if (!activeAddress) return;
    if (
      !template.name ||
      !selectedFiles.image ||
      !selectedFiles.sprite_normal ||
      !selectedFiles.sprite_rare ||
      !selectedFiles.sprite_super_rare ||
      !selectedFiles.sprite_legendary
    ) {
      alert('Please fill in the template name and select all 5 files first.');
      return;
    }

    try {
      const jwt = sessionStorage.getItem('zklogin_jwt');
      let signature: string | undefined = undefined;
      if (!jwt) {
        const message = `MiniPet Upload: ${activeAddress}`;
        const messageBytes = new TextEncoder().encode(message);
        const signRes = await signPersonalMessage({ message: messageBytes });
        signature = signRes.signature;
      }

      const updatedTemplate = { ...template };

      const uploadOne = async (
        file: File,
        type: 'image' | 'sprite_normal' | 'sprite_rare' | 'sprite_super_rare' | 'sprite_legendary'
      ) => {
        setUploading(prev => ({ ...prev, [type]: true }));
        try {
          const { blobId, blobObjectId } = await WalrusService.uploadFile(file, activeAddress, false, signature);
          
          let urlKey = '';
          let idKey = '';
          if (type === 'image') {
            urlKey = 'image_url';
            idKey = 'image_blob_id';
          } else {
            const rarity = type.replace('sprite_', ''); // 'normal', 'rare', etc.
            urlKey = `sprite_url_${rarity}`;
            idKey = `sprite_blob_id_${rarity}`;
          }

          (updatedTemplate as any)[urlKey] = WalrusService.getBlobUrl(blobId);
          (updatedTemplate as any)[idKey] = blobObjectId;

          setUploadDone(prev => ({ ...prev, [type]: true }));
        } finally {
          setUploading(prev => ({ ...prev, [type]: false }));
        }
      };

      // Sequentially upload all 5 files
      await uploadOne(selectedFiles.image, 'image');
      await uploadOne(selectedFiles.sprite_normal, 'sprite_normal');
      await uploadOne(selectedFiles.sprite_rare, 'sprite_rare');
      await uploadOne(selectedFiles.sprite_super_rare, 'sprite_super_rare');
      await uploadOne(selectedFiles.sprite_legendary, 'sprite_legendary');

      const tx = new Transaction();

      // Gửi ID template sang global_config luôn để quản lý tập trung
      tx.moveCall({
        target: `${PACKAGE_ID}::${MODULES.PET_NFT}::${FUNCTIONS.CREATE_TEMPLATE}`,
        arguments: [
          tx.object(ADMIN_CAP_ID),
          tx.object(GLOBAL_CONFIG_ID),
          tx.pure.string(updatedTemplate.name),
          tx.pure.string(updatedTemplate.pet_type || 'balanced'),
          tx.pure.string(updatedTemplate.description || ''),
          tx.pure.string(updatedTemplate.image_url),
          tx.pure.id(updatedTemplate.image_blob_id),
          tx.pure.string(updatedTemplate.sprite_url_normal),
          tx.pure.id(updatedTemplate.sprite_blob_id_normal),
          tx.pure.string(updatedTemplate.sprite_url_rare),
          tx.pure.id(updatedTemplate.sprite_blob_id_rare),
          tx.pure.string(updatedTemplate.sprite_url_super_rare),
          tx.pure.id(updatedTemplate.sprite_blob_id_super_rare),
          tx.pure.string(updatedTemplate.sprite_url_legendary),
          tx.pure.id(updatedTemplate.sprite_blob_id_legendary),
          tx.pure.u64(updatedTemplate.price),
        ],
      });

      signAndExecuteTransaction({ transaction: tx }, {
        onSuccess: async (response) => {
          try {
            const txRes = await suiClient.waitForTransaction({
              digest: response.digest,
              options: { showEffects: true }
            });
            if (txRes.effects?.status?.status === 'success') {
              alert(t('admin.alerts.template_created') || 'Template created successfully!');
              setTemplate({
                name: '',
                pet_type: 'balanced',
                description: '',
                image_url: '',
                image_blob_id: '',
                sprite_url_normal: '',
                sprite_blob_id_normal: '',
                sprite_url_rare: '',
                sprite_blob_id_rare: '',
                sprite_url_super_rare: '',
                sprite_blob_id_super_rare: '',
                sprite_url_legendary: '',
                sprite_blob_id_legendary: '',
                price: '1000000000'
              });
              setSelectedFiles({
                image: null,
                sprite_normal: null,
                sprite_rare: null,
                sprite_super_rare: null,
                sprite_legendary: null,
              });
              setPreviews({
                image: '',
                sprite_normal: '',
                sprite_rare: '',
                sprite_super_rare: '',
                sprite_legendary: '',
              });
              setUploadDone({
                image: false,
                sprite_normal: false,
                sprite_rare: false,
                sprite_super_rare: false,
                sprite_legendary: false
              });
              fetchGlobalConfig();
            } else {
              const errorReason = txRes.effects?.status?.error || 'Unknown Move abort';
              alert(`Failed: ${errorReason}`);
            }
          } catch (e: any) {
            console.error(e);
            alert(`Error: ${e.message || e.toString()}`);
          }
        },
        onError: (error) => {
          console.error('Error:', error);
          alert(`Error: ${error.message || error.toString()}`);
        }
      });
    } catch (err: any) {
      console.error('Upload or process failed:', err);
      alert(err.message || 'Processing failed');
    }
  };

  const handleMintToken = () => {
    if (!activeAddress || !tokenMint.recipient) return;
    const tx = new Transaction();
    tx.moveCall({
      target: `${PET_TOKEN_PACKAGE_ID}::pet_token::mint`,
      arguments: [
        tx.object(TREASURY_CAP_ID),
        tx.pure.u64(tokenMint.amount),
        tx.pure.address(tokenMint.recipient),
      ],
    });
    signAndExecuteTransaction({ transaction: tx }, {
      onSuccess: async (response) => {
        try {
          const txRes = await suiClient.waitForTransaction({
            digest: response.digest,
            options: { showEffects: true }
          });
          if (txRes.effects?.status?.status === 'success') {
            alert(t('admin.alerts.tokens_minted'));
          } else {
            const errorReason = txRes.effects?.status?.error || 'Unknown Move abort';
            alert(`Failed: ${errorReason}`);
          }
        } catch (e: any) {
          console.error(e);
          alert(`Error: ${e.message || e.toString()}`);
        }
      },
      onError: (error) => {
        console.error('Error:', error);
        alert(`Error: ${error.message || error.toString()}`);
      },
    });
  };

  const handleUpdateTreasury = () => {
    if (!activeAddress || !config.treasury) return;
    const tx = new Transaction();
    tx.moveCall({
      target: `${PACKAGE_ID}::${MODULES.PET_NFT}::update_treasury`,
      arguments: [
        tx.object(ADMIN_CAP_ID),
        tx.object(GLOBAL_CONFIG_ID),
        tx.pure.address(config.treasury),
      ],
    });
    signAndExecuteTransaction({ transaction: tx }, {
      onSuccess: async (response) => {
        try {
          const txRes = await suiClient.waitForTransaction({
            digest: response.digest,
            options: { showEffects: true }
          });
          if (txRes.effects?.status?.status === 'success') {
            alert(t('admin.alerts.treasury_updated'));
            fetchGlobalConfig();
          } else {
            const errorReason = txRes.effects?.status?.error || 'Unknown Move abort';
            alert(`Failed: ${errorReason}`);
          }
        } catch (e: any) {
          console.error(e);
          alert(`Error: ${e.message || e.toString()}`);
        }
      },
      onError: (error) => {
        console.error('Error:', error);
        alert(`Error: ${error.message || error.toString()}`);
      },
    });
  };

  const handleUpdateConfig = () => {
    if (!activeAddress) return;
    const tx = new Transaction();
    tx.moveCall({
      target: `${PACKAGE_ID}::${MODULES.PET_NFT}::${FUNCTIONS.UPDATE_CONFIG}`,
      arguments: [
        tx.object(ADMIN_CAP_ID),
        tx.object(GLOBAL_CONFIG_ID),
        tx.pure.u64(config.baseFee),
      ],
    });
    signAndExecuteTransaction({ transaction: tx }, {
      onSuccess: async (response) => {
        try {
          const txRes = await suiClient.waitForTransaction({
            digest: response.digest,
            options: { showEffects: true }
          });
          if (txRes.effects?.status?.status === 'success') {
            alert(t('admin.alerts.config_updated'));
            fetchGlobalConfig();
          } else {
            const errorReason = txRes.effects?.status?.error || 'Unknown Move abort';
            alert(`Failed: ${errorReason}`);
          }
        } catch (e: any) {
          console.error(e);
          alert(`Error: ${e.message || e.toString()}`);
        }
      },
      onError: (error) => {
        console.error('Error:', error);
        alert(`Error: ${error.message || error.toString()}`);
      },
    });
  };

  const handleIncreaseLimit = () => {
    if (!activeAddress || !increaseAmount) return;
    const tx = new Transaction();
    tx.moveCall({
      target: `${PACKAGE_ID}::${MODULES.PET_NFT}::increase_mint_limit`,
      arguments: [
        tx.object(ADMIN_CAP_ID),
        tx.object(GLOBAL_CONFIG_ID),
        tx.pure.u64(increaseAmount),
      ],
    });
    signAndExecuteTransaction({ transaction: tx }, {
      onSuccess: async (response) => {
        try {
          const txRes = await suiClient.waitForTransaction({
            digest: response.digest,
            options: { showEffects: true }
          });
          if (txRes.effects?.status?.status === 'success') {
            alert(t('admin.alerts.limit_increased') || 'Custom pet limit increased successfully!');
            setIncreaseAmount('10');
            fetchGlobalConfig();
          } else {
            const errorReason = txRes.effects?.status?.error || 'Unknown Move abort';
            alert(`Failed: ${errorReason}`);
          }
        } catch (e: any) {
          console.error(e);
          alert(`Error: ${e.message || e.toString()}`);
        }
      },
      onError: (error) => {
        console.error('Error:', error);
        alert(`Error: ${error.message || error.toString()}`);
      },
    });
  };

  if (!activeAddress) {
    return (
      <div className="pt-28 pb-20 min-h-screen bg-transparent flex items-center justify-center">
        <div className="max-w-md w-full mx-4 p-8 bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-800 text-center animate-in fade-in zoom-in duration-300">
          <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-950/50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-indigo-600 dark:text-indigo-400">
            <Lock size={40} />
          </div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
            {t('admin.auth.unauthorized_title') || 'Access Denied'}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium mb-8 text-sm leading-relaxed">
            {t('admin.auth.connect_admin_wallet') || 'Connect Admin Wallet to Continue'}
          </p>
          <div className="flex justify-center">
            <ConnectButton className="!rounded-2xl !text-sm !font-black !px-6 !py-3 !shadow-lg !shadow-indigo-500/20" />
          </div>
        </div>
      </div>
    );
  }

  if (verifyingAdmin) {
    return (
      <div className="pt-28 pb-20 min-h-screen bg-transparent flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin text-indigo-600 mb-4 mx-auto" size={48} />
          <p className="text-gray-500 dark:text-gray-400 font-bold text-sm">
            {t('admin.auth.checking') || 'Verifying admin permissions...'}
          </p>
        </div>
      </div>
    );
  }

  if (isAdmin === false) {
    return (
      <div className="pt-28 pb-20 min-h-screen bg-transparent flex items-center justify-center">
        <div className="max-w-lg w-full mx-4 p-8 md:p-10 bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-800 text-center animate-in fade-in zoom-in duration-300">
          <div className="w-20 h-20 bg-rose-100 dark:bg-rose-950/50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-rose-600 dark:text-rose-400">
            <ShieldAlert size={40} />
          </div>
          <h2 className="text-2xl font-black text-rose-600 dark:text-rose-400 mb-4">
            {t('admin.auth.unauthorized_title') || 'Access Denied'}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium mb-6 text-sm leading-relaxed">
            {t('admin.auth.unauthorized_desc') || 'Only the admin wallet that owns the AdminCap can access the admin dashboard.'}
          </p>
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl mb-8 text-left border border-gray-100 dark:border-gray-800/80">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">
              {t('admin.auth.wallet_connected') || 'Connected Wallet:'}
            </p>
            <p className="font-mono text-xs text-rose-500 break-all select-all font-semibold">
              {activeAddress}
            </p>
            {adminAddress && (
              <>
                <p className="text-xs font-bold text-gray-400 uppercase mt-3 mb-1">
                  Required Admin Wallet Owner:
                </p>
                <p className="font-mono text-xs text-indigo-500 break-all select-all font-semibold">
                  {adminAddress}
                </p>
              </>
            )}
          </div>
          <div className="flex justify-center gap-4">
            <ConnectButton className="!rounded-2xl !text-sm !font-black !px-6 !py-3 !shadow-lg" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 min-h-screen bg-transparent">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-xl shadow-indigo-500/20">
              <Settings size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">{t('admin.title')}</h1>
              <p className="text-gray-500 font-semibold dark:text-gray-400">{t('admin.subtitle')}</p>
            </div>
          </div>

          <div className="flex bg-white dark:bg-gray-900 p-1.5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
            {[
              { id: 'dashboard', icon: Activity, label: t('admin.tabs.overview') },
              { id: 'store', icon: Plus, label: t('admin.tabs.store') },
              { id: 'economy', icon: Coins, label: t('admin.tabs.economy') },
              { id: 'settings', icon: Settings, label: t('admin.tabs.system') }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer border-none ${activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-white bg-transparent'
                  }`}
              >
                <tab.icon size={16} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 gap-8">
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="card p-6 bg-white dark:bg-gray-900">
                <p className="text-sm font-bold text-gray-400 uppercase mb-1">{t('admin.dashboard.package_id')}</p>
                <p className="font-mono text-xs break-all text-indigo-500">{PACKAGE_ID}</p>
              </div>
              <div className="card p-6 bg-white dark:bg-gray-900">
                <p className="text-sm font-bold text-gray-400 uppercase mb-1">{t('admin.dashboard.mipet_token')}</p>
                <p className="font-mono text-xs break-all text-amber-500">{PET_TOKEN_PACKAGE_ID}</p>
              </div>
              <div className="card p-6 bg-white dark:bg-gray-900">
                <p className="text-sm font-bold text-gray-400 uppercase mb-1">{t('admin.dashboard.status')}</p>
                <div className="flex items-center gap-2 text-green-500 font-black">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  {t('admin.dashboard.authorized')}
                </div>
              </div>

              {/* On-chain Stats Row */}
              <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card p-6 bg-white dark:bg-gray-900 border-l-4 border-l-indigo-500">
                  <p className="text-xs font-bold text-gray-400 uppercase mb-1 flex items-center gap-1.5">
                    <Layers size={14} className="text-indigo-500" />
                    {t('admin.dashboard.custom_mint_progress') || 'Custom Pets Minted'}
                  </p>
                  <p className="text-2xl font-black text-gray-900 dark:text-white mt-1">
                    {globalStats.customMintCount} <span className="text-gray-400 text-sm">/ {globalStats.customMintLimit}</span>
                  </p>
                  <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full overflow-hidden mt-3">
                    <div
                      className="bg-indigo-600 h-full rounded-full transition-all"
                      style={{ width: `${globalStats.customMintLimit > 0 ? (globalStats.customMintCount / globalStats.customMintLimit) * 100 : 0}%` }}
                    />
                  </div>
                </div>

                <div className="card p-6 bg-white dark:bg-gray-900 border-l-4 border-l-amber-500">
                  <p className="text-xs font-bold text-gray-400 uppercase mb-1 flex items-center gap-1.5">
                    <Coins size={14} className="text-amber-500" />
                    {t('admin.dashboard.slot_price') || 'Custom Slot Price'}
                  </p>
                  <p className="text-2xl font-black text-amber-500 mt-1">
                    {Number(globalStats.baseSlotFee) / 1000000000} <span className="text-gray-400 text-xs">MIPET</span>
                  </p>
                  <p className="text-xs text-gray-400 mt-2 font-semibold">
                    {t('admin.dashboard.slot_price_desc') || 'Fee required for users to custom mint'}
                  </p>
                </div>

                <div className="card p-6 bg-white dark:bg-gray-900 border-l-4 border-l-purple-500 flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase mb-1 flex items-center gap-1.5">
                      <Info size={14} className="text-purple-500" />
                      {t('admin.dashboard.treasury_addr') || 'Treasury Recipient'}
                    </p>
                    <p className="font-mono text-xs break-all text-purple-500 mt-2">
                      {globalStats.treasuryAddress || 'Loading...'}
                    </p>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-2 font-medium">
                    {t('admin.dashboard.treasury_desc') || 'Receives all slot purchase fees'}
                  </p>
                </div>
              </div>

              <div className="md:col-span-3 card p-12 bg-indigo-600 text-white flex flex-col items-center text-center shadow-xl shadow-indigo-500/10">
                <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mb-6">
                  <Activity size={40} />
                </div>
                <h2 className="text-3xl font-black mb-4">{t('admin.dashboard.welcome')}</h2>
                <p className="text-indigo-100 max-w-lg font-medium">
                  {t('admin.dashboard.welcome_desc')}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'store' && (
            <div className="max-w-3xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="card p-8 bg-white dark:bg-gray-900">
                <div className="flex items-center gap-3 mb-8 border-b border-gray-50 dark:border-gray-800 pb-6">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600">
                    <Plus size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('admin.store.add_title')}</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left Column: Basic Info & Main Image Upload */}
                  <div className="lg:col-span-5 space-y-6">
                    <div>
                      <label className="block text-xs font-black text-gray-400 mb-2 uppercase">{t('admin.store.pet_name')}</label>
                      <input
                        type="text"
                        placeholder="e.g. Pixel Dragon"
                        className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl p-3.5 font-bold focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white"
                        value={template.name}
                        onChange={(e) => setTemplate({ ...template, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-400 mb-2 uppercase">Trade Style</label>
                      <select
                        className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl p-3.5 font-bold focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white"
                        value={template.pet_type}
                        onChange={(e) => setTemplate({ ...template, pet_type: e.target.value })}
                      >
                        <option value="conservative">Conservative (Thận trọng)</option>
                        <option value="balanced">Balanced (Cân bằng)</option>
                        <option value="aggressive">Aggressive (Tấn công)</option>
                        <option value="scalper">Scalper (Lướt sóng)</option>
                        <option value="degen">Degen (Liều)</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs font-black text-gray-400 mb-2 uppercase">Description</label>
                      <textarea
                        placeholder="Describe this pet's personality and trade behavior..."
                        className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl p-3.5 font-bold focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white resize-none h-20"
                        value={template.description}
                        onChange={(e) => setTemplate({ ...template, description: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-400 mb-2 uppercase">{t('admin.store.price')} (SUI)</label>
                      <input
                        type="number"
                        step="any"
                        placeholder="e.g. 0.1"
                        className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl p-3.5 font-bold focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white"
                        value={template.price ? Number(template.price) / 1000000000 : ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setTemplate({
                            ...template,
                            price: val ? Math.round(Number(val) * 1000000000).toString() : '0'
                          });
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-400 mb-2 uppercase">{t('admin.store.main_image')} (Animated GIF)</label>
                      <div className="relative group">
                        <input
                          type="file"
                          onChange={(e) => e.target.files && handleFileSelect(e.target.files[0], 'image')}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className={`p-4 rounded-xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-2 ${previews.image ? 'border-green-500 bg-green-50 dark:bg-green-950/20' : 'border-gray-200 dark:border-gray-800 hover:border-indigo-500'
                          }`}>
                          {uploading.image ? (
                            <Loader2 className="animate-spin text-indigo-500" />
                          ) : previews.image ? (
                            <div className="flex flex-col items-center gap-2">
                              <img
                                src={previews.image}
                                alt="Main Image Preview"
                                className="max-h-24 object-contain rounded-lg"
                              />
                              <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                                {uploadDone.image ? <Check size={14} /> : null}
                                <span className="text-xs font-bold">{uploadDone.image ? t('admin.store.uploaded') : 'Selected'}</span>
                              </div>
                            </div>
                          ) : (
                            <>
                              <Upload className="text-gray-400" />
                              <span className="text-xs font-bold text-gray-500">{t('admin.store.choose_file')}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: 4 Rarity Spritesheets Upload */}
                  <div className="lg:col-span-7 space-y-6">
                    <h3 className="text-sm font-black text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Rarity Spritesheets</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Normal Rarity */}
                      <div className="p-4 rounded-2xl bg-gray-50/50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800/60">
                        <label className="block text-xs font-black text-indigo-500 mb-2 uppercase flex items-center justify-between">
                          <span>Normal</span>
                          <span className="opacity-60">70% Rate</span>
                        </label>
                        <div className="relative group">
                          <input
                            type="file"
                            onChange={(e) => e.target.files && handleFileSelect(e.target.files[0], 'sprite_normal')}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                          />
                          <div className={`p-4 rounded-xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-2 text-center ${previews.sprite_normal ? 'border-green-500 bg-green-50 dark:bg-green-950/20' : 'border-gray-200 dark:border-gray-800 hover:border-indigo-500'
                            }`}>
                            {uploading.sprite_normal ? (
                              <Loader2 className="animate-spin text-indigo-500" />
                            ) : previews.sprite_normal ? (
                              <div className="flex flex-col items-center gap-2">
                                <img
                                  src={previews.sprite_normal}
                                  alt="Normal Sprite Preview"
                                  className="max-h-16 object-contain rounded-lg"
                                />
                                <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                                  {uploadDone.sprite_normal ? <Check size={12} /> : null}
                                  <span className="text-[10px] font-bold">{uploadDone.sprite_normal ? t('admin.store.uploaded') : 'Selected'}</span>
                                </div>
                              </div>
                            ) : (
                              <>
                                <Upload className="text-gray-400" size={16} />
                                <span className="text-[10px] font-bold text-gray-500">{t('admin.store.choose_file')}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Rare Rarity */}
                      <div className="p-4 rounded-2xl bg-gray-50/50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800/60">
                        <label className="block text-xs font-black text-amber-500 mb-2 uppercase flex items-center justify-between">
                          <span>Rare</span>
                          <span className="opacity-60">20% Rate</span>
                        </label>
                        <div className="relative group">
                          <input
                            type="file"
                            onChange={(e) => e.target.files && handleFileSelect(e.target.files[0], 'sprite_rare')}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                          />
                          <div className={`p-4 rounded-xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-2 text-center ${previews.sprite_rare ? 'border-green-500 bg-green-50 dark:bg-green-950/20' : 'border-gray-200 dark:border-gray-850 hover:border-indigo-500'
                            }`}>
                            {uploading.sprite_rare ? (
                              <Loader2 className="animate-spin text-indigo-500" />
                            ) : previews.sprite_rare ? (
                              <div className="flex flex-col items-center gap-2">
                                <img
                                  src={previews.sprite_rare}
                                  alt="Rare Sprite Preview"
                                  className="max-h-16 object-contain rounded-lg"
                                />
                                <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                                  {uploadDone.sprite_rare ? <Check size={12} /> : null}
                                  <span className="text-[10px] font-bold">{uploadDone.sprite_rare ? t('admin.store.uploaded') : 'Selected'}</span>
                                </div>
                              </div>
                            ) : (
                              <>
                                <Upload className="text-gray-400" size={16} />
                                <span className="text-[10px] font-bold text-gray-500">{t('admin.store.choose_file')}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Super Rare Rarity */}
                      <div className="p-4 rounded-2xl bg-gray-50/50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800/60">
                        <label className="block text-xs font-black text-purple-500 mb-2 uppercase flex items-center justify-between">
                          <span>Super Rare</span>
                          <span className="opacity-60">8% Rate</span>
                        </label>
                        <div className="relative group">
                          <input
                            type="file"
                            onChange={(e) => e.target.files && handleFileSelect(e.target.files[0], 'sprite_super_rare')}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                          />
                          <div className={`p-4 rounded-xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-2 text-center ${previews.sprite_super_rare ? 'border-green-500 bg-green-50 dark:bg-green-950/20' : 'border-gray-200 dark:border-gray-850 hover:border-indigo-500'
                            }`}>
                            {uploading.sprite_super_rare ? (
                              <Loader2 className="animate-spin text-indigo-500" />
                            ) : previews.sprite_super_rare ? (
                              <div className="flex flex-col items-center gap-2">
                                <img
                                  src={previews.sprite_super_rare}
                                  alt="Super Rare Sprite Preview"
                                  className="max-h-16 object-contain rounded-lg"
                                />
                                <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                                  {uploadDone.sprite_super_rare ? <Check size={12} /> : null}
                                  <span className="text-[10px] font-bold">{uploadDone.sprite_super_rare ? t('admin.store.uploaded') : 'Selected'}</span>
                                </div>
                              </div>
                            ) : (
                              <>
                                <Upload className="text-gray-400" size={16} />
                                <span className="text-[10px] font-bold text-gray-500">{t('admin.store.choose_file')}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Legendary Rarity */}
                      <div className="p-4 rounded-2xl bg-gray-50/50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800/60">
                        <label className="block text-xs font-black text-rose-500 mb-2 uppercase flex items-center justify-between">
                          <span>Legendary</span>
                          <span className="opacity-60">2% Rate</span>
                        </label>
                        <div className="relative group">
                          <input
                            type="file"
                            onChange={(e) => e.target.files && handleFileSelect(e.target.files[0], 'sprite_legendary')}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                          />
                          <div className={`p-4 rounded-xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-2 text-center ${previews.sprite_legendary ? 'border-green-500 bg-green-50 dark:bg-green-950/20' : 'border-gray-200 dark:border-gray-850 hover:border-indigo-500'
                            }`}>
                            {uploading.sprite_legendary ? (
                              <Loader2 className="animate-spin text-indigo-500" />
                            ) : previews.sprite_legendary ? (
                              <div className="flex flex-col items-center gap-2">
                                <img
                                  src={previews.sprite_legendary}
                                  alt="Legendary Sprite Preview"
                                  className="max-h-16 object-contain rounded-lg"
                                />
                                <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                                  {uploadDone.sprite_legendary ? <Check size={12} /> : null}
                                  <span className="text-[10px] font-bold">{uploadDone.sprite_legendary ? t('admin.store.uploaded') : 'Selected'}</span>
                                </div>
                              </div>
                            ) : (
                              <>
                                <Upload className="text-gray-400" size={16} />
                                <span className="text-[10px] font-bold text-gray-500">{t('admin.store.choose_file')}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCreateTemplate}
                  disabled={
                    !selectedFiles.image ||
                    !selectedFiles.sprite_normal ||
                    !selectedFiles.sprite_rare ||
                    !selectedFiles.sprite_super_rare ||
                    !selectedFiles.sprite_legendary ||
                    !template.name ||
                    Object.values(uploading).some(Boolean)
                  }
                  className="btn-dark w-full !justify-center !py-4 mt-10 shadow-xl shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {Object.values(uploading).some(Boolean) ? 'Uploading to Walrus...' : t('admin.store.confirm_btn')}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'economy' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="card p-8 bg-white dark:bg-gray-900 border-l-4 border-l-amber-500">
                <h2 className="text-xl font-bold mb-8 flex items-center gap-3 text-gray-900 dark:text-white">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600">
                    <Coins size={20} />
                  </div>
                  {t('admin.economy.mint_title')}
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-black text-gray-400 mb-2 uppercase">{t('admin.economy.recipient')}</label>
                    <input
                      type="text"
                      placeholder="0x..."
                      className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl p-3.5 font-bold focus:ring-2 focus:ring-amber-500 text-gray-900 dark:text-white"
                      value={tokenMint.recipient}
                      onChange={(e) => setTokenMint({ ...tokenMint, recipient: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 mb-2 uppercase">{t('admin.economy.amount')}</label>
                    <div className="flex gap-3">
                      <input
                        type="number"
                        step="any"
                        placeholder="e.g. 1000"
                        className="flex-1 bg-gray-50 dark:bg-gray-800 border-none rounded-xl p-3.5 font-bold focus:ring-2 focus:ring-amber-500 text-gray-900 dark:text-white"
                        value={tokenMint.amount ? Number(tokenMint.amount) / 1000000000 : ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setTokenMint({
                            ...tokenMint,
                            amount: val ? Math.round(Number(val) * 1000000000).toString() : '0'
                          });
                        }}
                      />
                      <button
                        onClick={handleMintToken}
                        className="btn-dark !bg-amber-600 hover:!bg-amber-700 !px-8 shadow-lg shadow-amber-500/20"
                      >
                        {t('admin.economy.mint_btn')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card p-8 bg-white dark:bg-gray-900 border-l-4 border-l-purple-500">
                <h2 className="text-xl font-bold mb-8 flex items-center gap-3 text-gray-900 dark:text-white">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600">
                    <Info size={20} />
                  </div>
                  {t('admin.economy.treasury_title')}
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-black text-gray-400 mb-2 uppercase">{t('admin.economy.new_treasury')}</label>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        placeholder="0x..."
                        className="flex-1 bg-gray-50 dark:bg-gray-800 border-none rounded-xl p-3.5 font-bold focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
                        value={config.treasury}
                        onChange={(e) => setConfig({ ...config, treasury: e.target.value })}
                      />
                      <button
                        onClick={handleUpdateTreasury}
                        className="btn-dark !bg-purple-600 hover:!bg-purple-700 !px-8 shadow-lg shadow-purple-500/20"
                      >
                        {t('admin.economy.update_btn')}
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 font-medium bg-purple-50 dark:bg-purple-900/10 p-4 rounded-xl italic">
                    {t('admin.economy.treasury_note')}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="max-w-2xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="card p-8 bg-white dark:bg-gray-900 border-t-4 border-t-pink-500">
                <h2 className="text-xl font-bold mb-8 flex items-center gap-3 text-gray-900 dark:text-white">
                  <div className="w-10 h-10 rounded-xl bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center text-pink-600">
                    <Settings size={20} />
                  </div>
                  {t('admin.system.title')}
                </h2>
                <div className="space-y-8">
                  {/* Base Custom Slot Fee */}
                  <div>
                    <label className="block text-xs font-black text-gray-400 mb-2 uppercase">{t('admin.system.fee_label')}</label>
                    <div className="flex gap-3">
                      <input
                        type="number"
                        step="any"
                        placeholder="e.g. 10000"
                        className="flex-1 bg-gray-50 dark:bg-gray-800 border-none rounded-xl p-3.5 font-bold focus:ring-2 focus:ring-pink-500 text-gray-900 dark:text-white"
                        value={config.baseFee ? Number(config.baseFee) / 1000000000 : ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setConfig({
                            ...config,
                            baseFee: val ? Math.round(Number(val) * 1000000000).toString() : '0'
                          });
                        }}
                      />
                      <button
                        onClick={handleUpdateConfig}
                        className="btn-dark !bg-pink-600 hover:!bg-pink-700 !px-8 shadow-lg shadow-pink-500/20"
                      >
                        {t('admin.system.save_btn')}
                      </button>
                    </div>
                  </div>

                  {/* Custom Pet Mint Limit */}
                  <div className="border-t border-gray-100 dark:border-gray-800 pt-6">
                    <label className="block text-xs font-black text-gray-400 mb-2 uppercase">
                      {t('admin.system.limit_label') || 'Increase Custom Pet Mint Limit'}
                    </label>
                    <div className="flex gap-3">
                      <input
                        type="number"
                        step="1"
                        placeholder="e.g. 50"
                        className="flex-1 bg-gray-50 dark:bg-gray-800 border-none rounded-xl p-3.5 font-bold focus:ring-2 focus:ring-pink-500 text-gray-900 dark:text-white"
                        value={increaseAmount}
                        onChange={(e) => setIncreaseAmount(e.target.value)}
                      />
                      <button
                        onClick={handleIncreaseLimit}
                        className="btn-dark !bg-pink-600 hover:!bg-pink-700 !px-8 shadow-lg shadow-pink-500/20 whitespace-nowrap"
                      >
                        {t('admin.system.increase_btn') || 'Increase Limit'}
                      </button>
                    </div>
                    <p className="text-xs text-gray-400 mt-2 font-semibold">
                      {t('admin.system.limit_desc', { current: globalStats.customMintLimit }) || `Current active limit: ${globalStats.customMintLimit} custom pets.`}
                    </p>
                  </div>

                  <div className="p-6 bg-pink-50 dark:bg-pink-900/10 rounded-2xl border border-pink-100 dark:border-pink-900/30">
                    <div className="flex gap-3 text-pink-700 dark:text-pink-400">
                      <Info size={20} className="shrink-0" />
                      <div className="text-sm">
                        <p className="font-black mb-1">{t('admin.system.warning')}</p>
                        <p className="font-medium opacity-80 leading-relaxed">
                          {t('admin.system.warning_desc')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
