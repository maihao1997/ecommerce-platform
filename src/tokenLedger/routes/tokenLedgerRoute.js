const express = require('express');
const {
	mint,
	transfer,
	getBalance,
} = require('../controllers/tokenLedgerController');

const router = express.Router();

router.post('/mint', mint);
router.post('/transfer', transfer);
router.get('/balance/:address', getBalance);

module.exports = router;