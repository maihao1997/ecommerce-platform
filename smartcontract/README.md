# TokenLedger Smart Contract

A simple smart contract for managing token balances, allowing the owner to mint tokens and users to transfer tokens to each other.

---

## Features

- **Minting:** Only the contract owner can mint tokens to any address.
- **Transfer:** Any user can transfer their tokens to another address.
- **Balance Check:** Query the token balance of any address.
- **Events:** Emits `Mint` and `Transfer` events for off-chain tracking.

---

## Requirements

- Node.js >= 14
- Yarn (recommended) or npm
- Hardhat ^2.12.6

---

## Getting Started

### 1. Install dependencies

```bash
yarn install
# or
npm install
```

### 2. Compile contracts

```bash
yarn compile
# or
npx hardhat compile
```

### 3. Run tests

```bash
yarn test
# or
npx hardhat test
```

### 4. Start local Hardhat node

```bash
yarn start:dev
# or
npx hardhat node
```

### 5. Deploy contract to local node

```bash
yarn migrate:token-ledger
# or
npx hardhat run --network localhost scripts/migrate-deploy.js
```

After deployment, the contract address will be written to `../src/tokenLedger/.env` for backend integration.
