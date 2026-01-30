const fs = require('fs');
const path = require('path');

const artifactPath = path.join(__dirname, 'artifacts/contracts/ArbitrageBot_V3.sol/ArbitrageBot_V3.json');
const backendPath = path.join(__dirname, 'backend/src/abi/ArbitrageContract.json');
const frontendPath = path.join(__dirname, 'frontend/src/abi/ArbitrageContract.json');

try {
  const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));
  const abiJson = JSON.stringify(artifact.abi, null, 2);
  
  fs.writeFileSync(backendPath, abiJson);
  console.log('✅ ABI updated successfully in backend/src/abi/ArbitrageContract.json');
  
  fs.writeFileSync(frontendPath, abiJson);
  console.log('✅ ABI updated successfully in frontend/src/abi/ArbitrageContract.json');
} catch (error) {
  console.error('❌ Failed to update ABI:', error.message);
}
