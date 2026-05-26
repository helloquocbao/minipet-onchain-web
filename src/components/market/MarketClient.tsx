"use client";

import { useEffect, useState } from 'react';
import { useSignAndExecuteTransaction } from '@mysten/dapp-kit';
import { useActiveAddress } from '../../hooks/useActiveAddress';
import { Transaction } from '@mysten/sui/transactions';
import { PACKAGE_ID, FUNCTIONS, MODULES, suiClient, GLOBAL_CONFIG_ID, PET_TOKEN_TYPE } from '../../services/blockchain/sui';
import { WalrusService } from '../../services/walrus';
import { ShoppingBag, Sparkles, ArrowRight, Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

interface PetTemplate {
  id: string;
  name: string;
  image_url: string;
  sprite_url: string;
  price: string;
}

export function MarketClient() {
  const router = useRouter();
  const activeAddress = useActiveAddress();
  const { t } = useTranslation();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
  const [templates, setTemplates] = useState<PetTemplate[]>([]);
  const [slotPrice, setSlotPrice] = useState('10000000000000'); // Default 10,000 MIPET
  const [, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'official' | 'custom'>('all');
  const [sortBy, setSortBy] = useState<'price_asc' | 'price_desc' | 'name_asc'>('price_asc');

  const filteredTemplates = templates
    .filter((pet) => {
      if (searchQuery.trim() !== '') {
        return pet.name.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return true;
    })
    .filter((pet) => {
      const isCustom = pet.name.toLowerCase().includes('custom');
      if (filterType === 'official') return !isCustom;
      if (filterType === 'custom') return isCustom;
      return true;
    })
    .sort((a, b) => {
      const aIsCustom = a.name.toLowerCase().includes('custom');
      const bIsCustom = b.name.toLowerCase().includes('custom');
      
      const aPrice = aIsCustom ? Number(slotPrice) : Number(a.price);
      const bPrice = bIsCustom ? Number(slotPrice) : Number(b.price);
      
      if (sortBy === 'price_asc') {
        return aPrice - bPrice;
      } else if (sortBy === 'price_desc') {
        return bPrice - aPrice;
      } else if (sortBy === 'name_asc') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

  const fetchTemplates = async () => {
    try {
      // 1. Fetch GlobalConfig
      const configObj = await suiClient.getObject({
        id: GLOBAL_CONFIG_ID,
        options: { showContent: true }
      });
      const fields = (configObj.data?.content as any)?.fields;
      
      if (fields?.base_slot_fee) {
        setSlotPrice(fields.base_slot_fee);
      }

      // 2. Fetch templates via registered template IDs
      const templateIds = fields?.templates || [];
      if (templateIds.length > 0) {
        const response = await suiClient.multiGetObjects({
          ids: templateIds,
          options: { showContent: true }
        });
        
        const pets: PetTemplate[] = response.map((obj: any) => {
          const fields = obj.data?.content?.fields;
          return {
            id: obj.data?.objectId,
            name: fields?.name || '',
            image_url: fields?.image_url || '',
            sprite_url: fields?.sprite_url || '',
            price: fields?.price || '0',
          };
        }).filter((p) => p.id && p.name);

        setTemplates(pets);
      } else {
        setTemplates([]);
      }

      setLoading(false);
    } catch (e) {
      console.error('Error fetching templates:', e);
      setTemplates([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const checkUserHasSlot = async () => {
    if (!activeAddress) return false;
    try {
      const objects = await suiClient.getOwnedObjects({
        owner: activeAddress,
        filter: { StructType: `${PACKAGE_ID}::${MODULES.PET_NFT}::MintSlot` }
      });
      return objects.data.length > 0;
    } catch (e) {
      console.error('Failed to check user slots:', e);
      return false;
    }
  };

  const handleBuyPet = async (templateId: string, price: string) => {
    if (!activeAddress) {
      alert(t('admin.alerts.connect_wallet') || 'Please connect your wallet first');
      return;
    }

    const tx = new Transaction();
    
    // We send SUI coin for payment
    const [feeCoin] = tx.splitCoins(tx.gas, [price]);

    tx.moveCall({
      target: `${PACKAGE_ID}::${MODULES.PET_NFT}::${FUNCTIONS.BUY_PET}`,
      arguments: [
        tx.object(GLOBAL_CONFIG_ID),
        tx.object(templateId),
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
            alert(t('market.alerts.buy_pet_success'));
          } else {
            const errorReason = txRes.effects?.status?.error || 'Unknown Move abort';
            alert(t('market.alerts.buy_failed', { error: errorReason }));
          }
        } catch (e: any) {
          console.error(e);
          alert(t('market.alerts.buy_failed', { error: e.message || e.toString() }));
        }
      },
      onError: (err) => {
        console.error(err);
        alert(t('market.alerts.buy_failed', { error: err.message || err.toString() }));
      }
    });
  };

  const handleBuyMintSlot = async () => {
    if (!activeAddress) return;
    
    const hasSlot = await checkUserHasSlot();
    if (hasSlot) {
      alert(t('market.alerts.has_slot'));
      router.push('/custom-pet');
      return;
    }

    const tx = new Transaction();

    // 1. Get user's MIPET tokens
    const coins = await suiClient.getCoins({
      owner: activeAddress,
      coinType: PET_TOKEN_TYPE,
    });

    if (coins.data.length === 0) {
      alert(t('market.alerts.need_mipet'));
      return;
    }

    const coinObjects = coins.data.map((c) => tx.object(c.coinObjectId));
    if (coinObjects.length > 1) {
       tx.mergeCoins(coinObjects[0], coinObjects.slice(1));
    }

    tx.moveCall({
      target: `${PACKAGE_ID}::${MODULES.PET_NFT}::${FUNCTIONS.BUY_MINT_SLOT}`,
      arguments: [
        tx.object(GLOBAL_CONFIG_ID),
        coinObjects[0],
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
            alert(t('market.alerts.buy_slot_success'));
            router.push('/custom-pet');
          } else {
            const errorReason = txRes.effects?.status?.error || 'Unknown Move abort';
            alert(t('market.alerts.buy_failed', { error: errorReason }));
          }
        } catch (e: any) {
          console.error(e);
          alert(t('market.alerts.buy_failed', { error: e.message || e.toString() }));
        }
      },
      onError: (err) => {
        console.error(err);
        alert(t('market.alerts.buy_failed', { error: err.message || err.toString() }));
      }
    });
  };

  const navigateToCustomizer = (pet: PetTemplate) => {
    const query = new URLSearchParams({
      name: pet.name,
      image_url: pet.image_url,
      sprite_url: pet.sprite_url,
    }).toString();
    router.push(`/custom-pet?${query}`);
  };

  const handleBuyCustomPetSlot = async (pet: PetTemplate) => {
    if (!activeAddress) {
      alert(t('admin.alerts.connect_wallet') || 'Please connect your wallet first');
      return;
    }

    const hasSlot = await checkUserHasSlot();
    if (hasSlot) {
      alert(t('market.alerts.has_slot_custom'));
      navigateToCustomizer(pet);
      return;
    }

    const tx = new Transaction();
    
    const coins = await suiClient.getCoins({
      owner: activeAddress,
      coinType: PET_TOKEN_TYPE,
    });

    if (coins.data.length === 0) {
      alert(t('market.alerts.need_mipet') || 'You need MIPET tokens to buy a Mint Slot!');
      return;
    }

    const coinObjects = coins.data.map((c) => tx.object(c.coinObjectId));
    if (coinObjects.length > 1) {
       tx.mergeCoins(coinObjects[0], coinObjects.slice(1));
    }

    tx.moveCall({
      target: `${PACKAGE_ID}::${MODULES.PET_NFT}::${FUNCTIONS.BUY_MINT_SLOT}`,
      arguments: [
        tx.object(GLOBAL_CONFIG_ID),
        coinObjects[0],
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
            alert(t('market.alerts.buy_custom_slot_success'));
            navigateToCustomizer(pet);
          } else {
            const errorReason = txRes.effects?.status?.error || 'Unknown Move abort';
            alert(t('market.alerts.buy_failed', { error: errorReason }));
          }
        } catch (e: any) {
          console.error(e);
          alert(t('market.alerts.buy_failed', { error: e.message || e.toString() }));
        }
      },
      onError: (err) => {
        console.error("Failed to buy slot:", err);
        alert(t('market.alerts.buy_failed', { error: err.message || err.toString() }));
      }
    });
  };

  return (
    <div className="pt-24 pb-16 min-h-screen container mx-auto px-4 relative">
      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-indigo-200/10 dark:bg-indigo-900/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 right-10 w-[400px] h-[400px] bg-purple-200/10 dark:bg-purple-900/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Header section */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
          <ShoppingBag size={20} className="text-indigo-500" />
          {t('market.title')}
        </h1>
      </div>

      {/* Search & Filters Panel */}
      <div className="mb-6 p-3 rounded-2xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/50 dark:border-slate-800/40 shadow-sm flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('market.filters.search_placeholder') || 'Search pet templates...'}
            className="w-full pl-9 pr-9 py-2 bg-gray-50/50 dark:bg-slate-900/50 hover:bg-gray-50 dark:hover:bg-slate-800 focus:bg-white dark:focus:bg-slate-950 border border-gray-100 dark:border-slate-800 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all text-gray-800 dark:text-gray-100"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Filter and Sort */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Category Tabs */}
          <div className="flex items-center bg-gray-100/50 dark:bg-slate-800/50 p-0.5 rounded-xl border border-gray-200/10">
            {(['all', 'official', 'custom'] as const).map((type) => {
              const count = templates.filter(t => {
                const isCustom = t.name.toLowerCase().includes('custom');
                if (type === 'official') return !isCustom;
                if (type === 'custom') return isCustom;
                return true;
              }).length;

              return (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all ${
                    filterType === type
                      ? 'bg-white dark:bg-slate-900 shadow-sm text-indigo-600 dark:text-indigo-400 font-extrabold'
                      : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
                  }`}
                >
                  {t(`market.filters.type_${type}`) || type.toUpperCase()}
                  <span className="ml-1 text-[9px] opacity-60 font-semibold">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e: any) => setSortBy(e.target.value)}
            className="px-3 py-1.5 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl text-[11px] font-bold text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all cursor-pointer"
          >
            <option value="price_asc">{t('market.filters.sort_price_asc') || 'Price: Low to High'}</option>
            <option value="price_desc">{t('market.filters.sort_price_desc') || 'Price: High to Low'}</option>
            <option value="name_asc">{t('market.filters.sort_name_asc') || 'Name: A-Z'}</option>
          </select>

          {/* Custom Pet Slot button inline */}
          <button 
            onClick={() => router.push('/custom-pet')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-1.5 px-3 rounded-xl flex items-center gap-1.5 text-xs transition-all shadow-md shadow-indigo-500/15 hover:shadow-indigo-500/25 hover:-translate-y-0.5 cursor-pointer"
          >
            <Sparkles size={12} className="text-indigo-200" />
            <span>{t('market.custom_slot.title')}</span>
          </button>
        </div>
      </div>

      {/* Stats Counter */}
      {templates.length > 0 && (
        <div className="mb-6 text-xs text-gray-400 dark:text-gray-500 font-semibold px-2">
          {t('market.filters.stats_showing', { count: filteredTemplates.length, total: templates.length }) || 
           `Showing ${filteredTemplates.length} of ${templates.length} templates`}
        </div>
      )}

      {/* Grid Content */}
      {templates.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-2xl shadow-indigo-500/5">
          <ShoppingBag size={48} className="mx-auto text-indigo-500/30 mb-4 animate-pulse" />
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Store is Empty</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto text-sm font-semibold">
            No official pet templates have been created on the blockchain yet. Please go to the Admin dashboard to add some!
          </p>
        </div>
      ) : filteredTemplates.length === 0 ? (
        <div className="text-center py-16 bg-white/40 dark:bg-gray-900/40 backdrop-blur-md rounded-3xl border border-gray-100 dark:border-gray-800/80 shadow-sm">
          <Search size={40} className="mx-auto text-indigo-500/30 mb-3" />
          <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-white">No Companions Found</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-xs mx-auto text-xs font-semibold mb-4">
            We couldn't find any templates matching your search criteria. Try resetting your filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setFilterType('all');
            }}
            className="btn-dark !py-2 !px-4 !text-xs rounded-xl"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
          {filteredTemplates.map((pet) => {
            const isCustom = pet.name.toLowerCase().includes('custom');
            return (
              <div key={pet.id} className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-white/60 dark:border-slate-800/40 hover:border-indigo-200/60 dark:hover:border-indigo-900/60 shadow-sm hover:shadow-md hover:shadow-indigo-500/[0.02] hover:-translate-y-1 rounded-2xl p-2 flex flex-col group transition-all duration-300">
                <div className="w-full aspect-square bg-gradient-to-br from-indigo-50/20 to-purple-50/10 dark:from-slate-950/80 dark:to-slate-900/60 rounded-xl flex items-center justify-center relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                   <img 
                     src={pet.image_url.startsWith('http') ? pet.image_url : WalrusService.getBlobUrl(pet.image_url)} 
                     alt={pet.name} 
                     className="w-24 h-24 sm:w-28 sm:h-28 object-contain pixel-art group-hover:scale-105 transition-transform duration-300" 
                   />
                   <div className="absolute top-2 right-2 bg-white/80 dark:bg-slate-950/85 backdrop-blur-md shadow-sm border border-white/60 dark:border-slate-800/80 px-2 py-0.5 rounded-full text-[10px] font-extrabold text-indigo-600 dark:text-indigo-400">
                     {isCustom ? `${Number(slotPrice) / 1000000000} MIPET` : `${Number(pet.price) / 1000000000} SUI`}
                   </div>
                </div>
                <div className="p-2 pt-3 pb-1 flex-1 flex flex-col justify-between">
                   <div>
                     <div className="flex items-center justify-between mb-0.5 gap-1">
                       <h3 className="text-xs sm:text-sm font-bold truncate text-gray-800 dark:text-gray-100">{pet.name}</h3>
                       <div className="flex gap-0.5 flex-shrink-0">
                          {[1,2,3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-indigo-400/80" />)}
                       </div>
                     </div>
                     <p className="text-gray-400 dark:text-gray-500 text-[10px] sm:text-[11px] mb-3 line-clamp-1 truncate font-medium">
                       {isCustom 
                         ? "Custom template. Customize name and spritesheet."
                         : t('market.pet_card.loyal_companion', { energy: pet.name === 'Wukong' ? t('market.pet_card.mythical_powers') : t('market.pet_card.fluffy_energy') })
                       }
                     </p>
                   </div>
                   <button 
                     onClick={() => isCustom ? handleBuyCustomPetSlot(pet) : handleBuyPet(pet.id, pet.price)}
                     className={`w-full py-1.5 px-3 rounded-lg text-xs transition-all font-bold cursor-pointer flex items-center justify-between group/btn ${
                       isCustom 
                         ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md shadow-indigo-500/10 border-none' 
                         : 'bg-indigo-50/50 hover:bg-indigo-100/80 dark:bg-indigo-950/20 dark:hover:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-100/30 dark:border-indigo-900/30'
                     }`}
                   >
                     <span>{isCustom ? "Customize" : t('market.pet_card.adopt_btn')}</span>
                     <ArrowRight size={12} className="group-hover/btn:translate-x-0.5 transition-transform" />
                   </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Mint Slot promotion ribbon */}
      <div className="mt-16 bg-white/30 dark:bg-slate-900/30 backdrop-blur-xl border border-white/50 dark:border-slate-800/45 rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 shadow-sm relative overflow-hidden">
        {/* Glow effect inside banner */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 dark:bg-indigo-400/5 rounded-full blur-[60px] pointer-events-none -z-10" />
        
        <div className="flex-1">
          <h2 className="text-xl md:text-2xl font-black mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-300 bg-clip-text text-transparent">
            {t('market.mint_section.title')}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm mb-5 max-w-lg leading-relaxed font-medium">
            {t('market.mint_section.desc')}
          </p>
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={handleBuyMintSlot}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-xl text-xs transition-all shadow-md shadow-indigo-500/10 cursor-pointer flex items-center gap-1.5 hover:-translate-y-0.5"
            >
              <Sparkles size={14} className="text-indigo-200" />
              {t('market.mint_section.buy_btn')}
            </button>
            <button 
              className="border border-indigo-200/50 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur text-indigo-600 dark:text-indigo-400 hover:bg-white dark:hover:bg-slate-800 font-bold py-2 px-4 rounded-xl text-xs transition-all cursor-pointer"
            >
              {t('market.mint_section.view_guide')}
            </button>
          </div>
        </div>

        {/* Retro Grid Dev Terminal */}
        <div className="relative w-44 h-44 bg-slate-950/95 dark:bg-black rounded-2xl flex items-center justify-center border border-slate-800/80 shadow-2xl overflow-hidden group flex-shrink-0">
          {/* Scanning lines / grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:14px_14px]" />
          
          {/* Tech layout overlays */}
          <div className="absolute top-2 left-2 text-[9px] text-slate-500 font-mono select-none">SYS.MINT_SLOT</div>
          <div className="absolute bottom-2 right-2 text-[9px] text-slate-500 font-mono select-none">LOC_0x7A</div>
          
          {/* Crosshairs */}
          <div className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-slate-700" />
          <div className="absolute bottom-2 left-2 w-1.5 h-1.5 border-b border-l border-slate-700" />
          <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-slate-700" />
          <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r border-slate-700" />
          
          {/* Center scanline */}
          <div className="absolute inset-x-0 h-[1px] bg-indigo-500/10 top-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute inset-y-0 w-[1px] bg-indigo-500/10 left-1/2 -translate-x-1/2 pointer-events-none" />

          {/* Animated Sprite */}
          <div className="cat-sprite-frame scale-50 z-10 group-hover:scale-[0.55] transition-transform duration-300 brightness-110" />
          
          {/* Subtle scanning glow effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/0 via-indigo-500/[0.05] to-indigo-500/0 -translate-y-full group-hover:translate-y-0 transition-transform duration-1000 ease-in-out pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
