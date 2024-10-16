// server/routes/entry.js
// server/routes/entry.js
import express from "express";
import cloudinary from "cloudinary";
import multer from "multer"; // Import Multer
import {
    createEntry,
    deleteEntry,
    getEntries,
    updateEntry,
    getEntry,
} from "../controllers/entry.js";

// Configure Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.REACT_APP_CLOUDINARY_KEY,
    api_secret: process.env.REACT_APP_CLOUDINARY_SECRET,
});

// Configure Multer for file uploads
const storage = multer.memoryStorage(); // Use memory storage or disk storage
const upload = multer({ storage }); // Create a Multer instance

const router = express.Router();

// Define your routes
router.post("/", upload.array('files', 3), createEntry); // Use Multer middleware for uploads
router.put("/:id", updateEntry); 
router.delete("/:id", deleteEntry); 
router.get("/author/:userId", getEntries); 
router.get("/:id", getEntry); 

export default router;




