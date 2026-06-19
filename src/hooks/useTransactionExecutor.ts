"use client";

import { useSignAndExecuteTransaction, useCurrentAccount } from '@mysten/dapp-kit';
import { useActiveAddress } from './useActiveAddress';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { getExtendedEphemeralPublicKey, getZkLoginSignature } from '@mysten/sui/zklogin';
import { suiClient } from '../services/blockchain/sui';

export function useTransactionExecutor() {
  const activeAddress = useActiveAddress();
  const account = useCurrentAccount();
  const { mutate: extensionSignAndExecute } = useSignAndExecuteTransaction();

  const execute = async (
    { transaction }: { transaction: any },
    callbacks?: {
      onSuccess?: (response: { digest: string }) => void;
      onError?: (error: any) => void;
      onSettled?: () => void;
    }
  ) => {
    // Check if it's zkLogin (we have a zkLogin session in sessionStorage and NO extension account active)
    const isZkLogin = !!activeAddress && sessionStorage.getItem('zklogin_address') === activeAddress && !account;
    if (isZkLogin) {
      try {
        console.log('[TransactionExecutor] Executing transaction using zkLogin...');
        const jwt = sessionStorage.getItem('zklogin_jwt') || localStorage.getItem('zklogin_jwt');
        const privateKeyBase64 = sessionStorage.getItem('zklogin_ephemeral_private_key') || localStorage.getItem('zklogin_ephemeral_private_key');
        const randomness = sessionStorage.getItem('zklogin_randomness') || localStorage.getItem('zklogin_randomness');
        const maxEpoch = sessionStorage.getItem('zklogin_max_epoch') || localStorage.getItem('zklogin_max_epoch');

        if (!jwt || !privateKeyBase64 || !randomness || !maxEpoch) {
          throw new Error('zkLogin session data missing from storage. Please log in again.');
        }

        const ephemeralKeypair = Ed25519Keypair.fromSecretKey(privateKeyBase64);

        // 1. Fetch ZK Proof from public prover
        console.log('[TransactionExecutor] Fetching ZK Proof from prover...');
        const proverUrl = 'https://prover-dev.mystenlabs.com/v1';
        const salt = sessionStorage.getItem('zklogin_salt') || localStorage.getItem('zklogin_salt') || '30041975020919453004197502091945';
        const proverResponse = await fetch(proverUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jwt,
            extendedEphemeralPublicKey: getExtendedEphemeralPublicKey(ephemeralKeypair.getPublicKey()),
            maxEpoch: parseInt(maxEpoch),
            jwtRandomness: randomness,
            salt: salt,
            keyClaimName: 'sub'
          })
        });

        if (!proverResponse.ok) {
          const errMsg = await proverResponse.text();
          throw new Error(`ZK Prover request failed: ${errMsg}`);
        }

        const zkProof = await proverResponse.json();
        console.log('[TransactionExecutor] ZK Proof obtained successfully.');

        // 2. Build Transaction (Fetch sponsor gas coin first to enable building for 0 SUI users)
        console.log('[TransactionExecutor] Fetching sponsor SUI gas coin from backend...');
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:10000';
        const gasCoinResponse = await fetch(`${backendUrl}/sponsor-gas-coin`);
        if (!gasCoinResponse.ok) {
          const errText = await gasCoinResponse.text();
          throw new Error(`Failed to fetch sponsor gas coin: ${errText}`);
        }
        const { sponsorAddress, gasCoin } = await gasCoinResponse.json();

        transaction.setSender(activeAddress);
        transaction.setGasOwner(sponsorAddress);
        transaction.setGasPayment([gasCoin]);
        transaction.setGasBudget(30000000); // 0.03 SUI

        const txBytes = await transaction.build({ client: suiClient });

        // 3. Sign transaction with ephemeral keypair
        const { signature: ephemeralSignature } = await ephemeralKeypair.signTransaction(txBytes);

        // 4. Combine into final zkLogin signature
        const zkLoginSignature = getZkLoginSignature({
          inputs: zkProof,
          maxEpoch: parseInt(maxEpoch),
          userSignature: ephemeralSignature,
        });

        // 5. Submit to Sponsoring endpoint (Gas & Execution)
        console.log('[TransactionExecutor] Requesting backend gas sponsorship & execution...');
        const txBytesBase64 = Buffer.from(txBytes).toString('base64');
        
        const sponsorResponse = await fetch(`${backendUrl}/sponsor`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            txBytes: txBytesBase64,
            userAddress: activeAddress,
            userSignature: zkLoginSignature
          })
        });

        if (!sponsorResponse.ok) {
          const errMsg = await sponsorResponse.text();
          throw new Error(`Gas sponsorship failed: ${errMsg}`);
        }

        const result = await sponsorResponse.json();

        console.log('[TransactionExecutor] Transaction execution succeeded:', result.digest);
        if (callbacks?.onSuccess) {
          callbacks.onSuccess({ digest: result.digest });
        }
      } catch (err: any) {
        console.error('[TransactionExecutor] zkLogin execution failed:', err);
        if (callbacks?.onError) {
          callbacks.onError(err);
        }
      } finally {
        if (callbacks?.onSettled) {
          callbacks.onSettled();
        }
      }
    } else {
      // Use standard Extension Wallet signing
      console.log('[TransactionExecutor] Executing transaction using Extension Wallet...');
      extensionSignAndExecute({ transaction }, {
        onSuccess: (res) => {
          if (callbacks?.onSuccess) callbacks.onSuccess(res);
        },
        onError: (err) => {
          if (callbacks?.onError) callbacks.onError(err);
        },
        onSettled: () => {
          if (callbacks?.onSettled) callbacks.onSettled();
        }
      });
    }
  };

  return { execute };
}
