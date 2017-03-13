// Require Mongoose
var mongoose = require("mongoose");

// Create schema class
var schema = mongoose.Schema;

// Create article schema
var ArticleSchema = new Schema({

// title is required strng
  title:{
    type: String,
    required: true
  },
// link is required strng
  link: {
    type: String,
    required: true
  },

  note : {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

var Article = mongoose.model("Article", ArticleSchema);

// Export the model

module.exports = Article;
