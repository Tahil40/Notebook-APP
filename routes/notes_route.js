const express_variable_notes = require("express");
const router_variable_notes = express_variable_notes.Router();
const fetch_user = require("../middleware/fetch_user");
const notes_variable = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// ROUTE 1; Get all the notes using; GET "/api/notes_route/fetchallnotes"....
router_variable_notes.get("/fetchallnotes", fetch_user, async (req, res) => {
  // res.send(req.body);
  try {
    const notes = await notes_variable.find({ user: req.user.id });//req.user.id is the request return by the fetch_user middleware....
    res.json(notes);
  } catch (error) {                                    
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 2; Adding new notes.............
router_variable_notes.post(
  "/addnotes",
  fetch_user,
  [
    body("title", "Title must be atleast of 5 letters").isLength({ min: 5 }),
    body("description", "Description must be atleast of 5 letters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      //getting title, description, tag from request....
      const { title, description, username} = req.body;

      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
      }

      //creating note according to the schema defined in the Notes.js file....
      const note = new notes_variable({
        username, 
        title,
        description,
        user: req.user.id,
      });

      //saving the created note....
      const save_note = await note.save();
      res.json(save_note);
      // console.log("Note Addition Successfull....");
    } catch (error) {
      res.status(500).json({error:"Internal Server Error", message:error.message});
      // res.status(500).send("Internal Server Error");
      // res.json({message:message});
    }
  }
);

// ROUTE 3; Updating an existing notes...........
router_variable_notes.put("/updatenote/:id", fetch_user, async (req, res) => {
  try {
    const { title, description } = req.body;

    const new_note = {};
    if (title) {
      new_note.title = title;
    }
    if (description) {
      new_note.description = description;
    }

    let noteID = await notes_variable.findById(req.params.id);
    if (!noteID) {
      return res.status(404).send("Not Found");
    }

    if (noteID.user.toString() != req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    noteID = await notes_variable.findByIdAndUpdate(
      req.params.id,
      { $set: new_note },
      { new: true }
    );
    res.json({ noteID });
  } catch (error) {
    // res.status(500).send("Internal Server Error");
    res.status(500).json({error:"Internal Server Error", message:error.message});
  }
});

// ROUTE 4; Delete an existing notes...........
router_variable_notes.delete(
  "/deletenote/:id",
  fetch_user,
  async (req, res) => {
    try{
    const noteID = await notes_variable.findById(req.params.id);
    if (!noteID) {
      return res.status(404).send("Not Found");
    }

    if (noteID.user.toString() != req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    // noteID = await notes_variable.findByIdAndDelete(
    //   req.params.id,
    //   { $set: new_note },
    //   { new: true }
    // );
    await notes_variable.findByIdAndDelete(req.params.id);
    res.json({ Success: "The Note Has Been Deleted......" });
  }catch (error) {
    // res.status(500).send("Internal Server Error");
    res.status(500).json({error:"Internal Server Error", message:error.message});
  }});

module.exports = router_variable_notes;