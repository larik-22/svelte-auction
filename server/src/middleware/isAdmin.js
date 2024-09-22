import { verifyToken } from '../utils/jwt.js';

export const isAdmin = (req, res, next) => {
    try {
        const verified = verifyToken(req);
        if (!verified.isAdmin) {
            return res.status(403).json({
                error: 'Forbidden: Admins only.'
            });
        }

        next();
    } catch (error) {
        return res.status(401).json({
            error: error.message
        });
    }
};