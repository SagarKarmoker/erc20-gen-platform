import React, { useState } from 'react';
import { useChainId, useSwitchChain } from 'wagmi';
import { ChevronDown, Check, Globe } from 'lucide-react';
import { SUPPORTED_NETWORKS } from '../utils/constants';

export const NetworkSelector: React.FC = () => {
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const [isOpen, setIsOpen] = useState(false);

  const currentNetwork = SUPPORTED_NETWORKS.find(n => n.chainId === chainId);

  const handleNetworkSwitch = (newChainId: number) => {
    switchChain?.({ chainId: newChainId });
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg border border-theme-primary bg-theme-card px-3 py-2 text-sm transition-colors hover:border-primary-300 sm:px-4"
      >
        <Globe className="h-4 w-4 text-primary-500" />
        <span className="font-medium text-theme-primary hidden sm:inline">
          {currentNetwork?.name || 'Select Network'}
        </span>
        <span className="font-medium text-theme-primary sm:hidden">
          {currentNetwork?.name || 'Network'}
        </span>
        <ChevronDown className={`h-4 w-4 text-theme-muted transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-64 rounded-lg border border-theme-primary bg-theme-card shadow-lg shadow-black/20 z-20">
            <div className="py-2">
              <p className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-theme-muted">
                Select Network
              </p>
              {SUPPORTED_NETWORKS.map((network) => (
                <button
                  key={network.chainId}
                  onClick={() => handleNetworkSwitch(network.chainId)}
                  className={`flex w-full items-center justify-between px-4 py-3 text-sm transition-colors hover:bg-theme-secondary ${
                    chainId === network.chainId ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400' : 'text-theme-secondary'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-2 w-2 rounded-full ${
                      network.testnet ? 'bg-yellow-400' : 'bg-emerald-400'
                    }`} />
                    <span className="font-medium">{network.name}</span>
                  </div>
                  {chainId === network.chainId && (
                    <Check className="h-4 w-4 text-primary-500" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
