# DEXTER V2 - Agent Context Document (Updated v4.0)

> **Purpose**: This document provides complete context for AI agents editing this codebase. Read this FIRST before making any changes.

---

## 🎯 PROJECT OVERVIEW

**Name**: DEXTER V2 - Multi-Platform Cross-DEX Flash Loan Arbitrage Bot  
**Networks**: Binance Smart Chain (BSC) - Testnet & Mainnet  
**Strategy**: Multi-pair flash loan arbitrage across 6+ DEXes with Aave V3 Support  
**Status**: Production-ready, fully-wired V4 implementation with manual & auto-execution

### Core Concept
1. Borrow base token from **PancakeSwap V2** (0% fee) or **Aave V3** (0.05% fee)
2. Capture arbitrage spreads via multi-hop routing across a cluster of 6 DEXes.
3. Every trade is atomic; if profit isn't secured, the transaction reverts safely.
4. **V4 Wiring**: The frontend is now "Hot-Wired" to the backend with manual trigger support for any discovered route on the Mainnet.

### Supported Networks & DEXes

| Network | DEXes | Trading Pairs |
|---------|-------|---------------|
| **BSC Mainnet** | Pancake, Ape, BiSwap, Bakery, BabySwap, MDEX | 15+ pairs (incl. SOL, MATIC, ETH, BTCB) |
| **BSC Testnet** | PancakeSwap, SushiSwap, Aave V3 Pool | 3 pairs |

---

## 🏗️ SYSTEM ARCHITECTURE & WIRING

### 1. The Execution Gateway (`backend/src/index.js`)
The `/api/execute` endpoint is the brain of the system. It handles:
- **Dynamic Routing**: Accepts `pair`, `dexBuy`, and `dexSell` from the UI.
- **Symbol Resolution**: Automatically maps symbols (e.g., "ADA", "MATIC") to verified checksummed addresses.
- **DEX Mapping**: Routes trades through the correct router addresses (e.g., MDEX vs BakerySwap).

### 2. The Multi-Pair Engine (`backend/src/mainnetScanner.js`)
- **Parallel Scanning**: Pulls quotes from 156+ route combinations in parallel using `Promise.all`.
- **Fault Tolerance**: Catch-all for `0x` empty liquidity response and `could not decode` errors.
- **RPC Rotation**: Rotates between multiple BSC nodes to avoid rate-limiting during high-frequency scans.

### 3. The Live Dashboard (`frontend/src/App.js` & `NetworkScanner.js`)
- **Infrastructure Grid**: Real-time status tracker for all 6 DEXes and Aave integration.
- **Manual Trade Terminal**: Allows operators to execute specific profitable routes discovered by the scanner.
- **Socket Stream**: Real-time WebSocket feed for cross-DEX price spreads.

---

## 📁 PROJECT STRUCTURE

```
arbitrage_fullstack_perfected/
├── backend/                    # Node.js Express API + Bot Logic
│   ├── src/
│   │   ├── index.js           # Main server, WebSocket, API endpoints
│   │   ├── config.js          # Environment config, addresses, settings
│   │   ├── arbitrage.js       # Price monitoring & opportunity detection
│   │   ├── mainnetScanner.js  # BSC Mainnet multi-pair scanner (RPC Rotation)
│   │   ├── testnetScanner.js  # BSC Testnet multi-pair scanner
│   │   └── abi/               # Contract ABIs (ArbitrageBot_V3.json)
│   ├── .env                   # PRIVATE KEYS (gitignored)
│   ├── transactions.csv       # Trade history log
│   └── package.json
│
├── frontend/                   # React Dashboard (DEXTER V2 UI)
│   ├── src/
│   │   ├── App.js             # Main dashboard component (Source selector)
│   │   ├── NetworkScanner.js  # Unified Multi-Network Multi-Pair Scanner
│   │   ├── index.css          # Styling (dark theme, animations)
│   │   └── constants.js       # API URLs, chain config
│   └── package.json
│
├── contracts/                  # Solidity Smart Contracts
│   └── PancakeFlashLoanUpgradeable_V2.sol  # Main arbitrage contract
│
├── scripts/                    # Deployment & utility scripts
│   ├── deploy.js              # Deploy new contract
│   ├── upgrade.js             # Upgrade proxy implementation
│   └── *.js                   # Various check/debug scripts
│
├── .openzeppelin/             # Proxy deployment data
│   └── bsc-testnet.json       # Deployed proxy addresses
│
└── hardhat.config.js          # Hardhat configuration
```

