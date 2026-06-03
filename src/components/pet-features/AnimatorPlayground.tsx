"use client";

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Play, Pause } from 'lucide-react';

const actionFrames: Record<number, number> = {
  0: 8, // Idle
  1: 8, // Run
  2: 8, // Drag
  3: 8, // Greet/Notify
  4: 8, // Sad/Fall
  5: 8, // Stun/Dizzy
  6: 8, // Save Money
  7: 8, // Sleep/Curious
  8: 8  // Bonk/Hammer action
};

export const AnimatorPlayground = () => {
  const { t } = useTranslation();
  const [activeAction, setActiveAction] = useState<number>(0);
  const [currentFrame, setCurrentFrame] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Animation Loop
  useEffect(() => {
    if (!isPlaying) return;
    const maxFrames = actionFrames[activeAction] || 8;
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
    { id: 0, label: 'Đứng yên', icon: '😴' },
    { id: 1, label: 'Chạy bộ', icon: '🐾' },
    { id: 2, label: 'Giận dữ', icon: '💢' },
    { id: 3, label: 'Chào', icon: '👋' },
    { id: 4, label: 'Buồn bã', icon: '😢' },
    { id: 5, label: 'Choáng váng', icon: '😵' },
    { id: 6, label: 'Cất tiền', icon: '💰' },
    { id: 7, label: 'Tò mò', icon: '🤔' },
    { id: 8, label: 'Gõ búa', icon: '🔨' }
  ];

  const getActionDescription = (id: number) => {
    switch (id) {
      case 0: return 'Pet đứng yên thở nhẹ nhàng';
      case 1: return 'Pet chạy tung tăng về bên phải';
      case 2: return 'Pet tức giận đập chân phẫn nộ';
      case 3: return 'Pet vẫy tay chào thân thiện';
      case 4: return 'Pet buồn bã ủ rũ cúi đầu';
      case 5: return 'Pet bị choáng váng nổi sao xoay quanh đầu';
      case 6: return 'Pet ôm túi tiền cất đi cẩn thận';
      case 7: return 'Pet suy nghĩ tò mò nghiêng đầu';
      case 8: return 'Pet cầm búa gõ liên tục';
      default: return '';
    }
  };

  // Spritesheet details
  // background-size: 800% 900% (8 columns, 9 rows)
  // X coordinate ranges from 0 to 7. posY ranges from 0 to 8.
  const posX = currentFrame * (100 / 7);
  const posY = activeAction * 12.5; // activeAction goes from 0 to 8. 100 / 8 = 12.5% per row

  return (
    <div className="lg:col-span-7 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/50 dark:border-slate-800/40 shadow-sm rounded-3xl p-6 sm:p-8 flex flex-col">
      <div className="mb-6">
        <span className="bg-indigo-50/50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-md mb-2 inline-block border border-indigo-100/30 dark:border-indigo-900/30">
          {t('pet_features.commands.preview_box')}
        </span>
        <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 dark:text-white">
          {t('pet_features.commands.title')}
        </h2>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 font-medium">
          {t('pet_features.commands.desc')}
        </p>
      </div>

      {/* Animation Frame */}
      <div className="flex-1 bg-indigo-50/30 dark:bg-indigo-950/20 rounded-2xl border border-indigo-100/30 dark:border-indigo-900/30 flex flex-col items-center justify-center relative overflow-hidden p-8 min-h-[260px] mb-6 group">
        {/* Retro Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:14px_14px] pointer-events-none" />
        
        {/* Tech labels HUD */}
        <div className="absolute top-3 left-3 text-[9px] text-gray-400/85 dark:text-gray-500/80 font-mono select-none">CMD.PREVIEW_STATE</div>
        <div className="absolute bottom-3 right-3 text-[9px] text-gray-400/85 dark:text-gray-500/80 font-mono select-none">FRAME_{currentFrame}</div>
        
        {/* Corner Crosshairs */}
        <div className="absolute top-3 right-3 w-1.5 h-1.5 border-t border-r border-indigo-200/50 dark:border-indigo-900/50" />
        <div className="absolute bottom-3 left-3 w-1.5 h-1.5 border-b border-l border-indigo-200/50 dark:border-indigo-900/50" />
        <div className="absolute top-3 left-3 w-1.5 h-1.5 border-t border-l border-indigo-200/50 dark:border-indigo-900/50" />
        <div className="absolute bottom-3 right-3 w-1.5 h-1.5 border-b border-r border-indigo-200/50 dark:border-indigo-900/50" />

        {/* Center scanlines */}
        <div className="absolute inset-x-0 h-[1px] bg-indigo-500/5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute inset-y-0 w-[1px] bg-indigo-500/5 left-1/2 -translate-x-1/2 pointer-events-none" />

        <div 
          className="w-28 h-28 select-none pointer-events-none pixel-art transform transition-transform group-hover:scale-105 duration-300"
          style={{
            backgroundImage: "url('/cat/spritesheet.webp')",
            backgroundSize: "800% 900%",
            backgroundPosition: `${posX}% ${posY}%`,
            backgroundRepeat: 'no-repeat',
            mixBlendMode: 'multiply'
          }}
        />
        
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-7 h-7 rounded-lg bg-white/80 dark:bg-slate-900/80 text-gray-500 dark:text-gray-400 shadow-sm hover:shadow flex items-center justify-center border border-gray-100 dark:border-slate-800 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            aria-label={isPlaying ? "Pause animation" : "Play animation"}
          >
            {isPlaying ? <Pause size={12} /> : <Play size={12} />}
          </button>
        </div>

        {/* Status Banner */}
        <div className="absolute bottom-3 left-3 right-3 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/50 dark:border-slate-800/40 text-center">
          <p className="text-[11px] font-extrabold text-gray-700 dark:text-gray-300 leading-snug">
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
            className={`py-2.5 px-3 rounded-xl text-[11px] font-bold transition-all border flex flex-col items-center gap-0.5 cursor-pointer active:scale-98 ${
              activeAction === action.id
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/10 hover:bg-indigo-700'
                : 'bg-white/40 dark:bg-slate-900/20 backdrop-blur border border-gray-200/50 dark:border-slate-800/50 hover:bg-white dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            <span className="text-sm">{action.icon}</span>
            <span>{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
