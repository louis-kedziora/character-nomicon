const db = require("../models");
const Character = db.characters.getModel();
const mongoose = require("mongoose");

exports.getManyCharacters = (req, res) => {
  // Validate request
  req.body.characterIDs.forEach((characterID, index) => {
    if (!mongoose.isValidObjectId(characterID)) {
      console.log("Invalid Character Mongoose ID");
      res.status(400).send({ message: "Missing body contents!" });
      return;
    }
  });

  Character.find(
    { _id: { $in: req.body.characterIDs } },
    function (err, foundCharacters) {
      if (err) {
        console.log(err);
      } else {
        if (!foundCharacters) {
          console.log("Characters Not Found!");
        } else {
          res.send(foundCharacters);
        }
      }
    }
  );
};

exports.getOneCharacter = (req, res) => {
  // Validate request
  if (!mongoose.isValidObjectId(req.body.characterID)) {
    console.log("Invalid Character Mongoose ID");
    res.status(400).send({ message: "Missing body contents!" });
    return;
  }

  Character.findOne(
    { _id: req.body.characterID },
    function (err, foundCharacter) {
      if (err) {
        console.log(err);
      } else {
        if (!foundCharacter) {
          console.log("Character Not Found!");
        } else {
          console.log("character founds");
          res.send(foundCharacter);
        }
      }
    }
  );
};

exports.createCharacter = (req, res) => {
  // Validate request
  if (!req.body.newCharacter || !req.body.newCharacter._id) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  console.log(req.body.newCharacter);

  const character = new Character(req.body.newCharacter);
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
  if (!req.body || !req.body.characterID || !req.body.resourceID) {
    res.status(400).send({ message: "Body can not be empty!" });
    return;
  }
  const characterID = req.body.characterID;
  const resourceID = req.body.resourceID
  let updateData = req.body;
  delete updateData.resourceID;
  delete updateData.characterID;
  const updateField = Object.keys(updateData)[0];
  const updateValue = Object.values(updateData)[0];
  console.log(resourceID);
  console.log(characterID);
  console.log(updateField);
  console.log(updateValue);

  Character.findOne({ _id: characterID }, function (err, foundCharacter) {
    if (err) {
      console.log(err);
    } else {
      if (!foundCharacter) {
        console.log("Character Not Found!");
      } else {
        let customResources = foundCharacter.customResources;
        let foundResource = customResources.find(
          (item) => item._id === resourceID
        );
        foundResource.currentResourceValue = updateValue;
        foundCharacter
          .save(foundCharacter)
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while updating resource",
            });
          });
      }
    }
  });
};

exports.updateInfo = (req, res) => {
  console.log(req.body);
  if (!req.body || !req.body.characterID) {
    res.status(400).send({ message: "Body can not be empty!" });
    return;
  }
  const characterID = req.body.characterID;
  let updateData = req.body;
  delete updateData.characterID;
  const updateField = Object.keys(updateData)[0];
  const updateValue = Object.values(updateData)[0];

  Character.findOne({ _id: characterID }, function (err, foundCharacter) {
    if (err) {
      console.log(err);
    } else {
      if (!foundCharacter) {
        console.log("Character Not Found!");
      } else {
        foundCharacter[updateField] = updateValue;
        foundCharacter
          .save(foundCharacter)
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while updating resource",
            });
          });
      }
    }
  });
};

exports.updateHP = (req, res) => {
  // Validate request
  console.log(req.body);
  if (!req.body.characterID || typeof req.body.newHP !== "number") {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const { characterID, newHP } = req.body;
  Character.findOne({ _id: characterID }, function (err, foundCharacter) {
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
