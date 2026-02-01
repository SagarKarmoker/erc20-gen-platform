import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { useFactory } from '../hooks/useFactory';
import { TokenFeature, CreateTokenParams } from '../types';
import { Loader2, Check } from 'lucide-react';

const TOKEN_FEATURES: { id: TokenFeature; label: string; description: string }[] = [
  { id: 'mintable', label: 'Mintable', description: 'Allow creating new tokens after deployment' },
  { id: 'burnable', label: 'Burnable', description: 'Allow burning tokens to reduce supply' },
  { id: 'pausable', label: 'Pausable', description: 'Pause all token transfers in emergencies' },
  { id: 'permit', label: 'Permit (Gasless)', description: 'Gasless approvals via signatures' },
  { id: 'flashMinting', label: 'Flash Minting', description: 'Mint and burn within a single transaction' },
  { id: 'snapshots', label: 'Snapshots', description: 'Record balances at specific block heights' },
  { id: 'votes', label: 'Votes', description: 'Track voting power for governance' },
  { id: 'roles', label: 'Access Control', description: 'Role-based permissions for admin functions' },
  { id: 'capped', label: 'Supply Cap', description: 'Set a maximum total supply limit' },
  { id: 'multisig', label: 'Multi-Sig Admin', description: 'Require multiple signatures for admin actions' },
];

interface TokenFormProps {
  onSuccess?: (tokenAddress: string) => void;
}

export const TokenForm: React.FC<TokenFormProps> = ({ onSuccess }) => {
  const { address } = useAccount();
  const { createToken, isLoading, error } = useFactory();
  
  const [formData, setFormData] = useState<CreateTokenParams>({
    name: '',
    symbol: '',
    decimals: 18,
    initialSupply: '',
    maxSupply: '',
    features: [],
    owner: '',
  });

  const [selectedFeatures, setSelectedFeatures] = useState<Set<TokenFeature>>(new Set());

  const handleFeatureToggle = (feature: TokenFeature) => {
    const newFeatures = new Set(selectedFeatures);
    if (newFeatures.has(feature)) {
      newFeatures.delete(feature);
    } else {
      newFeatures.add(feature);
    }
    setSelectedFeatures(newFeatures);
    setFormData(prev => ({
      ...prev,
      features: Array.from(newFeatures),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) return;

    try {
      const tokenAddress = await createToken({
        ...formData,
        owner: address,
      });
      
      if (tokenAddress && onSuccess) {
        onSuccess(tokenAddress);
      }
    } catch (err) {
      console.error('Failed to create token:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-2xl border border-theme-primary bg-theme-card p-6">
        <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold text-theme-primary">
          Token Details
        </h2>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-theme-secondary">
              Token Name *
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full rounded-xl border border-theme-primary bg-theme-primary px-4 py-3 text-theme-primary placeholder-theme-muted transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500"
              placeholder="e.g., My Token"
            />
          </div>

          <div>
            <label htmlFor="symbol" className="mb-2 block text-sm font-medium text-theme-secondary">
              Token Symbol *
            </label>
            <input
              type="text"
              id="symbol"
              required
              value={formData.symbol}
              onChange={(e) => setFormData(prev => ({ ...prev, symbol: e.target.value.toUpperCase() }))}
              className="w-full rounded-xl border border-theme-primary bg-theme-primary px-4 py-3 text-theme-primary placeholder-theme-muted transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500"
              placeholder="e.g., MTK"
            />
          </div>

          <div>
            <label htmlFor="decimals" className="mb-2 block text-sm font-medium text-theme-secondary">
              Decimals
            </label>
            <input
              type="number"
              id="decimals"
              min={0}
              max={18}
              value={formData.decimals}
              onChange={(e) => setFormData(prev => ({ ...prev, decimals: parseInt(e.target.value) }))}
              className="w-full rounded-xl border border-theme-primary bg-theme-primary px-4 py-3 text-theme-primary transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label htmlFor="initialSupply" className="mb-2 block text-sm font-medium text-theme-secondary">
              Initial Supply *
            </label>
            <input
              type="text"
              id="initialSupply"
              required
              value={formData.initialSupply}
              onChange={(e) => setFormData(prev => ({ ...prev, initialSupply: e.target.value }))}
              className="w-full rounded-xl border border-theme-primary bg-theme-primary px-4 py-3 text-theme-primary placeholder-theme-muted transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500"
              placeholder="e.g., 1000000"
            />
          </div>

          {selectedFeatures.has('capped') && (
            <div>
              <label htmlFor="maxSupply" className="mb-2 block text-sm font-medium text-theme-secondary">
                Maximum Supply
              </label>
              <input
                type="text"
                id="maxSupply"
                value={formData.maxSupply}
                onChange={(e) => setFormData(prev => ({ ...prev, maxSupply: e.target.value }))}
                className="w-full rounded-xl border border-theme-primary bg-theme-primary px-4 py-3 text-theme-primary placeholder-theme-muted transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500"
                placeholder="e.g., 10000000"
              />
            </div>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-theme-primary bg-theme-card p-6">
        <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold text-theme-primary">
          Token Features
        </h2>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {TOKEN_FEATURES.map((feature) => (
            <div
              key={feature.id}
              onClick={() => handleFeatureToggle(feature.id)}
              className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all ${
                selectedFeatures.has(feature.id)
                  ? 'border-primary-500 bg-primary-500/10'
                  : 'border-theme-primary hover:border-theme-secondary'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 ${
                  selectedFeatures.has(feature.id)
                    ? 'border-primary-500 bg-primary-500'
                    : 'border-theme-secondary'
                }`}>
                  {selectedFeatures.has(feature.id) && (
                    <Check className="h-3 w-3 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-theme-primary">{feature.label}</h3>
                  <p className="mt-1 text-xs text-theme-muted">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-500/30 dark:bg-red-500/10">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      <div className="flex items-center justify-end gap-4">
        {!address && (
          <p className="text-sm text-theme-muted">Please connect your wallet to create a token</p>
        )}
        <button
          type="submit"
          disabled={!address || isLoading}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 px-6 py-3 font-medium text-white shadow-lg shadow-primary-500/25 transition-all hover:from-primary-500 hover:to-secondary-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          <span>{isLoading ? 'Creating...' : 'Create Token'}</span>
        </button>
      </div>
    </form>
  );
};
