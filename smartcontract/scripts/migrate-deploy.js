const hre = require('hardhat');
const ethers = hre.ethers;
const fs = require('fs');
const path = require('path');

let envFileName = './.env';

// Load environment variables from .env file
require('dotenv').config({ path: envFileName });

const TOKENLEDGER_ENV_PATH = path.resolve(__dirname, '../../src/tokenLedger/.env');

const main = async () => {
  // Get the list of accounts
  const accounts = await hre.ethers.getSigners();
  const adminWalletAddress = accounts[0].address;
  console.log("Admin wallet address:", adminWalletAddress);

  // Deploy the TokenLedger contract
  const TokenLedger = await ethers.getContractFactory('TokenLedger');
  const tokenLedger = await TokenLedger.deploy();
  await tokenLedger.deployed();

  const contractAddress = tokenLedger.address.toLowerCase();
  console.log(`TokenLedger contract deployed at: ${contractAddress}`);

  // Read existing .env or create new content
  let envContent = '';
  if (fs.existsSync(TOKENLEDGER_ENV_PATH)) {
    envContent = fs.readFileSync(TOKENLEDGER_ENV_PATH, 'utf8');
    // Remove old CONTRACT_ADDRESS if exists
    envContent = envContent.replace(/^CONTRACT_ADDRESS=.*$/m, '');
    envContent = envContent.trim();
    if (envContent.length > 0) envContent += '\n';
  }
  envContent += `CONTRACT_ADDRESS=${contractAddress}\n`;

  fs.writeFileSync(TOKENLEDGER_ENV_PATH, envContent, 'utf8');
  console.log(`Updated CONTRACT_ADDRESS in ${TOKENLEDGER_ENV_PATH}`);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });