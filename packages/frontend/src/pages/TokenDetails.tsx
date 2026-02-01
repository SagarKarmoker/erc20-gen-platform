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
      <div className="section-container py-16 text-center">
        <p className="text-theme-secondary">No token address provided</p>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="section-container py-16 text-center">
        <div className="animate-pulse space-y-4">
          <div className="h-32 rounded-2xl bg-theme-secondary"></div>
          <div className="mx-auto h-4 w-3/4 rounded bg-theme-secondary"></div>
          <div className="mx-auto h-4 w-1/2 rounded bg-theme-secondary"></div>
        </div>
      </div>
    );
  }

  const isOwner = token.owner.toLowerCase() === userAddress?.toLowerCase();

  return (
    <div className="section-container">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center text-theme-muted transition-colors hover:text-theme-primary"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </button>

      <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-theme-primary bg-theme-card">
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 px-6 py-8">
          <div className="flex items-start justify-between">
            <div>
              <div className="mb-2 flex items-center gap-3">
                <h1 className="text-3xl font-bold text-white">{token.name}</h1>
                <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white">
                  {token.symbol}
                </span>
              </div>
              <div className="flex items-center gap-2 text-primary-100">
                <code className="font-mono text-sm">{formatAddress(token.address)}</code>
                <button
                  onClick={handleCopyAddress}
                  className="rounded p-1 transition-colors hover:bg-white/20"
                >
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
                <a
                  href={getExplorerUrl(token.address)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded p-1 transition-colors hover:bg-white/20"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/20">
              <span className="text-3xl font-bold text-white">{token.symbol.charAt(0)}</span>
            </div>
          </div>
        </div>

        <div className="border-b border-theme-primary">
          <div className="flex">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === 'overview'
                  ? 'border-b-2 border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-b-2 border-transparent text-theme-muted hover:text-theme-secondary'
              }`}
            >
              Overview
            </button>
            {isOwner && (
              <button
                onClick={() => setActiveTab('actions')}
                className={`px-6 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'actions'
                    ? 'border-b-2 border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-b-2 border-transparent text-theme-muted hover:text-theme-secondary'
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
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded-xl border border-theme-primary bg-theme-secondary/50 p-4">
                  <div className="mb-2 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500/20">
                      <Coins className="h-5 w-5 text-primary-500" />
                    </div>
                    <span className="text-sm font-medium text-theme-muted">Total Supply</span>
                  </div>
                  <p className="text-2xl font-bold text-theme-primary">{token.totalSupply}</p>
                  <p className="text-sm text-theme-muted">{token.symbol}</p>
                </div>

                <div className="rounded-xl border border-theme-primary bg-theme-secondary/50 p-4">
                  <div className="mb-2 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary-500/20">
                      <User className="h-5 w-5 text-secondary-500" />
                    </div>
                    <span className="text-sm font-medium text-theme-muted">Owner</span>
                  </div>
                  <code className="font-mono text-sm text-theme-secondary">
                    {formatAddress(token.owner)}
                  </code>
                  <p className="text-sm text-primary-600 dark:text-primary-400">
                    {isOwner ? 'You are the owner' : ''}
                  </p>
                </div>

                <div className="rounded-xl border border-theme-primary bg-theme-secondary/50 p-4">
                  <div className="mb-2 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20">
                      <Calendar className="h-5 w-5 text-emerald-500" />
                    </div>
                    <span className="text-sm font-medium text-theme-muted">Created</span>
                  </div>
                  <p className="text-lg font-semibold text-theme-primary">
                    {new Date(token.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-theme-muted">
                    {new Date(token.createdAt).toLocaleTimeString()}
                  </p>
                </div>

                <div className="rounded-xl border border-theme-primary bg-theme-secondary/50 p-4">
                  <div className="mb-2 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/20">
                      <Settings className="h-5 w-5 text-amber-500" />
                    </div>
                    <span className="text-sm font-medium text-theme-muted">Decimals</span>
                  </div>
                  <p className="text-2xl font-bold text-theme-primary">{token.decimals}</p>
                  <p className="text-sm text-theme-muted">Token precision</p>
                </div>
              </div>

              <div>
                <div className="mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary-500" />
                  <h3 className="text-lg font-semibold text-theme-primary">Features</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {token.features.map((feature) => (
                    <span
                      key={feature}
                      className="inline-flex items-center gap-1 rounded-full border border-primary-200 bg-primary-100 px-3 py-1 text-sm font-medium text-primary-700 dark:border-primary-500/20 dark:bg-primary-500/10 dark:text-primary-400"
                    >
                      <Shield className="h-3 w-3" />
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'actions' && isOwner && (
            <div className="space-y-6">
              <div className="mb-4 flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary-500" />
                <h3 className="text-lg font-semibold text-theme-primary">Admin Actions</h3>
              </div>
              
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {token.features.includes('mintable') && (
                  <button
                    onClick={() => mint(userAddress || '', '1000')}
                    disabled={isLoading}
                    className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 font-medium text-white transition-colors hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-theme-tertiary"
                  >
                    <Plus className="h-5 w-5" />
                    <span>Mint Tokens</span>
                  </button>
                )}

                {token.features.includes('burnable') && (
                  <button
                    onClick={() => burn('100')}
                    disabled={isLoading}
                    className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 font-medium text-white transition-colors hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-theme-tertiary"
                  >
                    <Flame className="h-5 w-5" />
                    <span>Burn Tokens</span>
                  </button>
                )}

                {token.features.includes('pausable') && (
                  <button
                    disabled={isLoading}
                    className="flex items-center justify-center gap-2 rounded-xl bg-amber-600 px-4 py-3 font-medium text-white transition-colors hover:bg-amber-500 disabled:cursor-not-allowed disabled:bg-theme-tertiary"
                  >
                    <Pause className="h-5 w-5" />
                    <span>Pause Transfers</span>
                  </button>
                )}
              </div>

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-500/30 dark:bg-red-500/10">
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
