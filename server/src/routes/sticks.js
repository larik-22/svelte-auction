import express from "express";
import * as stickController from "../controllers/stickController.js";

const router = express.Router();

router.get("/", (req, res) => {
    stickController.getAllSticks(req, res);
})

router.get("/:id", (req, res) => {
    stickController.getStickById(req, res);
})

router.post("/", (req, res) => {
    stickController.createStick(req, res);
})

router.patch("/:id", (req, res) => {
    stickController.updateStick(req, res);
})

router.delete("/:id", (req, res) => {
    stickController.deleteStick(req, res);
})

export default router;