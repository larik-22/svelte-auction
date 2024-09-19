import express from "express";
import {isAdmin} from "../middleware/isAdmin.js";
import * as userController from "../controllers/userController.js";

const router = express.Router();

router.get("/", isAdmin, (req, res) => {
    userController.getAllUsers(req, res);
})

router.get("/:id", isAdmin, (req, res) => {
    userController.getUserById(req, res);
})

router.post("/", (req, res) => {
    userController.createUser(req, res);
})

router.delete("/:id", isAdmin, (req, res) => {
    userController.deleteUser(req, res);
})

export default router;