---

## 🔑 CRITICAL ADDRESSES

### BSC TESTNET
| Entity | Address |
|--------|---------|
| **Arbitrage Contract (Proxy)** | `0x4BFf5509163c715D94b52Bf9EbBa3dB6FC4F8fB2` |
| **Owner Wallet** | `0x62ae3dA03b17Fe62209a77d0891CdDe3CACE79b2` |
| **USDT (Testnet)** | `0x7ef95a0FEE0Dd31b22626fA2e10Ee6A223F8a684` |
| **WBNB (Testnet)** | `0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd` |
| **PancakeSwap Router** | `0xD99D1c33F9fC3444f8101754aBC46c52416550D1` |
| **SushiSwap Router** | `0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506` |

### BSC MAINNET
| Entity | Address |
|--------|---------|
| **USDT** | `0x55d398326f99059fF775485246999027B3197955` |
| **BUSD** | `0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56` |
| **USDC** | `0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d` |
| **WBNB** | `0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c` |
| **ETH** | `0x2170Ed0880ac9A755fd29B2688956BD959F933F8` |
| **BTCB** | `0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c` |
| **CAKE** | `0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82` |
| **LINK** | `0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD` |
| **DOT** | `0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402` |
| **UNI** | `0xBf5140A22578168FD562DCcF235E5D43A02ce9B1` |
| **PancakeSwap Router** | `0x10ED43C718714eb63d5aA57B78B54704E256024E` |
| **ApeSwap Router** | `0xcF0feBd3f17CEf5b47b0cD257aCf6025c5BFf3b7` |
| **BiSwap Router** | `0x3a6d8cA21D1CF76F653A67577FA0D27453350dD8` |
| **BakerySwap Router** | `0xCDe540d7eAFE93aC5fE6233Bee57E1270D3E330F` |

---

## 🔍 MULTI-PAIR SCANNER FEATURE

### Trading Pairs (Mainnet - 13 pairs)
```
USDT-WBNB, BUSD-WBNB, USDC-WBNB, USDT-ETH, USDT-BTCB,
BUSD-ETH, BUSD-BTCB, USDT-CAKE, WBNB-ETH, WBNB-BTCB,
USDT-LINK, USDT-DOT, USDT-UNI
```

### Trading Pairs (Testnet - 3 pairs)
```
USDT-WBNB, BUSD-WBNB, USDT-BUSD
```

### Scanner API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/mainnet/scan?amount=X` | Single-pair scan (USDT-WBNB) |
| GET | `/api/mainnet/scan-all-pairs?amount=X` | **Multi-pair scan (all 13 pairs)** |
| GET | `/api/mainnet/prices` | Live prices from all DEXes |
| GET | `/api/mainnet/pairs` | List available trading pairs |
| GET | `/api/testnet/scan?amount=X` | Testnet single-pair scan |
| GET | `/api/testnet/scan-all-pairs?amount=X` | **Testnet multi-pair scan** |
| GET | `/api/testnet/prices` | Testnet DEX prices |
| GET | `/api/testnet/pairs` | Testnet available pairs |

### Multi-Pair Scan Response Format
```json
{
  "success": true,
  "network": "mainnet",
  "scanMode": "multi-pair",
  "pairCount": 13,
  "dexCount": 4,
  "totalRoutes": 156,
  "profitableCount": 3,
  "availablePairs": ["USDT-WBNB", "BUSD-WBNB", ...],
  "opportunities": [
    {
      "pair": "USDT-WBNB",
      "dexBuy": "PancakeSwap",
      "dexSell": "BiSwap",
      "quoteReceived": 16.234567,
      "baseOut": 10045.23,
      "grossProfit": 45.23,
      "netProfit": 12.45,
      "profitable": true
    }
  ],
  "bestOpportunity": { ... }
}
```

