import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { Menu, X, Wallet, ChevronDown, Zap } from 'lucide-react';
import { NetworkSelector } from './NetworkSelector';
import { ThemeToggle } from './ThemeToggle';

export const Navigation: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleConnect = () => {
    connect({ connector: injected() });
  };

  const formatAddress = (addr: string | undefined) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/create', label: 'Create Token' },
    { to: '/explore', label: 'Explore' },
    { to: '/my-tokens', label: 'My Tokens' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-theme-primary bg-theme-secondary/80 backdrop-blur-md">
      <div className="section-container">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-secondary-600 shadow-lg shadow-primary-500/25">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-theme-primary">ERC20Gen</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium text-theme-secondary transition-colors hover:text-theme-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex md:items-center md:gap-3">
            <ThemeToggle />
            <NetworkSelector />

            {isConnected ? (
              <div className="relative group">
                <button className="flex items-center gap-2 rounded-lg border border-theme-primary bg-theme-tertiary px-4 py-2 transition-colors hover:bg-theme-secondary">
                  <Wallet className="h-4 w-4 text-primary-500" />
                  <span className="text-sm font-medium text-theme-primary">
                    {formatAddress(address)}
                  </span>
                  <ChevronDown className="h-4 w-4 text-theme-muted" />
                </button>

                <div className="absolute right-0 mt-2 w-48 rounded-lg border border-theme-primary bg-theme-card py-1 opacity-0 invisible shadow-lg transition-all group-hover:opacity-100 group-hover:visible z-50">
                  <button
                    onClick={() => disconnect()}
                    className="block w-full px-4 py-2 text-left text-sm text-theme-secondary transition-colors hover:bg-theme-tertiary hover:text-theme-primary"
                  >
                    Disconnect
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={handleConnect}
                className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary-600 to-secondary-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-primary-500/25 transition-all hover:from-primary-500 hover:to-secondary-500"
              >
                <Wallet className="h-4 w-4" />
                Connect Wallet
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 text-theme-secondary transition-colors hover:text-theme-primary"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-theme-primary bg-theme-secondary md:hidden">
          <div className="section-container py-4">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="rounded-lg px-3 py-2 text-base font-medium text-theme-secondary transition-colors hover:bg-theme-tertiary hover:text-theme-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="my-2 border-t border-theme-primary pt-2">
                <NetworkSelector />
              </div>
              {isConnected ? (
                <>
                  <div className="px-3 py-2 text-sm text-theme-muted">
                    Connected: {formatAddress(address)}
                  </div>
                  <button
                    onClick={() => {
                      disconnect();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full rounded-lg px-3 py-2 text-left text-base font-medium text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-950/50"
                  >
                    Disconnect
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    handleConnect();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full rounded-lg bg-gradient-to-r from-primary-600 to-secondary-600 px-3 py-2 text-left text-base font-medium text-white transition-colors"
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
