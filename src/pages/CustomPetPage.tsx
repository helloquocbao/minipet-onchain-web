import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  Dna,
  Play,
  Pause,
  Sliders,
  HelpCircle,
  Info
} from 'lucide-react';

const extractBlobId = (url: string) => {
  if (!url) return '';
  if (url.includes('/blobs/')) {
    return url.split('/blobs/')[1];
  }
  return url;
};

export const CustomPetPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const account = useCurrentAccount();
  const { t, i18n } = useTranslation();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();

  const preloadedTemplate = location.state?.template;

  const [petData, setPetData] = useState({
    name: preloadedTemplate?.name || '',
    imageBlob: extractBlobId(preloadedTemplate?.image_url || ''),
    imageObjId: preloadedTemplate?.image_blob_id || '',
    spriteBlob: extractBlobId(preloadedTemplate?.sprite_url || ''),
    spriteObjId: preloadedTemplate?.sprite_blob_id || '',
    slug: preloadedTemplate?.name ? preloadedTemplate.name.toLowerCase().replace(/\s+/g, '-') : ''
  });

  const [uploading, setUploading] = useState({ image: false, sprite: false });
  const [hasSlot, setHasSlot] = useState(false);
  const [loadingSlot, setLoadingSlot] = useState(false);

  // Preview States
  const [previewAction, setPreviewAction] = useState<number>(0);
  const [frameCount, setFrameCount] = useState<number>(4);
  const [currentFrame, setCurrentFrame] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Animation Loop for Spritesheet Preview
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentFrame(f => (f + 1) % frameCount);
    }, 150);
    return () => clearInterval(interval);
  }, [isPlaying, frameCount]);

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
    if (!account) {
      alert(t('custom.alerts.connect_wallet') || 'Please connect your wallet first');
      return;
    }
    try {
      setUploading(prev => ({ ...prev, [type]: true }));
      const { blobId, blobObjectId } = await WalrusService.uploadFile(file, account.address, true);
      setPetData(prev => ({
        ...prev,
        [type === 'image' ? 'imageBlob' : 'spriteBlob']: blobId,
        [type === 'image' ? 'imageObjId' : 'spriteObjId']: blobObjectId
      }));
    } catch (error: any) {
      console.error('Upload failed:', error);
      alert(error.message || t('custom.alerts.upload_failed'));
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
        tx.pure.string(WalrusService.getBlobUrl(petData.imageBlob)),
        tx.pure.id(petData.imageObjId),
        tx.pure.string(WalrusService.getBlobUrl(petData.spriteBlob)),
        tx.pure.id(petData.spriteObjId),
        tx.pure.string(petData.name.toLowerCase().replace(/\s+/g, '-')),
        tx.object('0x6'), // clock
        tx.object('0x8'), // random
      ],
    });

    try {
      tx = await WalrusService.sponsorTransaction(tx, account.address);
      
      signAndExecuteTransaction({ transaction: tx }, {
        onSuccess: async (response) => {
          try {
            const txRes = await suiClient.waitForTransaction({
              digest: response.digest,
              options: { showEffects: true }
            });
            const status = txRes.effects?.status?.status;
            if (status === 'success') {
              alert(t('custom.alerts.mint_success'));
              navigate('/market');
            } else {
              const errorReason = txRes.effects?.status?.error || 'Unknown Move abort';
              alert(t('custom.alerts.mint_failed', { error: errorReason }));
            }
          } catch (e: any) {
            console.error(e);
            alert(t('custom.alerts.mint_failed', { error: e.message || e.toString() }));
          }
        },
        onError: (err) => {
          console.error('Mint failed:', err);
          alert(t('custom.alerts.mint_failed', { error: err.message || err.toString() }));
        }
      });
    } catch (err) {
      console.error('Sponsorship failed:', err);
      alert(t('custom.alerts.sponsor_unavailable'));
    }
  };

  const actionsList = [
    { name: i18n.language === 'vi' ? 'Idle (Đứng im - Dòng 1)' : 'Idle (Row 1)', value: 0 },
    { name: i18n.language === 'vi' ? 'Walk Right (Đi phải - Dòng 2)' : 'Walk Right (Row 2)', value: 1 },
    { name: i18n.language === 'vi' ? 'Walk Left (Đi trái - Dòng 3)' : 'Walk Left (Row 3)', value: 2 },
    { name: i18n.language === 'vi' ? 'Greet (Chào hỏi - Dòng 4)' : 'Greet (Row 4)', value: 3 },
    { name: i18n.language === 'vi' ? 'Special (Đặc biệt - Dòng 5)' : 'Special (Row 5)', value: 4 },
    { name: i18n.language === 'vi' ? 'Sad (U sầu - Dòng 6)' : 'Sad (Row 6)', value: 5 },
    { name: i18n.language === 'vi' ? 'Sleep (Ngủ/Chờ - Dòng 7)' : 'Sleep (Row 7)', value: 6 },
    { name: i18n.language === 'vi' ? 'Run (Chạy nhanh - Dòng 8)' : 'Run (Row 8)', value: 7 },
  ];

  // Calculate background coordinates for sprite preview
  const posX = frameCount > 1 ? (currentFrame * (100 / (frameCount - 1))) : 0;
  const posY = previewAction * 12.5; // 9 rows total, index 0 to 8. 100 / 8 = 12.5

  return (
    <div className="pt-32 pb-20 min-h-screen bg-gray-50 dark:bg-black/20">
      <div className="container mx-auto px-4 max-w-6xl">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 mb-8 hover:text-indigo-600 transition-colors font-bold uppercase text-xs tracking-widest"
        >
          <ArrowLeft size={16} /> {t('custom.back')}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: FORM */}
          <div className="lg:col-span-7 bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-indigo-500/5 border border-gray-100 dark:border-gray-800">
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
              <div className="mb-8 p-5 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-800 rounded-2xl flex gap-3 text-amber-700 dark:text-amber-400">
                <AlertCircle size={20} className="shrink-0 mt-0.5" />
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
                  className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl p-4 font-bold focus:ring-2 focus:ring-indigo-500 transition-all text-gray-900 dark:text-white"
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
                        <div className="text-center p-2 h-full w-full flex flex-col items-center justify-center relative">
                          <img 
                            src={WalrusService.getBlobUrl(petData.imageBlob)} 
                            alt="Avatar Preview" 
                            className="w-full h-full object-contain rounded-2xl max-h-32"
                          />
                          <div className="absolute bottom-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                            <Check className="text-green-500 animate-bounce" size={14} />
                            <span className="text-[10px] font-black text-green-600 dark:text-green-400 uppercase">
                              {t('custom.form.uploaded_hint')}
                            </span>
                          </div>
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
                        <div className="text-center p-2 h-full w-full flex flex-col items-center justify-center relative">
                          <img 
                            src={WalrusService.getBlobUrl(petData.spriteBlob)} 
                            alt="Sprite Preview" 
                            className="w-full h-full object-contain rounded-2xl max-h-32"
                          />
                          <div className="absolute bottom-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                            <Check className="text-green-500 animate-bounce" size={14} />
                            <span className="text-[10px] font-black text-green-600 dark:text-green-400 uppercase">
                              {t('custom.form.uploaded_hint')}
                            </span>
                          </div>
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

              {/* Sponsorship Badge */}
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-5 rounded-3xl border border-indigo-100 dark:border-indigo-800">
                <div className="flex gap-4">
                  <Sparkles className="text-indigo-500 shrink-0 mt-0.5" size={20} />
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

          {/* RIGHT COLUMN: LIVE ANIMATION PREVIEW */}
          <div className="lg:col-span-5 space-y-6">
            {/* Live Animation Box */}
            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-2xl border border-gray-100 dark:border-gray-800 flex flex-col items-center">
              <h2 className="text-xl font-black mb-1 w-full text-left flex items-center gap-2 text-gray-900 dark:text-white">
                <Sparkles className="text-indigo-500" size={20} />
                {t('custom.preview.title')}
              </h2>
              <p className="text-xs text-gray-500 mb-6 w-full text-left">
                {t('custom.preview.desc')}
              </p>

              {/* Animated Display Area */}
              <div className="w-full aspect-video bg-gray-50 dark:bg-gray-950 rounded-3xl border border-gray-100 dark:border-gray-800 flex items-center justify-center relative overflow-hidden p-6 mb-6">
                {petData.spriteBlob ? (
                  <div 
                    className="w-32 h-32 select-none pointer-events-none"
                    style={{
                      backgroundImage: `url(${WalrusService.getBlobUrl(petData.spriteBlob)})`,
                      backgroundSize: `${frameCount * 100}% 900%`,
                      backgroundPosition: `${posX}% ${posY}%`,
                      imageRendering: 'pixelated',
                      backgroundRepeat: 'no-repeat'
                    }}
                  />
                ) : (
                  <div className="text-center text-gray-400">
                    <Sparkles className="mx-auto mb-2 opacity-30 animate-pulse" size={40} />
                    <p className="text-xs font-bold uppercase tracking-wider">
                      {t('custom.preview.no_sprite')}
                    </p>
                  </div>
                )}
                
                {/* Floating Preview Overlay */}
                {petData.name && (
                  <div className="absolute top-4 left-4 bg-white/95 dark:bg-gray-900/95 shadow-sm px-3 py-1 rounded-full text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                    {petData.name}
                  </div>
                )}
              </div>

              {/* Controls */}
              {petData.spriteBlob && (
                <div className="w-full space-y-4">
                  <div className="flex gap-3">
                    {/* Play/Pause Button */}
                    <button 
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="btn-dark !p-3 rounded-xl bg-gray-900 text-white flex items-center justify-center shrink-0"
                    >
                      {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                    </button>
                    
                    {/* Select Action Dropdown */}
                    <select
                      value={previewAction}
                      onChange={(e) => setPreviewAction(Number(e.target.value))}
                      className="flex-1 bg-gray-50 dark:bg-gray-800 border-none rounded-xl p-3 font-bold text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                    >
                      {actionsList.map((act) => (
                        <option key={act.value} value={act.value}>
                          {act.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Frame Count Slider */}
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl w-full">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-gray-500 flex items-center gap-1.5">
                        <Sliders size={14} />
                        {t('custom.preview.frames_per_row')}
                      </span>
                      <span className="text-xs font-black text-indigo-500">{frameCount}</span>
                    </div>
                    <input 
                      type="range"
                      min="1"
                      max="12"
                      value={frameCount}
                      onChange={(e) => {
                        setFrameCount(Number(e.target.value));
                        setCurrentFrame(0);
                      }}
                      className="w-full accent-indigo-600 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Quick Guide Card */}
            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-2xl border border-gray-100 dark:border-gray-800 space-y-4">
              <h2 className="text-lg font-black flex items-center gap-2 text-gray-900 dark:text-white">
                <HelpCircle className="text-indigo-500" size={20} />
                {t('custom.preview.guidelines_title')}
              </h2>
              <ul className="space-y-3 text-xs text-gray-500 dark:text-gray-400 font-medium">
                <li className="flex gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1 shrink-0" />
                  <span>
                    {t('custom.preview.guide_1')}
                  </span>
                </li>
                <li className="flex gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1 shrink-0" />
                  <span>
                    {t('custom.preview.guide_2')}
                  </span>
                </li>
                <li className="flex gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1 shrink-0" />
                  <span>
                    {t('custom.preview.guide_3')}
                  </span>
                </li>
              </ul>
              
              <div className="pt-2">
                <button
                  onClick={() => navigate('/docs')}
                  className="w-full py-3 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-indigo-600 dark:text-indigo-400 font-bold rounded-2xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Info size={14} />
                  {t('custom.preview.view_docs')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
