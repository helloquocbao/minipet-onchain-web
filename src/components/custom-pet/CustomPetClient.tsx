"use client";

import React from 'react';
import { useCustomPet } from '../../hooks/useCustomPet';
import { CustomPetForm } from './CustomPetForm';
import { PetPreview } from './PetPreview';
import { GuideCard } from './GuideCard';
import { ArrowLeft } from 'lucide-react';

export function CustomPetClient() {
  const {
    petData,
    setPetData,
    uploading,
    hasSlot,
    loadingSlot,
    handleFileUpload,
    handleMint,
    t,
    navigate
  } = useCustomPet();

  return (
    <div className="pt-32 pb-20 min-h-screen bg-gray-50 dark:bg-black/20">
      <div className="container mx-auto px-4 max-w-6xl">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 mb-8 hover:text-indigo-600 transition-colors font-bold uppercase text-xs tracking-widest bg-transparent border-none cursor-pointer"
        >
          <ArrowLeft size={16} /> {t('custom.back')}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: FORM */}
          <CustomPetForm
            petData={petData}
            setPetData={setPetData}
            uploading={uploading}
            hasSlot={hasSlot}
            loadingSlot={loadingSlot}
            handleFileUpload={handleFileUpload}
            handleMint={handleMint}
            t={t}
            navigate={navigate}
          />

          {/* RIGHT COLUMN: LIVE ANIMATION PREVIEW & GUIDE */}
          <div className="lg:col-span-5 space-y-6">
            <PetPreview petData={petData} t={t} />
            <GuideCard t={t} navigate={navigate} />
          </div>
        </div>
      </div>
    </div>
  );
}
