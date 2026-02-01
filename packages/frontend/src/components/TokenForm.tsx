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
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Token Details</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Token Name *
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., My Token"
            />
          </div>

          <div>
            <label htmlFor="symbol" className="block text-sm font-medium text-gray-700 mb-2">
              Token Symbol *
            </label>
            <input
              type="text"
              id="symbol"
              required
              value={formData.symbol}
              onChange={(e) => setFormData(prev => ({ ...prev, symbol: e.target.value.toUpperCase() }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., MTK"
            />
          </div>

          <div>
            <label htmlFor="decimals" className="block text-sm font-medium text-gray-700 mb-2">
              Decimals
            </label>
            <input
              type="number"
              id="decimals"
              min={0}
              max={18}
              value={formData.decimals}
              onChange={(e) => setFormData(prev => ({ ...prev, decimals: parseInt(e.target.value) }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="initialSupply" className="block text-sm font-medium text-gray-700 mb-2">
              Initial Supply *
            </label>
            <input
              type="text"
              id="initialSupply"
              required
              value={formData.initialSupply}
              onChange={(e) => setFormData(prev => ({ ...prev, initialSupply: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., 1000000"
            />
          </div>

          {selectedFeatures.has('capped') && (
            <div>
              <label htmlFor="maxSupply" className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Supply
              </label>
              <input
                type="text"
                id="maxSupply"
                value={formData.maxSupply}
                onChange={(e) => setFormData(prev => ({ ...prev, maxSupply: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., 10000000"
              />
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Token Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TOKEN_FEATURES.map((feature) => (
            <div
              key={feature.id}
              onClick={() => handleFeatureToggle(feature.id)}
              className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedFeatures.has(feature.id)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center ${
                  selectedFeatures.has(feature.id)
                    ? 'bg-blue-500 border-blue-500'
                    : 'border-gray-300'
                }`}>
                  {selectedFeatures.has(feature.id) && (
                    <Check className="w-3 h-3 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">{feature.label}</h3>
                  <p className="text-xs text-gray-500 mt-1">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <div className="flex items-center justify-end space-x-4">
        {!address && (
          <p className="text-sm text-gray-500">Please connect your wallet to create a token</p>
        )}
        <button
          type="submit"
          disabled={!address || isLoading}
          className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          <span>{isLoading ? 'Creating...' : 'Create Token'}</span>
        </button>
      </div>
    </form>
  );
};
