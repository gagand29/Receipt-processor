const { v4: uuidv4 } = require('uuid');

function generateUniqueId() {
  return uuidv4();
}

function isValidDate(date) {
  return !isNaN(new Date(date).getTime());
}

function isValidTime(time) {
  return /^\d{2}:\d{2}$/.test(time);
}

function isValidTotal(total) {
  return !isNaN(parseFloat(total));
}

function isValidItems(items) {
  return Array.isArray(items) && items.every(item => item.shortDescription && !isNaN(parseFloat(item.price)));
}

function isOddDay(day) {
  return day % 2 !== 0;
}

function isBetween2And4PM(hour, minute) {
  return hour === 14 || (hour === 15 && minute === 0);
}

module.exports = { generateUniqueId, isValidDate, isValidTime, isValidTotal, isValidItems, isOddDay, isBetween2And4PM };
