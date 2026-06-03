import { toBase64 } from '@mysten/sui/utils';
import { suiClient } from './blockchain/sui';

const PUBLISHER_URL = process.env.NEXT_PUBLIC_WALRUS_PUBLISHER_URL || 'https://publisher.walrus-testnet.walrus.space';
const AGGREGATOR_URL = process.env.NEXT_PUBLIC_WALRUS_AGGREGATOR_URL || 'https://aggregator.walrus-testnet.walrus.space';
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

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
      eventSeq: string
    };
  };
}

export const WalrusService = {
  /**
   * 1. UPLOAD (User chọn ảnh, gửi qua Backend để kiểm tra hợp lệ, Backend đẩy lên Walrus và chuyển quyền sở hữu trên Sui)
   */
  async uploadFile(
    file: File | Blob,
    targetAddress?: string,
    isCustom: boolean = false,
    signature?: string,
    epochs: number = 5
  ): Promise<{ blobId: string; blobObjectId: string }> {
    // Nếu không truyền targetAddress, thực hiện tải trực tiếp lên Walrus (chế độ Testnet công cộng hoặc thử nghiệm cục bộ)
    if (!targetAddress) {
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
    }

    const headers: Record<string, string> = {
      'Content-Type': file.type || 'application/octet-stream',
    };

    const jwt = typeof window !== 'undefined' ? sessionStorage.getItem('zklogin_jwt') : null;
    if (jwt) {
      headers['Authorization'] = `Bearer ${jwt}`;
    } else if (signature) {
      headers['x-sui-signature'] = signature;
    }

    // Tải thông qua Backend của dự án để Backend kiểm tra quyền lợi và chuyển quyền sở hữu (đặc biệt hữu ích trên Mainnet)
    const backendUrl = `${BACKEND_URL}/upload?targetAddress=${targetAddress}&isCustom=${isCustom}`;
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers,
      body: file,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: response.statusText }));
      throw new Error(errorData.error || `Upload to backend failed: ${response.statusText}`);
    }

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
    throw new Error('Unexpected response format from upload backend');
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

    const response = await fetch(`${BACKEND_URL}/sponsor`, {
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
