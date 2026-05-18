import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCurrentAccount, useSignAndExecuteTransaction } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { PACKAGE_ID, GLOBAL_CONFIG_ID, ADMIN_CAP_ID, FUNCTIONS, MODULES, TREASURY_CAP_ID, PET_TOKEN_PACKAGE_ID } from '../services/blockchain/sui';
import { WalrusService } from '../services/walrus';
import { Settings, Plus, Info, Activity, Upload, Loader2, Check, Coins } from 'lucide-react';

export default function AdminPage() {
  const account = useCurrentAccount();
  const { t } = useTranslation();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'store' | 'economy' | 'settings'>('dashboard');
  
  const [template, setTemplate] = useState({
    name: '', 
    image_url: '', 
    image_blob_id: '',
    sprite_url: '', 
    sprite_blob_id: '',
    price: '1000000000' 
  });

  const [uploading, setUploading] = useState({ image: false, sprite: false });
  const [uploadDone, setUploadDone] = useState({ image: false, sprite: false });

  const [tokenMint, setTokenMint] = useState({
    amount: '1000000000000', 
    recipient: ''
  });

  const [config, setConfig] = useState({
    baseFee: '10000000000000', 
    treasury: ''
  });

  const handleFileUpload = async (file: File, type: 'image' | 'sprite') => {
    try {
      setUploading(prev => ({ ...prev, [type]: true }));
      setUploadDone(prev => ({ ...prev, [type]: false }));
      const { blobId, blobObjectId } = await WalrusService.uploadFile(file);
      setTemplate(prev => ({
        ...prev,
        [type === 'image' ? 'image_url' : 'sprite_url']: blobId,
        [type === 'image' ? 'image_blob_id' : 'sprite_blob_id']: blobObjectId
      }));
      setUploadDone(prev => ({ ...prev, [type]: true }));
    } catch (error) {
      console.error('Walrus upload failed:', error);
      alert(t('admin.alerts.upload_failed'));
    } finally {
      setUploading(prev => ({ ...prev, [type]: false }));
    }
  };

  const handleCreateTemplate = () => {
    if (!account) return;
    const tx = new Transaction();
    tx.moveCall({
      target: `${PACKAGE_ID}::${MODULES.PET_NFT}::${FUNCTIONS.CREATE_TEMPLATE}`,
      arguments: [
        tx.object(ADMIN_CAP_ID),
        tx.pure.string(template.name),
        tx.pure.string(template.image_url),
        tx.pure.id(template.image_blob_id),
        tx.pure.string(template.sprite_url),
        tx.pure.id(template.sprite_blob_id),
        tx.pure.u64(template.price),
      ],
    });
    signAndExecuteTransaction({ transaction: tx }, {
      onSuccess: () => alert(t('admin.alerts.template_success')),
      onError: (error) => console.error('Error:', error),
    });
  };

  const handleMintToken = () => {
    if (!account || !tokenMint.recipient) return;
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
      onSuccess: () => alert(t('admin.alerts.tokens_minted')),
      onError: (error) => console.error('Error:', error),
    });
  };

  const handleUpdateTreasury = () => {
    if (!account || !config.treasury) return;
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
      onSuccess: () => alert(t('admin.alerts.treasury_updated')),
      onError: (error) => console.error('Error:', error),
    });
  };

  const handleUpdateConfig = () => {
    if (!account) return;
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
      onSuccess: () => alert(t('admin.alerts.config_updated')),
      onError: (error) => console.error('Error:', error),
    });
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-gray-50 dark:bg-[#0a0a0b]">
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
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer border-none ${
                  activeTab === tab.id 
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
              
              <div className="md:col-span-3 card p-12 bg-indigo-600 text-white flex flex-col items-center text-center">
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
                  <h2 className="text-xl font-bold">{t('admin.store.add_title')}</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-black text-gray-400 mb-2 uppercase">{t('admin.store.pet_name')}</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Pixel Dragon"
                        className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl p-3.5 font-bold focus:ring-2 focus:ring-indigo-500"
                        value={template.name}
                        onChange={(e) => setTemplate({...template, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-400 mb-2 uppercase">{t('admin.store.price')}</label>
                      <input 
                        type="number" 
                        className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl p-3.5 font-bold focus:ring-2 focus:ring-indigo-500"
                        value={Number(template.price) / 1000000000}
                        onChange={(e) => setTemplate({...template, price: (Number(e.target.value) * 1000000000).toString()})}
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-black text-gray-400 mb-2 uppercase">{t('admin.store.main_image')}</label>
                      <div className="relative group">
                        <input 
                          type="file" 
                          onChange={(e) => e.target.files && handleFileUpload(e.target.files[0], 'image')}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className={`p-4 rounded-xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-2 ${
                          uploadDone.image ? 'border-green-500 bg-green-50 dark:bg-green-950/20' : 'border-gray-200 dark:border-gray-800 hover:border-indigo-500'
                        }`}>
                          {uploading.image ? <Loader2 className="animate-spin text-indigo-500" /> : uploadDone.image ? <Check className="text-green-500" /> : <Upload className="text-gray-400" />}
                          <span className="text-xs font-bold text-gray-500">{uploading.image ? t('admin.store.uploading') : uploadDone.image ? t('admin.store.uploaded') : t('admin.store.choose_file')}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-400 mb-2 uppercase">{t('admin.store.sprite_sheet')}</label>
                      <div className="relative group">
                        <input 
                          type="file" 
                          onChange={(e) => e.target.files && handleFileUpload(e.target.files[0], 'sprite')}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className={`p-4 rounded-xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-2 ${
                          uploadDone.sprite ? 'border-green-500 bg-green-50 dark:bg-green-950/20' : 'border-gray-200 dark:border-gray-800 hover:border-indigo-500'
                        }`}>
                          {uploading.sprite ? <Loader2 className="animate-spin text-indigo-500" /> : uploadDone.sprite ? <Check className="text-green-500" /> : <Upload className="text-gray-400" />}
                          <span className="text-xs font-bold text-gray-500">{uploading.sprite ? t('admin.store.uploading') : uploadDone.sprite ? t('admin.store.uploaded') : t('admin.store.choose_file')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleCreateTemplate}
                  disabled={!uploadDone.image || !uploadDone.sprite || !template.name}
                  className="btn-dark w-full !justify-center !py-4 mt-10 shadow-xl shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t('admin.store.confirm_btn')}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'economy' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="card p-8 bg-white dark:bg-gray-900 border-l-4 border-l-amber-500">
                <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
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
                      className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl p-3.5 font-bold focus:ring-2 focus:ring-amber-500"
                      value={tokenMint.recipient}
                      onChange={(e) => setTokenMint({...tokenMint, recipient: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 mb-2 uppercase">{t('admin.economy.amount')}</label>
                    <div className="flex gap-3">
                      <input 
                        type="number" 
                        className="flex-1 bg-gray-50 dark:bg-gray-800 border-none rounded-xl p-3.5 font-bold focus:ring-2 focus:ring-amber-500"
                        value={Number(tokenMint.amount) / 1000000000}
                        onChange={(e) => setTokenMint({...tokenMint, amount: (Number(e.target.value) * 1000000000).toString()})}
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
                <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
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
                        className="flex-1 bg-gray-50 dark:bg-gray-800 border-none rounded-xl p-3.5 font-bold focus:ring-2 focus:ring-purple-500"
                        value={config.treasury}
                        onChange={(e) => setConfig({...config, treasury: e.target.value})}
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
                <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center text-pink-600">
                    <Activity size={20} />
                  </div>
                  {t('admin.system.title')}
                </h2>
                <div className="space-y-8">
                  <div>
                    <label className="block text-xs font-black text-gray-400 mb-2 uppercase">{t('admin.system.fee_label')}</label>
                    <div className="flex gap-3">
                      <input 
                        type="number" 
                        className="flex-1 bg-gray-50 dark:bg-gray-800 border-none rounded-xl p-3.5 font-bold focus:ring-2 focus:ring-pink-500"
                        value={Number(config.baseFee) / 1000000000}
                        onChange={(e) => setConfig({...config, baseFee: (Number(e.target.value) * 1000000000).toString()})}
                      />
                      <button 
                        onClick={handleUpdateConfig}
                        className="btn-dark !bg-pink-600 hover:!bg-pink-700 !px-8 shadow-lg shadow-pink-500/20"
                      >
                        {t('admin.system.save_btn')}
                      </button>
                    </div>
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
