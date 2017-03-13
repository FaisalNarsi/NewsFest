// Require Mongoose
Var mongoose = require("mongoose");

// Create the NOte schema
var NoteSchema = new Schema({

  // just a String
  title: {
    type: String
  },

  // just a String
  body: {
    type: String
  }
});

// Create the Note model with the NoteSchema
var Note = mongoose.model("Note", NoteSchema);

// Export the Note model
module.exports = Note;
