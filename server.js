// dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// require models
var Note = require("./models/note.js");
var Article = require("./models/Article.js");

// scrape with cheerio and request
var request = require("request");
var cheerio = require("cheerio");

mongoose.promise = Promise;


//  Initialize Express
var app = express();

// using morgan, b-parser, and static connection to the root
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost/newsfest");
var db = mongoose.connection;


//  DB Config
// var databaseURl = ("scraper");
// var collections = ("scrapedData");
//
// // hook mongojs Configto db var
// var db = mongojs(databaseUrl, collections);

// log mongojs errs

db.on("error", function(error) {
  console.log("Database Error:", error);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// routes

app.get("/scrape", function(req, res) {
  request("https://www.reddit.com/r/javascript/", function(error, reponse, html) {
    var $ = cheerio.load(html);
    $("article P").each(function(i, element) {
      var result = {};

      result.title = $(this).children("a").text();
      result.link = $(this).children("a").attr("href");


      var entry = new Article(result);

      entry.save(function(err, doc) {

        if (err) {
          console.log(doc);

        }
      });

    });
  });

  res.send("Scrape Complete");
});

// get articles we scraped from mongodb

app.get("/articles", function(req, res) {
  Article.find({}, function(error, doc) {

    if (error) {
      console.log(error);
    }

    else {
      res.json(doc);
    }
  });
});

app.get("/articles/:id", function(req, res) {
  Article.findOne({ "_id": req.params.id })

  .populate("note")

  .exec(function(error, doc) {
    if (error) {
      console.log(error);

    }

    else{
      res.json(doc);
    }
  });
});


app.post("/articles:id", function(req, res) {

  var newNote = new Note(req.body);
  if (error) {
    console.log(error);
  }

  else {
    Article.findOneAndUpdate({ "_id": req.params.id }, { "note": doc._id })

    .exec(function(err, doc) {

      if (err) {
        console.log(err);
      }

      else {
        res.send(doc);
      }
    });
  }
});

});




//Always at the end of file
app.listen(3000, function() {
  process.env.port();
  console.log("App running on port 3000");
});
