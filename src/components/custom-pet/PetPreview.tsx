"use client";

import React, { useState, useEffect } from 'react';
import { Sparkles, Pause, Play, LayoutGrid, SquarePlay } from 'lucide-react';
import { WalrusService } from '../../services/walrus';
import { PetData } from '../../hooks/useCustomPet';

interface PetPreviewProps {
  petData: PetData;
  t: (key: string, options?: any) => string;
}

export const PetPreview: React.FC<PetPreviewProps> = ({ petData, t }) => {
  // Preview States
  const [activeTab, setActiveTab] = useState<'single' | 'grid'>('grid'); // Default to grid to wow the user
  const [previewAction, setPreviewAction] = useState<number>(0);
  const frameCount = 8; // Locked to 8 columns
  const [currentFrame, setCurrentFrame] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Animation Loop for Spritesheet Preview
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentFrame(f => (f + 1) % frameCount);
    }, 150);
    return () => clearInterval(interval);
  }, [isPlaying, frameCount]);

  const actionsList = [
    { nameVi: 'Đứng im (Idle)', nameEn: 'Idle (Row 0)', value: 0, descVi: 'Đứng yên thở nhẹ nhàng', descEn: 'Standing still breathing' },
    { nameVi: 'Đi bên phải (Walk R)', nameEn: 'Walk Right (Row 1)', value: 1, descVi: 'Di chuyển sang phải', descEn: 'Walking to the right' },
    { nameVi: 'Đi bên trái (Walk L)', nameEn: 'Walk Left (Row 2)', value: 2, descVi: 'Di chuyển sang trái', descEn: 'Walking to the left' },
    { nameVi: 'Chào (Greet)', nameEn: 'Greet (Row 3)', value: 3, descVi: 'Vẫy tay chào thân thiện', descEn: 'Waving hands friendly' },
    { nameVi: 'Hành động đặc biệt', nameEn: 'Special Action (Row 4)', value: 4, descVi: 'Ăn file, nhào lộn...', descEn: 'Eating files, flipping' },
    { nameVi: 'Thất vọng (Failed)', nameEn: 'Failed / Fall (Row 5)', value: 5, descVi: 'Khi buồn bã hoặc rơi tự do', descEn: 'Saddened or falling down' },
    { nameVi: 'Đi ngủ (Waiting)', nameEn: 'Sleep / Wait (Row 6)', value: 6, descVi: 'Nằm ngủ khi đợi lâu', descEn: 'Sleeping when waiting' },
    { nameVi: 'Chạy nhanh (Running)', nameEn: 'Run Fast (Row 7)', value: 7, descVi: 'Chạy tốc độ cao', descEn: 'Running at high speed' },
    { nameVi: 'Xem trước (Review)', nameEn: 'Review (Row 8)', value: 8, descVi: 'Dùng để kiểm thử phụ', descEn: 'Secondary testing frame' },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl border border-gray-100 dark:border-gray-800 flex flex-col items-center">
      <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
        <div>
          <h2 className="text-xl font-black flex items-center gap-2 text-gray-900 dark:text-white">
            <Sparkles className="text-indigo-500" size={20} />
            {t('custom.preview.title')}
          </h2>
          <p className="text-[11px] text-gray-500 mt-0.5">
            {t('custom.preview.desc')}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-100 dark:bg-slate-800/80 p-0.5 rounded-xl border border-slate-200/20 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('grid')}
            className={`px-3 py-1.5 rounded-lg text-[10.5px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${activeTab === 'grid' ? 'bg-white dark:bg-slate-900 text-indigo-650 dark:text-indigo-400 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <LayoutGrid size={13} />
            Tauri App Grid
          </button>
          <button
            onClick={() => setActiveTab('single')}
            className={`px-3 py-1.5 rounded-lg text-[10.5px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${activeTab === 'single' ? 'bg-white dark:bg-slate-900 text-indigo-650 dark:text-indigo-400 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <SquarePlay size={13} />
            Single View
          </button>
        </div>
      </div>

      {!petData.spriteBlob ? (
        <div className="w-full aspect-video bg-gray-50 dark:bg-gray-950 rounded-3xl border border-gray-150 dark:border-gray-850 flex items-center justify-center relative overflow-hidden p-6">
          <div className="text-center text-gray-400">
            <Sparkles className="mx-auto mb-2 opacity-30 animate-pulse" size={40} />
            <p className="text-xs font-bold uppercase tracking-wider">
              {t('custom.preview.no_sprite')}
            </p>
          </div>
        </div>
      ) : activeTab === 'single' ? (
        /* ── SINGLE ACTION PREVIEW ── */
        <div className="w-full space-y-6">
          <div className="w-full aspect-video bg-gray-50 dark:bg-gray-950 rounded-3xl border border-gray-150 dark:border-gray-850 flex items-center justify-center relative overflow-hidden p-6">
            <div 
              className="w-32 h-32 select-none pointer-events-none"
              style={{
                backgroundImage: `url(${petData.spriteBlob.startsWith('blob:') || petData.spriteBlob.startsWith('data:') || petData.spriteBlob.startsWith('/') ? petData.spriteBlob : WalrusService.getBlobUrl(petData.spriteBlob)})`,
                backgroundSize: `${frameCount * 100}% 900%`,
                backgroundPosition: `${frameCount > 1 ? (currentFrame * (100 / (frameCount - 1))) : 0}% ${previewAction * 12.5}%`,
                imageRendering: 'pixelated',
                backgroundRepeat: 'no-repeat'
              }}
            />
            {petData.name && (
              <div className="absolute top-4 left-4 bg-white/95 dark:bg-gray-900/95 shadow-sm px-3 py-1 rounded-full text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                {petData.name}
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="w-full space-y-4">
            <div className="flex gap-3">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="btn-dark !p-3 rounded-xl bg-gray-900 text-white flex items-center justify-center shrink-0 cursor-pointer"
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              </button>
              
              <select
                value={previewAction}
                onChange={(e) => setPreviewAction(Number(e.target.value))}
                className="flex-1 bg-gray-50 dark:bg-gray-850 border border-slate-200 dark:border-slate-800 rounded-xl p-3 font-bold text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all cursor-pointer"
              >
                {actionsList.map((act) => (
                  <option key={act.value} value={act.value}>
                    {t('locale') === 'vi' ? act.nameVi : act.nameEn}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      ) : (
        /* ── MULTI TAURI ANIMATIONS GRID ── */
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-4">
          {actionsList.map((act) => {
            const rowPosY = act.value * 12.5;
            const rowPosX = frameCount > 1 ? (currentFrame * (100 / (frameCount - 1))) : 0;
            return (
              <div 
                key={act.value} 
                className="bg-gray-50 dark:bg-gray-950 border border-slate-150/40 dark:border-slate-850 p-4 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden group hover:border-indigo-500/20 dark:hover:border-indigo-500/20 transition-all"
              >
                {/* Frame index badge */}
                <span className="absolute top-2 left-2 text-[8px] font-mono font-bold text-gray-400 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 px-1.5 py-0.2 rounded-full">
                  ROW {act.value}
                </span>

                {/* Animated Sprite */}
                <div 
                  className="w-16 h-16 select-none pointer-events-none my-3"
                  style={{
                    backgroundImage: `url(${petData.spriteBlob.startsWith('blob:') || petData.spriteBlob.startsWith('data:') || petData.spriteBlob.startsWith('/') ? petData.spriteBlob : WalrusService.getBlobUrl(petData.spriteBlob)})`,
                    backgroundSize: `${frameCount * 100}% 900%`,
                    backgroundPosition: `${rowPosX}% ${rowPosY}%`,
                    imageRendering: 'pixelated',
                    backgroundRepeat: 'no-repeat'
                  }}
                />

                {/* Localized Label */}
                <div className="text-center w-full mt-1 border-t border-slate-100 dark:border-slate-900/60 pt-2">
                  <h4 className="text-[10px] font-extrabold text-gray-800 dark:text-gray-200 truncate leading-tight">
                    {t('locale') === 'vi' ? act.nameVi : act.nameEn}
                  </h4>
                  <p className="text-[8.5px] text-gray-450 dark:text-gray-500 mt-0.5 truncate">
                    {t('locale') === 'vi' ? act.descVi : act.descEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
