const PersonalNote = require("../models/PersonalNote");

// PUT /api/notes (upsert — create or update)
const upsertNote = async (req, res) => {
  try {
    const { countryCode, note } = req.body;

    if (!countryCode || !note) {
      return res.status(400).json({
        success: false,
        message: "Country code and note are required.",
      });
    }

    const result = await PersonalNote.findOneAndUpdate(
      { userId: req.user._id, countryCode },
      { note, updatedAt: Date.now() },
      { upsert: true, new: true, runValidators: true }
    );

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("Upsert note error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// GET /api/notes
const getMyNotes = async (req, res) => {
  try {
    const notes = await PersonalNote.find({
      userId: req.user._id,
    }).sort({ updatedAt: -1 });

    res.status(200).json({ success: true, data: notes });
  } catch (error) {
    console.error("Get notes error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// GET /api/notes/:countryCode
const getNoteByCountry = async (req, res) => {
  try {
    const { countryCode } = req.params;

    const note = await PersonalNote.findOne({
      userId: req.user._id,
      countryCode,
    });

    res.status(200).json({ success: true, data: note });
  } catch (error) {
    console.error("Get note error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// DELETE /api/notes/:id
const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await PersonalNote.findById(id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found.",
      });
    }

    if (note.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized.",
      });
    }

    await PersonalNote.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Note deleted." });
  } catch (error) {
    console.error("Delete note error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

module.exports = { upsertNote, getMyNotes, getNoteByCountry, deleteNote };
