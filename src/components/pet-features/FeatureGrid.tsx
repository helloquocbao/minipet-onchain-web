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
    <div className="card p-8 flex flex-col group h-full">
      <div className={`w-12 h-12 rounded-2xl ${iconBgClass} ${iconColorClass} flex items-center justify-center mb-6 group-hover:scale-110 duration-300 shadow-sm`}>
        <Icon size={22} />
      </div>
      <h3 className="text-lg font-black text-gray-900 dark:text-white mb-3">
        {t(titleKey)}
      </h3>
      <p className="text-[13.5px] text-gray-500 dark:text-gray-400 leading-relaxed">
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
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
