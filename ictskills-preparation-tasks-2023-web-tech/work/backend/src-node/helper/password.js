const crypto = require("crypto");

/**
 * Generate a password hash.
 * @param password
 * @returns {string} hash and salt separated by "$"
 */
function getHashedPassword(password) {
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");

    return `${salt}$${hash}`;
}

/**
 * Check if a password is correct.
 * @param password {string} password to check
 * @param hashAndPassword {string} hash and salt separated by "$"
 * @returns {boolean} true if password is correct, false otherwise
 */
function verifyPassword(password, hashAndPassword) {
    const parts = hashAndPassword.split("$");
    const salt = parts[0];
    const passwordHash = parts[1];
    const hashToVerify = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");

    return hashToVerify === passwordHash;
}

module.exports = {
    getHashedPassword,
    verifyPassword,
};
