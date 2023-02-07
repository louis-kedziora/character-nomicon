const db = require("../models");
const Character = db.characters;

exports.getCharacter = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  Character.findOne({ name: req.body.name }, function (err, foundCharacter) {
    if (err) {
      console.log(err);
    } else {
      if (!foundCharacter) {
        console.log("Character Not Found!");
      } else {
        res.send(foundCharacter);
      }
    }
  });
};

exports.createCharacter = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.hpMax) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const trainedSkills = JSON.parse(req.body.trainedSkills);

  // Create a character
  const character = new Character({
    name: req.body.name,
    hpMax: req.body.hpMax,
    currentHP: req.body.hpMax,
    str: req.body.str,
    int: req.body.int,
    dex: req.body.dex,
    wis: req.body.wis,
    con: req.body.con,
    char: req.body.char,
    ac: req.body.ac,
    speed: req.body.speed,
    level: req.body.level,
    hitDice: req.body.hitDice,
    maxHitDice: req.body.maxHitDice,
    currentHitDice: req.body.currentHitDice,
    trainedSkills: {
      perception: trainedSkills.perception,
      investigation: trainedSkills.investigation,
    },
  });
  // Save Character in the database
  character
    .save(character)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Character",
      });
    });
};

exports.updateResource = (req, res) => {
  console.log(req.body);
  if (!req.body || !req.body.name) {
    res.status(400).send({ message: "Body can not be empty!" });
    return;
  }
  const updateName = req.body.name;
  let updateData = req.body;
  delete updateData.name;
  console.log(updateData);
  Character.findOne({ name: updateName }, function (err, foundCharacter) {
    if (err) {
      console.log(err);
    } else {
      if (!foundCharacter) {
        console.log("Character Not Found!");
      } else {
        Character.updateOne({ name: req.body.name }, updateData)
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while updating character HP",
            });
          });
      }
    }
  });
};

exports.updateHP = (req, res) => {
  // Validate request
  console.log(req.body);
  if (!req.body.name || typeof req.body.newHP !== "number") {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const { name, newHP } = req.body;
  Character.findOne({ name: name }, function (err, foundCharacter) {
    if (err) {
      console.log(err);
    } else {
      if (!foundCharacter) {
        console.log("Character Not Found!");
      } else {
        foundCharacter.currentHP = newHP;
        foundCharacter
          .save(foundCharacter)
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while updating character HP",
            });
          });
      }
    }
  });
};
