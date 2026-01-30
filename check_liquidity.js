const { ethers } = require("ethers");
require("dotenv").config();

async function check() {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL || "https://data-seed-prebsc-1-s1.binance.org:8545");
    const factory = "0x6725F303b657a9451d8BA641348b6761A6CC7a17";
    const usdt = "0x7ef95a0FEE0Dd31b22626fA2e10Ee6A223F8a684";
    const wbnb = "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd";
    
    const factoryAbi = ["function getPair(address, address) view returns (address)"];
    const factoryContract = new ethers.Contract(factory, factoryAbi, provider);
    const pair = await factoryContract.getPair(usdt, wbnb);
    console.log("Pair address:", pair);
    
    if (pair !== "0x0000000000000000000000000000000000000000") {
        const pairAbi = ["function getReserves() view returns (uint112, uint112, uint32)"];
        const pairContract = new ethers.Contract(pair, pairAbi, provider);
        const reserves = await pairContract.getReserves();
        console.log("Reserves:", reserves[0].toString(), reserves[1].toString());
    } else {
        console.log("Pair NOT FOUND on factory!");
    }
}

check();