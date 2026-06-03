"use client";

import React, { useState, useEffect } from 'react';
import { Sparkles, Pause, Play, Sliders } from 'lucide-react';
import { WalrusService } from '../../services/walrus';
import { PetData } from '../../hooks/useCustomPet';

interface PetPreviewProps {
  petData: PetData;
  t: (key: string, options?: any) => string;
}

export const PetPreview: React.FC<PetPreviewProps> = ({ petData, t }) => {
  // Preview States
  const [previewAction, setPreviewAction] = useState<number>(0);
  const [frameCount, setFrameCount] = useState<number>(4);
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
    { name: 'Đứng yên', value: 0 },
    { name: 'Chạy/Đi bộ', value: 1 },
    { name: 'Giận dữ', value: 2 },
    { name: 'Chào', value: 3 },
    { name: 'Buồn bã', value: 4 },
    { name: 'Choáng váng', value: 5 },
    { name: 'Cất tiền', value: 6 },
    { name: 'Tò mò', value: 7 },
    { name: 'Gõ búa', value: 8 },
  ];

  // Calculate background coordinates for sprite preview
  const posX = frameCount > 1 ? (currentFrame * (100 / (frameCount - 1))) : 0;
  const posY = previewAction * 12.5; // 9 rows total, index 0 to 8

  return (
    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-2xl border border-gray-100 dark:border-gray-800 flex flex-col items-center">
      <h2 className="text-xl font-black mb-1 w-full text-left flex items-center gap-2 text-gray-900 dark:text-white">
        <Sparkles className="text-indigo-500" size={20} />
        {t('custom.preview.title')}
      </h2>
      <p className="text-xs text-gray-500 mb-6 w-full text-left">
        {t('custom.preview.desc')}
      </p>

      {/* Animated Display Area */}
      <div className="w-full aspect-video bg-gray-50 dark:bg-gray-950 rounded-3xl border border-gray-100 dark:border-gray-800 flex items-center justify-center relative overflow-hidden p-6 mb-6">
        {petData.spriteBlob ? (
          <div 
            className="w-32 h-32 select-none pointer-events-none"
            style={{
              backgroundImage: `url(${WalrusService.getBlobUrl(petData.spriteBlob)})`,
              backgroundSize: `${frameCount * 100}% 900%`,
              backgroundPosition: `${posX}% ${posY}%`,
              imageRendering: 'pixelated',
              backgroundRepeat: 'no-repeat'
            }}
          />
        ) : (
          <div className="text-center text-gray-400">
            <Sparkles className="mx-auto mb-2 opacity-30 animate-pulse" size={40} />
            <p className="text-xs font-bold uppercase tracking-wider">
              {t('custom.preview.no_sprite')}
            </p>
          </div>
        )}
        
        {/* Floating Preview Overlay */}
        {petData.name && (
          <div className="absolute top-4 left-4 bg-white/95 dark:bg-gray-900/95 shadow-sm px-3 py-1 rounded-full text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
            {petData.name}
          </div>
        )}
      </div>

      {/* Controls */}
      {petData.spriteBlob && (
        <div className="w-full space-y-4">
          <div className="flex gap-3">
            {/* Play/Pause Button */}
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="btn-dark !p-3 rounded-xl bg-gray-900 text-white flex items-center justify-center shrink-0"
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>
            
            {/* Select Action Dropdown */}
            <select
              value={previewAction}
              onChange={(e) => setPreviewAction(Number(e.target.value))}
              className="flex-1 bg-gray-50 dark:bg-gray-800 border-none rounded-xl p-3 font-bold text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
            >
              {actionsList.map((act) => (
                <option key={act.value} value={act.value}>
                  {act.name}
                </option>
              ))}
            </select>
          </div>

          {/* Frame Count Slider */}
          <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl w-full">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-gray-500 flex items-center gap-1.5">
                <Sliders size={14} />
                {t('custom.preview.frames_per_row')}
              </span>
              <span className="text-xs font-black text-indigo-500">{frameCount}</span>
            </div>
            <input 
              type="range"
              min="1"
              max="12"
              value={frameCount}
              onChange={(e) => {
                setFrameCount(Number(e.target.value));
                setCurrentFrame(0);
              }}
              className="w-full accent-indigo-600 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  );
};
