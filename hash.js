const crypto = require('crypto');

/**
 * @param {string} password - Пароль користувача.
 * @returns {string} - Захешований пароль.
 */
function encodePassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

/**
 * @param {string} email - Email користувача.
 * @returns {string} - Генерований токен.
 */
function generateToken(email) {
  const timestamp = Date.now().toString();
  return crypto.createHash('sha256').update(email + timestamp).digest('hex');
}

module.exports = { encodePassword, generateToken };
