const db = require("../models");
const User = db.users.getUserModel();

exports.getUser = (req, res) => {
    // Validate request
    if (!req.body._id) {
      res.status(400).send({ message: "Missing body contents!" });
      return;
    }
  
    User.findOne({ _id: req.body._id }, function (err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        if (!foundUser) {
          console.log("User Not Found!");
        } else {
          res.send(foundUser);
        }
      }
    });
  };

exports.createUser = (req, res) => {
    // Validate request
    if (!req.body.email) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    //  userCharacters will be sent as a stringified JSON object so this
    //    parses it and inserts it back into the new character object 'req.body'
    req.body["userCharacters"] = JSON.parse(req.body.userCharacters);

    const user = new User(req.body);
    // Save Character in the database
    user
      .save(user)
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
