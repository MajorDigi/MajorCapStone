import express from "express";
import {
    createEntry,
    deleteEntry,
    getEntries,
    updateEntry,
    getEntry,
} from "../controllers/entry.js";

const router = express.Router();

router.post("/", createEntry);
router.put("/:id", updateEntry);
router.delete("/:id", deleteEntry);
router.get("/author/:userId", getEntries);
router.get("/:id", getEntry)

export default router;
