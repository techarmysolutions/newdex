const { ethers } = require("ethers");
require("dotenv").config();

async function check() {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL || "https://data-seed-prebsc-1-s1.binance.org:8545");
    const contractAddress = process.env.CONTRACT_ADDRESS;
    const abi = [
        "function USDT() view returns (address)",
        "function WBNB() view returns (address)",
        "function PANCAKE_ROUTER() view returns (address)",
        "function APESWAP_ROUTER() view returns (address)"
    ];
    
    const contract = new ethers.Contract(contractAddress, abi, provider);
    console.log("USDT:", await contract.USDT());
    console.log("WBNB:", await contract.WBNB());
    console.log("PANCAKE_ROUTER:", await contract.PANCAKE_ROUTER());
    console.log("APESWAP_ROUTER:", await contract.APESWAP_ROUTER());
}

check();