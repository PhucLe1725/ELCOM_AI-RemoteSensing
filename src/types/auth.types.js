// Auth API Request Types
/**
 * @typedef {Object} LoginRequest
 * @property {string} email - Email address (valid email format)
 * @property {string} password - Password (min 6 characters)
 */

/**
 * @typedef {Object} RegisterRequest
 * @property {string} username - Username
 * @property {string} email - Email address (valid email format)
 * @property {string} password - Password (min 6 characters)
 * @property {string} role - User role ("User" or "Admin")
 */

// Auth API Response Types
/**
 * @typedef {Object} LoginResponse
 * @property {boolean} success - Whether login was successful
 * @property {string|null} token - JWT access token
 * @property {string|null} refreshToken - Refresh token
 * @property {string|null} expiresAt - Token expiration timestamp
 * @property {string} message - Response message
 */

/**
 * @typedef {Object} RegisterResponse
 * @property {boolean} success - Whether registration was successful
 * @property {string} message - Response message
 */

// Validation Error Type
/**
 * @typedef {Object} ValidationError
 * @property {string} type - Error type
 * @property {string} title - Error title
 * @property {number} status - HTTP status code
 * @property {Object.<string, string[]>} errors - Validation errors by field
 */

// User Type (decoded from JWT)
/**
 * @typedef {Object} User
 * @property {string} sub - User ID
 * @property {string} role - User role ("Admin" or "User")
 * @property {number} exp - Token expiration (Unix timestamp)
 * @property {string} iss - Issuer: "DemoGeoServer"
 * @property {string} aud - Audience: "DemoGeoServerUsers"
 */

export {};
