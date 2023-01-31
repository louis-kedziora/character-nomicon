const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dbConfig = require("./src/config/db.config");
var cors = require('cors');

//Not Sure if this is needed
var corsOptions = {
  origin: 'http://localhost:3000/',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
// Should try and make this work
// const Character = require("./src/models");
const characterSchema = {
  name: String,
  hpMax: Number,
  currentHP: Number
};
const Character = mongoose.model("Character", characterSchema);

const app = express();
app.use(cors());
app.set("view engine", "ejs");
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.set("strictQuery", false);
mongoose
  .connect(dbConfig.url)
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to PlayerSheet Server." });
});

app.post("/", function (req, res) {
  console.log(req.body);
  const newCharacter = new Character({
    name: req.body.name,
    hpMax: req.body.hpMax,
    currentHP: req.body.hpMax
  });

  Character.create(newCharacter, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully Added Character");
    }
  });
});

app.patch("/", cors(corsOptions),function (req, res) {
  const {name, newHP} = req.body;
  console.log(name);
  console.log(newHP);
  Character.findOne({name: name}, function(err, foundCharacter) {
    if(err) {
      console.log(err);
    } else {
      if(!foundCharacter) {
        console.log("Character Not Found!");
      } else {
        foundCharacter.currentHP = newHP;
        foundCharacter.save();
        console.log("HP Changed");
      }
    }
  })
})

// set port, listen for requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
