import React, { useEffect, useState } from 'react';
import { useFactory } from '../hooks/useFactory';
import { TokenInfo } from '../types';
import { Link } from 'react-router-dom';
import { Loader2, Search, ExternalLink, Filter } from 'lucide-react';
import { formatAddress } from '../utils/constants';

export const Explore: React.FC = () => {
  const { getAllTokens } = useFactory();
  const [tokens, setTokens] = useState<TokenInfo[]>([]);
  const [filteredTokens, setFilteredTokens] = useState<TokenInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'name'>('newest');

  useEffect(() => {
    loadTokens();
  }, []);

  useEffect(() => {
    let result = [...tokens];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (token) =>
          token.name.toLowerCase().includes(query) ||
          token.symbol.toLowerCase().includes(query) ||
          token.address.toLowerCase().includes(query)
      );
    }

    if (sortBy === 'newest') {
      result.sort((a, b) => b.createdAt - a.createdAt);
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredTokens(result);
  }, [tokens, searchQuery, sortBy]);

  const loadTokens = async () => {
    setIsLoading(true);
    try {
      const allTokens = await getAllTokens();
      setTokens(allTokens);
    } catch (error) {
      console.error('Failed to load tokens:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="section-container py-12">
      <div className="mb-8">
        <span className="mb-2 inline-flex items-center gap-2 text-sm font-medium text-primary-600 dark:text-primary-400">
          Discover
        </span>
        <h1 className="mb-2 text-3xl font-bold text-theme-primary sm:text-4xl">Explore Tokens</h1>
        <p className="text-lg text-theme-secondary">
          Discover all ERC20 tokens created on the platform
        </p>
      </div>

      <div className="mb-6 rounded-xl border border-theme-primary bg-theme-card p-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-theme-muted" />
            <input
              type="text"
              placeholder="Search by name, symbol, or address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-theme-primary bg-theme-primary py-3 pl-10 pr-4 text-theme-primary placeholder-theme-muted transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-theme-muted" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'newest' | 'name')}
                className="rounded-lg border border-theme-primary bg-theme-card px-3 py-2 text-theme-secondary focus:border-primary-500 focus:ring-2 focus:ring-primary-500"
              >
                <option value="newest">Newest First</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>
            <span className="text-sm text-theme-muted">
              {filteredTokens.length} tokens found
            </span>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="py-16 text-center">
          <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-primary-500" />
          <p className="text-theme-secondary">Loading tokens...</p>
        </div>
      ) : filteredTokens.length === 0 ? (
        <div className="rounded-xl border border-theme-primary bg-theme-card p-12 text-center">
          <p className="text-lg text-theme-secondary">
            {searchQuery ? 'No tokens found matching your search' : 'No tokens created yet'}
          </p>
          {!searchQuery && (
            <Link
              to="/create"
              className="mt-4 inline-block rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 px-6 py-3 font-medium text-white shadow-lg shadow-primary-500/25 transition-all hover:from-primary-500 hover:to-secondary-500"
            >
              Create the First Token
            </Link>
          )}
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-theme-primary bg-theme-card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-theme-primary bg-theme-secondary/50">
                <tr>
                  <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-theme-muted sm:px-6">
                    Token
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-theme-muted sm:px-6">
                    Address
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-theme-muted sm:px-6">
                    Supply
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-theme-muted sm:px-6">
                    Features
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-theme-muted sm:px-6">
                    Created
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-theme-muted sm:px-6">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-theme-primary">
                {filteredTokens.map((token) => (
                  <tr key={token.address} className="transition-colors hover:bg-theme-secondary/30">
                    <td className="px-4 py-4 sm:px-6">
                      <div className="flex items-center">
                        <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500/20 to-secondary-500/20">
                          <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                            {token.symbol.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-theme-primary">{token.name}</p>
                          <p className="text-sm text-theme-muted">{token.symbol}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 sm:px-6">
                      <code className="font-mono text-sm text-theme-muted">
                        {formatAddress(token.address)}
                      </code>
                    </td>
                    <td className="px-4 py-4 sm:px-6">
                      <p className="text-sm text-theme-primary">{token.totalSupply}</p>
                      <p className="text-xs text-theme-muted">{token.symbol}</p>
                    </td>
                    <td className="px-4 py-4 sm:px-6">
                      <div className="flex flex-wrap gap-1">
                        {token.features.slice(0, 2).map((feature) => (
                          <span
                            key={feature}
                            className="rounded border border-primary-200 bg-primary-100 px-2 py-1 text-xs text-primary-700 dark:border-primary-500/20 dark:bg-primary-500/10 dark:text-primary-400"
                          >
                            {feature}
                          </span>
                        ))}
                        {token.features.length > 2 && (
                          <span className="rounded bg-theme-secondary px-2 py-1 text-xs text-theme-muted">
                            +{token.features.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 sm:px-6">
                      <p className="text-sm text-theme-secondary">
                        {new Date(token.createdAt).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="px-4 py-4 sm:px-6">
                      <Link
                        to={`/token/${token.address}`}
                        className="inline-flex items-center text-sm font-medium text-primary-600 transition-colors hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
                      >
                        View
                        <ExternalLink className="ml-1 h-4 w-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
