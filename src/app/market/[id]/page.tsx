"use client";

import React, { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useActiveAddress } from '../../../hooks/useActiveAddress';
import { useTransactionExecutor } from '../../../hooks/useTransactionExecutor';
import { Transaction } from '@mysten/sui/transactions';
import { PACKAGE_ID, FUNCTIONS, MODULES, suiClient, GLOBAL_CONFIG_ID } from '../../../services/blockchain/sui';
import { WalrusService } from '../../../services/walrus';
import { ArrowLeft, ShoppingBag, Cpu, Sparkles, Copy, Check, Info } from 'lucide-react';

interface PetTemplate {
  id: string;
  name: string;
  image_url: string;
  sprite_url: string;
  price: string;
}

// Action frames mapping
const actionFrames: Record<number, number> = {
  0: 8, // Idle
  1: 8, // Run
  2: 8, // Drag/Pickup
  3: 8, // Greet/Wave
  4: 8, // Sad/Fall
  5: 8, // Dizzy/Stun
  6: 8, // Save Money
  7: 8, // Sleep/Curious
  8: 8  // Hammer
};

const actionNames = [
  { id: 0, nameVi: "Đứng im (Idle)", nameEn: "Idle Rest" },
  { id: 1, nameVi: "Chạy bộ (Run)", nameEn: "Running" },
  { id: 2, nameVi: "Nhấc lên (Drag)", nameEn: "Picked Up" },
  { id: 3, nameVi: "Chào hỏi (Greet)", nameEn: "Greeting Wave" },
  { id: 4, nameVi: "U sầu (Sad)", nameEn: "Sad Crying" },
  { id: 5, nameVi: "Choáng váng (Dizzy)", nameEn: "Dizzy Stun" },
  { id: 6, nameVi: "Cất túi tiền (Save)", nameEn: "Save Money" },
  { id: 7, nameVi: "Đi ngủ (Sleep)", nameEn: "Zzz Sleeping" },
  { id: 8, nameVi: "Gõ búa (Hammer)", nameEn: "Hammering Bonk" }
];

