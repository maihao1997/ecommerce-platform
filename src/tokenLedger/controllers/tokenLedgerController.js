const tokenLedgerService = require('../services/tokenLedgerService');

exports.mint = async (req, res) => {
	const { to, amount } = req.body;
	try {
		const txHash = await tokenLedgerService.mint(to, amount);
		res.json({ success: true, txHash });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

exports.transfer = async (req, res) => {
	const { fromPrivateKey, to, amount } = req.body;
	try {
		const txHash = await tokenLedgerService.transfer(fromPrivateKey, to, amount);
		res.json({ success: true, txHash });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

exports.getBalance = async (req, res) => {
	const { address } = req.params;
	try {
		const balance = await tokenLedgerService.getBalance(address);
		res.json({ address, balance: balance.toString() });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};