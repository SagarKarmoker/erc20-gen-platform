export type TokenFeature = 
  | 'mintable'
  | 'burnable'
  | 'pausable'
  | 'permit'
  | 'flashMinting'
  | 'snapshots'
  | 'votes'
  | 'roles'
  | 'capped'
  | 'multisig';

export interface CreateTokenParams {
  name: string;
  symbol: string;
  decimals: number;
  initialSupply: string;
  maxSupply: string;
  features: TokenFeature[];
  owner: string;
}

export interface TokenInfo {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: string;
  owner: string;
  features: TokenFeature[];
  createdAt: number;
}

export interface TokenConfig {
  mintable: boolean;
  burnable: boolean;
  pausable: boolean;
  permit: boolean;
  flashMinting: boolean;
  snapshots: boolean;
  votes: boolean;
  roles: boolean;
  capped: boolean;
  multisig: boolean;
}

export interface NetworkConfig {
  chainId: number;
  name: string;
  testnet: boolean;
  factoryAddress: string;
  rpcUrl: string;
  explorerUrl: string;
}

export interface DeploymentResult {
  success: boolean;
  tokenAddress?: string;
  transactionHash?: string;
  error?: string;
}

export interface TokenEvent {
  event: string;
  args: Record<string, any>;
  blockNumber: number;
  transactionHash: string;
}
