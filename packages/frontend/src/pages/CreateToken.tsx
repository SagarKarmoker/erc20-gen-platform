import React, { useState } from 'react';
import { TokenForm } from '../components/TokenForm';
import { useAccount } from 'wagmi';
import { Wallet, ArrowLeft, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CreateToken: React.FC = () => {
  const { isConnected } = useAccount();
  const [createdTokenAddress, setCreatedTokenAddress] = useState<string | null>(null);

  const handleSuccess = (tokenAddress: string) => {
    setCreatedTokenAddress(tokenAddress);
  };

  if (createdTokenAddress) {
    return (
      <div className="section-container">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center dark:border-emerald-500/30 dark:bg-emerald-500/10">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/25">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h2 className="mb-4 text-2xl font-bold text-theme-primary">
              Token Created Successfully!
            </h2>
            <p className="mb-6 text-theme-secondary">
              Your token has been deployed to the blockchain.
            </p>
            <div className="mb-6 rounded-xl border border-theme-primary bg-theme-secondary p-4">
              <p className="mb-2 text-sm text-theme-muted">Token Address</p>
              <code className="break-all font-mono text-sm text-primary-600 dark:text-primary-400">
                {createdTokenAddress}
              </code>
            </div>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to={`/token/${createdTokenAddress}`}
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 px-6 py-3 font-medium text-white shadow-lg shadow-primary-500/25 transition-all hover:from-primary-500 hover:to-secondary-500"
              >
                View Token Details
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <button
                onClick={() => setCreatedTokenAddress(null)}
                className="rounded-xl border border-theme-primary px-6 py-3 font-medium text-theme-secondary transition-all hover:border-primary-300 hover:bg-primary-50 dark:hover:bg-slate-800"
              >
                Create Another Token
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section-container py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <Link
            to="/"
            className="mb-4 inline-flex items-center text-theme-muted transition-colors hover:text-theme-primary"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="mb-2 text-3xl font-bold text-theme-primary sm:text-4xl">Create Your ERC20 Token</h1>
          <p className="text-lg text-theme-secondary">
            Fill in the details below to deploy your custom token
          </p>
        </div>

        {!isConnected && (
          <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-500/30 dark:bg-amber-500/10">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-500/20">
                <Wallet className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h3 className="mb-2 text-lg font-medium text-amber-700 dark:text-amber-300">
                  Wallet Not Connected
                </h3>
                <p className="text-amber-600/70 dark:text-amber-200/70">
                  Please connect your wallet to create a token. You need ETH or the native 
                  token of the network for gas fees.
                </p>
              </div>
            </div>
          </div>
        )}

        <TokenForm onSuccess={handleSuccess} />

        <div className="mt-8 rounded-xl border border-primary-200 bg-primary-50 p-6 dark:border-primary-500/30 dark:bg-primary-500/10">
          <h3 className="mb-2 text-lg font-semibold text-primary-700 dark:text-primary-300">
            Estimated Gas Fees
          </h3>
          <p className="mb-4 text-sm text-primary-600/70 dark:text-primary-200/70">
            The cost to deploy your token depends on the features you enable and current network conditions.
          </p>
          <ul className="space-y-1 text-sm text-primary-600/70 dark:text-primary-200/70">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-400" />
              Basic token: ~0.01 ETH
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-400" />
              With advanced features: ~0.02 - 0.05 ETH
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-400" />
              Make sure you have enough funds for deployment
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
