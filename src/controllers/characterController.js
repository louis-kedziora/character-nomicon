const db = require("../models");
const Character = db.characters.getModel();

exports.getCharacter = (req, res) => {
  // Validate request
  if (!req.body._id) {
    res.status(400).send({ message: "Missing body contents!" });
    return;
  }

  Character.findOne({ _id: req.body._id }, function (err, foundCharacter) {
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

  //  Trained skills and attacks will be sent as a stringified JSON object so this
  //    parses it and inserts it back into the new character object 'req.body'
  req.body["trainedSkills"] = JSON.parse(req.body.trainedSkills);
  req.body["attacks"] = JSON.parse(req.body.attacks);


  const character = new Character(req.body);
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
  if (!req.body || !req.body.name) {
    res.status(400).send({ message: "Body can not be empty!" });
    return;
  }
  const updateName = req.body.name;
  let updateData = req.body;
  delete updateData.name;
  const updateField = Object.keys(updateData)[0];
  const updateValue = Object.values(updateData)[0];

  Character.findOne({ name: updateName }, function (err, foundCharacter) {
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

exports.updateInfo = (req, res) => {

  if (!req.body || !req.body.name) {
    res.status(400).send({ message: "Body can not be empty!" });
    return;
  }
  const updateName = req.body.name;
  let updateData = req.body;
  delete updateData.name;
  const updateField = Object.keys(updateData)[0];
  const updateValue = Object.values(updateData)[0];

  Character.findOne({ name: updateName }, function (err, foundCharacter) {
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
