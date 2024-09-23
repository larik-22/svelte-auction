import express from "express";
import {isLoggedIn} from "../middleware/isLoggedIn.js";
import {isNotAdmin} from "../middleware/isNotAdmin.js";
import * as bidController from "../controllers/bidController.js";

const router = express.Router();

router.post("/", isLoggedIn, isNotAdmin, (req, res) => {
    bidController.createBid(req, res);
})

export default router;