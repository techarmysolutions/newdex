const { ethers } = require("ethers");
require("dotenv").config();

async function check() {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL || "https://data-seed-prebsc-1-s1.binance.org:8545");
    const contractAddress = process.env.CONTRACT_ADDRESS;
    const abi = ["function owner() view returns (address)"];
    const contract = new ethers.Contract(contractAddress, abi, provider);
    console.log("Owner:", await contract.owner());
    
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    console.log("Wallet:", wallet.address);
}

check();