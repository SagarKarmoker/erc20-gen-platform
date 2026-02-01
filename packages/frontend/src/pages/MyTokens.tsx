import React from 'react';
import { useAccount } from 'wagmi';
import { useFactory } from '../hooks/useFactory';
import { TokenInfo } from '../types';
import { Link } from 'react-router-dom';
import { Loader2, Coins, ExternalLink, ArrowUpRight, Wallet } from 'lucide-react';
import { formatAddress } from '../utils/constants';

export const MyTokens: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { getTokensByOwner } = useFactory();
  const [tokens, setTokens] = React.useState<TokenInfo[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (address) {
      loadTokens();
    }
  }, [address]);

  const loadTokens = async () => {
    if (!address) return;
    setIsLoading(true);
    try {
      const userTokens = await getTokensByOwner(address);
      setTokens(userTokens);
    } catch (error) {
      console.error('Failed to load tokens:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="section-container py-16 text-center">
        <div className="mx-auto max-w-4xl">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-theme-secondary">
            <Wallet className="h-8 w-8 text-theme-muted" />
          </div>
          <h2 className="mb-4 text-2xl font-bold text-theme-primary">
            Connect Your Wallet
          </h2>
          <p className="text-theme-secondary">
            Please connect your wallet to view your created tokens
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="section-container py-16 text-center">
        <div className="mx-auto max-w-4xl">
          <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-primary-500" />
          <p className="text-theme-secondary">Loading your tokens...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="section-container py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <span className="mb-2 inline-flex items-center gap-2 text-sm font-medium text-primary-600 dark:text-primary-400">
            Your Collection
          </span>
          <h1 className="mb-2 text-3xl font-bold text-theme-primary sm:text-4xl">My Tokens</h1>
          <p className="text-lg text-theme-secondary">
            Manage and view all tokens you have created
          </p>
        </div>

        {tokens.length === 0 ? (
          <div className="rounded-2xl border border-theme-primary bg-theme-card p-12 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-theme-secondary">
              <Coins className="h-8 w-8 text-theme-muted" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-theme-primary">
              No Tokens Yet
            </h3>
            <p className="mx-auto mb-6 max-w-md text-theme-secondary">
              You haven't created any tokens yet. Start by creating your first ERC20 token!
            </p>
            <Link
              to="/create"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 px-6 py-3 font-medium text-white shadow-lg shadow-primary-500/25 transition-all hover:from-primary-500 hover:to-secondary-500"
            >
              Create Your First Token
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tokens.map((token) => (
              <div
                key={token.address}
                className="group rounded-2xl border border-theme-primary bg-theme-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary-300 dark:hover:border-primary-500/30"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20">
                    <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                      {token.symbol.charAt(0)}
                    </span>
                  </div>
                  <span className="rounded border border-theme-secondary bg-theme-secondary px-2 py-1 text-xs font-medium text-theme-muted">
                    ERC20
                  </span>
                </div>

                <h3 className="mb-1 text-lg font-semibold text-theme-primary">
                  {token.name}
                </h3>
                <p className="mb-4 text-sm text-theme-muted">{token.symbol}</p>

                <div className="mb-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-theme-muted">Address</span>
                    <code className="rounded bg-theme-secondary px-2 py-1 text-xs font-mono text-theme-muted">
                      {formatAddress(token.address)}
                    </code>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-theme-muted">Supply</span>
                    <span className="font-medium text-theme-primary">{token.totalSupply}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-theme-muted">Created</span>
                    <span className="font-medium text-theme-secondary">
                      {new Date(token.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="mb-4 flex flex-wrap gap-2">
                  {token.features.slice(0, 3).map((feature) => (
                    <span
                      key={feature}
                      className="rounded border border-primary-200 bg-primary-100 px-2 py-1 text-xs text-primary-700 dark:border-primary-500/20 dark:bg-primary-500/10 dark:text-primary-400"
                    >
                      {feature}
                    </span>
                  ))}
                  {token.features.length > 3 && (
                    <span className="rounded bg-theme-secondary px-2 py-1 text-xs text-theme-muted">
                      +{token.features.length - 3} more
                    </span>
                  )}
                </div>

                <Link
                  to={`/token/${token.address}`}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-theme-primary px-4 py-2 font-medium text-theme-secondary transition-all hover:border-theme-secondary hover:bg-theme-secondary hover:text-theme-primary"
                >
                  View Details
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
