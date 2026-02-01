import { mainnet, polygon, arbitrum, optimism, base, sepolia, goerli, polygonMumbai } from 'wagmi/chains';

export const SUPPORTED_NETWORKS = [
  { chainId: mainnet.id, name: 'Ethereum', testnet: false },
  { chainId: polygon.id, name: 'Polygon', testnet: false },
  { chainId: arbitrum.id, name: 'Arbitrum', testnet: false },
  { chainId: optimism.id, name: 'Optimism', testnet: false },
  { chainId: base.id, name: 'Base', testnet: false },
  { chainId: sepolia.id, name: 'Sepolia', testnet: true },
  { chainId: goerli.id, name: 'Goerli', testnet: true },
  { chainId: polygonMumbai.id, name: 'Mumbai', testnet: true },
];

export const FACTORY_ADDRESS = '0x1234567890123456789012345678901234567890' as `0x${string}`;

export const FACTORY_ABI = [
  {
    inputs: [
      { name: 'name', type: 'string' },
      { name: 'symbol', type: 'string' },
      { name: 'decimals', type: 'uint8' },
      { name: 'initialSupply', type: 'uint256' },
      { name: 'maxSupply', type: 'uint256' },
      { name: 'features', type: 'tuple', components: [
        { name: 'mintable', type: 'bool' },
        { name: 'burnable', type: 'bool' },
        { name: 'pausable', type: 'bool' },
        { name: 'permit', type: 'bool' },
        { name: 'flashMinting', type: 'bool' },
        { name: 'snapshots', type: 'bool' },
        { name: 'votes', type: 'bool' },
        { name: 'roles', type: 'bool' },
        { name: 'capped', type: 'bool' },
        { name: 'multisig', type: 'bool' },
      ]},
      { name: 'owner', type: 'address' },
    ],
    name: 'createToken',
    outputs: [{ name: 'tokenAddress', type: 'address' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: 'owner', type: 'address' }],
    name: 'getTokensByOwner',
    outputs: [{ name: 'tokens', type: 'tuple[]', components: [
      { name: 'tokenAddress', type: 'address' },
      { name: 'name', type: 'string' },
      { name: 'symbol', type: 'string' },
      { name: 'decimals', type: 'uint8' },
      { name: 'totalSupply', type: 'uint256' },
      { name: 'owner', type: 'address' },
      { name: 'features', type: 'string[]' },
      { name: 'createdAt', type: 'uint256' },
    ]}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getAllTokens',
    outputs: [{ name: 'tokens', type: 'tuple[]', components: [
      { name: 'tokenAddress', type: 'address' },
      { name: 'name', type: 'string' },
      { name: 'symbol', type: 'string' },
      { name: 'decimals', type: 'uint8' },
      { name: 'totalSupply', type: 'uint256' },
      { name: 'owner', type: 'address' },
      { name: 'features', type: 'string[]' },
      { name: 'createdAt', type: 'uint256' },
    ]}],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

export const ERC20_ABI = [
  {
    inputs: [],
    name: 'name',
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: 'amount', type: 'uint256' }],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pause',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'unpause',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

export const formatAddress = (address: string | undefined): string => {
  if (!address) return '';
  if (address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const getExplorerUrl = (address: string, chainId?: number): string => {
  const explorers: Record<number, string> = {
    [mainnet.id]: 'https://etherscan.io',
    [polygon.id]: 'https://polygonscan.com',
    [arbitrum.id]: 'https://arbiscan.io',
    [optimism.id]: 'https://optimistic.etherscan.io',
    [base.id]: 'https://basescan.org',
    [sepolia.id]: 'https://sepolia.etherscan.io',
    [goerli.id]: 'https://goerli.etherscan.io',
    [polygonMumbai.id]: 'https://mumbai.polygonscan.com',
  };

  const baseUrl = chainId ? explorers[chainId] : explorers[mainnet.id];
  return `${baseUrl}/address/${address}`;
};
