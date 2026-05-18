import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCurrentAccount, useSignAndExecuteTransaction } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { 
  PACKAGE_ID, 
  MODULES, 
  FUNCTIONS, 
  GLOBAL_CONFIG_ID, 
  suiClient 
} from '../services/blockchain/sui';
import { WalrusService } from '../services/walrus';
import { 
  ArrowLeft, 
  Upload, 
  Sparkles, 
  Loader2, 
  Check, 
  AlertCircle,
  Dna
} from 'lucide-react';

export const CustomPetPage = () => {
  const navigate = useNavigate();
  const account = useCurrentAccount();
  const { t } = useTranslation();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();

  const [petData, setPetData] = useState({
    name: '',
    imageBlob: '',
    imageObjId: '',
    spriteBlob: '',
    spriteObjId: '',
    slug: ''
  });

  const [uploading, setUploading] = useState({ image: false, sprite: false });
  const [hasSlot, setHasSlot] = useState(false);
  const [loadingSlot, setLoadingSlot] = useState(false);

  // Check if user has a Mint Slot
  useEffect(() => {
    if (account) {
      checkMintSlot();
    }
  }, [account]);

  const checkMintSlot = async () => {
    if (!account) return;
    setLoadingSlot(true);
    try {
      const objects = await suiClient.getOwnedObjects({
        owner: account.address,
        filter: { StructType: `${PACKAGE_ID}::${MODULES.PET_NFT}::MintSlot` }
      });
      setHasSlot(objects.data.length > 0);
    } catch (error) {
      console.error('Error checking mint slot:', error);
    } finally {
      setLoadingSlot(false);
    }
  };

  const handleFileUpload = async (file: File, type: 'image' | 'sprite') => {
    try {
      setUploading(prev => ({ ...prev, [type]: true }));
      // Use "Sponsored" upload - simulated by using public publisher
      const { blobId, blobObjectId } = await WalrusService.uploadFile(file);
      setPetData(prev => ({
        ...prev,
        [type === 'image' ? 'imageBlob' : 'spriteBlob']: blobId,
        [type === 'image' ? 'imageObjId' : 'spriteObjId']: blobObjectId
      }));
    } catch (error) {
      console.error('Upload failed:', error);
      alert(t('custom.alerts.upload_failed'));
    } finally {
      setUploading(prev => ({ ...prev, [type]: false }));
    }
  };

  const handleMint = async () => {
    if (!account || !hasSlot) return;

    // Find the slot object
    const objects = await suiClient.getOwnedObjects({
      owner: account.address,
      filter: { StructType: `${PACKAGE_ID}::${MODULES.PET_NFT}::MintSlot` }
    });
    
    if (objects.data.length === 0) return;
    const slotId = objects.data[0].data?.objectId;

    let tx = new Transaction();
    
    tx.moveCall({
      target: `${PACKAGE_ID}::${MODULES.PET_NFT}::${FUNCTIONS.MINT_CUSTOM}`,
      arguments: [
        tx.object(GLOBAL_CONFIG_ID),
        tx.object(slotId!),
        tx.pure.string(petData.name),
        tx.pure.string(petData.imageBlob),
        tx.pure.id(petData.imageObjId),
        tx.pure.string(petData.spriteBlob),
        tx.pure.id(petData.spriteObjId),
        tx.pure.string(petData.name.toLowerCase().replace(/\s+/g, '-')),
        tx.object('0x6'), // clock
        tx.object('0x8'), // random
      ],
    });

    // --- LEVEL 3: SPONSORSHIP PHASE ---
    try {
      // 1. Gửi TX lên Admin Backend để tài trợ
      tx = await WalrusService.sponsorTransaction(tx, account.address);
      
      // 2. User ký và thực hiện (Lúc này Admin đã ký phần Gas/Storage)
      signAndExecuteTransaction({ transaction: tx }, {
        onSuccess: () => {
          alert(t('custom.alerts.mint_success'));
          navigate('/market');
        },
        onError: (err) => console.error('Mint failed:', err)
      });
    } catch (err) {
      console.error('Sponsorship failed:', err);
      alert(t('custom.alerts.sponsor_unavailable'));
    }
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-gray-50 dark:bg-black/20">
      <div className="container mx-auto px-4 max-w-2xl">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 mb-8 hover:text-indigo-600 transition-colors font-bold uppercase text-xs tracking-widest"
        >
          <ArrowLeft size={16} /> {t('custom.back')}
        </button>

        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-10 shadow-2xl shadow-indigo-500/5 border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-xl shadow-indigo-500/20">
              <Dna size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight">{t('custom.title')}</h1>
              <p className="text-gray-500 font-medium">{t('custom.subtitle')}</p>
            </div>
          </div>

          {!hasSlot && !loadingSlot && (
            <div className="mb-8 p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-800 rounded-2xl flex gap-3 text-amber-700 dark:text-amber-400">
              <AlertCircle size={20} className="shrink-0" />
              <div className="text-sm">
                <p className="font-bold">{t('custom.no_slot.title')}</p>
                <p>{t('custom.no_slot.desc')}</p>
                <button 
                  onClick={() => navigate('/market')}
                  className="mt-2 text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
                >
                  {t('custom.no_slot.go_market')} &rarr;
                </button>
              </div>
            </div>
          )}

          <div className="space-y-8">
            {/* Pet Name */}
            <div>
              <label className="block text-sm font-bold text-gray-500 mb-2 uppercase tracking-wider">{t('custom.form.name_label')}</label>
              <input 
                type="text" 
                placeholder={t('custom.form.name_placeholder')}
                className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl p-4 font-bold focus:ring-2 focus:ring-indigo-500 transition-all"
                value={petData.name}
                onChange={(e) => setPetData({...petData, name: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-bold text-gray-500 mb-2 uppercase tracking-wider">{t('custom.form.avatar_label')}</label>
                <div className="relative group">
                  <div className={`aspect-square rounded-3xl border-2 border-dashed flex flex-col items-center justify-center transition-all ${petData.imageBlob ? 'border-green-500 bg-green-50/50 dark:bg-green-900/10' : 'border-gray-200 dark:border-gray-700 group-hover:border-indigo-400'}`}>
                    {uploading.image ? (
                      <Loader2 className="animate-spin text-indigo-500" size={32} />
                    ) : petData.imageBlob ? (
                      <div className="text-center p-4">
                        <Check className="mx-auto text-green-500 mb-2" size={32} />
                        <p className="text-xs font-bold text-green-600 uppercase">{t('custom.form.uploaded_hint')}</p>
                      </div>
                    ) : (
                      <>
                        <Upload className="text-gray-400 group-hover:text-indigo-400 mb-2" size={32} />
                        <p className="text-xs font-bold text-gray-400 uppercase">{t('custom.form.upload_hint')}</p>
                      </>
                    )}
                    <input 
                      type="file" 
                      className="absolute inset-0 opacity-0 cursor-pointer" 
                      accept="image/*"
                      onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'image')}
                    />
                  </div>
                </div>
              </div>

              {/* Sprite Upload */}
              <div>
                <label className="block text-sm font-bold text-gray-500 mb-2 uppercase tracking-wider">{t('custom.form.sprite_label')}</label>
                <div className="relative group">
                  <div className={`aspect-square rounded-3xl border-2 border-dashed flex flex-col items-center justify-center transition-all ${petData.spriteBlob ? 'border-green-500 bg-green-50/50 dark:bg-green-900/10' : 'border-gray-200 dark:border-gray-700 group-hover:border-indigo-400'}`}>
                    {uploading.sprite ? (
                      <Loader2 className="animate-spin text-indigo-500" size={32} />
                    ) : petData.spriteBlob ? (
                      <div className="text-center p-4">
                        <Check className="mx-auto text-green-500 mb-2" size={32} />
                        <p className="text-xs font-bold text-green-600 uppercase">{t('custom.form.uploaded_hint')}</p>
                      </div>
                    ) : (
                      <>
                        <Upload className="text-gray-400 group-hover:text-indigo-400 mb-2" size={32} />
                        <p className="text-xs font-bold text-gray-400 uppercase">{t('custom.form.upload_hint')}</p>
                      </>
                    )}
                    <input 
                      type="file" 
                      className="absolute inset-0 opacity-0 cursor-pointer" 
                      accept="image/*"
                      onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'sprite')}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-5 rounded-3xl border border-indigo-100 dark:border-indigo-800">
              <div className="flex gap-4">
                <Sparkles className="text-indigo-500 shrink-0" size={20} />
                <p className="text-xs text-indigo-900 dark:text-indigo-300 font-medium leading-relaxed">
                  <strong>{t('custom.form.sponsor_badge')}:</strong> {t('custom.form.sponsor_desc')}
                </p>
              </div>
            </div>

            <button 
              onClick={handleMint}
              disabled={!hasSlot || !petData.name || !petData.imageBlob || !petData.spriteBlob}
              className="w-full bg-black dark:bg-white dark:text-black text-white rounded-2xl py-5 font-black text-lg shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-3"
            >
              <Sparkles size={24} />
              {t('custom.form.mint_btn')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
