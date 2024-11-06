//Name - GAGAN DODDANNA
//EMAIL - gagandoddanna@gmail.com

const express = require('express');
const receiptRoutes = require('./routes/receiptRoutes');

const app = express();

/**
 * Middleware to parse incoming JSON requests.
 */
app.use(express.json());

/**
 * Routes for handling receipt processing and point retrieval.
 * All routes are prefixed with '/receipts'.
 */
app.use('/receipts', receiptRoutes);

module.exports = app;
