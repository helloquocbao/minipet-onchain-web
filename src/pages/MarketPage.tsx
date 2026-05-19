import { useEffect, useState } from 'react';
import { useCurrentAccount, useSignAndExecuteTransaction } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { PACKAGE_ID, FUNCTIONS, MODULES, suiClient, GLOBAL_CONFIG_ID, PET_TOKEN_TYPE } from '../services/blockchain/sui';
import { WalrusService } from '../services/walrus';
import { ShoppingBag, Sparkles, Download, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface PetTemplate {
  id: string;
  name: string;
  image_url: string;
  sprite_url: string;
  price: string;
}

export default function MarketPage() {
  const navigate = useNavigate();
  const account = useCurrentAccount();
  const { t } = useTranslation();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
  const [templates, setTemplates] = useState<PetTemplate[]>([]);
  const [slotPrice, setSlotPrice] = useState('10000000000000'); // Default 10,000 MIPET
  const [, setLoading] = useState(true);

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
    if (!account) return false;
    try {
      const objects = await suiClient.getOwnedObjects({
        owner: account.address,
        filter: { StructType: `${PACKAGE_ID}::${MODULES.PET_NFT}::MintSlot` }
      });
      return objects.data.length > 0;
    } catch (e) {
      console.error('Error checking user slot:', e);
      return false;
    }
  };

  const handleBuyPet = (templateId: string, price: string) => {
    if (!account) return;
    const tx = new Transaction();
    
    const [coin] = tx.splitCoins(tx.gas, [tx.pure.u64(price)]);
    
    tx.moveCall({
      target: `${PACKAGE_ID}::${MODULES.PET_NFT}::${FUNCTIONS.BUY_PET}`,
      arguments: [
        tx.object(GLOBAL_CONFIG_ID),
        tx.object(templateId),
        coin,
        tx.object('0x06'), // clock
        tx.object('0x08'), // random object
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
    if (!account) return;
    
    const hasSlot = await checkUserHasSlot();
    if (hasSlot) {
      alert(t('market.alerts.has_slot'));
      navigate('/custom-pet');
      return;
    }

    const tx = new Transaction();

    // 1. Get user's MIPET tokens
    const coins = await suiClient.getCoins({
      owner: account.address,
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
            navigate('/custom-pet');
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

  const handleBuyCustomPetSlot = async (pet: PetTemplate) => {
    if (!account) {
      alert(t('admin.alerts.connect_wallet') || 'Please connect your wallet first');
      return;
    }

    const hasSlot = await checkUserHasSlot();
    if (hasSlot) {
      alert(t('market.alerts.has_slot_custom'));
      navigate('/custom-pet', { state: { template: pet } });
      return;
    }

    const tx = new Transaction();
    
    const coins = await suiClient.getCoins({
      owner: account.address,
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
            navigate('/custom-pet', { state: { template: pet } });
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
    <div className="pt-32 pb-20 min-h-screen container mx-auto px-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 text-indigo-500 font-bold uppercase tracking-widest text-sm mb-2">
            <ShoppingBag size={16} /> {t('market.nav_badge')}
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">{t('market.title')}</h1>
          <p className="text-gray-500 max-w-xl text-lg">
            {t('market.desc')}
          </p>
        </div>
        
        <div 
          onClick={() => navigate('/custom-pet')}
          className="card bg-indigo-600 border-none p-6 flex items-center gap-6 text-white group cursor-pointer hover:bg-indigo-700"
        >
          <div>
            <h3 className="font-bold text-lg">{t('market.custom_slot.title')}</h3>
            <p className="text-indigo-100 text-sm">{t('market.custom_slot.desc')}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Sparkles size={24} />
          </div>
        </div>
      </div>

      {templates.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-2xl shadow-indigo-500/5">
          <ShoppingBag size={48} className="mx-auto text-indigo-500/30 mb-4 animate-pulse" />
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Store is Empty</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto text-sm font-semibold">
            No official pet templates have been created on the blockchain yet. Please go to the Admin dashboard to add some!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((pet) => {
            const isCustom = pet.name.toLowerCase().includes('custom');
            return (
              <div key={pet.id} className="card overflow-hidden group">
                <div className="aspect-square bg-gray-50 dark:bg-gray-800 flex items-center justify-center relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                   <img 
                     src={pet.image_url.startsWith('http') ? pet.image_url : WalrusService.getBlobUrl(pet.image_url)} 
                     alt={pet.name} 
                     className="w-48 h-48 object-contain pixel-art group-hover:scale-110 transition-transform duration-500" 
                   />
                   <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur shadow-sm px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest text-indigo-600">
                     {isCustom ? `${Number(slotPrice) / 1000000000} MIPET` : `${Number(pet.price) / 1000000000} SUI`}
                   </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">{pet.name}</h3>
                    <div className="flex gap-1">
                       {[1,2,3,4,5].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-yellow-400" />)}
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                    {isCustom 
                      ? "Custom template. Buy a Mint Slot to adopt and customize this pet with your own name and sprite!"
                      : t('market.pet_card.loyal_companion', { energy: pet.name === 'Wukong' ? t('market.pet_card.mythical_powers') : t('market.pet_card.fluffy_energy') })
                    }
                  </p>
                  <button 
                    onClick={() => isCustom ? handleBuyCustomPetSlot(pet) : handleBuyPet(pet.id, pet.price)}
                    className={`btn-dark w-full !justify-between !py-3.5 group/btn ${isCustom ? '!bg-gradient-to-r !from-indigo-600 !to-purple-600 hover:!from-indigo-700 hover:!to-purple-700 border-none' : ''}`}
                  >
                    <span>{isCustom ? "Buy Slot & Customize" : t('market.pet_card.adopt_btn')}</span>
                    <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-20 card p-10 bg-gradient-to-br from-indigo-50 to-pink-50 dark:from-indigo-950/20 dark:to-pink-950/20 border-indigo-100 dark:border-indigo-900/50 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1">
          <h2 className="text-3xl font-black mb-4">{t('market.mint_section.title')}</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-lg">
            {t('market.mint_section.desc')}
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={handleBuyMintSlot}
              className="btn-dark"
            >
              {t('market.mint_section.buy_btn')}
            </button>
            <button className="btn-ghost !bg-white">{t('market.mint_section.view_guide')}</button>
          </div>
        </div>
        <div className="w-64 h-64 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl flex items-center justify-center p-8 relative rotate-3">
          <Download className="absolute top-4 right-4 text-indigo-200" size={48} />
          <div className="cat-sprite-frame scale-75" />
        </div>
      </div>
    </div>
  );
}
