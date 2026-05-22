import React from 'react';
import type { Metadata } from 'next';
import { MarketClient } from '../../components/market/MarketClient';

export const metadata: Metadata = {
  title: 'Adopt MiniPet - Official Pet Store & Mint Slots Marketplace',
  description: 'Browse official MiniPet templates and adopt unique companions using SUI. Buy a Mint Slot with MIPET token to create and customize your own pixel pet.',
  keywords: 'adopt minipet, sui pet store, buy mint slot, mipet token, custom pet creator, sui blockchain game, pixel pet nft market',
};

export default function MarketPage() {
  return <MarketClient />;
}
