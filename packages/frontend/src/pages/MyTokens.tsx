import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useFactory } from '../hooks/useFactory';
import { TokenInfo } from '../types';
import { Link } from 'react-router-dom';
import { Loader2, Coins, ExternalLink, ArrowUpRight } from 'lucide-react';
import { formatAddress } from '../utils/constants';

export const MyTokens: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { getTokensByOwner } = useFactory();
  const [tokens, setTokens] = useState<TokenInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
      <div className="max-w-4xl mx-auto text-center py-16">
        <Coins className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Connect Your Wallet
        </h2>
        <p className="text-gray-600">
          Please connect your wallet to view your created tokens
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto text-center py-16">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
        <p className="text-gray-600">Loading your tokens...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Tokens</h1>
        <p className="text-gray-600 mt-2">
          Manage and view all tokens you have created
        </p>
      </div>

      {tokens.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <Coins className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Tokens Yet
          </h3>
          <p className="text-gray-600 mb-6">
            You haven't created any tokens yet. Start by creating your first ERC20 token!
          </p>
          <Link
            to="/create"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Your First Token
            <ArrowUpRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tokens.map((token) => (
            <div
              key={token.address}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl font-bold text-blue-600">
                    {token.symbol.charAt(0)}
                  </span>
                </div>
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  ERC20
                </span>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {token.name}
              </h3>
              <p className="text-sm text-gray-500 mb-4">{token.symbol}</p>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Address</span>
                  <code className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">
                    {formatAddress(token.address)}
                  </code>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Supply</span>
                  <span className="font-medium">{token.totalSupply}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Created</span>
                  <span className="font-medium">
                    {new Date(token.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {token.features.slice(0, 3).map((feature) => (
                  <span
                    key={feature}
                    className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded"
                  >
                    {feature}
                  </span>
                ))}
                {token.features.length > 3 && (
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    +{token.features.length - 3} more
                  </span>
                )}
              </div>

              <Link
                to={`/token/${token.address}`}
                className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                View Details
                <ExternalLink className="w-4 h-4 ml-2" />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
