"use client";

import React from 'react';
import { Globe, ChevronDown, Menu, X, Download } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useCurrentAccount, useDisconnectWallet, useSuiClientQuery } from '@mysten/dapp-kit';
import { Sun, Moon, User, LayoutDashboard, LogOut, Sparkles } from 'lucide-react';
import { PACKAGE_ID, MODULES } from '../../services/blockchain/sui';
import { WalletConnectModal } from '../web3/WalletConnectModal';

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const Container = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

export const Navbar = ({ isDark, toggleTheme }: NavbarProps) => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const account = useCurrentAccount();
  const { mutate: disconnect } = useDisconnectWallet();
  
  const [langOpen, setLangOpen] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = React.useState(false);
  const [connectModalOpen, setConnectModalOpen] = React.useState(false);
  
  const langRef = React.useRef<HTMLDivElement>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const userRef = React.useRef<HTMLDivElement>(null);

  // Check if user is Admin by querying for AdminCap
  const { data: adminCaps } = useSuiClientQuery('getOwnedObjects', {
    owner: account?.address || '',
    filter: { StructType: `${PACKAGE_ID}::${MODULES.PET_NFT}::AdminCap` }
  }, { enabled: !!account });

  const isAdmin = adminCaps?.data && adminCaps.data.length > 0;

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLangOpen(false);
  };

  const languages = [
    { code: 'en', label: 'English', short: 'EN' },
    { code: 'vi', label: 'Tiếng Việt', short: 'VI' },
    { code: 'zh', label: '中文', short: 'ZH' },
    { code: 'it', label: 'Italiano', short: 'IT' },
    { code: 'fr', label: 'Français', short: 'FR' },
    { code: 'ko', label: '한국어', short: 'KO' }
  ];

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  if (pathname === '/sync-login') return null;

  return (
    <header className="fixed top-3 left-0 right-0 z-50 pointer-events-none" ref={menuRef}>
      <Container>
        <div className="flex items-center w-full bg-[var(--nav-bg)] backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-sm rounded-2xl px-3 sm:px-5 py-2 pointer-events-auto transition-colors duration-300">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 mr-auto cursor-pointer no-underline group"
          >
            <div className="w-7 h-7 rounded-lg bg-[#111827] dark:bg-white flex items-center justify-center transition-transform group-hover:scale-105 border border-white/10 shadow-sm">
              <img src="/icons/icon.png" alt="Logo" className="w-full h-full object-cover pixel-art" />
            </div>
            <span className="text-[13px] font-extrabold text-[#111827] dark:text-white tracking-tight">MiniPet</span>
          </Link>

          {/* Desktop Nav links */}
          <nav className="hidden lg:flex items-center gap-7 mx-6">
            <Link
              href="/pet-features"
              className={`text-[13px] font-bold transition-colors no-underline ${
                pathname === '/pet-features'
                  ? 'text-indigo-600 dark:text-indigo-400 font-extrabold'
                  : 'text-gray-600 dark:text-gray-300 hover:text-[#111827] dark:hover:text-white'
              }`}
            >
              {t('nav.features')}
            </Link>
            <Link
              href="/market"
              className={`text-[13px] font-bold transition-colors no-underline ${
                pathname === '/market'
                  ? 'text-indigo-600 dark:text-indigo-400 font-extrabold'
                  : 'text-gray-600 dark:text-gray-300 hover:text-[#111827] dark:hover:text-white'
              }`}
            >
              {t('nav.market')}
            </Link>
            <Link
              href="/sync-login"
              className={`text-[13px] font-bold transition-colors no-underline ${
                pathname === '/sync-login'
                  ? 'text-indigo-600 dark:text-indigo-400 font-extrabold'
                  : 'text-gray-600 dark:text-gray-300 hover:text-[#111827] dark:hover:text-white'
              }`}
            >
              {t('nav.sync')}
            </Link>
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-3">
            {!account ? (
              <button
                onClick={() => {
                  console.log('Connect button clicked, opening modal...');
                  setConnectModalOpen(true);
                }}
                className="pointer-events-auto bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black px-4 py-1.5 cursor-pointer border-none transition-all duration-200 active:scale-[0.97] shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/20"
              >
                {t('nav.connect') || 'Connect'}
              </button>
            ) : (
              <div className="relative" ref={userRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-xl transition-all shadow-md cursor-pointer"
                >
                  <User size={14} />
                  <span className="text-[11px] font-black hidden sm:inline">
                    {account.address.slice(0, 4)}...{account.address.slice(-4)}
                  </span>
                  <ChevronDown size={10} className={`transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {userDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-2xl p-2 z-[60]">
                    {isAdmin ? (
                      <>
                        <button 
                          onClick={() => { router.push('/admin'); setUserDropdownOpen(false); }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[12px] font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all border-none cursor-pointer"
                        >
                          <LayoutDashboard size={14} /> {t('nav.admin')}
                        </button>
                      </>
                    ) : (
                      <>
                        <button 
                          onClick={() => { /* Profile logic */ setUserDropdownOpen(false); }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[12px] font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all border-none cursor-pointer"
                        >
                          <User size={14} /> {t('nav.profile')}
                        </button>
                        <button 
                          onClick={() => { router.push('/custom-pet'); setUserDropdownOpen(false); }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[12px] font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all border-none cursor-pointer"
                        >
                          <Sparkles size={14} /> {t('nav.mint_custom')}
                        </button>
                      </>
                    )}
                    <div className="h-px bg-gray-100 dark:bg-gray-800 my-1 mx-2" />
                    <button 
                      onClick={() => { 
                        disconnect(); 
                        setUserDropdownOpen(false);
                        router.push('/'); 
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[12px] font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all border-none cursor-pointer"
                    >
                      <LogOut size={14} /> {t('nav.logout')}
                    </button>
                  </div>
                )}
              </div>
            )}
            {/* Language Switcher Dropdown */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                aria-label="Change language"
                className="flex items-center gap-1.5 bg-gray-100/50 dark:bg-gray-800/50 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 px-2 sm:px-3 py-1.5 rounded-xl border border-gray-200/50 dark:border-gray-700/50 transition-all cursor-pointer group"
              >
                <Globe size={13} className="text-gray-500 group-hover:text-indigo-500 transition-colors" />
                <span className="text-[10px] sm:text-[11px] font-black text-gray-700 dark:text-gray-300">{currentLang.short}</span>
                <ChevronDown size={10} className={`text-gray-500 transition-transform duration-300 ${langOpen ? 'rotate-180' : ''}`} />
              </button>

              {langOpen && (
                <div className="absolute top-full right-0 mt-2 w-40 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-2xl p-2 z-[60]">
                  {languages.map((lng) => (
                    <a
                      key={lng.code}
                      href={`?lang=${lng.code}`}
                      onClick={(e) => { e.preventDefault(); changeLanguage(lng.code); }}
                      aria-label={`Switch to ${lng.label}`}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-[12px] font-bold transition-colors no-underline ${i18n.language === lng.code
                        ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-[#111827] dark:hover:text-white'
                        }`}
                    >
                      <span>{lng.label}</span>
                      {i18n.language === lng.code && <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors border-none cursor-pointer"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle mobile menu"
              className="lg:hidden w-8 h-8 rounded-xl flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-none cursor-pointer"
            >
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>

            <a
              href="#download"
              onClick={(e) => {
                e.preventDefault();
                if (pathname !== '/') {
                  router.push('/');
                  setTimeout(() => {
                    const el = document.getElementById('download');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                } else {
                  const el = document.getElementById('download');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              aria-label="Download MiniPet"
              className="btn-dark !rounded-xl !py-1.5 !px-3 sm:!px-4 !text-[11px] sm:!text-[13px] pointer-events-auto flex items-center gap-1.5 no-underline"
            >
              <Download size={14} className="sm:hidden" />
              <span className="hidden xs:inline">{t('nav.download')}</span>
              <span className="xs:hidden">Get</span>
            </a>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {menuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl shadow-2xl p-4 pointer-events-auto mx-4 z-[60]">
            <div className="flex flex-col gap-2">
              <Link
                href="/pet-features"
                onClick={() => setMenuOpen(false)}
                className={`w-full text-left px-5 py-4 rounded-2xl text-[14px] font-bold transition-all no-underline block ${
                  pathname === '/pet-features'
                    ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-[#111827] dark:hover:text-white'
                }`}
              >
                {t('nav.features')}
              </Link>
              <Link
                href="/market"
                onClick={() => setMenuOpen(false)}
                className={`w-full text-left px-5 py-4 rounded-2xl text-[14px] font-bold transition-all no-underline block ${
                  pathname === '/market'
                    ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-[#111827] dark:hover:text-white'
                }`}
              >
                {t('nav.market')}
              </Link>
              <Link
                href="/sync-login"
                onClick={() => setMenuOpen(false)}
                className={`w-full text-left px-5 py-4 rounded-2xl text-[14px] font-bold transition-all no-underline block ${
                  pathname === '/sync-login'
                    ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-[#111827] dark:hover:text-white'
                }`}
              >
                {t('nav.sync')}
              </Link>
              <div className="h-px bg-gray-100 dark:bg-gray-800 my-2 mx-5" />
              <a
                href="https://github.com/helloquocbao/mini-pet"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our GitHub repository"
                className="w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-[14px] font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-[#111827] dark:hover:text-white transition-all no-underline"
              >
                <FaGithub size={18} />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        )}
      </Container>
      <WalletConnectModal isOpen={connectModalOpen} onClose={() => setConnectModalOpen(false)} />
    </header>
  );
};
