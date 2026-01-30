const { ethers } = require("ethers");
require("dotenv").config();

async function check() {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL || "https://data-seed-prebsc-1-s1.binance.org:8545");
    const usdtAddress = "0x7ef95a0FEE0Dd31b22626fA2e10Ee6A223F8a684";
    const usdtAbi = ["function decimals() view returns (uint8)"];
    const usdt = new ethers.Contract(usdtAddress, usdtAbi, provider);
    console.log("Decimals:", await usdt.decimals());
}

check();