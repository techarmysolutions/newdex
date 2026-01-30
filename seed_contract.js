const { ethers } = require("ethers");
require("dotenv").config();

async function send() {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL || "https://data-seed-prebsc-1-s1.binance.org:8545");
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    
    const usdtAddress = "0x7ef95a0FEE0Dd31b22626fA2e10Ee6A223F8a684";
    const contractAddress = process.env.CONTRACT_ADDRESS;
    const usdtAbi = ["function transfer(address, uint256) returns (bool)"];
    
    const usdt = new ethers.Contract(usdtAddress, usdtAbi, wallet);
    console.log("Sending 1 USDT to contract...");
    const tx = await usdt.transfer(contractAddress, ethers.parseUnits("1.0", 18));
    console.log("Tx sent:", tx.hash);
    await tx.wait();
    console.log("Confirmed!");
}

send();