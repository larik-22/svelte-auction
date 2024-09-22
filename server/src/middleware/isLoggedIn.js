import {verifyToken} from "../utils/jwt.js";

export const isLoggedIn = (req, res, next) => {
    try {
        verifyToken(req);
        next();
    } catch (error) {
        return res.status(401).json({
            error: error.message
        });
    }
};