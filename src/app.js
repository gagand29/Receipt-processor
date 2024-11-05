
const express = require('express');
const receiptRoutes = require('./routes/receiptRoutes');


const app = express();
app.use(express.json());

app.use('/api/receipts', receiptRoutes);

module.exports = app;