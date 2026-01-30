# CLAUDE.md - Comprehensive Context for Claude AI

> **Version**: 4.0 (January 30, 2026)  
> **Project**: DEXTER V2 - Unified V4 Full-Stack Arbitrage Node (Production-Ready)
> **Purpose**: This file provides exhaustive context for Claude to understand, modify, and extend this codebase accurately.

---

## 🧠 PROJECT UNDERSTANDING

### Core Capability (V4 Upgrade)

1. **Autonomous Mode**: The engine scans 15+ pairs every 10 seconds. If `netProfit > profitThreshold`, it executes automatically using the configured `loanProvider`.
2. **Manual Override**: Operational terminal (Network Scanner) allows manual execution of any route discovered in real-time across 6 DEXes.
3. **Multi-Pair Support**: Now supports non-stable pairs like `WBNB-ETH`, `USDT-SOL`, and `USDT-MATIC` with verified address normalization.

### Why This Bot is Best-in-Class
- **No Fake Logic**: Every UI status is backed by real RPC calls to the BSC Mainnet.
- **Strict Checksum Compliance**: All 20+ tracked assets use Ethers v6 normalized checksum addresses.
- **Zero-Fee Lending**: Optimized to prefer PancakeSwap V2 flash loans (0% fee) over Aave (0.05%).
- **Resilient RPC Layer**: Automatically rotates providers and catches silent reverts to prevent downtime.

---

## 🚀 API & EXECUTION FLOW

### Manual Trade Request (`POST /api/execute`)
```json
{
  "amount": "1000",
  "provider": "pancake",
  "opportunity": {
    "pair": "USDT-WBNB",
    "dexBuy": "ApeSwap",
    "dexSell": "PancakeSwap",
    "tokenBorrow": "0x55d39...",
    "targetRouter": "0x10ED4..."
  }
}
```
The backend resolves these into a specific Flash Loan call to the upgradeable proxy contract on BSC.

---

## 🗂️ FILE-BY-FILE BREAKDOWN

### 📄 backend/src/mainnetScanner.js (NEW)

**Purpose**: Read-only BSC Mainnet multi-pair scanner with 4 DEXes.

**Token Addresses**:
```javascript
const MAINNET_ADDRESSES = {
  USDT: "0x55d398326f99059fF775485246999027B3197955",
  BUSD: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
  USDC: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
  DAI:  "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
  WBNB: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  ETH:  "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
  BTCB: "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
  CAKE: "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
  LINK: "0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD",
  DOT:  "0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402",
  UNI:  "0xBf5140A22578168FD562DCcF235E5D43A02ce9B1"
};
```

**DEX Routers**:
```javascript
const DEX_ROUTERS = {
  PancakeSwap: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
  ApeSwap:     "0xcF0feBd3f17CEf5b47b0cD257aCf6025c5BFf3b7",
  BiSwap:      "0x3a6d8cA21D1CF76F653A67577FA0D27453350dD8",
  BakerySwap:  "0xCDe540d7eAFE93aC5fE6233Bee57E1270D3E330F"
};
```

**Trading Pairs (13 pairs)**:
```javascript
const TRADING_PAIRS = [
  { name: 'USDT-WBNB', base: 'USDT', quote: 'WBNB', baseDecimals: 18, quoteDecimals: 18 },
  { name: 'BUSD-WBNB', base: 'BUSD', quote: 'WBNB', baseDecimals: 18, quoteDecimals: 18 },
  { name: 'USDC-WBNB', base: 'USDC', quote: 'WBNB', baseDecimals: 18, quoteDecimals: 18 },
  { name: 'USDT-ETH',  base: 'USDT', quote: 'ETH',  baseDecimals: 18, quoteDecimals: 18 },
  { name: 'USDT-BTCB', base: 'USDT', quote: 'BTCB', baseDecimals: 18, quoteDecimals: 18 },
  { name: 'BUSD-ETH',  base: 'BUSD', quote: 'ETH',  baseDecimals: 18, quoteDecimals: 18 },
  { name: 'BUSD-BTCB', base: 'BUSD', quote: 'BTCB', baseDecimals: 18, quoteDecimals: 18 },
  { name: 'USDT-CAKE', base: 'USDT', quote: 'CAKE', baseDecimals: 18, quoteDecimals: 18 },
  { name: 'WBNB-ETH',  base: 'WBNB', quote: 'ETH',  baseDecimals: 18, quoteDecimals: 18 },
  { name: 'WBNB-BTCB', base: 'WBNB', quote: 'BTCB', baseDecimals: 18, quoteDecimals: 18 },
  { name: 'USDT-LINK', base: 'USDT', quote: 'LINK', baseDecimals: 18, quoteDecimals: 18 },
  { name: 'USDT-DOT',  base: 'USDT', quote: 'DOT',  baseDecimals: 18, quoteDecimals: 18 },
  { name: 'USDT-UNI',  base: 'USDT', quote: 'UNI',  baseDecimals: 18, quoteDecimals: 18 }
];
```

