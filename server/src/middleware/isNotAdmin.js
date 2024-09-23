import { verifyToken } from '../utils/jwt.js';

export const isNotAdmin = (req, res, next) => {
    try {
        const verified = verifyToken(req);
        if (verified.isAdmin) {
            return res.status(403).json({
                error: 'Forbidden to admins.'
            });
        }

        next();
    } catch (error) {
        return res.status(401).json({
            error: error.message
        });
    }
};