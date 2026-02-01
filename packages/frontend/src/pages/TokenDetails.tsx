import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { useToken } from '../hooks/useToken';
import { TokenInfo } from '../types';
import { 
  ArrowLeft, 
  ExternalLink, 
  Copy, 
  Check,
  Coins,
  User,
  Calendar,
  Settings,
  Shield,
  Flame,
  Pause,
  Plus
} from 'lucide-react';
import { formatAddress, getExplorerUrl } from '../utils/constants';

export const TokenDetails: React.FC = () => {
  const { address: tokenAddress } = useParams<{ address: string }>();
  const { address: userAddress } = useAccount();
  const navigate = useNavigate();
  const { getTokenInfo, mint, burn, isLoading, error } = useToken(tokenAddress);
  
  const [token, setToken] = useState<TokenInfo | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'actions'>('overview');

  useEffect(() => {
    if (tokenAddress) {
      loadTokenInfo();
    }
  }, [tokenAddress]);

  const loadTokenInfo = async () => {
    try {
      const info = await getTokenInfo();
      setToken(info);
    } catch (err) {
      console.error('Failed to load token info:', err);
    }
  };

  const handleCopyAddress = () => {
    if (tokenAddress) {
      navigator.clipboard.writeText(tokenAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!tokenAddress) {
    return (
      <div className="max-w-4xl mx-auto text-center py-16">
        <p className="text-gray-600">No token address provided</p>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="max-w-4xl mx-auto text-center py-16">
        <div className="animate-pulse">
          <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    );
  }

  const isOwner = token.owner.toLowerCase() === userAddress?.toLowerCase();

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-8 text-white">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold">{token.name}</h1>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                  {token.symbol}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-blue-100">
                <code className="text-sm font-mono">{formatAddress(token.address)}</code>
                <button
                  onClick={handleCopyAddress}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                >
                  {copied ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
                <a
                  href={getExplorerUrl(token.address)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
              <span className="text-3xl font-bold">{token.symbol.charAt(0)}</span>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'overview'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Overview
            </button>
            {isOwner && (
              <button
                onClick={() => setActiveTab('actions')}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'actions'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Admin Actions
              </button>
            )}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <Coins className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">Total Supply</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{token.totalSupply}</p>
                  <p className="text-sm text-gray-500">{token.symbol}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <User className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">Owner</span>
                  </div>
                  <code className="text-sm font-mono text-gray-900">
                    {formatAddress(token.owner)}
                  </code>
                  <p className="text-sm text-gray-500">
                    {isOwner ? 'You are the owner' : ''}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">Created</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    {new Date(token.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(token.createdAt).toLocaleTimeString()}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <Settings className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">Decimals</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{token.decimals}</p>
                  <p className="text-sm text-gray-500">Token precision</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Features</h3>
                <div className="flex flex-wrap gap-2">
                  {token.features.map((feature) => (
                    <span
                      key={feature}
                      className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                    >
                      <Shield className="w-3 h-3 mr-1" />
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'actions' && isOwner && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Admin Actions</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {token.features.includes('mintable') && (
                  <button
                    onClick={() => mint(userAddress || '', '1000')}
                    disabled={isLoading}
                    className="flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Mint Tokens</span>
                  </button>
                )}

                {token.features.includes('burnable') && (
                  <button
                    onClick={() => burn('100')}
                    disabled={isLoading}
                    className="flex items-center justify-center space-x-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-300 transition-colors"
                  >
                    <Flame className="w-5 h-5" />
                    <span>Burn Tokens</span>
                  </button>
                )}

                {token.features.includes('pausable') && (
                  <button
                    disabled={isLoading}
                    className="flex items-center justify-center space-x-2 px-4 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:bg-gray-300 transition-colors"
                  >
                    <Pause className="w-5 h-5" />
                    <span>Pause Transfers</span>
                  </button>
                )}
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