**Key Methods**:
```javascript
class MainnetScanner {
  constructor() {
    // Initialize ethers provider for BSC Mainnet
    // Create router contracts for all 4 DEXes
  }

  async scanPair(pair = 'USDT-WBNB', amountBase = 10000) {
    // Scan single pair across all DEXes
    // Returns best opportunity and all routes
  }

  async scanAllDexesForPair(pair, amountBase) {
    // Get all 12 route combinations for a single pair
    // (4 DEXes × 3 other DEXes = 12 routes)
  }

  async scanAllTradingPairs(amountBase = 10000) {
    // MULTI-PAIR MODE: Scan all 13 pairs
    // Returns 156 total routes (13 pairs × 12 routes)
  }

  async getPrices() {
    // Get live BNB prices from all 4 DEXes
    // Returns spread calculation
  }
}
```

---

### 📄 backend/src/testnetScanner.js (NEW)

**Purpose**: BSC Testnet multi-pair scanner with 2 DEXes.

**Trading Pairs (3 pairs)**:
```javascript
const TESTNET_PAIRS = [
  { name: 'USDT-WBNB', base: 'USDT', quote: 'WBNB', baseDecimals: 18, quoteDecimals: 18 },
  { name: 'BUSD-WBNB', base: 'BUSD', quote: 'WBNB', baseDecimals: 18, quoteDecimals: 18 },
  { name: 'USDT-BUSD', base: 'USDT', quote: 'BUSD', baseDecimals: 18, quoteDecimals: 18 }
];
```

**Methods**: Same as MainnetScanner but with testnet addresses.

---

### 📄 frontend/src/NetworkScanner.js (NEW)

**Purpose**: Unified multi-network multi-pair scanner React component.

**Features**:
- Tab-based network switching (Testnet ↔ Mainnet)
- Scan mode toggle (Single USDT-WBNB / All Pairs)
- Pair filter dropdown (filter results by trading pair)
- Live DEX price display per network
- Profitable opportunity history tracking
- Auto-scan with 5-second interval
- Responsive table with Pair column for multi-pair mode

**State Variables**:
```javascript
const [activeNetwork, setActiveNetwork] = useState('mainnet');  // 'testnet' or 'mainnet'
const [scanMode, setScanMode] = useState('single');             // 'single' or 'multi'
const [scanResults, setScanResults] = useState(null);
const [selectedPairFilter, setSelectedPairFilter] = useState('all');
const [scanHistory, setScanHistory] = useState([]);
const [autoScan, setAutoScan] = useState(false);
```

**Network Config**:
```javascript
const networks = {
  testnet: {
    name: 'BSC Testnet',
    color: '#f59e0b',
    dexes: ['PancakeSwap', 'SushiSwap'],
    pairs: ['USDT-WBNB', 'BUSD-WBNB', 'USDT-BUSD'],
    endpoint: '/api/testnet/scan',
    multiPairEndpoint: '/api/testnet/scan-all-pairs',
    pairsEndpoint: '/api/testnet/pairs',
    pricesEndpoint: '/api/testnet/prices',
  },
  mainnet: {
    name: 'BSC Mainnet',
    color: '#22c55e',
    dexes: ['PancakeSwap', 'ApeSwap', 'BiSwap', 'BakerySwap'],
    pairs: ['USDT-WBNB', 'BUSD-WBNB', ... 13 pairs],
    endpoint: '/api/mainnet/scan',
    multiPairEndpoint: '/api/mainnet/scan-all-pairs',
    ...
  }
};
```

---

### 📄 backend/src/index.js

**Purpose**: Main entry point. Runs Express server, WebSocket, and monitoring loop.

**NEW Scanner Endpoints**:
```javascript
// Mainnet Scanner Endpoints
app.get('/api/mainnet/scan', async (req, res) => {
  const amount = parseFloat(req.query.amount) || 10000;
  const result = await mainnetScanner.scanPair('USDT-WBNB', amount);
  res.json(result);
});

app.get('/api/mainnet/scan-all-pairs', async (req, res) => {
  const amount = parseFloat(req.query.amount) || 10000;
  const result = await mainnetScanner.scanAllTradingPairs(amount);
  res.json(result);
});

app.get('/api/mainnet/pairs', (req, res) => {
  res.json({ pairs: mainnetScanner.tradingPairs.map(p => p.name) });
});

app.get('/api/mainnet/prices', async (req, res) => {
  const prices = await mainnetScanner.getPrices();
  res.json(prices);
});

// Testnet Scanner Endpoints (same pattern)
app.get('/api/testnet/scan', ...);
app.get('/api/testnet/scan-all-pairs', ...);
app.get('/api/testnet/pairs', ...);
app.get('/api/testnet/prices', ...);
```

