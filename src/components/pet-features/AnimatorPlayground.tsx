"use client";

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Play, Pause } from 'lucide-react';

const actionFrames: Record<number, number> = {
  0: 6, // Idle
  1: 8, // Walk Right
  2: 8, // Walk Left
  3: 4, // Greet
  4: 5, // Special
  5: 8, // Sad
  6: 6, // Sleep
  7: 6, // Run
  8: 6  // Review
};

export const AnimatorPlayground = () => {
  const { t } = useTranslation();
  const [activeAction, setActiveAction] = useState<number>(0);
  const [currentFrame, setCurrentFrame] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Animation Loop
  useEffect(() => {
    if (!isPlaying) return;
    const maxFrames = actionFrames[activeAction] || 4;
    const interval = setInterval(() => {
      setCurrentFrame(f => (f + 1) % maxFrames);
    }, 150);
    return () => clearInterval(interval);
  }, [isPlaying, activeAction]);

  // Reset frame when action changes
  useEffect(() => {
    setCurrentFrame(0);
  }, [activeAction]);

  const actionsList = [
    { id: 0, label: t('pet_features.commands.actions.idle'), icon: '😴' },
    { id: 1, label: t('pet_features.commands.actions.walk'), icon: '🐾' },
    { id: 3, label: t('pet_features.commands.actions.greet'), icon: '👋' },
    { id: 4, label: t('pet_features.commands.actions.eat'), icon: '🍕' },
    { id: 5, label: t('pet_features.commands.actions.sad'), icon: '😢' },
    { id: 6, label: t('pet_features.commands.actions.sleep'), icon: '🌙' },
    { id: 7, label: t('pet_features.commands.actions.run'), icon: '⚡' },
    { id: 8, label: t('pet_features.commands.actions.pickup'), icon: '🛸' }
  ];

  const getActionDescription = (id: number) => {
    switch (id) {
      case 0: return t('pet_features.commands.action_descs.idle');
      case 1: return t('pet_features.commands.action_descs.walk');
      case 3: return t('pet_features.commands.action_descs.greet');
      case 4: return t('pet_features.commands.action_descs.eat');
      case 5: return t('pet_features.commands.action_descs.sad');
      case 6: return t('pet_features.commands.action_descs.sleep');
      case 7: return t('pet_features.commands.action_descs.run');
      case 8: return t('pet_features.commands.action_descs.pickup');
      default: return '';
    }
  };

  // Spritesheet details
  // background-size: 800% 900% (8 columns, 9 rows)
  // X coordinate ranges from 0 to 7. posY ranges from 0 to 8.
  const posX = currentFrame * (100 / 7);
  const posY = activeAction * 12.5; // activeAction goes from 0 to 8. 100 / 8 = 12.5

  return (
    <div className="lg:col-span-7 bg-white dark:bg-gray-900 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl border border-gray-100 dark:border-gray-800 flex flex-col">
      <div className="mb-6">
        <span className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2 inline-block">
          {t('pet_features.commands.preview_box')}
        </span>
        <h2 className="text-2xl font-black text-gray-900 dark:text-white">
          {t('pet_features.commands.title')}
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {t('pet_features.commands.desc')}
        </p>
      </div>

      {/* Animation Frame */}
      <div className="flex-1 bg-gray-50 dark:bg-gray-950 rounded-3xl border border-gray-100 dark:border-gray-800/80 flex flex-col items-center justify-center relative overflow-hidden p-8 min-h-[260px] mb-6 group">
        <div 
          className="w-32 h-32 select-none pointer-events-none pixel-art transform transition-transform group-hover:scale-110 duration-300"
          style={{
            backgroundImage: "url('/cat/spritesheet.png')",
            backgroundSize: "800% 900%",
            backgroundPosition: `${posX}% ${posY}%`,
            backgroundRepeat: 'no-repeat',
            mixBlendMode: 'multiply'
          }}
        />
        
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 shadow-md hover:shadow-lg flex items-center justify-center border border-gray-100 dark:border-gray-700 transition-all active:scale-95 cursor-pointer"
            aria-label={isPlaying ? "Pause animation" : "Play animation"}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          </button>
        </div>

        {/* Status Banner */}
        <div className="absolute bottom-4 left-4 right-4 bg-white/80 dark:bg-gray-900/85 backdrop-blur-sm px-4 py-2.5 rounded-2xl border border-gray-100 dark:border-gray-800 text-center">
          <p className="text-[12px] font-bold text-gray-700 dark:text-gray-300 leading-snug">
            {getActionDescription(activeAction)}
          </p>
        </div>
      </div>

      {/* Button Actions Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {actionsList.map((action) => (
          <button
            key={action.id}
            onClick={() => {
              setActiveAction(action.id);
              setIsPlaying(true);
            }}
            className={`py-3 px-4 rounded-2xl text-[12px] font-extrabold transition-all border flex flex-col items-center gap-1 cursor-pointer active:scale-98 ${
              activeAction === action.id
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-600/20'
                : 'bg-gray-50/50 dark:bg-gray-800/30 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 text-gray-700 dark:text-gray-300 border-gray-100 dark:border-gray-800'
            }`}
          >
            <span className="text-base">{action.icon}</span>
            <span>{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
