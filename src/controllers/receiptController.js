const { storeReceipt, getReceiptPoints } = require('../services/receiptService');

// Use camelCase for function names
exports.processReceipt = (req, res) => {
  const receipt = req.body;

  try {
    const id = storeReceipt(receipt);
    res.status(200).json({ id });
  } catch (error) {
    res.status(500).json({ message: 'Invalid receipt data' });
  }
};

exports.getPoints = (req, res) => {
  const { id } = req.params;
  const points = getReceiptPoints(id);

  if (points !== undefined) {
    res.status(200).json({ points });
  } else {
    res.status(404).json({ message: 'Receipt not found' });
  }
};