---

## 📝 SMART CONTRACT DETAILS

### File: `contracts/PancakeFlashLoanUpgradeable_V2.sol`

**Pattern**: UUPS Upgradeable Proxy (OpenZeppelin)

**Key Functions**:
```solidity
function startFlashLoan(uint256 amountUSDT) external onlyOwner
// Initiates flash loan from PancakeSwap USDT/WBNB pair

function pancakeCall(address sender, uint256, uint256, bytes calldata data) external
// Callback executed by PancakeSwap after receiving borrowed funds

function withdrawUSDT() external onlyOwner
// Withdraw accumulated profits to owner wallet

function setAddresses(...) external onlyOwner
// Update DEX router addresses (for upgrades)
```

---

## 🖥️ BACKEND API REFERENCE

### File: `backend/src/index.js`

**Server**: Express.js on port 3001  
**WebSocket**: ws://localhost:3001 (real-time updates)

### Core REST Endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/contract` | Contract USDT/BNB balances |
| GET | `/api/wallet` | Owner wallet balances |
| GET | `/api/prices` | Current DEX prices |
| GET | `/api/opportunity?amount=X` | Check arbitrage opportunity |
| GET | `/api/trades` | Trade history + stats from CSV |
| POST | `/api/execute` | Execute flash loan manually |
| POST | `/api/withdraw` | Withdraw profits |
| POST | `/api/monitor/start` | Start auto-monitoring |
| POST | `/api/monitor/stop` | Stop auto-monitoring |

### Scanner Files:
- **mainnetScanner.js**: BSC Mainnet multi-pair scanner (4 DEXes, 13 pairs)
- **testnetScanner.js**: BSC Testnet multi-pair scanner (2 DEXes, 3 pairs)

---

## 🎨 FRONTEND COMPONENTS

### File: `frontend/src/NetworkScanner.js`

**Purpose**: Unified multi-network multi-pair scanner UI

**Features**:
- Tab-based network switching (Testnet/Mainnet)
- Scan mode toggle (Single USDT-WBNB / All Pairs)
- Pair filter dropdown for multi-pair results
- Live DEX price display
- Profitable opportunity history
- Auto-scan with 5-second interval

**State Variables**:
```javascript
activeNetwork      // 'testnet' or 'mainnet'
scanMode           // 'single' (USDT-WBNB) or 'multi' (all pairs)
scanResults        // Current scan results with opportunities[]
selectedPairFilter // Filter opportunities by pair
scanHistory        // Profitable opportunities history
```

### File: `frontend/src/App.js`

**Purpose**: Main bot controller dashboard

**Sections**:
1. Header with Engine Status
2. Stats Grid (Scans, Success, Failed, Profit)
3. Bot Controller (Amount, Threshold, Start/Stop)
4. Node Balances (Contract USDT, Gas Reserve)
5. Token Flow Diagram
6. Multi-Network Scanner link
7. Audit Log + Terminal

---

## ⚙️ CONFIGURATION

### File: `backend/src/config.js`

```javascript
module.exports = {
  RPC_URL: process.env.RPC_URL,
  PRIVATE_KEY: process.env.PRIVATE_KEY,
  CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS,
  IS_TESTNET: true/false,  // Auto-detected from RPC URL
  SIMULATION_MODE: false,
  
  ADDRESSES: {  // Auto-switches testnet/mainnet
    USDT, WBNB, PANCAKE_FACTORY, 
    PANCAKE_ROUTER, APESWAP_ROUTER
  },
  
  MIN_PROFIT_THRESHOLD: 0.5,              // Minimum profit in USDT
  FLASH_LOAN_AMOUNT: 100,                 // Default loan size
  POLL_INTERVAL: 3000,                    // Scan every 3 seconds
  AUTO_EXECUTE: true,                     // Execute when profitable
  MAX_GAS_PRICE: 3 gwei,                  // Max gas to pay
  GAS_LIMIT: 600000,                      // Gas limit per tx
  API_PORT: 3001
};
```

