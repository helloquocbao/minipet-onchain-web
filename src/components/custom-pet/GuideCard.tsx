import React from 'react';
import { HelpCircle, Info } from 'lucide-react';

interface GuideCardProps {
  t: (key: string, options?: any) => string;
  navigate: (path: string | number) => void;
}

export const GuideCard: React.FC<GuideCardProps> = ({ t, navigate }) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-2xl border border-gray-100 dark:border-gray-800 space-y-4">
      <h2 className="text-lg font-black flex items-center gap-2 text-gray-900 dark:text-white">
        <HelpCircle className="text-indigo-500" size={20} />
        {t('custom.preview.guidelines_title')}
      </h2>
      <ul className="space-y-3 text-xs text-gray-500 dark:text-gray-400 font-medium">
        <li className="flex gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1 shrink-0" />
          <span>
            {t('custom.preview.guide_1')}
          </span>
        </li>
        <li className="flex gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1 shrink-0" />
          <span>
            {t('custom.preview.guide_2')}
          </span>
        </li>
        <li className="flex gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1 shrink-0" />
          <span>
            {t('custom.preview.guide_3')}
          </span>
        </li>
      </ul>
      
      <div className="pt-2">
        <button
          onClick={() => navigate('/docs')}
          className="w-full py-3 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-indigo-600 dark:text-indigo-400 font-bold rounded-2xl text-xs flex items-center justify-center gap-1.5 transition-colors"
        >
          <Info size={14} />
          {t('custom.preview.view_docs')}
        </button>
      </div>
    </div>
  );
};
