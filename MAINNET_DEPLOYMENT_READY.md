# 🚀 DEXTER V2 Mainnet Ready Setup

Your bot is now equipped with **"Ultra-Speed Multi-Pair Logic"** and real-world gas awareness. It scans 13 major pairs across 4 DEXes simultaneously on every new block.

### 📋 Mainnet Deployment Checklist

#### 1. UPDATE YOUR .ENV FILE
Open `backend/.env` and update the following variables:
```dotenv
# USE A REAL RPC (Private nodes like QuickNode or Moralis are best for speed)
RPC_URL=https://bsc-dataseed1.binance.org
WS_RPC_URL=wss://bsc-ws-node.nariox.org:443  # Use WebSocket for lower latency

# YOUR REAL PRIVATE KEY (Ensure it has at least 0.1 BNB for gas)
PRIVATE_KEY=your_real_private_key_here

# SET TO FALSE FOR REAL TRADING
SIMULATION_MODE=false

# YOUR NEWLY DEPLOYED MAINNET CONTRACT
CONTRACT_ADDRESS=your_deployed_mainnet_proxy_address
```

#### 2. DEPLOY THE CONTRACT TO MAINNET
You must deploy a fresh instance of the contract to the BSC Mainnet.
1. In your terminal, run:
   `npx hardhat run scripts/deploy.js --network mainnet`
2. Copy the resulting **Proxy Address** into your `.env` file.

#### 3. FUND THE CONTRACT
Send a minimum of **$1,000 USDT** to your `CONTRACT_ADDRESS` on Mainnet. Arbitrage requires capital to be held inside the contract to execute the "borrow-repay" cycle profitably.

#### 4. BOT SETTINGS FOR MAINNET
*   **Flash Loan Size**: Recommend $10,000+ (This increases the chance that a tiny 0.1% spread covers the gas).
*   **Min Profit Trigger**: Set to at least **$1.00** net profit in the UI.

### 🛡️ Mainnet Extreme Performance Features:
*   **Block-Driven Execution**: No polling delays. The bot reacts the millisecond a new block is produced.
*   **Parallel Multi-Pair Scanning**: Checks 150+ route combinations concurrently (USDT-WBNB, BTCB-USDT, ETH-USDT, etc.).
*   **4-DEX Support**: Scans PancakeSwap, BiSwap, ApeSwap, and MDEX simultaneously.
*   **Auto Gas Calculation**: Fetches real-time Gwei to guarantee net profitability.

**WARNING:** Cryptocurrency arbitrage involves risk. Ensure you have tested the logic thoroughly on Testnet before committing significant capital.
