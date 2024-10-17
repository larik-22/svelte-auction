import express from "express";
import * as stickController from "../controllers/stickController.js";
import {isLoggedIn} from "../middleware/isLoggedIn.js";
import {isAdmin} from "../middleware/isAdmin.js";
import {isNotAdmin} from "../middleware/isNotAdmin.js";
import * as bidController from "../controllers/bidController.js";
import {emitter} from "../index.js";

const router = express.Router();

router.get("/", (req, res) => {
    stickController.getAllSticks(req, res);
})

router.post("/bids", isLoggedIn, isNotAdmin, (req, res) => {
    bidController.createBid(req, res);
})

router.get("/bid-updates", (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const sendBidUpdate = (bid) => {
        res.write(`data: ${JSON.stringify(bid)}\n\n`);
    };

    emitter.on('new-bid', sendBidUpdate);

    req.on('close', () => {
        emitter.off('new-bid', sendBidUpdate);
    });
})

router.get("/:id", (req, res) => {
    stickController.getStickById(req, res);
})

router.get("/:id/bids", (req, res) => {
    stickController.getStickBids(req, res);
})

router.post("/", isLoggedIn, isAdmin, (req, res) => {
    stickController.createStick(req, res);
})

router.patch("/:id", isLoggedIn, isAdmin, (req, res) => {
    stickController.updateStick(req, res);
})

router.delete("/:id", isLoggedIn, isAdmin, (req, res) => {
    stickController.deleteStick(req, res);
})

export default router;