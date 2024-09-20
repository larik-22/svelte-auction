import express from 'express';
import {getUserByEmail} from "../controllers/userController.js";
import {checkUserPassword} from "../model/User.js";
import {generateToken} from "../utils/jwt.js";
const router = express.Router();

router.post("/", async (req, res) => {
    const {email, password} = req.body;
    const user = getUserByEmail(email);

    if(!user){
        res.status(401).json({error: `User with email ${email} not found`});
        return;
    }

    if(!checkUserPassword(password, user.password)){
        res.status(401).json({error: `Invalid password`});
        return;
    }

    const token = generateToken(user);
    res.status(200).json({message: "Login successful", token});
});

export default router;