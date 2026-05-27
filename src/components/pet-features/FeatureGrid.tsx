"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  MessageSquare, 
  Timer, 
  Trash2, 
  Users, 
  Wand2, 
  Activity,
  LucideIcon
} from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  iconColorClass: string;
  iconBgClass: string;
  titleKey: string;
  descKey: string;
}

const FeatureCard = ({ icon: Icon, iconColorClass, iconBgClass, titleKey, descKey }: FeatureCardProps) => {
  const { t } = useTranslation();
  return (
    <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-white/60 dark:border-slate-800/40 hover:border-indigo-200/60 dark:hover:border-indigo-900/60 shadow-sm hover:shadow-md hover:shadow-indigo-500/[0.02] hover:-translate-y-1 rounded-2xl p-6 flex flex-col group transition-all duration-300 h-full">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-5 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-indigo-500/10 ${iconBgClass} ${iconColorClass}`}>
        <Icon size={18} className="transition-colors animate-none" />
      </div>
      <h3 className="text-sm sm:text-base font-extrabold text-gray-900 dark:text-white mb-2 leading-snug">
        {t(titleKey)}
      </h3>
      <p className="text-[12px] text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
        {t(descKey)}
      </p>
    </div>
  );
};

export const FeatureGrid = () => {
  const features = [
    {
      icon: MessageSquare,
      iconColorClass: 'text-indigo-600 dark:text-indigo-400',
      iconBgClass: 'bg-indigo-50 dark:bg-indigo-900/20',
      titleKey: 'pet_features.sections.ai_chat.title',
      descKey: 'pet_features.sections.ai_chat.desc',
    },
    {
      icon: Timer,
      iconColorClass: 'text-rose-500',
      iconBgClass: 'bg-rose-50 dark:bg-rose-900/20',
      titleKey: 'pet_features.sections.pomodoro.title',
      descKey: 'pet_features.sections.pomodoro.desc',
    },
    {
      icon: Trash2,
      iconColorClass: 'text-amber-500',
      iconBgClass: 'bg-amber-50 dark:bg-amber-900/20',
      titleKey: 'pet_features.sections.file_eater.title',
      descKey: 'pet_features.sections.file_eater.desc',
    },
    {
      icon: Users,
      iconColorClass: 'text-emerald-500',
      iconBgClass: 'bg-emerald-50 dark:bg-emerald-900/20',
      titleKey: 'pet_features.sections.multi_pet.title',
      descKey: 'pet_features.sections.multi_pet.desc',
    },
    {
      icon: Wand2,
      iconColorClass: 'text-purple-500',
      iconBgClass: 'bg-purple-50 dark:bg-purple-900/20',
      titleKey: 'pet_features.sections.custom_creator.title',
      descKey: 'pet_features.sections.custom_creator.desc',
    },
    {
      icon: Activity,
      iconColorClass: 'text-sky-500',
      iconBgClass: 'bg-sky-50 dark:bg-sky-900/20',
      titleKey: 'pet_features.sections.interactivity.title',
      descKey: 'pet_features.sections.interactivity.desc',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
      {features.map((feature, idx) => (
        <FeatureCard
          key={idx}
          icon={feature.icon}
          iconColorClass={feature.iconColorClass}
          iconBgClass={feature.iconBgClass}
          titleKey={feature.titleKey}
          descKey={feature.descKey}
        />
      ))}
    </div>
  );
};
