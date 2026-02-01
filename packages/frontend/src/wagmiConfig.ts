import { createConfig, http } from 'wagmi';
import {
  mainnet,
  sepolia,
  goerli,
  polygon,
  polygonMumbai,
  bsc,
  bscTestnet,
  arbitrum,
  arbitrumGoerli,
  optimism,
  optimismGoerli,
  base,
  baseGoerli,
} from 'wagmi/chains';
import { walletConnect, injected } from 'wagmi/connectors';

export const projectId = (import.meta as any).env.VITE_WALLET_CONNECT_PROJECT_ID || '';

if (!projectId) {
  console.warn('WalletConnect Project ID not found. Please set VITE_WALLET_CONNECT_PROJECT_ID in your .env file');
}

const metadata = {
  name: 'TokenFactory Pro',
  description: 'Professional ERC20 Token Generator Platform',
  url: 'https://tokenfactory.pro',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

export const supportedChains = [
  mainnet,
  sepolia,
  goerli,
  polygon,
  polygonMumbai,
  bsc,
  bscTestnet,
  arbitrum,
  arbitrumGoerli,
  optimism,
  optimismGoerli,
  base,
  baseGoerli,
] as const;

export const config = createConfig({
  chains: supportedChains,
  connectors: [
    walletConnect({ projectId, metadata, showQrModal: false }),
    injected({ shimDisconnect: true }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [goerli.id]: http(),
    [polygon.id]: http(),
    [polygonMumbai.id]: http(),
    [bsc.id]: http(),
    [bscTestnet.id]: http(),
    [arbitrum.id]: http(),
    [arbitrumGoerli.id]: http(),
    [optimism.id]: http(),
    [optimismGoerli.id]: http(),
    [base.id]: http(),
    [baseGoerli.id]: http(),
  },
});

export const chainNames: Record<number, string> = {
  [mainnet.id]: 'Ethereum Mainnet',
  [sepolia.id]: 'Sepolia Testnet',
  [goerli.id]: 'Goerli Testnet',
  [polygon.id]: 'Polygon Mainnet',
  [polygonMumbai.id]: 'Mumbai Testnet',
  [bsc.id]: 'BSC Mainnet',
  [bscTestnet.id]: 'BSC Testnet',
  [arbitrum.id]: 'Arbitrum One',
  [arbitrumGoerli.id]: 'Arbitrum Goerli',
  [optimism.id]: 'Optimism',
  [optimismGoerli.id]: 'Optimism Goerli',
  [base.id]: 'Base',
  [baseGoerli.id]: 'Base Goerli',
};

export const getExplorerUrl = (chainId: number, address: string): string => {
  const explorers: Record<number, string> = {
    [mainnet.id]: 'https://etherscan.io',
    [sepolia.id]: 'https://sepolia.etherscan.io',
    [goerli.id]: 'https://goerli.etherscan.io',
    [polygon.id]: 'https://polygonscan.com',
    [polygonMumbai.id]: 'https://mumbai.polygonscan.com',
    [bsc.id]: 'https://bscscan.com',
    [bscTestnet.id]: 'https://testnet.bscscan.com',
    [arbitrum.id]: 'https://arbiscan.io',
    [arbitrumGoerli.id]: 'https://goerli.arbiscan.io',
    [optimism.id]: 'https://optimistic.etherscan.io',
    [optimismGoerli.id]: 'https://goerli-optimism.etherscan.io',
    [base.id]: 'https://basescan.org',
    [baseGoerli.id]: 'https://goerli.basescan.org',
  };

  const explorerBase = explorers[chainId] || explorers[mainnet.id];
  return `${explorerBase}/address/${address}`;
};
