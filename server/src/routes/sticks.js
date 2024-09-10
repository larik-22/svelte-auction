import express from "express";
import * as stickController from "../controllers/stickController.js";

const router = express.Router();

router.get("/", (req, res) => {
    stickController.getAllSticks(req, res);
})

export default router;