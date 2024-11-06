//Name - GAGAN DODDANNA
//EMAIL - gagandoddanna@gmail.com

const { storeReceipt, getReceiptPoints } = require('../services/receiptService');

/**
 * @function processReceipt
 * @description Handles the receipt processing and returns a generated ID.
 * @param {Object} req - The request object from the client, containing the receipt data in `req.body`.
 * @param {Object} res - The response object used to send back the status and JSON data.
 * @returns {void} Responds with a JSON object containing the generated receipt ID or an error message.
 */
exports.processReceipt = (req, res) => {
  const receipt = req.body;

  try {
    const id = storeReceipt(receipt);
    res.status(200).json({ id });
  } catch (error) {
    res.status(500).json({ message: 'Invalid receipt data' });
  }
};

/**
 * @function getPoints
 * @description Retrieves the points for a given receipt ID.
 * @param {Object} req - The request object from the client, containing the receipt ID in `req.params`.
 * @param {Object} res - The response object used to send back the status and JSON data.
 * @returns {void} Responds with a JSON object containing the points or an error message if the receipt ID is not found.
 */
exports.getPoints = (req, res) => {
  const { id } = req.params;
  const points = getReceiptPoints(id);

  if (points !== undefined) {
    res.status(200).json({ points });
  } else {
    res.status(404).json({ message: 'Receipt not found' });
  }
};
