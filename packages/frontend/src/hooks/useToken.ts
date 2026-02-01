import { useState, useCallback } from 'react';
import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import { ERC20_ABI } from '../utils/constants';
import { TokenInfo } from '../types';

export const useToken = (tokenAddress?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { writeContract, data: hash } = useWriteContract();

  const { isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash,
  });

  const getTokenInfo = useCallback(async (): Promise<TokenInfo | null> => {
    if (!tokenAddress) return null;

    try {
      const nameResult = await useReadContract({
        address: tokenAddress as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'name',
      });

      const symbolResult = await useReadContract({
        address: tokenAddress as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'symbol',
      });

      const decimalsResult = await useReadContract({
        address: tokenAddress as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'decimals',
      });

      const totalSupplyResult = await useReadContract({
        address: tokenAddress as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'totalSupply',
      });

      const ownerResult = await useReadContract({
        address: tokenAddress as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'owner',
      });

      return {
        address: tokenAddress,
        name: nameResult.data || '',
        symbol: symbolResult.data || '',
        decimals: Number(decimalsResult.data || 18),
        totalSupply: (totalSupplyResult.data || BigInt(0)).toString(),
        owner: ownerResult.data || '',
        features: [],
        createdAt: Date.now(),
      };
    } catch (err: any) {
      setError(err.message || 'Failed to fetch token info');
      return null;
    }
  }, [tokenAddress]);

  const getBalance = useCallback(async (account: string): Promise<string> => {
    if (!tokenAddress) return '0';

    try {
      const result = await useReadContract({
        address: tokenAddress as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'balanceOf',
        args: [account as `0x${string}`],
      });

      return (result.data || BigInt(0)).toString();
    } catch (err) {
      return '0';
    }
  }, [tokenAddress]);

  const mint = useCallback(async (to: string, amount: string) => {
    if (!tokenAddress) return;

    setIsLoading(true);
    setError(null);

    try {
      await writeContract({
        address: tokenAddress as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'mint',
        args: [to as `0x${string}`, parseEther(amount)],
        gas: BigInt(200000), // 200k gas for mint
      });
    } catch (err: any) {
      setError(err.message || 'Failed to mint tokens');
    } finally {
      setIsLoading(false);
    }
  }, [tokenAddress, writeContract]);

  const burn = useCallback(async (amount: string) => {
    if (!tokenAddress) return;

    setIsLoading(true);
    setError(null);

    try {
      await writeContract({
        address: tokenAddress as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'burn',
        args: [parseEther(amount)],
        gas: BigInt(200000), // 200k gas for burn
      });
    } catch (err: any) {
      setError(err.message || 'Failed to burn tokens');
    } finally {
      setIsLoading(false);
    }
  }, [tokenAddress, writeContract]);

  const transfer = useCallback(async (to: string, amount: string) => {
    if (!tokenAddress) return;

    setIsLoading(true);
    setError(null);

    try {
      await writeContract({
        address: tokenAddress as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'transfer',
        args: [to as `0x${string}`, parseEther(amount)],
        gas: BigInt(100000), // 100k gas for transfer
      });
    } catch (err: any) {
      setError(err.message || 'Failed to transfer tokens');
    } finally {
      setIsLoading(false);
    }
  }, [tokenAddress, writeContract]);

  const pause = useCallback(async () => {
    if (!tokenAddress) return;

    setIsLoading(true);
    setError(null);

    try {
      await writeContract({
        address: tokenAddress as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'pause',
        gas: BigInt(100000), // 100k gas for pause
      });
    } catch (err: any) {
      setError(err.message || 'Failed to pause token');
    } finally {
      setIsLoading(false);
    }
  }, [tokenAddress, writeContract]);

  const unpause = useCallback(async () => {
    if (!tokenAddress) return;

    setIsLoading(true);
    setError(null);

    try {
      await writeContract({
        address: tokenAddress as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'unpause',
        gas: BigInt(100000), // 100k gas for unpause
      });
    } catch (err: any) {
      setError(err.message || 'Failed to unpause token');
    } finally {
      setIsLoading(false);
    }
  }, [tokenAddress, writeContract]);

  return {
    getTokenInfo,
    getBalance,
    mint,
    burn,
    transfer,
    pause,
    unpause,
    isLoading: isLoading || isConfirming,
    error,
  };
};
