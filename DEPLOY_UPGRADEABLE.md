
UPGRADEABLE DEPLOYMENT (UUPS)

1. Deploy PancakeFlashLoanUpgradeable.sol (implementation)
2. Deploy ERC1967Proxy with:
   - implementation address
   - encoded initialize() calldata

Example initialize parameters (BSC Mainnet):
FACTORY = 0xCA143Ce32Fe78f1f7019d7d551a6402fC5350c73
USDT    = 0x55d398326f99059fF775485246999027B3197955
WBNB    = 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c
PANCAKE = 0x10ED43C718714eb63d5aA57B78B54704E256024E
APE     = 0xC0788A3aD43d79aa53B09c2EaCc313A787d1d607

3. Interact ONLY with the proxy address
4. Upgrade via upgradeTo(newImplementation)

SECURITY:
- Only owner can upgrade
- No storage collisions
- No hidden delegatecall backdoors
