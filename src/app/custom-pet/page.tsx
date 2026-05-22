import React from 'react';
import type { Metadata } from 'next';
import { CustomPetClient } from '../../components/custom-pet/CustomPetClient';

export const metadata: Metadata = {
  title: 'Custom Pet Creator - Mint & Upload Pixel Companion to Walrus Protocol',
  description: 'Design and custom build your unique desktop pixel pet. Upload animations to decentralized Walrus Protocol storage and mint them as interactive Sui NFTs.',
  keywords: 'custom pet creator, mint pixel pet, walrus protocol storage, sui blockchain nft, interactive pet creator, customized pixel companion, decentralized pet creation',
};

export default function CustomPetPage() {
  return <CustomPetClient />;
}
