import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

/**
 * Generates a token for the given user.
 * @param user - The user object to generate the token for.
 */
export const generateToken = (user) => {
    const payload = {
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin
    };

    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'});
}