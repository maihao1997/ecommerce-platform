require('dotenv').config({ path: __dirname + '/.env' });

const express = require('express');
const bodyParser = require('body-parser');
const tokenLedgerRoute = require('./routes/tokenLedgerRoute');
require('dotenv').config({ path: './src/tokenLedger/.env' });

const app = express();
app.use(bodyParser.json());

// Mount smart contract API
app.use('/api/tokens', tokenLedgerRoute);

const PORT = process.env.CONTRACT_PORT || 5001;
app.listen(PORT, () => {
	console.log(`TokenLedger server running on port ${PORT}`);
});