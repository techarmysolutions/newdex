# Deployment Guide: Upgradeable Arbitrage Full-Stack (UUPS)

This guide provides the exact steps to deploy your production-grade, upgradeable arbitrage system on the Binance Smart Chain (BSC) Mainnet.

## 1. Prerequisites

Before starting, ensure you have the following:
- **Node.js & NPM:** Installed on your machine.
- **Hardhat or Foundry:** This guide assumes the use of **Hardhat**, the industry standard for EVM deployments.
- **BSC Mainnet RPC:** A provider like QuickNode, Ankr, or the public BSC RPC.
- **Deployer Wallet:** A wallet with enough BNB for gas and the initial flash loan fee.

---

## 2. Smart Contract Deployment (The 2-Step Process)

The UUPS pattern requires a specific deployment sequence. You deploy the **Implementation** first, then the **Proxy**.

### Step 1: Deploy the Implementation Contract
Deploy `PancakeFlashLoanUpgradeable.sol`. This contract contains the logic but should **never** be used directly.

1.  Compile the contract: `npx hardhat compile`
2.  Deploy the implementation:
    ```javascript
    // scripts/deploy_implementation.js
    const PancakeFlashLoan = await ethers.getContractFactory("PancakeFlashLoanUpgradeable");
    const implementation = await PancakeFlashLoan.deploy();
    await implementation.deployed();
    console.log("Implementation deployed to:", implementation.address);
    ```
3.  **Note:** Do **NOT** call `initialize()` on this address.

### Step 2: Deploy the ERC1967 Proxy
The Proxy is the address your backend and UI will interact with. It "points" to the implementation.

1.  Prepare the initialization data (using the BSC Mainnet addresses from your files):
    ```javascript
    const factory = "0xCA143Ce32Fe78f1f7019d7d551a6402fC5350c73";
    const usdt = "0x55d398326f99059fF775485246999027B3197955";
    const wbnb = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
    const pancake = "0x10ED43C718714eb63d5aA57B78B54704E256024E";
    const ape = "0xC0788A3aD43d79aa53B09c2EaCc313A787d1d607";

    const fragment = PancakeFlashLoan.interface.getFunction("initialize");
    const data = PancakeFlashLoan.interface.encodeFunctionData(fragment, [factory, usdt, wbnb, pancake, ape]);
    ```
2.  Deploy the Proxy (`ERC1967Proxy` from OpenZeppelin):
    ```javascript
    const Proxy = await ethers.getContractFactory("ERC1967Proxy");
    const proxy = await Proxy.deploy(implementation.address, data);
    await proxy.deployed();
    console.log("PROXY ADDRESS (Use this everywhere):", proxy.address);
    ```

---

## 3. Backend Configuration

1.  Navigate to the `backend/` directory.
2.  Update your `.env` or configuration file:
    -   `CONTRACT_ADDRESS`: Set this to the **Proxy Address** from Step 2.
    -   `RPC_URL`: Your BSC Mainnet RPC.
    -   `PRIVATE_KEY`: The key for the wallet that will trigger the `startFlashLoan` function.
3.  Start the bot: `npm start`

---

## 4. Frontend Configuration

1.  Navigate to the `frontend/` directory.
2.  Update the contract address in your UI configuration (e.g., `src/constants.js`):
    -   `PROXY_CONTRACT_ADDRESS`: Set this to the **Proxy Address**.
3.  The UI will now read balances and allow the owner to trigger arbitrage via the Proxy.

---

## 5. Security Checklist (Production Ready)

| Task | Status | Action |
| :--- | :---: | :--- |
| **Verify Source Code** | ⬜ | Verify both the Implementation and Proxy on BscScan. |
| **Initial Funding** | ⬜ | Send a small amount of USDT to the **Proxy Address** to cover the first flash loan fee. |
| **Ownership Check** | ⬜ | Call `owner()` on the Proxy address to ensure it returns your deployer wallet. |
| **Test Run** | ⬜ | Call `startFlashLoan` with a small amount (e.g., 100 USDT) to confirm the logic works. |

---

## 6. How to Upgrade Later

If you want to update the arbitrage logic without changing the contract address:
1.  Deploy a new implementation contract (`PancakeFlashLoanUpgradeableV2`).
2.  On the **Proxy Address**, call the `upgradeTo(newImplementationAddress)` function.
3.  Your Proxy address remains the same, your funds stay in the Proxy, but the logic is now updated!

**Congratulations! You are now running a professional-grade, upgradeable DeFi system.**
