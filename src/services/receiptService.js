//Name - GAGAN DODDANNA
//EMAIL - gagandoddanna@gmail.com

const { generateUniqueId, isValidDate, isValidTime, isValidTotal, isValidItems, isOddDay, isBetween2And4PM } = require('../utils/utils');

const receipts = {};

/**
 * Calculates points for a given receipt based on predefined rules.
 * @param {Object} receipt - The receipt object.
 * @param {string} receipt.retailer - The name of the retailer.
 * @param {string} receipt.purchaseDate - The date of the purchase in YYYY-MM-DD format.
 * @param {string} receipt.purchaseTime - The time of the purchase in HH:mm format.
 * @param {string} receipt.total - The total amount spent on the receipt.
 * @param {Array} receipt.items - Array of items purchased, each with a shortDescription and price.
 * @returns {number} - The total points awarded for the receipt.
 */
function calculatePoints(receipt) {
  let points = 0;
  const breakdown = [];

  // Rule 1
  const retailerPoints = (receipt.retailer.match(/[a-zA-Z0-9]/g) || []).length;
  points += retailerPoints;
  breakdown.push(`${retailerPoints} points - retailer name (${receipt.retailer}) has ${retailerPoints} alphanumeric characters`);

  // Rule 2
  if (parseFloat(receipt.total) % 1 === 0) {
    points += 50;
    breakdown.push(`50 points - total is a round dollar amount`);
  }

  // Rule 3
  if (parseFloat(receipt.total) % 0.25 === 0) {
    points += 25;
    breakdown.push(`25 points - total is a multiple of 0.25`);
  }

  // Rule 4
  const itemPairsPoints = Math.floor(receipt.items.length / 2) * 5;
  points += itemPairsPoints;
  breakdown.push(`${itemPairsPoints} points - ${receipt.items.length} items (${Math.floor(receipt.items.length / 2)} pairs @ 5 points each)`);

  // Rule 5
  receipt.items.forEach(item => {
    const trimmedDescription = item.shortDescription.trim();
    if (trimmedDescription.length % 3 === 0) {
      const descriptionPoints = Math.ceil(parseFloat(item.price) * 0.2);
      points += descriptionPoints;
      breakdown.push(`${descriptionPoints} points - item "${trimmedDescription}" description length is a multiple of 3`);
    }
  });

  // Rule 6
  const day = parseInt(receipt.purchaseDate.split('-')[2], 10);
  if (isOddDay(day)) {
    points += 6;
    breakdown.push(`6 points - day ${day} is odd`);
  }

  // Rule 7
  const [hour, minute] = receipt.purchaseTime.split(':').map(Number);
  if (isBetween2And4PM(hour, minute)) {
    points += 10;
    breakdown.push(`10 points - ${receipt.purchaseTime} is between 2:00pm and 4:00pm`);
  }

  // Log the points and breakdown for debugging
  console.log("Total Points: " + points);
  console.log("Breakdown:");
  breakdown.forEach(line => console.log("    " + line));
  console.log("  + ---------");
  console.log("  = " + points + " points");

  return points;
}

/**
 * Stores a receipt and calculates its points.
 * @param {Object} receipt - The receipt object.
 * @throws Will throw an error if the receipt data is invalid.
 * @returns {string} - The unique ID of the stored receipt.
 */
function storeReceipt(receipt) {
  if (
    typeof receipt.retailer !== 'string' ||
    !isValidDate(receipt.purchaseDate) ||
    !isValidTime(receipt.purchaseTime) ||
    !isValidTotal(receipt.total) ||
    !isValidItems(receipt.items)
  ) {
    throw new Error('Invalid receipt data');
  }

  const id = generateUniqueId();
  const points = calculatePoints(receipt);
  receipts[id] = points;
  return id;
}

/**
 * Retrieves points for a given receipt ID.
 * @param {string} id - The unique ID of the receipt.
 * @returns {number|undefined} - The points awarded or undefined if the receipt is not found.
 */
function getReceiptPoints(id) {
  return receipts[id];
}

module.exports = { calculatePoints, storeReceipt, getReceiptPoints };