---

### 📄 backend/src/arbitrage.js

**Purpose**: Price fetching and opportunity calculation logic.

**Class: ArbitrageMonitor**

```javascript
class ArbitrageMonitor {
  constructor(provider) {
    this.provider = provider;
    this.pancakeRouter = new ethers.Contract(ROUTER, ABI, provider);
    this.sushiRouter = new ethers.Contract(ROUTER, ABI, provider);
  }

  async checkOpportunity(amountUSDT) {
    // Forward direction: Buy BNB on SushiSwap, sell on PancakeSwap
    const amountIn = ethers.parseUnits(amountUSDT.toString(), 18);
    
    // Step 1: USDT → WBNB on SushiSwap
    const bnbOut = await this.sushiRouter.getAmountsOut(amountIn, [USDT, WBNB]);
    
    // Step 2: WBNB → USDT on PancakeSwap
    const usdtOut = await this.pancakeRouter.getAmountsOut(bnbOut[1], [WBNB, USDT]);
    
    // Step 3: Calculate profit
    const flashLoanFee = amountIn * 3n / 1000n;  // 0.3%
    const profit = usdtOut[1] - amountIn - flashLoanFee;
    
    return {
      profitable: profit > 0,
      profit: ethers.formatUnits(profit, 18),
      direction: "forward"
    };
  }

  async checkReverseOpportunity(amountUSDT) {
    // Reverse: Buy BNB on PancakeSwap, sell on SushiSwap
    // Same logic, swap router order
  }

  async getPrices() {
    // Get 1 WBNB price in USDT from each DEX
    const oneWBNB = ethers.parseUnits("1", 18);
    
    const pcsPrice = await this.pancakeRouter.getAmountsOut(oneWBNB, [WBNB, USDT]);
    const sushiPrice = await this.sushiRouter.getAmountsOut(oneWBNB, [WBNB, USDT]);
    
    return {
      pancakeSwap: { bnbPrice: formatUnits(pcsPrice[1], 18) },
      apeSwap: { bnbPrice: formatUnits(sushiPrice[1], 18) },  // Named apeSwap for legacy
      spread: calculateSpread(pcsPrice, sushiPrice),
      bnbPrice: formatUnits(pcsPrice[1], 18)  // For gas calculation
    };
  }

  async getBnbPrice() {
    // Returns current BNB price for gas cost calculation
  }

  async calculateNetProfit(grossProfit, bnbPrice) {
    const gasEstimate = 300000;  // Typical arbitrage gas
    const gasPrice = await this.provider.getFeeData();
    const gasCostBNB = gasEstimate * gasPrice.gasPrice;
    const gasCostUSDT = gasCostBNB * bnbPrice;
    return grossProfit - gasCostUSDT;
  }
}
```

**Important**: The `apeSwap` naming is legacy - it actually refers to SushiSwap now.

---

## 📡 API ENDPOINTS REFERENCE

### Core Bot Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/contract` | Contract balances |
| GET | `/api/prices` | Testnet DEX prices |
| GET | `/api/opportunity?amount=X` | Check opportunity |
| POST | `/api/execute` | Execute flash loan |
| POST | `/api/monitor/start` | Start monitoring |
| POST | `/api/monitor/stop` | Stop monitoring |

### Mainnet Scanner Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/mainnet/scan?amount=X` | Single-pair scan (USDT-WBNB) |
| GET | `/api/mainnet/scan-all-pairs?amount=X` | Multi-pair scan (13 pairs) |
| GET | `/api/mainnet/prices` | All DEX prices |
| GET | `/api/mainnet/pairs` | Available trading pairs |

### Testnet Scanner Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/testnet/scan?amount=X` | Single-pair scan |
| GET | `/api/testnet/scan-all-pairs?amount=X` | Multi-pair scan (3 pairs) |
| GET | `/api/testnet/prices` | Testnet DEX prices |
| GET | `/api/testnet/pairs` | Available pairs |

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
  "availablePairs": ["USDT-WBNB", "BUSD-WBNB", "USDC-WBNB", ...],
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
    },
    // ... more opportunities
  ],
  "bestOpportunity": { ... }
}
```

---

## 🔧 COMMON MODIFICATION PATTERNS

### Adding a New Trading Pair
```javascript
// In mainnetScanner.js, add to TRADING_PAIRS array:
{ name: 'USDT-NEWTOKEN', base: 'USDT', quote: 'NEWTOKEN', baseDecimals: 18, quoteDecimals: 18 }

