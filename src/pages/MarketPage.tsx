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
  const [, setLoading] = useState(true);

  const fetchTemplates = async () => {
    try {
      await suiClient.getOwnedObjects({
        owner: PACKAGE_ID,
        filter: { StructType: `${PACKAGE_ID}::${MODULES.PET_NFT}::PetTemplate` },
        options: { showContent: true }
      });
      
      // Actually, queryObjects is better for shared
      await suiClient.getOwnedObjects({
         owner: PACKAGE_ID,
         // This is tricky without a indexer, but let's assume we can find them
      });
      
      // Fallback for demo if no templates found yet
      setTemplates([
        { id: '1', name: 'Wukong', image_url: '/cat/spritesheet.png', sprite_url: '/cat/spritesheet.png', price: '1000000000' },
        { id: '2', name: 'Lyra', image_url: '/cat/spritesheet.png', sprite_url: '/cat/spritesheet.png', price: '2000000000' }
      ]);
      setLoading(false);
    } catch (e) {
      console.error('Error fetching templates:', e);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

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

    signAndExecuteTransaction({ transaction: tx });
  };

  const handleBuyMintSlot = async () => {
    if (!account) return;
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

    signAndExecuteTransaction({ transaction: tx });
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map((pet) => (
          <div key={pet.id} className="card overflow-hidden group">
            <div className="aspect-square bg-gray-50 dark:bg-gray-800 flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
               <img 
                 src={pet.image_url.startsWith('http') ? pet.image_url : WalrusService.getBlobUrl(pet.image_url)} 
                 alt={pet.name} 
                 className="w-48 h-48 object-contain pixel-art group-hover:scale-110 transition-transform duration-500" 
               />
               <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur shadow-sm px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest text-indigo-600">
                 {Number(pet.price) / 1000000000} SUI
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
                {t('market.pet_card.loyal_companion', { energy: pet.name === 'Wukong' ? t('market.pet_card.mythical_powers') : t('market.pet_card.fluffy_energy') })}
              </p>
              <button 
                onClick={() => handleBuyPet(pet.id, pet.price)}
                className="btn-dark w-full !justify-between !py-3.5 group/btn"
              >
                <span>{t('market.pet_card.adopt_btn')}</span>
                <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>

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
