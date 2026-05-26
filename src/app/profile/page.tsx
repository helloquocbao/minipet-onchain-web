import React from 'react';
import type { Metadata } from 'next';
import { ProfileClient } from '../../components/profile/ProfileClient';

export const metadata: Metadata = {
  title: 'My Profile - MiniPet',
  description: 'Manage your MiniPet NFTs and update your pet\'s happiness and mood on-chain.',
};

export default function ProfilePage() {
  return <ProfileClient />;
}
