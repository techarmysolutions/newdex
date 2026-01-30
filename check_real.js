const { ethers } = require("ethers");
require("dotenv").config();

async function check() {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL || "https://data-seed-prebsc-1-s1.binance.org:8545");
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    
    console.log("Wallet:", wallet.address);
    const balance = await provider.getBalance(wallet.address);
    console.log("BNB Balance:", ethers.formatEther(balance));
    
    const usdtAddress = "0x7ef95a0FEE0Dd31b22626fA2e10Ee6A223F8a684";
    const usdtAbi = ["function balanceOf(address) view returns (uint256)"];
    const usdt = new ethers.Contract(usdtAddress, usdtAbi, provider);
    const usdtBalance = await usdt.balanceOf(wallet.address);
    console.log("USDT Balance:", ethers.formatUnits(usdtBalance, 18));
    
    const txCount = await provider.getTransactionCount(wallet.address, "latest");
    console.log("Transaction Count (Mined):", txCount);
    
    // Check pending
    const pendingCount = await provider.getTransactionCount(wallet.address, "pending");
    console.log("Total Count (incl. pending):", pendingCount);
    
    if (pendingCount > txCount) {
        console.log("Status: There are pending transactions!");
    } else {
        console.log("Status: All transactions are mined.");
    }
}

check();