const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWTSECRETKEY, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("User is not authorised");
            }
            req.user = decoded.user;
            next();
        });
        if (!token) {
            res.status(401);
            throw new Error("Token is not authorised")
        }
    } else {
        res.status(400);
        throw new Error("access token is required");
    }
});

module.exports = validateToken;