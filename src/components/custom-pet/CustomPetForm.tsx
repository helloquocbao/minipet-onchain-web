import React from 'react';
import { 
  Dna, 
  AlertCircle, 
  Loader2, 
  Check, 
  Upload, 
  Sparkles 
} from 'lucide-react';
import { WalrusService } from '../../services/walrus';
import { PetData } from '../../hooks/useCustomPet';

interface CustomPetFormProps {
  petData: PetData;
  setPetData: React.Dispatch<React.SetStateAction<PetData>>;
  uploading: { image: boolean; sprite: boolean };
  hasSlot: boolean;
  loadingSlot: boolean;
  handleFileUpload: (file: File, type: 'image' | 'sprite') => Promise<void>;
  handleMint: () => Promise<void>;
  t: (key: string, options?: any) => string;
  navigate: (path: string | number) => void;
}

export const CustomPetForm: React.FC<CustomPetFormProps> = ({
  petData,
  setPetData,
  uploading,
  hasSlot,
  loadingSlot,
  handleFileUpload,
  handleMint,
  t,
  navigate
}) => {
  return (
    <div className="lg:col-span-7 bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-indigo-500/5 border border-gray-100 dark:border-gray-800">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-xl shadow-indigo-500/20">
          <Dna size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-black tracking-tight">{t('custom.title')}</h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium">{t('custom.subtitle')}</p>
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
          <label className="block text-sm font-bold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">
            {t('custom.form.name_label')}
          </label>
          <input 
            type="text" 
            placeholder={t('custom.form.name_placeholder')}
            className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl p-4 font-bold focus:ring-2 focus:ring-indigo-500 transition-all text-gray-900 dark:text-white"
            value={petData.name}
            onChange={(e) => setPetData({...petData, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-bold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">
              {t('custom.form.avatar_label')}
            </label>
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
            <label className="block text-sm font-bold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">
              {t('custom.form.sprite_label')}
            </label>
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
  );
};
