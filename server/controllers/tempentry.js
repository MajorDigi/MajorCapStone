import Entry from "../models/Entry.js"
import User from "../models/User.js"

export const createEntry = async (req, res, next) => {

    const newEntry = new Entry(req.body);
    try {
      const savedEntry = await newEntry.save();
      
      try {
        const user = await User.findById(savedEntry.author);
        user.entries.push(savedEntry._id);
        await user.save();
      }
      catch(err) {
        next(err)
      }
      res.status(200).json(savedEntry);
    } catch (err) {
      next(err);
    }
  };
  
  export const updateEntry = async (req, res, next) => {
    try {
      const entry = await Entry.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(entry);
    } catch (err) {
      next(err);
    }
  };
  
  export const deleteEntry = async (req, res, next) => {
    try {
      await Entry.findByIdAndDelete(req.params.id);
      
      try {

          await User.findOneAndUpdate(
            { entries: req.params.id }, // Find the user who has the entry id in their entries array
            { $pull: { entries: req.params.id } }, // Remove the entry id from the entries array
            { new: true }
          );
      }

      catch(err) {
        next(err)
      }
      
      res.status(200).json("the entry has been deleted");
    } catch (err) {
      next(err);
    }
  };
  
  
  export const getEntries = async (req, res, next) => {
    const userId = req.params.userId;
    try {
      const entries = await Entry.find({ author: userId })
      res.status(200).json(entries);
    } catch (err) {
      next(err)
    }
  }

  export const getEntry = async(req, res, next) => {
    try{
        const entry = await Entry.findById(req.params.id);
        res.status(200).json(entry);
    }
    catch(err) {
        next(err);
    }
  }
