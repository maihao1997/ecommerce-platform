const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');

// Load ABI
const abiPath = path.join(__dirname, '../abis/TokenLedger.json');
const TokenLedgerABI = JSON.parse(fs.readFileSync(abiPath));

// Load env
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
console.log('CONTRACT_ADDRESS', CONTRACT_ADDRESS);
const RPC_URL = process.env.RPC_URL || 'http://localhost:8545';
const OWNER_PRIVATE_KEY = process.env.OWNER_PRIVATE_KEY;

// Provider & owner wallet
const provider = new ethers.JsonRpcProvider(RPC_URL);
const ownerWallet = OWNER_PRIVATE_KEY ? new ethers.Wallet(OWNER_PRIVATE_KEY, provider) : null;
const contract = new ethers.Contract(CONTRACT_ADDRESS, TokenLedgerABI.abi, ownerWallet || provider);

exports.mint = async (to, amount) => {
	if (!ownerWallet) throw new Error('Owner private key not set');
	const tx = await contract.mint(to, amount);
	await tx.wait();
	return tx.hash;
};

exports.transfer = async (fromPrivateKey, to, amount) => {
	const fromWallet = new ethers.Wallet(fromPrivateKey, provider);
	const fromContract = contract.connect(fromWallet);
	const tx = await fromContract.transfer(to, amount);
	await tx.wait();
	return tx.hash;
};

exports.getBalance = async (address) => {
	return await contract.balanceOf(address);
};