// Add token address to MAINNET_ADDRESSES:
NEWTOKEN: "0x..."
```

### Adding a New DEX
```javascript
// In mainnetScanner.js, add to DEX_ROUTERS:
NewDEX: "0xRouterAddress"

// In constructor, create router contract:
this.newDexRouter = new ethers.Contract(DEX_ROUTERS.NewDEX, ROUTER_ABI, this.provider);

// Add to scanAllDexesForPair loop
```

### Adding a New Network
1. Create `newNetworkScanner.js` based on mainnetScanner.js
2. Update token/router addresses
3. Add endpoints in index.js: `/api/newnetwork/*`
4. Add network config to NetworkScanner.js networks object

---

## ⚠️ CRITICAL WARNINGS

### DO NOT:
1. **Change storage variable order in contract** - Breaks proxy
2. **Remove `testingMode` from contract** - Storage slot collision
3. **Commit .env file** - Contains private key
4. **Execute mainnet trades from scanner** - READ-ONLY mode
5. **Call too many RPC requests** - Rate limiting, use delays

### DO:
1. **Use optional chaining** - `contractInfo?.usdtBalance`
2. **Check `isExecuting` before running** - Prevents concurrent calls
3. **Log all transactions to CSV** - Source of truth for stats
4. **Use ethers.js v6 syntax** - Not v5 (parseUnits not utils.parseUnits)
5. **Handle RPC errors gracefully** - Show user-friendly messages

---

## 🔍 DEBUGGING CHECKLIST

| Symptom | Check | Fix |
|---------|-------|-----|
| Multi-pair scan timeout | Too many RPC calls | Add delays between calls |
| Scanner shows no prices | Wrong RPC URL | Check provider connection |
| Pair filter not working | selectedPairFilter state | Verify filter logic |
| Routes show 0 | Router not returning data | Check token pair liquidity |
| Network tab not switching | State not resetting | Clear scanResults on switch |

---

## 🧪 TESTNET vs MAINNET

| Aspect | Testnet | Mainnet |
|--------|---------|---------|
| RPC | prebsc-1-s1.binance.org | bsc-dataseed1.binance.org |
| USDT | Test token (unlimited) | Real USDT |
| DEXes | 2 (PancakeSwap, SushiSwap) | 4 (PCS, Ape, Bi, Bakery) |
| Pairs | 3 | 13 |
| Opportunities | Frequent (low liquidity) | Rare (MEV bots) |
| Profits | Inflated ($10+) | Minimal ($0.01-1.00) |
| Scanner Mode | Execute trades | READ-ONLY |

---

## 📌 CONTEXT PRESERVATION NOTES

When making changes, always remember:

1. **Multi-platform architecture** - Supports both testnet and mainnet
2. **Multi-pair scanning** - 13 pairs on mainnet, 3 on testnet
3. **4 DEXes on mainnet** - PancakeSwap, ApeSwap, BiSwap, BakerySwap
4. **NetworkScanner is unified** - Single component handles both networks
5. **Scan modes** - Single (USDT-WBNB) and Multi (all pairs)
6. **Mainnet scanner is READ-ONLY** - No actual trades executed
7. **Bot auto-starts on server launch** - See bottom of index.js
8. **ethers.js v6** - Different syntax from v5 tutorials

---

## 📊 TRADING PAIRS QUICK REFERENCE

### Mainnet (13 pairs)
| Pair | Base | Quote | Use Case |
|------|------|-------|----------|
| USDT-WBNB | USDT | WBNB | Primary stablecoin-BNB |
| BUSD-WBNB | BUSD | WBNB | Secondary stablecoin-BNB |
| USDC-WBNB | USDC | WBNB | Circle stablecoin-BNB |
| USDT-ETH | USDT | ETH | Stablecoin-Ethereum |
| USDT-BTCB | USDT | BTCB | Stablecoin-Bitcoin |
| BUSD-ETH | BUSD | ETH | Alt stablecoin-ETH |
| BUSD-BTCB | BUSD | BTCB | Alt stablecoin-BTC |
| USDT-CAKE | USDT | CAKE | Stablecoin-PancakeSwap |
| WBNB-ETH | WBNB | ETH | BNB-Ethereum cross |
| WBNB-BTCB | WBNB | BTCB | BNB-Bitcoin cross |
| USDT-LINK | USDT | LINK | Stablecoin-Chainlink |
| USDT-DOT | USDT | DOT | Stablecoin-Polkadot |
| USDT-UNI | USDT | UNI | Stablecoin-Uniswap |

### Testnet (3 pairs)
| Pair | Base | Quote |
|------|------|-------|
| USDT-WBNB | USDT | WBNB |
| BUSD-WBNB | BUSD | WBNB |
| USDT-BUSD | USDT | BUSD |

---

*This document should be read in conjunction with AGENT.md for full context.*

*Last Updated: January 29, 2026 by Claude*
