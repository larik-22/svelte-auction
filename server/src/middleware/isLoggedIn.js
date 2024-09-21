import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export const isLoggedIn = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            error: 'Unauthorized access'
        });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        console.log(verified)
        next();
    } catch (error) {
        return res.status(401).json({
            error: 'Invalid token'
        });
    }
}