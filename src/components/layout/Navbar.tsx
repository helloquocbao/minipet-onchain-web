"use client";

import React from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useCurrentAccount, useDisconnectWallet, useSuiClientQuery } from '@mysten/dapp-kit';
import { User, LayoutDashboard, LogOut, Sparkles } from 'lucide-react';
import { PACKAGE_ID, MODULES } from '../../services/blockchain/sui';
import { WalletConnectModal } from '../web3/WalletConnectModal';



const Container = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

export const Navbar = () => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const account = useCurrentAccount();
  const { mutate: disconnect } = useDisconnectWallet();
  
  const [langOpen, setLangOpen] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = React.useState(false);
  const [connectModalOpen, setConnectModalOpen] = React.useState(false);
  const [zkLoginAddress, setZkLoginAddress] = React.useState<string | null>(null);
  
  const langRef = React.useRef<HTMLDivElement>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const userRef = React.useRef<HTMLDivElement>(null);

  const activeAddress = account?.address || zkLoginAddress;

  // Check if user is Admin by querying for AdminCap
  const { data: adminCaps } = useSuiClientQuery('getOwnedObjects', {
    owner: activeAddress || '',
    filter: { StructType: `${PACKAGE_ID}::${MODULES.PET_NFT}::AdminCap` }
  }, { enabled: !!activeAddress });

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
    setZkLoginAddress(sessionStorage.getItem('zklogin_address'));
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
    setLangOpen(false);
    
    // Update URL query parameter without full reload
    const params = new URLSearchParams(window.location.search);
    params.set('lang', lng);
    router.push(`${pathname}?${params.toString()}`);
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
        <div className="flex items-center w-full bg-white/90 backdrop-blur-xl border border-slate-200 shadow-sm rounded-2xl px-4 sm:px-6 py-3 pointer-events-auto transition-colors duration-300">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 mr-auto cursor-pointer no-underline group"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center transition-transform group-hover:scale-105 shadow-md shadow-indigo-500/20">
              <img src="/icons/icon.png" alt="Logo" className="w-full h-full object-cover pixel-art rounded-lg" />
            </div>
            <span className="hidden sm:inline text-[15px] font-black text-slate-900 tracking-tight">MiniPet</span>
          </Link>

          {/* Desktop Nav links */}
          <nav className="hidden lg:flex items-center gap-8 mx-6">
            <Link
              href="/pet-features"
              className={`text-[14px] font-bold transition-colors no-underline ${
                pathname === '/pet-features'
                  ? 'text-indigo-600 font-extrabold'
                  : 'text-slate-600 hover:text-indigo-600'
              }`}
            >
              {t('nav.features')}
            </Link>
            <Link
              href="/market"
              className={`text-[14px] font-bold transition-colors no-underline ${
                pathname === '/market'
                  ? 'text-indigo-600 font-extrabold'
                  : 'text-slate-600 hover:text-indigo-600'
              }`}
            >
              {t('nav.market')}
            </Link>
            <Link
              href="/roadmap"
              className={`text-[14px] font-bold transition-colors no-underline ${
                pathname === '/roadmap'
                  ? 'text-indigo-600 font-extrabold'
                  : 'text-slate-600 hover:text-indigo-600'
              }`}
            >
              {t('nav.roadmap')}
            </Link>
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-4">
            {!activeAddress ? (
              <button
                onClick={() => {
                  setConnectModalOpen(true);
                }}
                className="pointer-events-auto bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-[12px] sm:text-[13px] font-bold px-3 py-1.5 sm:px-5 sm:py-2 cursor-pointer border-none transition-all duration-300 active:scale-[0.98] shadow-md shadow-indigo-600/20 whitespace-nowrap"
              >
                {t('nav.connect') || 'Connect Wallet'}
              </button>
            ) : (
              <div className="relative" ref={userRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full transition-all shadow-md cursor-pointer border-none"
                >
                  <User size={14} />
                  <span className="text-[13px] font-bold hidden sm:inline">
                    {activeAddress.slice(0, 4)}...{activeAddress.slice(-4)}
                  </span>
                  <ChevronDown size={12} className={`transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {userDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-slate-100 rounded-2xl shadow-xl p-2 z-[60]">
                    {isAdmin ? (
                      <>
                        <button 
                          onClick={() => { router.push('/admin'); setUserDropdownOpen(false); }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-bold text-indigo-600 hover:bg-indigo-50 transition-all border-none cursor-pointer"
                        >
                          <LayoutDashboard size={14} /> {t('nav.admin')}
                        </button>
                      </>
                    ) : (
                      <>
                        <button 
                          onClick={() => { router.push('/profile'); setUserDropdownOpen(false); }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-bold text-slate-700 hover:bg-slate-50 transition-all border-none cursor-pointer"
                        >
                          <User size={14} /> {t('nav.profile')}
                        </button>
                        <button 
                          onClick={() => { router.push('/custom-pet'); setUserDropdownOpen(false); }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-bold text-slate-700 hover:bg-slate-50 transition-all border-none cursor-pointer"
                        >
                          <Sparkles size={14} /> {t('nav.mint_custom')}
                        </button>
                      </>
                    )}
                    <div className="h-px bg-slate-100 my-1 mx-2" />
                    <button 
                      onClick={() => { 
                        disconnect(); 
                        sessionStorage.removeItem('zklogin_address');
                        setZkLoginAddress(null);
                        setUserDropdownOpen(false);
                        router.push('/'); 
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-bold text-rose-500 hover:bg-rose-50 transition-all border-none cursor-pointer"
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
                className="flex items-center gap-1.5 bg-transparent hover:bg-slate-50 px-2 sm:px-3 py-2 rounded-xl transition-all cursor-pointer group border-none"
              >
                <span className="text-[13px] font-bold text-slate-700 group-hover:text-indigo-600">{currentLang.short}</span>
                <ChevronDown size={12} className={`text-slate-400 transition-transform duration-300 ${langOpen ? 'rotate-180' : ''}`} />
              </button>

              {langOpen && (
                <div className="absolute top-full right-0 mt-2 w-40 bg-white border border-slate-100 rounded-2xl shadow-xl p-2 z-[60]">
                  {languages.map((lng) => (
                    <a
                      key={lng.code}
                      href={`?lang=${lng.code}`}
                      onClick={(e) => { e.preventDefault(); changeLanguage(lng.code); }}
                      aria-label={`Switch to ${lng.label}`}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[13px] font-bold transition-colors no-underline ${i18n.language === lng.code
                        ? 'bg-indigo-50 text-indigo-600'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                    >
                      <span>{lng.label}</span>
                      {i18n.language === lng.code && <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Github Link */}
            <a
              href="https://github.com/helloquocbao/mini-pet"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View MiniPet source code on GitHub"
              className="w-9 h-9 rounded-full bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center transition-all hover:scale-105 shadow-md hidden sm:flex"
            >
              <FaGithub size={16} />
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle mobile menu"
              className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center bg-slate-50 text-slate-700 border-none cursor-pointer hover:bg-slate-100"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {menuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-3xl shadow-2xl p-4 pointer-events-auto mx-4 z-[60]">
            <div className="flex flex-col gap-2">
              <Link
                href="/pet-features"
                onClick={() => setMenuOpen(false)}
                className={`w-full text-left px-5 py-4 rounded-2xl text-[14px] font-bold transition-all no-underline block ${
                  pathname === '/pet-features'
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {t('nav.features')}
              </Link>
              <Link
                href="/market"
                onClick={() => setMenuOpen(false)}
                className={`w-full text-left px-5 py-4 rounded-2xl text-[14px] font-bold transition-all no-underline block ${
                  pathname === '/market'
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {t('nav.market')}
              </Link>
              <Link
                href="/roadmap"
                onClick={() => setMenuOpen(false)}
                className={`w-full text-left px-5 py-4 rounded-2xl text-[14px] font-bold transition-all no-underline block ${
                  pathname === '/roadmap'
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {t('nav.roadmap')}
              </Link>
              <div className="h-px bg-slate-100 my-2 mx-5" />
              <a
                href="https://github.com/helloquocbao/mini-pet"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our GitHub repository"
                className="w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-[14px] font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all no-underline"
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