### File: `backend/.env` (SENSITIVE - gitignored)
```
PRIVATE_KEY=0x...
RPC_URL=https://data-seed-prebsc-1-s1.binance.org:8545
CONTRACT_ADDRESS=0x4BFf5509163c715D94b52Bf9EbBa3dB6FC4F8fB2
MIN_PROFIT_THRESHOLD=0.01
FLASH_LOAN_AMOUNT=100
```

---

## 📊 DATA PERSISTENCE

### Trade History: `backend/transactions.csv`

**Headers**: `TIMESTAMP,TYPE,HASH,DIRECTION,AMOUNT_USDT,PROFIT_USDT,STATUS,ERROR_REASON`

---

## 🚀 DEPLOYMENT COMMANDS

```bash
# Install dependencies
cd backend && npm install
cd frontend && npm install

# Start backend (port 3001)
cd backend && npm start

# Build & serve frontend (production)
cd frontend && npm run build
# Frontend is served from backend/public

# Deploy new contract
npx hardhat run scripts/deploy.js --network bscTestnet

# Upgrade existing proxy
npx hardhat run scripts/upgrade.js --network bscTestnet
```

---

## ⚠️ COMMON ISSUES & FIXES

| Issue | Cause | Fix |
|-------|-------|-----|
| `Cannot read properties of null` | React state not initialized | Use optional chaining: `walletInfo?.balance` |
| `ethers is not defined` | Missing import | Add `const { ethers } = require("ethers")` |
| Port 3001 in use | Previous server didn't stop | `taskkill /F /IM node.exe` |
| Flash loan reverts | Not enough profit after fees | Normal - bot protecting funds |
| Multi-pair scan slow | Too many pairs | Use single-pair mode for quick scans |

---

## 🔄 RECENT CHANGES LOG

1. **Multi-Pair Scanner**: Added support for 13 mainnet trading pairs, 3 testnet pairs
2. **Multi-DEX Support**: 4 DEXes on mainnet (PancakeSwap, ApeSwap, BiSwap, BakerySwap)
3. **NetworkScanner Component**: Unified scanner with network tabs and scan modes
4. **Scan Mode Toggle**: Switch between single-pair (USDT-WBNB) and multi-pair scanning
5. **Pair Filter**: Filter multi-pair results by specific trading pair
6. **New API Endpoints**: `/api/*/scan-all-pairs`, `/api/*/pairs`
7. **Dynamic URL Detection**: Auto-detect API URL for any deployment

---

## 📌 IMPORTANT NOTES FOR AGENTS

1. **Never expose PRIVATE_KEY** - It's in .env which is gitignored
2. **Contract is PROXY** - Use upgrade.js, not deploy.js for changes
3. **Mainnet scanner is READ-ONLY** - No trades executed from scanner
4. **Multi-pair scans are slower** - 13 pairs × 4 DEXes = many RPC calls
5. **Bot auto-starts on server launch** - See bottom of index.js
6. **CSV is source of truth** - Stats are calculated from CSV, not memory

---

## 🎯 SCANNER CLASS METHODS

### MainnetScanner (backend/src/mainnetScanner.js)
```javascript
class MainnetScanner {
  async scanPair(pair, amount)           // Scan single pair across all DEXes
  async scanAllDexesForPair(pair, amount) // Get all route combinations for a pair
  async scanAllTradingPairs(amount)      // Scan ALL 13 pairs (multi-pair mode)
  async getPrices()                       // Get current prices from all DEXes
}
```

### TestnetScanner (backend/src/testnetScanner.js)
```javascript
class TestnetScanner {
  async scanPair(pair, amount)           // Scan single pair across DEXes
  async scanAllDexesForPair(pair, amount) // Get all route combinations
  async scanAllTradingPairs(amount)      // Scan ALL 3 testnet pairs
  async getPrices()                       // Get testnet DEX prices
}
```

---

*Last Updated: January 29, 2026*
