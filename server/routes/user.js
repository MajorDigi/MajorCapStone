import express from "express";
import {
    login,
    register,
    deleteUser
} from "../controllers/user.js";

const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.delete('/:id', deleteUser)

export default router;
