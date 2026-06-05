import React from 'react';

interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="relative min-h-screen transition-colors duration-300">
      {/* Background Blobs with staggered pulse glow animations */}
      <div className="blob-container">
        <div className="blob blob-1 animate-glow-pulse"></div>
        <div className="blob blob-2 animate-glow-pulse" style={{ animationDelay: '-3s' }}></div>
        <div className="blob blob-3 animate-glow-pulse" style={{ animationDelay: '-6s' }}></div>
      </div>
      
      <main>
        {children}
      </main>
    </div>
  );
};
