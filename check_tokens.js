const { ethers } = require("ethers");
require("dotenv").config();

async function check() {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL || "https://data-seed-prebsc-1-s1.binance.org:8545");
    const pair = "0xF7735324b1aD67B34D5958ED2769CFfa98a62dff";
    const pairAbi = ["function token0() view returns (address)", "function token1() view returns (address)"];
    const pairContract = new ethers.Contract(pair, pairAbi, provider);
    
    const t0 = await pairContract.token0();
    const t1 = await pairContract.token1();
    
    console.log("Token0:", t0);
    console.log("Token1:", t1);
    console.log("USDT:  ", "0x7ef95a0FEE0Dd31b22626fA2e10Ee6A223F8a684");
    console.log("WBNB:  ", "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd");
}

check();