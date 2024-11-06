//Name - GAGAN DODDANNA
//EMAIL - gagandoddanna@gmail.com

const express = require('express');
const { processReceipt, getPoints } = require('../controllers/receiptController');

const router = express.Router();

/**
 * @route POST /process
 * @description Processes a receipt and returns a generated receipt ID.
 * @access Public
 */
router.post('/process', processReceipt);

/**
 * @route GET /:id/points
 * @description Retrieves the points awarded for a given receipt ID.
 * @param {string} id - The unique ID of the receipt.
 * @access Public
 */
router.get('/:id/points', getPoints);

module.exports = router;
