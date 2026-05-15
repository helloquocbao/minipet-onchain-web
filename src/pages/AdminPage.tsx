import { useState } from 'react';
import { useCurrentAccount, useSignAndExecuteTransaction } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { PACKAGE_ID, GLOBAL_CONFIG_ID, ADMIN_CAP_ID, FUNCTIONS, MODULES } from '../services/blockchain/sui';
import { WalrusService } from '../services/walrus';
import { Settings, Plus, Info, Activity, Upload, Loader2, Check } from 'lucide-react';

export default function AdminPage() {
  const account = useCurrentAccount();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
  
  const [template, setTemplate] = useState({
    name: '', 
    image_url: '', 
    image_blob_id: '',
    sprite_url: '', 
    sprite_blob_id: '',
    price: '1000000000' // 1 SUI
  });

  const [uploading, setUploading] = useState({ image: false, sprite: false });
  const [uploadDone, setUploadDone] = useState({ image: false, sprite: false });

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
      alert('Failed to upload to Walrus. Check console.');
    } finally {
      setUploading(prev => ({ ...prev, [type]: false }));
    }
  };

  const [config, setConfig] = useState({
    baseFee: '10000000000000', // 10,000 MIPET
    treasury: ''
  });

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
      onSuccess: (result) => console.log('Template created:', result),
      onError: (error) => console.error('Error creating template:', error),
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
      onSuccess: (result) => console.log('Treasury updated:', result),
      onError: (error) => console.error('Error updating treasury:', error),
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
      onSuccess: (result) => console.log('Config updated:', result),
      onError: (error) => console.error('Error updating config:', error),
    });
  };

  return (
    <div className="pt-32 pb-20 min-h-screen container mx-auto px-4">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg">
          <Settings size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-black tracking-tight">Admin Dashboard</h1>
          <p className="text-gray-500 font-medium">Manage MiniPet ecosystem parameters</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Create Template */}
        <div className="card p-8">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Plus size={20} className="text-indigo-500" /> Create Pet Template
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-500 mb-1 uppercase tracking-wider">Pet Name</label>
              <input 
                type="text" 
                className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl p-3 font-semibold focus:ring-2 focus:ring-indigo-500"
                value={template.name}
                onChange={(e) => setTemplate({...template, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-500 mb-1 uppercase tracking-wider">Image (Upload to Walrus)</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  className="flex-1 bg-gray-50 dark:bg-gray-800 border-none rounded-xl p-3 font-semibold focus:ring-2 focus:ring-indigo-500"
                  placeholder="Blob ID will appear here"
                  value={template.image_url}
                  onChange={(e) => setTemplate({...template, image_url: e.target.value})}
                />
                <label className={`cursor-pointer w-12 h-12 rounded-xl flex items-center justify-center transition-all ${uploadDone.image ? 'bg-green-100 text-green-600' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
                  {uploading.image ? <Loader2 size={20} className="animate-spin" /> : (uploadDone.image ? <Check size={20} /> : <Upload size={20} />)}
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'image')} />
                </label>
              </div>
              {template.image_url && (
                <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-xl inline-block border border-gray-100 dark:border-gray-700">
                  <img 
                    src={template.image_url.startsWith('http') ? template.image_url : WalrusService.getBlobUrl(template.image_url)} 
                    className="h-20 w-20 object-contain pixel-art"
                    alt="Preview"
                  />
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-500 mb-1 uppercase tracking-wider">Sprite (Upload to Walrus)</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  className="flex-1 bg-gray-50 dark:bg-gray-800 border-none rounded-xl p-3 font-semibold focus:ring-2 focus:ring-indigo-500"
                  placeholder="Blob ID will appear here"
                  value={template.sprite_url}
                  onChange={(e) => setTemplate({...template, sprite_url: e.target.value})}
                />
                <label className={`cursor-pointer w-12 h-12 rounded-xl flex items-center justify-center transition-all ${uploadDone.sprite ? 'bg-green-100 text-green-600' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
                  {uploading.sprite ? <Loader2 size={20} className="animate-spin" /> : (uploadDone.sprite ? <Check size={20} /> : <Upload size={20} />)}
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'sprite')} />
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-500 mb-1 uppercase tracking-wider">Price (MIST)</label>
              <input 
                type="number" 
                className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl p-3 font-semibold focus:ring-2 focus:ring-indigo-500"
                value={template.price}
                onChange={(e) => setTemplate({...template, price: e.target.value})}
              />
            </div>
            <button 
              onClick={handleCreateTemplate}
              className="btn-dark w-full !justify-center !py-4 mt-4"
            >
              Create Template
            </button>
          </div>
        </div>

        {/* Global Config */}
        <div className="space-y-8">
          <div className="card p-8">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Activity size={20} className="text-pink-500" /> Global Configuration
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-500 mb-1 uppercase tracking-wider">Base Slot Fee (MIPET)</label>
                <div className="flex gap-2">
                  <input 
                    type="number" 
                    className="flex-1 bg-gray-50 dark:bg-gray-800 border-none rounded-xl p-3 font-semibold focus:ring-2 focus:ring-pink-500"
                    value={config.baseFee}
                    onChange={(e) => setConfig({...config, baseFee: e.target.value})}
                  />
                  <button 
                    onClick={handleUpdateConfig}
                    className="btn-dark !bg-pink-600 hover:!bg-pink-700 !px-6"
                  >
                    Update
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                <label className="block text-sm font-bold text-gray-500 mb-1 uppercase tracking-wider">Treasury Address</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="0x..."
                    className="flex-1 bg-gray-50 dark:bg-gray-800 border-none rounded-xl p-3 font-semibold focus:ring-2 focus:ring-indigo-500"
                    value={config.treasury}
                    onChange={(e) => setConfig({...config, treasury: e.target.value})}
                  />
                  <button 
                    onClick={handleUpdateTreasury}
                    className="btn-dark !px-6"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-900/10 rounded-3xl p-6 border border-indigo-100 dark:border-indigo-800 flex gap-4">
            <Info className="text-indigo-500 shrink-0" size={20} />
            <p className="text-sm text-indigo-900 dark:text-indigo-300 leading-relaxed">
              <strong>Note:</strong> You must have the <code>AdminCap</code> in your wallet to perform these actions. Actions are permanent on the blockchain.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
