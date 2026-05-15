import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import MarketPage from './pages/MarketPage';
import NotFoundPage from './pages/NotFoundPage';
import { CustomPetPage } from './pages/CustomPetPage';
import { WalletWrapper } from './components/web3/WalletWrapper';

// Layout Components
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { SEO } from './components/layout/SEO';
import { PageLayout } from './components/layout/PageLayout';

// Home Components
import { Hero } from './components/home/Hero';
import { Features } from './components/home/Features';
import { DownloadSection } from './components/home/DownloadSection';

function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <DownloadSection />
    </>
  );
}

function App() {
  const [isDark, setIsDark] = React.useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <WalletWrapper>
      <BrowserRouter>
        <SEO isDark={isDark} />
        <PageLayout>
          <Navbar isDark={isDark} toggleTheme={toggleTheme} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/market" element={<MarketPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/custom-pet" element={<CustomPetPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </PageLayout>
      </BrowserRouter>
    </WalletWrapper>
  );
}

export default App;