export default function PetDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const isVi = i18n.language === 'vi';
  const activeAddress = useActiveAddress();
  const { execute: signAndExecuteTransaction } = useTransactionExecutor();

  const [pet, setPet] = useState<PetTemplate | null>(null);
  const [slotPrice, setSlotPrice] = useState('10000000000000');
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  // Animation States
  const [activeAction, setActiveAction] = useState<number>(0);
  const [currentFrame, setCurrentFrame] = useState<number>(0);
  const [isJumping, setIsJumping] = useState(false);

  const posX = currentFrame * (100 / 7);
  const posY = activeAction * 12.5;

  // Animation Loop
  useEffect(() => {
    const maxFrames = actionFrames[activeAction] || 8;
    const interval = setInterval(() => {
      setCurrentFrame((f) => (f + 1) % maxFrames);
    }, 140);
    return () => clearInterval(interval);
  }, [activeAction]);

  useEffect(() => {
    setCurrentFrame(0);
  }, [activeAction]);

  // Fetch pet details from SUI
  useEffect(() => {
    const fetchPet = async () => {
      try {
        // Fetch GlobalConfig fee
        const configObj = await suiClient.getObject({
          id: GLOBAL_CONFIG_ID,
          options: { showContent: true }
        });
        const fields = (configObj.data?.content as any)?.fields;
        if (fields?.base_slot_fee) {
          setSlotPrice(fields.base_slot_fee);
        }

        // Fetch this pet object template
        const response = await suiClient.getObject({
          id,
          options: { showContent: true }
        });
        
        const petFields = (response.data?.content as any)?.fields;
        if (petFields) {
          setPet({
            id,
            name: petFields.name || '',
            image_url: petFields.image_url || '',
            sprite_url: petFields.sprite_url || '',
            price: petFields.price || '0',
          });
        }
        setLoading(false);
      } catch (err) {
        console.error("Error loading pet template:", err);
        setLoading(false);
      }
    };

    fetchPet();
  }, [id]);

  // Dynamic SEO Metadata Updater
  useEffect(() => {
    if (pet) {
      document.title = `${pet.name} | Adopt MiniPet Companion - On-chain Pixel Pet`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', `Meet ${pet.name}, a cute desktop pixel companion. View its animations for idle, run, greeting, and adopt this unique pet NFT.`);
      }
    }
  }, [pet]);

  const handleCopyId = () => {
    navigator.clipboard.writeText(id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBuyPet = async () => {
    if (!pet) return;
    if (!activeAddress) {
      alert(t('admin.alerts.connect_wallet') || 'Please connect your wallet first');
      return;
    }

    const tx = new Transaction();
    const [feeCoin] = tx.splitCoins(tx.gas, [pet.price]);

    tx.moveCall({
      target: `${PACKAGE_ID}::${MODULES.PET_NFT}::${FUNCTIONS.BUY_PET}`,
      arguments: [
        tx.object(GLOBAL_CONFIG_ID),
        tx.object(pet.id),
        feeCoin,
      ],
    });

    signAndExecuteTransaction({ transaction: tx }, {
      onSuccess: async (response) => {
        try {
          const txRes = await suiClient.waitForTransaction({
            digest: response.digest,
            options: { showEffects: true }
          });
          const status = txRes.effects?.status?.status;
          if (status === 'success') {
            alert(t('market.alerts.buy_pet_success') || 'Congratulations! You adopted this pet successfully!');
          } else {
            alert(t('market.alerts.buy_failed', { error: 'Transaction failed' }));
          }
        } catch (e: any) {
          alert(t('market.alerts.buy_failed', { error: e.message }));
        }
      },
      onError: (err) => {
        alert(t('market.alerts.buy_failed', { error: err.message }));
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-transparent gap-4">
        <Info size={48} className="text-rose-500" />
        <h2 className="text-xl font-bold">{isVi ? "Không tìm thấy thú cưng" : "Pet Template Not Found"}</h2>
        <button onClick={() => router.push('/market')} className="btn-dark">
          {isVi ? "Quay lại chợ" : "Back to Market"}
        </button>
      </div>
    );
  }

  const isCustom = pet.name.toLowerCase().includes('custom');
  const petPrice = isCustom ? `${Number(slotPrice) / 1000000000} MIPET` : `${Number(pet.price) / 1000000000} SUI`;

  return (
    <div className="pt-24 pb-16 min-h-screen container mx-auto px-4 relative">
      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-indigo-200/10 dark:bg-indigo-900/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 right-10 w-[400px] h-[400px] bg-purple-200/10 dark:bg-purple-900/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Back button */}
      <button 
        onClick={() => router.push('/market')}
        className="mb-8 flex items-center gap-2 text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors bg-transparent border-none cursor-pointer"
      >
        <ArrowLeft size={16} />
        <span>{isVi ? "Quay lại chợ" : "Back to Market"}</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column — 3D Interactive Animation Viewer */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-white/60 dark:border-slate-800/40 p-6 rounded-3xl shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-mono font-bold text-gray-400">PET_ANIMATION_VIEWER_OS</span>
              <span className="text-[10px] font-mono bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">
                {actionNames.find(a => a.id === activeAction)?.[isVi ? 'nameVi' : 'nameEn']}
              </span>
            </div>

            {/* Virtual Desktop Display Screen */}
            <div className="w-full bg-[#EAECEF] dark:bg-[#161619] rounded-2xl border border-black/[0.05] dark:border-white/[0.05] aspect-video flex flex-col items-center justify-center relative overflow-hidden p-6 select-none shadow-inner mb-6">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.02)_1px,transparent_1px)] bg-[size:14px_14px] pointer-events-none" />

              {/* Character Render */}
              <div
                onClick={() => {
                  setIsJumping(true);
                  setTimeout(() => setIsJumping(false), 500);
                }}
                className={`w-36 h-36 cursor-pointer pixel-art relative flex items-center justify-center transform transition-transform select-none ${isJumping ? 'animate-bounce' : 'hover:scale-105'}`}
                title="Click to jump!"
              >
                <div
                  className="w-32 h-32 absolute pointer-events-none"
                  style={{
                    backgroundImage: `url('${pet.sprite_url.startsWith('http') ? pet.sprite_url : WalrusService.getBlobUrl(pet.sprite_url)}')`,
                    backgroundSize: "800% 900%",
                    backgroundPosition: `${posX}% ${posY}%`,
                    backgroundRepeat: 'no-repeat',
                    imageRendering: 'pixelated',
                  }}
                />
              </div>

              <div className="absolute bottom-3 left-4 text-[10px] font-mono text-gray-400">
                FRAME: {currentFrame}/8
              </div>
              <div className="absolute bottom-3 right-4 text-[10px] font-mono text-gray-400">
                SPRITESHEET: SUI_WALRUS
              </div>
            </div>

            {/* State Grid Controller */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                {isVi ? "Trạng thái hoạt ảnh" : "Animation States"}
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {actionNames.map((act) => (
                  <button
                    key={act.id}
                    onClick={() => setActiveAction(act.id)}
                    className={`py-2.5 px-2 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                      activeAction === act.id
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.05] dark:hover:bg-white/[0.05] text-gray-700 dark:text-gray-300 border border-black/[0.04] dark:border-white/[0.04]'
                    }`}
                  >
                    {isVi ? act.nameVi.split(" ")[0] : act.nameEn}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column — Details and Adoption */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-white/60 dark:border-slate-800/40 p-6 sm:p-8 rounded-3xl shadow-sm space-y-6">
            
            {/* Template Identification */}
            <div>
              <span className="text-xs font-mono font-bold text-indigo-500 uppercase tracking-widest bg-indigo-500/10 px-3.5 py-1.5 rounded-full">
                {isCustom ? "Custom Creator template" : "Official template"}
              </span>
              <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white mt-4 mb-2">
                {pet.name}
              </h1>
              <div className="flex items-center gap-2 bg-black/[0.02] dark:bg-white/[0.02] px-3 py-1.5 rounded-xl border border-black/[0.04] dark:border-white/[0.04] max-w-fit">
                <span className="text-[10px] font-mono text-gray-400 font-bold uppercase shrink-0">OBJECT ID</span>
                <span className="text-xs font-mono text-gray-500 truncate max-w-[200px] sm:max-w-xs">{id}</span>
                <button 
                  onClick={handleCopyId} 
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 bg-transparent border-none cursor-pointer ml-1"
                >
                  {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                </button>
              </div>
            </div>

            {/* Price section */}
            <div className="border-y border-black/[0.05] dark:border-white/[0.05] py-5">
              <div className="text-xs text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider mb-1">
                {isVi ? "Giá nhận nuôi" : "Adoption Price"}
              </div>
              <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400">
                {petPrice}
              </div>
            </div>

            {/* Technical Attributes */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                {isVi ? "Thuộc tính kỹ thuật" : "Technical Attributes"}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/[0.02] dark:bg-white/[0.02] p-4 rounded-2xl border border-black/[0.04] dark:border-white/[0.04]">
                  <Cpu size={20} className="text-indigo-500 mb-2" />
                  <div className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider mb-0.5">Asset Hosting</div>
                  <div className="text-xs font-black text-gray-800 dark:text-gray-200">Walrus Protocol</div>
                </div>
                <div className="bg-black/[0.02] dark:bg-white/[0.02] p-4 rounded-2xl border border-black/[0.04] dark:border-white/[0.04]">
                  <Sparkles size={20} className="text-purple-500 mb-2" />
                  <div className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider mb-0.5">Token Standard</div>
                  <div className="text-xs font-black text-gray-800 dark:text-gray-200">Sui Move NFT</div>
                </div>
              </div>
            </div>

            {/* Action panel */}
            <div className="pt-4">
              {isCustom ? (
                <button
                  onClick={() => router.push(`/custom-pet`)}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-black shadow-lg shadow-indigo-500/10 border-none transition-all duration-300 active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles size={16} />
                  <span>{isVi ? "Tùy biến ngay" : "Customize Now"}</span>
                </button>
              ) : (
                <button
                  onClick={handleBuyPet}
                  className="w-full py-4 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black shadow-lg shadow-indigo-600/20 border-none transition-all duration-300 active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={16} />
                  <span>{isVi ? "Nhận nuôi Pet" : "Adopt Companion"}</span>
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
