import React, { useState } from 'react';
import { TokenForm } from '../components/TokenForm';
import { useAccount } from 'wagmi';
import { Wallet, ArrowLeft, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CreateToken: React.FC = () => {
  const { isConnected } = useAccount();
  const [createdTokenAddress, setCreatedTokenAddress] = useState<string | null>(null);

  const handleSuccess = (tokenAddress: string) => {
    setCreatedTokenAddress(tokenAddress);
  };

  if (createdTokenAddress) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Token Created Successfully!
          </h2>
          <p className="text-gray-600 mb-6">
            Your token has been deployed to the blockchain.
          </p>
          <div className="bg-white rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-500 mb-2">Token Address</p>
            <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded break-all">
              {createdTokenAddress}
            </code>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={`/token/${createdTokenAddress}`}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Token Details
            </Link>
            <button
              onClick={() => setCreatedTokenAddress(null)}
              className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Create Another Token
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Create Your ERC20 Token</h1>
        <p className="text-gray-600 mt-2">
          Fill in the details below to deploy your custom token
        </p>
      </div>

      {!isConnected && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
          <div className="flex items-start space-x-4">
            <Wallet className="w-6 h-6 text-yellow-600 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-medium text-yellow-800 mb-2">
                Wallet Not Connected
              </h3>
              <p className="text-yellow-700">
                Please connect your wallet to create a token. You need ETH or the native 
                token of the network for gas fees.
              </p>
            </div>
          </div>
        </div>
      )}

      <TokenForm onSuccess={handleSuccess} />

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">
          Estimated Gas Fees
        </h3>
        <p className="text-blue-800 text-sm mb-4">
          The cost to deploy your token depends on the features you enable and current network conditions.
        </p>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Basic token: ~0.01 ETH</li>
          <li>• With advanced features: ~0.02 - 0.05 ETH</li>
          <li>• Make sure you have enough funds for deployment</li>
        </ul>
      </div>
    </div>
  );
};
