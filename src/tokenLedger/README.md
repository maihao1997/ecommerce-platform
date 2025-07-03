# TokenLedger Backend Service

This is a Node.js/Express backend service for interacting with the TokenLedger smart contract.  
It provides RESTful API endpoints for minting tokens, transferring tokens, and checking balances, designed for easy integration with your frontend or other backend services.

---

## Features

- **Mint tokens** (owner only)
- **Transfer tokens** between users
- **Check token balance** of any address
- Reads contract ABI and address from configuration
- Simple REST API, ready for integration

---

## Folder Structure

```
src/tokenLedger/
  index.js                # Entry point for the Express server
  README.md               # This file
  abis/                   # Contains TokenLedger.json (contract ABI)
  controllers/            # Request handlers for each API endpoint
  routes/                 # Express route definitions
  services/               # Logic for interacting with the smart contract
  .env                    # Environment variables (contract address, RPC, etc.)
```

---

## Environment Variables

Create a `.env` file in this folder with the following variables:

```
CONTRACT_ADDRESS=0x...         # Deployed TokenLedger contract address
OWNER_PRIVATE_KEY=0x...        # Private key of the contract owner (for minting)
RPC_URL=http://localhost:8545  # Ethereum node RPC URL (e.g., Hardhat node)
CONTRACT_PORT=5001             # Port for this backend service (optional, default: 5001)
```

---

## How to Run

1. **Install dependencies** (from project root, if using shared package.json):

   ```bash
   npm install
   ```

   Or, if you have a separate package.json in this folder:

   ```bash
   cd src/tokenLedger
   npm install
   ```

2. **Start the server:**

   ```bash
   node src/tokenLedger/index.js
   ```
   Or, if inside this folder:
   ```bash
   node index.js
   ```

   The server will run on `http://localhost:5001` (or the port you set).

---

## API Endpoints

### Mint Tokens (Owner only)
- **POST** `/api/tokens/mint`
- **Body:**
  ```json
  { "to": "0xRecipientAddress", "amount": 100 }
  ```
- **Response:**
  ```json
  { "success": true, "txHash": "0x..." }
  ```

### Transfer Tokens
- **POST** `/api/tokens/transfer`
- **Body:**
  ```json
  { "fromPrivateKey": "0xSenderPrivateKey", "to": "0xRecipientAddress", "amount": 50 }
  ```
- **Response:**
  ```json
  { "success": true, "txHash": "0x..." }
  ```

### Check Balance
- **GET** `/api/tokens/balance/:address`
- **Response:**
  ```json
  { "address": "0x...", "balance": "100" }
  ```

---

## Integration Notes

- The contract ABI must be present at `src/tokenLedger/abis/TokenLedger.json`.
- The contract address is read from `.env`.
- For local development, ensure your Ethereum node (e.g., Hardhat) is running and the contract is deployed.

