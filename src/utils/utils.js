//Name - GAGAN DODDANNA
//EMAIL - gagandoddanna@gmail.com

const { v4: uuidv4 } = require('uuid');

/**
 * Generates a unique identifier using UUID.
 * @returns {string} - A unique identifier string.
 */
function generateUniqueId() {
  return uuidv4();
}

/**
 * Checks if a given date string is valid.
 * @param {string} date - The date string in YYYY-MM-DD format.
 * @returns {boolean} - Returns true if the date is valid, false otherwise.
 */
function isValidDate(date) {
  return !isNaN(new Date(date).getTime());
}

/**
 * Checks if a given time string is valid.
 * @param {string} time - The time string in HH:mm format.
 * @returns {boolean} - Returns true if the time format is valid, false otherwise.
 */
function isValidTime(time) {
  return /^\d{2}:\d{2}$/.test(time);
}

/**
 * Checks if a given total amount is a valid number.
 * @param {string|number} total - The total amount as a string or number.
 * @returns {boolean} - Returns true if the total is a valid number, false otherwise.
 */
function isValidTotal(total) {
  return !isNaN(parseFloat(total));
}

/**
 * Validates an array of items to ensure each has a short description and a valid price.
 * @param {Array} items - An array of items, where each item has a shortDescription and price.
 * @returns {boolean} - Returns true if all items are valid, false otherwise.
 */
function isValidItems(items) {
  return Array.isArray(items) && items.every(item => item.shortDescription && !isNaN(parseFloat(item.price)));
}

/**
 * Checks if a given day is an odd number.
 * @param {number} day - The day of the month.
 * @returns {boolean} - Returns true if the day is odd, false otherwise.
 */
function isOddDay(day) {
  return day % 2 !== 0;
}

/**
 * Checks if a given time is between 2:00 PM and 4:00 PM.
 * @param {number} hour - The hour component of the time (24-hour format).
 * @param {number} minute - The minute component of the time.
 * @returns {boolean} - Returns true if the time is between 2:00 PM and 4:00 PM, false otherwise.
 */
function isBetween2And4PM(hour, minute) {
  return hour === 14 || (hour === 15 && minute === 0);
}

module.exports = { generateUniqueId, isValidDate, isValidTime, isValidTotal, isValidItems, isOddDay, isBetween2And4PM };
