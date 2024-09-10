import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Bid route");
})

export default router;