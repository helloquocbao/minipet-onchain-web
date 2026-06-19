"use client";

import { useEffect, useState } from 'react';
import { useActiveAddress } from '../../hooks/useActiveAddress';
import { useTransactionExecutor } from '../../hooks/useTransactionExecutor';
import { Transaction } from '@mysten/sui/transactions';
import { PACKAGE_ID, MODULES, suiClient, PET_TOKEN_TYPE } from '../../services/blockchain/sui';
import { Heart, Activity, ArrowRight, Loader2, Frown, Meh, Smile, SmilePlus, Laugh, Wallet, Coins } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Pet {
  id: string;
  name: string;
  happiness: number;
  level: number;
  image_url: string;
}

const MOODS = [
  { labelKey: 'profile.moods.sad', score: 10, icon: Frown, color: 'text-red-500', bg: 'bg-red-100 dark:bg-red-900/30' },
  { labelKey: 'profile.moods.tired', score: 30, icon: Meh, color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-900/30' },
  { labelKey: 'profile.moods.normal', score: 50, icon: Smile, color: 'text-yellow-500', bg: 'bg-yellow-100 dark:bg-yellow-900/30' },
  { labelKey: 'profile.moods.happy', score: 80, icon: SmilePlus, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30' },
  { labelKey: 'profile.moods.ecstatic', score: 100, icon: Laugh, color: 'text-emerald-500', bg: 'bg-emerald-100 dark:bg-emerald-900/30' }
];

export const ProfileClient = () => {
  const { t } = useTranslation();
  const activeAddress = useActiveAddress();
  const { execute: signAndExecuteTransaction } = useTransactionExecutor();
  
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPet, setSelectedPet] = useState<string | null>(null);
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [suiBalance, setSuiBalance] = useState('0');
  const [mipetBalance, setMipetBalance] = useState('0');

  const fetchBalances = async () => {
    if (!activeAddress) return;
    try {
      const [sui, mipet] = await Promise.all([
        suiClient.getBalance({ owner: activeAddress, coinType: '0x2::sui::SUI' }),
        suiClient.getBalance({ owner: activeAddress, coinType: PET_TOKEN_TYPE }),
      ]);
      setSuiBalance((Number(sui.totalBalance) / 1e9).toFixed(3));
      setMipetBalance((Number(mipet.totalBalance) / 1e9).toFixed(0));
    } catch (e) {
      console.error('Failed to fetch balances:', e);
    }
  };

  const fetchOwnedPets = async () => {
    if (!activeAddress) {
      setPets([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const objects = await suiClient.getOwnedObjects({
        owner: activeAddress,
        filter: { StructType: `${PACKAGE_ID}::${MODULES.PET_NFT}::PetNFT` },
        options: { showContent: true }
      });

      const userPets: Pet[] = objects.data.map((obj: any) => {
        const fields = obj.data?.content?.fields;
        return {
          id: obj.data?.objectId,
          name: fields?.name || 'Unknown Pet',
          happiness: parseInt(fields?.happiness || '0', 10),
          level: parseInt(fields?.level || '0', 10),
          image_url: fields?.image_url || '',
        };
      }).filter((p) => p.id);

      setPets(userPets);
      if (userPets.length > 0 && !selectedPet) {
        setSelectedPet(userPets[0].id);
      }
    } catch (e) {
      console.error('Failed to fetch pets:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOwnedPets();
    fetchBalances();
  }, [activeAddress]);

  const handleUpdateMood = async () => {
    if (!activeAddress || !selectedPet || selectedMood === null) return;
    
    try {
      setIsUpdating(true);
      const tx = new Transaction();
      
      tx.moveCall({
        target: `${PACKAGE_ID}::${MODULES.PET_NFT}::update_happiness`,
        arguments: [
          tx.object(selectedPet),
          tx.pure.u64(selectedMood)
        ]
      });

      signAndExecuteTransaction({
        transaction: tx as any,
      }, {
        onSuccess: (result) => {
          console.log('Mood updated successfully:', result);
          alert(t('profile.update_success'));
          fetchOwnedPets();
          setSelectedMood(null);
        },
        onError: (err) => {
          console.error('Failed to update mood:', err);
          alert(t('profile.update_failed') + err.message);
        },
        onSettled: () => {
          setIsUpdating(false);
        }
      });
    } catch (e) {
      console.error('Failed to prepare transaction:', e);
      alert(t('profile.error_retry'));
      setIsUpdating(false);
    }
  };

  if (!activeAddress) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-transparent">
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 max-w-md w-full">
          <Activity size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('profile.need_connect')}</h2>
          <p className="text-gray-500 dark:text-gray-400">{t('profile.need_connect_desc')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-transparent">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">{t('profile.title')}</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">{t('profile.subtitle')}</p>

          {/* Balance & Status Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-1">
                <Wallet size={14} className="text-blue-500" />
                <span className="text-[11px] text-gray-500 font-bold uppercase">SUI</span>
              </div>
              <span className="text-lg font-black text-gray-900 dark:text-white">{suiBalance}</span>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-1">
                <Coins size={14} className="text-indigo-500" />
                <span className="text-[11px] text-gray-500 font-bold uppercase">MIPET</span>
              </div>
              <span className="text-lg font-black text-gray-900 dark:text-white">{mipetBalance}</span>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-1">
                <Heart size={14} className="text-pink-500" />
                <span className="text-[11px] text-gray-500 font-bold uppercase">{t('profile.pets_owned') || 'Pets'}</span>
              </div>
              <span className="text-lg font-black text-gray-900 dark:text-white">{pets.length}</span>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-1">
                <Activity size={14} className="text-emerald-500" />
                <span className="text-[11px] text-gray-500 font-bold uppercase">{t('profile.status') || 'Status'}</span>
              </div>
              <span className="text-lg font-black text-emerald-500">Active</span>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-indigo-500" size={32} />
          </div>
        ) : pets.length === 0 ? (
          <div className="text-center p-12 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Heart className="text-indigo-400" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('profile.no_pets')}</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">{t('profile.no_pets_desc')}</p>
            <a href="/market" className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors">
              {t('profile.adopt_now')} <ArrowRight size={18} />
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Cột trái: Thông tin Pet */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-gray-700 pb-4">{t('profile.your_pets')}</h2>
              
              <div className="space-y-4">
                {pets.map((pet) => (
                  <div 
                    key={pet.id} 
                    onClick={() => setSelectedPet(pet.id)}
                    className={`p-4 rounded-2xl flex items-center gap-4 cursor-pointer transition-all border-2 ${
                      selectedPet === pet.id 
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' 
                        : 'border-transparent bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-800 relative">
                      {pet.image_url ? (
                        <img src={pet.image_url.replace('ipfs://', 'https://api.walrus.site/v1/')} alt={pet.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">?</div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 dark:text-white text-lg">{pet.name}</h3>
                      <div className="flex items-center gap-3 mt-1 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Activity size={14} className="text-indigo-400" />
                          {t('profile.mood_label')} Lv {pet.level}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart size={14} className={pet.happiness > 50 ? 'text-red-400' : 'text-gray-400'} />
                          {t('profile.mood_label')}: {pet.happiness}/100
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cột phải: Form cập nhật cảm xúc */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-gray-700 pb-4">{t('profile.how_feel')}</h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                {MOODS.map((mood) => {
                  const Icon = mood.icon;
                  const isSelected = selectedMood === mood.score;
                  return (
                    <button
                      key={mood.score}
                      onClick={() => setSelectedMood(mood.score)}
                      className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${
                        isSelected 
                          ? `border-${mood.color.split('-')[1]}-500 ${mood.bg}` 
                          : 'border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Icon size={32} className={`mb-2 ${isSelected ? mood.color : 'text-gray-400'}`} />
                      <span className={`text-sm font-semibold ${isSelected ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                        {t(mood.labelKey)}
                      </span>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={handleUpdateMood}
                disabled={selectedMood === null || isUpdating}
                className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/25"
              >
                {isUpdating ? (
                  <><Loader2 className="animate-spin" size={20} /> {t('profile.updating')}</>
                ) : (
                  <><Heart size={20} /> {t('profile.update_btn')}</>
                )}
              </button>
              <p className="text-center text-xs text-gray-400 mt-4">
                {t('profile.tx_note')}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
