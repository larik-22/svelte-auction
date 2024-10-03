import express from "express";
import {isLoggedIn} from "../middleware/isLoggedIn.js";
import {isNotAdmin} from "../middleware/isNotAdmin.js";
import * as bidController from "../controllers/bidController.js";
import {emitter} from "../index.js";

const router = express.Router();

router.post("/", isLoggedIn, isNotAdmin, (req, res) => {
    bidController.createBid(req, res);
})

router.get("bid-updates", (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const sendBidUpdate = (bid) => {
        res.write(`data: ${JSON.stringify(bid)}\n\n`);
    };

    // When a bid is posted, call sendBidUpdate to notify clients
    emitter.on('new-bid', sendBidUpdate);

    req.on('close', () => {
        emitter.off('new-bid', sendBidUpdate);
    });
})

export default router;