import { useState, useCallback } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi';
import { parseEther } from 'viem';
import { FACTORY_ABI, FACTORY_ADDRESS } from '../utils/constants';
import { CreateTokenParams, TokenInfo, TokenConfig } from '../types';

export const useFactory = () => {
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { writeContract, data: hash } = useWriteContract();

  const { isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash,
  });

  const createToken = useCallback(async (params: CreateTokenParams): Promise<string | null> => {
    if (!address) {
      setError('Wallet not connected');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const featureFlags: TokenConfig = {
        mintable: false,
        burnable: false,
        pausable: false,
        permit: false,
        flashMinting: false,
        snapshots: false,
        votes: false,
        roles: false,
        capped: false,
        multisig: false,
      };

      params.features.forEach(feature => {
        if (feature in featureFlags) {
          featureFlags[feature as keyof TokenConfig] = true;
        }
      });

      const ownerAddress = (params.owner || address) as `0x${string}`;

      await writeContract({
        address: FACTORY_ADDRESS,
        abi: FACTORY_ABI,
        functionName: 'createToken',
        args: [
          params.name,
          params.symbol,
          params.decimals,
          parseEther(params.initialSupply || '0'),
          params.maxSupply ? parseEther(params.maxSupply) : BigInt(0),
          featureFlags,
          ownerAddress,
        ],
        gas: BigInt(5000000), // Set gas limit to 5M (well below the 16.7M cap)
      });

      return hash || null;
    } catch (err: any) {
      setError(err.message || 'Failed to create token');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [address, writeContract, hash]);

  const getTokensByOwner = useCallback(async (ownerAddress: string): Promise<TokenInfo[]> => {
    try {
      const result = await useReadContract({
        address: FACTORY_ADDRESS,
        abi: FACTORY_ABI,
        functionName: 'getTokensByOwner',
        args: [ownerAddress as `0x${string}`],
      });

      return (result.data || []).map((token: any) => ({
        address: token.tokenAddress,
        name: token.name,
        symbol: token.symbol,
        decimals: token.decimals,
        totalSupply: token.totalSupply.toString(),
        owner: token.owner,
        features: token.features,
        createdAt: Number(token.createdAt) * 1000,
      }));
    } catch (err) {
      console.error('Failed to fetch tokens:', err);
      return [];
    }
  }, []);

  const getAllTokens = useCallback(async (): Promise<TokenInfo[]> => {
    try {
      const result = await useReadContract({
        address: FACTORY_ADDRESS,
        abi: FACTORY_ABI,
        functionName: 'getAllTokens',
      });

      return (result.data || []).map((token: any) => ({
        address: token.tokenAddress,
        name: token.name,
        symbol: token.symbol,
        decimals: token.decimals,
        totalSupply: token.totalSupply.toString(),
        owner: token.owner,
        features: token.features,
        createdAt: Number(token.createdAt) * 1000,
      }));
    } catch (err) {
      console.error('Failed to fetch all tokens:', err);
      return [];
    }
  }, []);

  return {
    createToken,
    getTokensByOwner,
    getAllTokens,
    isLoading: isLoading || isConfirming,
    error,
  };
};
