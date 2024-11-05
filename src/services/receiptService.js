const { generateUniqueId, isValidDate, isValidTime, isValidTotal, isValidItems, isOddDay, isBetween2And4PM } = require('../utils/utils');

const receipts = {};

function calculatePoints(receipt) {
  let points = 0;
  const breakdown = [];

 
  const retailerPoints = (receipt.retailer.match(/[a-zA-Z0-9]/g) || []).length;
  points += retailerPoints;
  breakdown.push(`${retailerPoints} points - retailer name (${receipt.retailer}) has ${retailerPoints} alphanumeric characters`);

 
  if (parseFloat(receipt.total) % 1 === 0) {
    points += 50;
    breakdown.push(`50 points - total is a round dollar amount`);
  }


  if (parseFloat(receipt.total) % 0.25 === 0) {
    points += 25;
    breakdown.push(`25 points - total is a multiple of 0.25`);
  }


  const itemPairsPoints = Math.floor(receipt.items.length / 2) * 5;
  points += itemPairsPoints;
  breakdown.push(`${itemPairsPoints} points - ${receipt.items.length} items (${Math.floor(receipt.items.length / 2)} pairs @ 5 points each)`);

  // 5. Additional points for item descriptions
  receipt.items.forEach(item => {
    const trimmedDescription = item.shortDescription.trim();
    if (trimmedDescription.length % 3 === 0) {
      const descriptionPoints = Math.ceil(parseFloat(item.price) * 0.2);
      points += descriptionPoints;
      breakdown.push(`${descriptionPoints} points - item "${trimmedDescription}" description length is a multiple of 3`);
    }
  });


  const day = parseInt(receipt.purchaseDate.split('-')[2], 10);
  if (isOddDay(day)) {
    points += 6;
    breakdown.push(`6 points - day ${day} is odd`);
  }

  const [hour, minute] = receipt.purchaseTime.split(':').map(Number);
  if (isBetween2And4PM(hour, minute)) {
    points += 10;
    breakdown.push(`10 points - ${receipt.purchaseTime} is between 2:00pm and 4:00pm`);
  }

  
  console.log("Total Points: " + points);
  console.log("Breakdown:");
  breakdown.forEach(line => console.log("    " + line));
  console.log("  + ---------");
  console.log("  = " + points + " points");

  return points;
}

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

function getReceiptPoints(id) {
  return receipts[id];
}

module.exports = { calculatePoints, storeReceipt, getReceiptPoints };
