import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useTransactionExecutor } from './useTransactionExecutor';
import { useActiveAddress } from './useActiveAddress';
import { Transaction } from '@mysten/sui/transactions';
import { 
  PACKAGE_ID, 
  MODULES, 
  FUNCTIONS, 
  GLOBAL_CONFIG_ID, 
  suiClient 
} from '../services/blockchain/sui';
import { WalrusService } from '../services/walrus';
import { AIGenerationService } from '../services/aiGenerationService';

export interface PetData {
  name: string;
  imageBlob: string;
  imageObjId: string;
  spriteBlob: string;
  spriteObjId: string;
  slug: string;
}

const extractBlobId = (url: string) => {
  if (!url) return '';
  if (url.includes('/blobs/')) {
    return url.split('/blobs/')[1];
  }
  return url;
};

export const useCustomPet = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeAddress = useActiveAddress();
  const { t } = useTranslation();
  const { execute: signAndExecuteTransaction } = useTransactionExecutor();

  const navigate = (path: string | number) => {
    if (typeof path === 'number') {
      if (path === -1) router.back();
    } else {
      router.push(path);
    }
  };

  const templateName = searchParams.get('name') || '';
  const templateImageUrl = searchParams.get('image_url') || '';
  const templateSpriteUrl = searchParams.get('sprite_url') || '';

  const [petData, setPetData] = useState<PetData>({
    name: templateName,
    imageBlob: extractBlobId(templateImageUrl),
    imageObjId: '',
    spriteBlob: extractBlobId(templateSpriteUrl),
    spriteObjId: '',
    slug: templateName ? templateName.toLowerCase().replace(/\s+/g, '-') : ''
  });

  const [uploading, setUploading] = useState({ image: false, sprite: false });
  const [hasSlot, setHasSlot] = useState(false);
  const [loadingSlot, setLoadingSlot] = useState(false);

  // AI Generation states
  const [baseImage, setBaseImage] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState<'upload' | 'review'>('upload');

  // Check if user has a Mint Slot
  useEffect(() => {
    if (activeAddress) {
      checkMintSlot();
    } else {
      setHasSlot(false);
    }
  }, [activeAddress]);

  const checkMintSlot = async () => {
    if (!activeAddress) return;
    setLoadingSlot(true);
    try {
      const objects = await suiClient.getOwnedObjects({
        owner: activeAddress,
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
    if (!activeAddress) {
      alert(t('custom.alerts.connect_wallet') || 'Please connect your wallet first');
      return;
    }
    try {
      setUploading(prev => ({ ...prev, [type]: true }));
      const { blobId, blobObjectId } = await WalrusService.uploadFile(file, activeAddress, true);
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

  const handleGeneratePet = async () => {
    if (!baseImage) return;
    if (!activeAddress) {
      alert(t('custom.alerts.connect_wallet') || 'Please connect your wallet first');
      return;
    }

    setIsGenerating(true);
    try {
      // 1. Generate Pet Files
      const { avatar, sprite } = await AIGenerationService.generatePetFromImage(baseImage);

      // 2. Upload them to Walrus
      setUploading({ image: true, sprite: true });
      const [avatarWalrus, spriteWalrus] = await Promise.all([
        WalrusService.uploadFile(avatar, activeAddress, true),
        WalrusService.uploadFile(sprite, activeAddress, true)
      ]);

      // 3. Update state
      setPetData(prev => ({
        ...prev,
        imageBlob: avatarWalrus.blobId,
        imageObjId: avatarWalrus.blobObjectId,
        spriteBlob: spriteWalrus.blobId,
        spriteObjId: spriteWalrus.blobObjectId
      }));

      setGenerationStep('review');
    } catch (error: any) {
      console.error('Generation failed:', error);
      alert(error.message || t('custom.alerts.generate_failed') || 'Generation failed');
    } finally {
      setIsGenerating(false);
      setUploading({ image: false, sprite: false });
    }
  };

  const handleMint = async () => {
    if (!activeAddress || !hasSlot) return;

    // Find the slot object
    const objects = await suiClient.getOwnedObjects({
      owner: activeAddress,
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
      tx = await WalrusService.sponsorTransaction(tx, activeAddress);
      
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

  return {
    petData,
    setPetData,
    uploading,
    hasSlot,
    loadingSlot,
    handleFileUpload,
    handleMint,
    handleGeneratePet,
    baseImage,
    setBaseImage,
    isGenerating,
    generationStep,
    setGenerationStep,
    t,
    navigate
  };
};
