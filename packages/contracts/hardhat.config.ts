require('@nomicfoundation/hardhat-toolbox');
require('@nomicfoundation/hardhat-verify');
require('dotenv').config();

const PRIVATE_KEY = process.env.PRIVATE_KEY || '';
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || '';
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY || '';
const BSCSCAN_API_KEY = process.env.BSCSCAN_API_KEY || '';
const ARBISCAN_API_KEY = process.env.ARBISCAN_API_KEY || '';
const OPTIMISTIC_API_KEY = process.env.OPTIMISTIC_API_KEY || '';
const BASESCAN_API_KEY = process.env.BASESCAN_API_KEY || '';

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: '0.8.20',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 31337,
    },
    localhost: {
      url: 'http://127.0.0.1:8545',
      chainId: 31337,
    },
    mainnet: {
      url: process.env.MAINNET_RPC || '',
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 1,
    },
    sepolia: {
      url: process.env.SEPOLIA_RPC || '',
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 11155111,
    },
    goerli: {
      url: process.env.GOERLI_RPC || '',
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 5,
    },
    polygon: {
      url: process.env.POLYGON_RPC || '',
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 137,
    },
    mumbai: {
      url: process.env.MUMBAI_RPC || '',
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 80001,
    },
    bsc: {
      url: process.env.BSC_RPC || '',
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 56,
    },
    bscTestnet: {
      url: process.env.BSC_TESTNET_RPC || '',
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 97,
    },
    arbitrum: {
      url: process.env.ARBITRUM_RPC || '',
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 42161,
    },
    arbitrumGoerli: {
      url: process.env.ARBITRUM_GOERLI_RPC || '',
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 421613,
    },
    optimism: {
      url: process.env.OPTIMISM_RPC || '',
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 10,
    },
    optimismGoerli: {
      url: process.env.OPTIMISM_GOERLI_RPC || '',
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 420,
    },
    base: {
      url: process.env.BASE_RPC || '',
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 8453,
    },
    baseGoerli: {
      url: process.env.BASE_GOERLI_RPC || '',
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 84531,
    },
  },
  etherscan: {
    apiKey: {
      mainnet: ETHERSCAN_API_KEY,
      sepolia: ETHERSCAN_API_KEY,
      goerli: ETHERSCAN_API_KEY,
      polygon: POLYGONSCAN_API_KEY,
      polygonMumbai: POLYGONSCAN_API_KEY,
      bsc: BSCSCAN_API_KEY,
      bscTestnet: BSCSCAN_API_KEY,
      arbitrumOne: ARBISCAN_API_KEY,
      arbitrumGoerli: ARBISCAN_API_KEY,
      optimisticEthereum: OPTIMISTIC_API_KEY,
      optimisticGoerli: OPTIMISTIC_API_KEY,
      base: BASESCAN_API_KEY,
      baseGoerli: BASESCAN_API_KEY,
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: 'USD',
  },
  typechain: {
    outDir: 'typechain-types',
    target: 'ethers-v6',
    alwaysGenerateOverloads: false,
    externalArtifacts: ['externalArtifacts/*.json'],
    dontExportCompile: false,
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
  },
};
