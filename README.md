# ERC20 Token Generator Platform

A professional full-stack platform for creating and deploying custom ERC20 tokens on Ethereum and compatible networks.

## Features

- **One-Click Token Creation**: Deploy ERC20 tokens with customizable features
- **Feature Selection**: Choose from Mintable, Burnable, Pausable, Capped, Permit (gasless), and Ownable
- **Multi-Network Support**: Deploy to Ethereum, Sepolia, Polygon, BSC, Arbitrum, Optimism, Base
- **Professional UI**: Modern, responsive interface built with React + Vite + Tailwind CSS
- **Wallet Integration**: Seamless connection via Wagmi + Web3Modal
- **Factory Pattern**: Gas-efficient deployment through factory contract
- **Automatic Verification**: Contract verification on block explorers

## Architecture

### Monorepo Structure
```
packages/
├── contracts/          # Hardhat + Solidity smart contracts
│   ├── contracts/      # ERC20Token & ERC20TokenFactory
│   ├── scripts/        # Deployment & verification scripts
│   └── test/          # Contract test suite
└── frontend/          # Vite + React + TypeScript application
    ├── src/
    │   ├── components/ # React components
    │   ├── pages/     # Application pages
    │   ├── hooks/     # Custom Wagmi hooks
    │   └── utils/     # Utilities & ABIs
    └── public/        # Static assets
```

### Tech Stack
- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Wagmi, Web3Modal
- **Contracts**: Solidity 0.8.20, Hardhat, OpenZeppelin Contracts
- **Testing**: Hardhat Network, Chai, Mocha

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- MetaMask or compatible Web3 wallet

### Installation

1. **Clone & Install**
```bash
git clone <repository-url>
cd erc20-gen-platform
npm install
```

2. **Environment Setup**
```bash
# Copy example env files
cp packages/contracts/.env.example packages/contracts/.env
cp packages/frontend/.env.example packages/frontend/.env

# Edit with your credentials
```

3. **Start Development**
```bash
# Run both contracts (local node) and frontend
npm run dev

# Or run separately
npm run dev:contracts  # Terminal 1
npm run dev:frontend   # Terminal 2
```

## Contract Features

The platform supports creating ERC20 tokens with the following optional features:

| Feature | Description |
|---------|-------------|
| **Mintable** | Ability to mint new tokens (owner only) |
| **Burnable** | Token holders can burn their tokens |
| **Pausable** | Owner can pause/unpause all transfers |
| **Capped** | Maximum supply limit enforced |
| **Permit** | Gasless approvals via signatures (ERC-2612) |
| **Ownable** | Access control with single owner |

## Supported Networks

- Ethereum Mainnet
- Sepolia Testnet
- Polygon Mainnet
- BSC Mainnet & Testnet
- Arbitrum One & Nova
- Optimism
- Base

## Usage Guide

### 1. Connect Wallet
- Click "Connect Wallet" in the top right
- Choose your preferred wallet (MetaMask, WalletConnect, etc.)
- Switch to your desired network

### 2. Create Token
- Navigate to "Create Token" page
- Fill in token details:
  - **Name**: Your token's full name
  - **Symbol**: Token ticker (e.g., MTK)
  - **Decimals**: Usually 18
  - **Initial Supply**: Starting token amount
- Select desired features (toggle switches)
- Review deployment cost
- Click "Deploy Token"

### 3. Manage Tokens
- View all your deployed tokens in the dashboard
- Access token functions (mint, burn, pause)
- View on block explorer
- Copy contract addresses

## Configuration

### Contracts (.env)
```env
PRIVATE_KEY=your_private_key_here
SEPOLIA_RPC=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
ETHERSCAN_API_KEY=your_etherscan_key
```

### Frontend (.env)
```env
VITE_FACTORY_ADDRESS=0x...
VITE_WALLET_CONNECT_PROJECT_ID=your_project_id
```

## Testing

```bash
# Run contract tests
npm run test:contracts

# Run with coverage
npm run test:contracts -- --coverage
```

## Deployment

### Current Deployment Status

**Sepolia Testnet:**
- **ERC20TokenFactory**: `0xc20ABCFb8960DcD84ed326dA117E42Fe09462c83`
- **Status**: Deployed and Tested (31/31 tests passing)
- **Gas Used**: ~4.97M gas for factory deployment
- **Platform Fee**: 0.01 ETH

### Deploy Commands

#### Local Network
```bash
npm run deploy:local
```

#### Testnet (Sepolia)
```bash
npm run deploy:sepolia
```

#### Production
Update `packages/contracts/hardhat.config.ts` with mainnet RPC and run:
```bash
cd packages/contracts
npx hardhat run scripts/deploy.ts --network mainnet
```

### Frontend Deployment

The React frontend can be deployed to Vercel, Netlify, or any static hosting service:

```bash
cd packages/frontend
npm run build
# Deploy the dist/ folder
```

## License

MIT License - see [LICENSE](./LICENSE) file

## Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## Support

- Open an issue for bugs or feature requests
- Join our Discord community (coming soon)
- Email: sagarkarmoker.official@gmail.com

---

**Security Notice**: Never commit private keys or API keys to the repository. Always use `.env` files which are gitignored.
