import Entry from "../models/Entry.js";
import User from "../models/User.js";
import cloudinary from "cloudinary"; // Ensure you import Cloudinary

// Configure Cloudinary (this can also be in a separate config file)
cloudinary.v2.config({
    cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.REACT_APP_CLOUDINARY_KEY,
    api_secret: process.env.REACT_APP_CLOUDINARY_SECRET,
});

export const createEntry = async (req, res, next) => {
    try {
        const { title, location, date, entry, author, files } = req.body;

        // Handle file uploads
        const images = await Promise.all(
            files.map(async (file) => {
                const uploadResponse = await cloudinary.v2.uploader.upload(file.path);
                return uploadResponse.secure_url; // Get the secure URL of the uploaded image
            })
        );

        // Create a new entry with the uploaded image URLs
        const newEntry = new Entry({
            title,
            location,
            date,
            entry,
            author,
            photos: images, // Assuming your Entry model has a 'photos' field
        });

        const savedEntry = await newEntry.save();

        // Update the user document
        const user = await User.findById(savedEntry.author);
        user.entries.push(savedEntry._id);
        await user.save();

        res.status(201).json(savedEntry); // 201 Created
    } catch (err) {
        next(err); // Handle any errors
    }
};

export const updateEntry = async (req, res, next) => {
    try {
        const updatedEntry = await Entry.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        if (!updatedEntry) {
            return res.status(404).json({ message: "Entry not found" }); // Handle case where entry is not found
        }

        res.status(200).json(updatedEntry);
    } catch (err) {
        next(err);
    }
};

export const deleteEntry = async (req, res, next) => {
    try {
        const deletedEntry = await Entry.findByIdAndDelete(req.params.id);

        if (!deletedEntry) {
            return res.status(404).json({ message: "Entry not found" }); // Handle case where entry is not found
        }

        // Update the user document
        await User.findOneAndUpdate(
            { entries: req.params.id },
            { $pull: { entries: req.params.id } },
            { new: true }
        );

        res.status(200).json("The entry has been deleted");
    } catch (err) {
        next(err);
    }
};

export const getEntries = async (req, res, next) => {
    const userId = req.params.userId;
    try {
        const entries = await Entry.find({ author: userId });
        res.status(200).json(entries);
    } catch (err) {
        next(err);
    }
};

export const getEntry = async (req, res, next) => {
    try {
        const entry = await Entry.findById(req.params.id);

        if (!entry) {
            return res.status(404).json({ message: "Entry not found" }); // Handle case where entry is not found
        }

        res.status(200).json(entry);
    } catch (err) {
        next(err);
    }
};