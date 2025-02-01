const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * Extracts token from the request headers
 * @param {Object} req - Express request object
 * @returns {string|null} - Token string if present, otherwise null
 */
const extractToken = (req) => {
    const authHeader = req.headers["authorization"];
    return authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
};

/**
 * Middleware to authenticate JWT tokens
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
exports.auth = async (req, res, next) => {
    try {
        const token = extractToken(req);

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Access denied. No token provided.",
            });
        }

        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) {
                return res.status(403).json({
                    success: false,
                    message: "Invalid or expired token",
                });
            }

            req.user = decoded; // Attach decoded user data to request object
            next();
        });

    } catch (error) {
        console.error("Authentication Middleware Error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error during authentication",
        });
    }
};
