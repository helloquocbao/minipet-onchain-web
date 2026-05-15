import React from 'react';
import { Globe, ChevronDown, Menu, X, Download } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ConnectButton } from '@mysten/dapp-kit';
import { Sun, Moon } from 'lucide-react';

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const Container = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

export const Navbar = ({ isDark, toggleTheme }: NavbarProps) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [langOpen, setLangOpen] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const langRef = React.useRef<HTMLDivElement>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (l: string) => {
    setMenuOpen(false);
    if (l === 'Custom Pets') {
      navigate('/custom-pet');
    } else {
      const id = l === 'Features' ? 'features' : l.toLowerCase();
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLangOpen(false);
  };

  const languages = [
    { code: 'en', label: 'English', short: 'EN' },
    { code: 'vi', label: 'Tiếng Việt', short: 'VI' },
    { code: 'zh', label: '中文', short: 'ZH' },
    { code: 'it', label: 'Italiano', short: 'IT' },
    { code: 'fr', label: 'Français', short: 'FR' }
  ];

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  return (
    <header className="fixed top-3 left-0 right-0 z-50 pointer-events-none" ref={menuRef}>
      <Container>
        <div className="flex items-center w-full bg-[var(--nav-bg)] backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-sm rounded-2xl px-3 sm:px-5 py-2 pointer-events-auto transition-colors duration-300">
          {/* Logo */}
          <Link
            to="/"
            aria-label="Back to home"
            title="MiniPet Home"
            className="flex items-center gap-2 mr-auto cursor-pointer bg-transparent border-none p-0 group no-underline"
          >
            <div className="w-7 h-7 rounded-lg bg-[#111827] dark:bg-white flex items-center justify-center transition-transform group-hover:scale-105 overflow-hidden border border-white/10 shadow-sm">
              <img
                src="/icons/icon.png"
                alt="MiniPet Logo"
                className="w-full h-full object-cover pixel-art"
                loading="eager"
                width="28"
                height="28"
              />
            </div>
            <span className="text-[13px] sm:text-[13.5px] font-extrabold text-[#111827] dark:text-white tracking-tight">MiniPet</span>
          </Link>

          {/* Desktop Nav links */}
          <nav className="hidden lg:flex items-center gap-7 mx-6">
            <a
              href="#features"
              onClick={(e) => { e.preventDefault(); handleNavClick('Features'); }}
              className="text-[13px] font-bold text-gray-600 dark:text-gray-300 hover:text-[#111827] dark:hover:text-white transition-colors no-underline"
            >
              {t('nav.features')}
            </a>
            <Link
              to="/market"
              className="text-[13px] font-bold text-gray-600 dark:text-gray-300 hover:text-[#111827] dark:hover:text-white transition-colors no-underline"
            >
              Market
            </Link>
            <Link
              to="/custom-pet"
              className="text-[13px] font-bold text-gray-600 dark:text-gray-300 hover:text-[#111827] dark:hover:text-white transition-colors no-underline"
            >
              {t('nav.docs')}
            </Link>
            <Link
              to="/admin"
              className="text-[13px] font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 transition-colors no-underline"
            >
              Admin
            </Link>
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-3">
            <ConnectButton className="!rounded-xl !text-xs !font-black !px-4 !py-1.5" />
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
                if (location.pathname !== '/') {
                  navigate('/');
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
              <a
                href="#features"
                onClick={(e) => { e.preventDefault(); setMenuOpen(false); handleNavClick('Features'); }}
                className="w-full text-left px-5 py-4 rounded-2xl text-[14px] font-bold text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-[#111827] dark:hover:text-white transition-all no-underline"
              >
                {t('nav.features')}
              </a>
              <Link
                to="/custom-pet"
                onClick={() => setMenuOpen(false)}
                className="w-full text-left px-5 py-4 rounded-2xl text-[14px] font-bold text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-[#111827] dark:hover:text-white transition-all no-underline"
              >
                {t('nav.docs')}
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
    </header>
  );
};
