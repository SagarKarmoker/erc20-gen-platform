import React from 'react';
import { Navigation } from './Navigation';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-theme-primary">
      <Navigation />
      <main className="flex-1">
        {children}
      </main>
      <footer className="w-full border-t border-theme-primary bg-theme-secondary">
        <div className="section-container py-6">
          <p className="text-center text-sm text-theme-muted">
            © 2026 ERC20 Token Generator. Built with ❤️ for the Web3 community.
          </p>
        </div>
      </footer>
    </div>
  );
};
