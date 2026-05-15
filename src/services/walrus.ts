import { toBase64 } from '@mysten/sui/utils';
import { suiClient } from './blockchain/sui';

const PUBLISHER_URL = 'https://publisher.walrus.testnet.sui.io';
const AGGREGATOR_URL = 'https://aggregator.walrus.testnet.sui.io';

export interface WalrusUploadResponse {
  newlyCreated?: {
    blobObject: {
      blobId: string;
      id: string;
      storageReservation: {
        amount: number;
        id: string;
      };
    };
    encodedSize: number;
  };
  alreadyCertified?: {
    blobId: string;
    event: {
      txDigest: string;
      eventSeq: string;
    };
  };
}

export const WalrusService = {
  /**
   * 1. UPLOAD (User chọn ảnh, Admin Proxy đẩy lên Walrus)
   */
  async uploadFile(file: File | Blob, epochs: number = 5): Promise<{ blobId: string; blobObjectId: string }> {
    const response = await fetch(`${PUBLISHER_URL}/v1/blobs?epochs=${epochs}`, {
      method: 'PUT',
      body: file,
    });

    if (!response.ok) throw new Error(`Walrus upload failed: ${response.statusText}`);
    const data: WalrusUploadResponse = await response.json();
    
    if (data.newlyCreated) {
      return {
        blobId: data.newlyCreated.blobObject.blobId,
        blobObjectId: data.newlyCreated.blobObject.id
      };
    } else if (data.alreadyCertified) {
      return {
        blobId: data.alreadyCertified.blobId,
        blobObjectId: '0x0000000000000000000000000000000000000000000000000000000000000000' 
      };
    }
    throw new Error('Unexpected Walrus response format');
  },

  /**
   * 2. SPONSORSHIP (Admin ký giao dịch để trả phí gas và lưu trữ cho User)
   * Gọi đến MiniPet Backend để nhận chữ ký tài trợ.
   */
  async sponsorTransaction(tx: any, userAddress: string): Promise<any> {
    console.log(`[Sponsor] Requesting sponsorship for ${userAddress}...`);
    
    // Chuyển đổi Transaction sang bytes để gửi qua API
    const txBytes = await tx.build({ client: suiClient });
    const txBase64 = toBase64(txBytes);

    const response = await fetch('http://localhost:3001/sponsor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ txBytes: txBase64, userAddress }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Sponsorship failed');
    }

    const { signature } = await response.json();
    
    // Thêm chữ ký của Sponsor vào Transaction
    tx.addSignature(signature);
    
    return tx;
  },

  getBlobUrl(blobId: string): string {
    return `${AGGREGATOR_URL}/v1/blobs/${blobId}`;
  }
};
