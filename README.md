# Arbitrage Full Stack - Upgradeable

A production-grade flash loan arbitrage system built with:
- **Smart Contract**: Upgradeable (UUPS) Solidity contract for PancakeSwap/ApeSwap arbitrage
- **Backend**: Node.js bot with REST API and WebSocket for real-time monitoring
- **Frontend**: React dashboard for monitoring and executing trades

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- npm or yarn
- MetaMask wallet with BSC configured
- BNB for gas fees
- USDT for flash loan fees

### 1. Install Dependencies

```bash
# Root (Hardhat)
npm install

# Backend
cd backend && npm install

# Frontend
cd frontend && npm install
```

### 2. Configure Environment

Copy the example env files and fill in your values:

```bash
# Root
cp .env.example .env

# Backend
cd backend && cp .env.example .env

# Frontend
cd frontend && cp .env.example .env
```

### 3. Deploy Smart Contract

```bash
# Compile
npm run compile

# Deploy to BSC Mainnet
npm run deploy:mainnet
```

Save the **PROXY_ADDRESS** from the deployment output.

### 4. Update Configuration

Add the proxy address to:
- `backend/.env` → `CONTRACT_ADDRESS=<proxy_address>`
- `frontend/.env` → `REACT_APP_CONTRACT_ADDRESS=<proxy_address>`

### 5. Start the Application

```bash
# Terminal 1 - Backend
cd backend && npm start

# Terminal 2 - Frontend
cd frontend && npm start
```

## 📁 Project Structure

```
arbitrage_fullstack_perfected/
├── contracts/                  # Solidity smart contracts
│   └── PancakeFlashLoanUpgradeable_V2.sol
├── scripts/                    # Hardhat deployment scripts
│   ├── deploy.js
│   └── upgrade.js
├── backend/                    # Node.js API & bot
│   └── src/
│       ├── index.js           # Express server & WebSocket
│       ├── arbitrage.js       # Arbitrage monitoring logic
│       ├── config.js          # Configuration
│       └── abi/               # Contract ABIs
├── frontend/                   # React dashboard
│   └── src/
│       ├── App.js             # Main component
│       ├── constants.js       # Config constants
│       └── index.css          # Styles
├── hardhat.config.js          # Hardhat configuration
└── package.json               # Root dependencies
```

## 🔌 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check |
| `/api/contract` | GET | Contract info & balances |
| `/api/wallet` | GET | Bot wallet info |
| `/api/prices` | GET | Current DEX prices |
| `/api/opportunity` | GET | Check arbitrage opportunity |
| `/api/execute` | POST | Execute flash loan |
| `/api/withdraw` | POST | Withdraw USDT from contract |
| `/api/monitor/start` | POST | Start monitoring |
| `/api/monitor/stop` | POST | Stop monitoring |

## ⚙️ How It Works

1. **Flash Loan**: Borrow USDT from PancakeSwap pair (no collateral needed)
2. **Swap 1**: USDT → WBNB on PancakeSwap
3. **Swap 2**: WBNB → USDT on ApeSwap
4. **Repay**: Return borrowed USDT + 0.3% fee
5. **Profit**: Keep the difference

## 🔒 Security

- Contract uses UUPS upgradeable pattern
- Only owner can execute trades and withdraw
- All transactions require gas (BNB)
- Contract must have USDT for flash loan fees

## 📝 License

MIT
