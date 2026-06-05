"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { ArrowLeft, BookOpen, FolderOpen, Image, RefreshCw, FileCode, CheckCircle2, ChevronRight } from 'lucide-react';

const Container = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

export default function DocsPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith('vi') ? 'vi' : 'en';

  const rows = [
    { num: 1, action: t('docs.table.idle.title', { defaultValue: 'Idle' }), desc: t('docs.table.idle.desc') },
    { num: 2, action: t('docs.table.walkRun.title', { defaultValue: 'Walk & Run' }), desc: t('docs.table.walkRun.desc') },
    { num: 3, action: t('docs.table.angry.title', { defaultValue: 'Angry' }), desc: t('docs.table.angry.desc') },
    { num: 4, action: t('docs.table.notify.title', { defaultValue: 'Notify / Greet' }), desc: t('docs.table.notify.desc') },
    { num: 5, action: t('docs.table.fall.title', { defaultValue: 'Fall' }), desc: t('docs.table.fall.desc') },
    { num: 6, action: t('docs.table.stun.title', { defaultValue: 'Stun' }), desc: t('docs.table.stun.desc') },
    { num: 7, action: t('docs.table.happyEat.title', { defaultValue: 'Happy / Eat / Save' }), desc: t('docs.table.happyEat.desc') },
    { num: 8, action: t('docs.table.think.title', { defaultValue: 'Think / Pomodoro' }), desc: t('docs.table.think.desc') },
    { num: 9, action: t('docs.table.bonk.title', { defaultValue: 'Bonk' }), desc: t('docs.table.bonk.desc') },
  ];

  const petJsonExample = `{
  "id": "my-custom-pet",
  "name": "Black Wukong",
  "version": "1.0.0",
  "author": "MiniPet Creator",
  "facingRight": true
}`;

  return (
    <div className="pt-24 pb-20 min-h-screen bg-transparent relative overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-indigo-200/10 dark:bg-indigo-900/5 rounded-full blur-[120px] pointer-events-none -z-10 animate-glow-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-pink-200/10 dark:bg-pink-900/5 rounded-full blur-[120px] pointer-events-none -z-10 animate-glow-pulse" style={{ animationDuration: '12s' }} />
      
      {/* Grid Canvas Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(99,102,241,0.04)_1.5px,transparent_1.5px)] dark:bg-[radial-gradient(rgba(244,63,94,0.02)_1.5px,transparent_1.5px)] [background-size:32px_32px] pointer-events-none -z-10" />

      <Container className="max-w-5xl relative">
        {/* Back Link */}
        <div className="mb-8">
          <Link 
            href="/custom-pet"
            className="inline-flex items-center gap-2 text-xs font-bold text-gray-550 hover:text-indigo-500 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors group cursor-pointer"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            {t('docs.back')}
          </Link>
        </div>

        {/* Page Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 border border-indigo-500/20 text-[10px] font-extrabold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">
            <BookOpen size={11} className="animate-pulse" /> {lang === 'vi' ? 'Tài liệu hướng dẫn' : 'Documentation Guidelines'}
          </div>
          <h1 className="text-[34px] sm:text-[44px] font-[950] text-[#111827] dark:text-white tracking-tight mt-4 mb-4 leading-tight">
            {t('docs.title')}
          </h1>
          <p className="text-gray-550 dark:text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {t('docs.desc')}
          </p>
        </div>

        {/* Sections Stack */}
        <div className="space-y-12">
          
          {/* Section 1: Folder Structure */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl backdrop-blur-xl border border-slate-200/50 dark:border-white/5 shadow-sm">
            <h2 className="text-[18px] font-black text-gray-900 dark:text-white mb-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                <FolderOpen size={16} />
              </div>
              {t('docs.section1')}
            </h2>
            <p className="text-xs sm:text-sm text-gray-550 dark:text-zinc-400 mb-6 leading-relaxed font-medium">
              {t('docs.section1_desc')}
            </p>
            
            {/* Visual File Structure */}
            <div className="bg-slate-900/5 dark:bg-slate-950/60 rounded-2xl p-5 border border-slate-200/20 dark:border-white/5 font-mono text-[12px] text-gray-800 dark:text-gray-250 leading-relaxed shadow-inner">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold mb-2">
                📂 custom-pet-name/
              </div>
              <div className="pl-6 border-l border-slate-300 dark:border-slate-800 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">├──</span> 📄 <span className="font-bold text-gray-900 dark:text-white">pet.json</span>
                  <span className="text-gray-450 dark:text-gray-500 text-[10px]">({lang === 'vi' ? 'file chứa thông tin cấu hình' : 'configuration manifest file'})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">└──</span> 🖼️ <span className="font-bold text-gray-900 dark:text-white">spritesheet.webp</span>
                  <span className="text-gray-450 dark:text-gray-500 text-[10px]">({lang === 'vi' ? 'file ảnh chứa hoạt ảnh' : 'animation frames image file'})</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Spritesheet Rows */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl backdrop-blur-xl border border-slate-200/50 dark:border-white/5 shadow-sm">
            <h2 className="text-[18px] font-black text-gray-900 dark:text-white mb-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center">
                <Image size={16} />
              </div>
              {t('docs.section2')}
            </h2>
            <p className="text-xs sm:text-sm text-gray-550 dark:text-zinc-400 mb-6 leading-relaxed font-medium">
              {t('docs.section2_desc')} <span className="text-indigo-500 font-mono text-xs block mt-1">{t('docs.scroll_note')}</span>
            </p>

            {/* Responsive Table */}
            <div className="overflow-x-auto border border-slate-200/60 dark:border-white/5 rounded-2xl">
              <table className="min-w-full divide-y divide-slate-200/60 dark:divide-white/5 font-medium">
                <thead className="bg-slate-50 dark:bg-slate-900/50">
                  <tr>
                    <th scope="col" className="px-5 py-4 text-left text-[11px] font-mono font-bold text-gray-400 uppercase tracking-widest">{t('docs.table.row')}</th>
                    <th scope="col" className="px-5 py-4 text-left text-[11px] font-mono font-bold text-gray-400 uppercase tracking-widest">{t('docs.table.action')}</th>
                    <th scope="col" className="px-5 py-4 text-left text-[11px] font-mono font-bold text-gray-400 uppercase tracking-widest">{t('docs.table.desc')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/60 dark:divide-white/5 text-[12px] text-gray-700 dark:text-zinc-300 bg-white/40 dark:bg-transparent">
                  {rows.map((row) => (
                    <tr key={row.num} className="hover:bg-slate-500/5 transition-colors">
                      <td className="px-5 py-3.5 font-bold font-mono text-indigo-600 dark:text-indigo-400">Row {row.num}</td>
                      <td className="px-5 py-3.5 font-bold text-gray-900 dark:text-white">{row.action}</td>
                      <td className="px-5 py-3.5 text-gray-500 dark:text-zinc-400 leading-relaxed">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3: Default Direction */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl backdrop-blur-xl border border-slate-200/50 dark:border-white/5 shadow-sm">
            <h2 className="text-[18px] font-black text-gray-900 dark:text-white mb-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
                <RefreshCw size={16} />
              </div>
              {t('docs.section3')}
            </h2>
            <p className="text-xs sm:text-sm text-gray-550 dark:text-zinc-400 mb-4 leading-relaxed font-medium">
              {t('docs.section3_desc')}
            </p>
            <div className="p-4 bg-indigo-50/50 dark:bg-indigo-950/15 border border-indigo-100/35 dark:border-indigo-900/20 rounded-2xl">
              <p className="text-[11.5px] leading-relaxed text-indigo-650 dark:text-indigo-400 font-bold m-0 flex items-start gap-2.5">
                <CheckCircle2 size={15} className="mt-0.5 shrink-0" />
                <span>{t('docs.section3_note')}</span>
              </p>
            </div>
          </div>

          {/* Section 4: pet.json Config & Example */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl backdrop-blur-xl border border-slate-200/50 dark:border-white/5 shadow-sm">
            <h2 className="text-[18px] font-black text-gray-900 dark:text-white mb-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <FileCode size={16} />
              </div>
              {t('docs.json_config')}
            </h2>
            <p className="text-xs sm:text-sm text-gray-550 dark:text-zinc-400 mb-6 leading-relaxed font-medium">
              {lang === 'vi' 
                ? 'File pet.json dùng để định danh cho pet, khai báo tên tác giả và hướng quay mặt mặc định của sprite.'
                : 'The pet.json file acts as the pet manifest, identifying metadata, author, and default facing direction.'}
            </p>

            <div className="bg-[#12131a] rounded-2xl border border-white/5 shadow-2xl overflow-hidden group relative">
              {/* Header */}
              <div className="bg-slate-900 px-5 py-3 flex items-center justify-between border-b border-white/5">
                <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                </div>
                <span className="text-[10px] font-mono font-bold text-gray-500 tracking-wider">pet.json</span>
              </div>
              {/* Code */}
              <pre className="p-5 font-mono text-[12px] text-emerald-400 overflow-x-auto leading-relaxed select-all">
                <code>{petJsonExample}</code>
              </pre>
            </div>
          </div>

        </div>
      </Container>
    </div>
  );
}
