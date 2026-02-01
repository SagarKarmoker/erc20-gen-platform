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
        className="flex items-center space-x-2 bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 rounded-lg transition-colors"
      >
        <Globe className="w-4 h-4 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">
          {currentNetwork?.name || 'Select Network'}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
            <div className="py-2">
              <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Select Network
              </p>
              {SUPPORTED_NETWORKS.map((network) => (
                <button
                  key={network.chainId}
                  onClick={() => handleNetworkSwitch(network.chainId)}
                  className={`w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-gray-50 transition-colors ${
                    chainId === network.chainId ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      network.testnet ? 'bg-yellow-400' : 'bg-green-400'
                    }`} />
                    <span className="font-medium">{network.name}</span>
                  </div>
                  {chainId === network.chainId && (
                    <Check className="w-4 h-4" />
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
