const db = require("../models");
const User = db.users.getUserModel();

// exports.createCharacter = (req, res) => {

//     // Validate request
//     // if (!req.body.name || !req.body.hpMax) {
//     //   res.status(400).send({ message: "Content can not be empty!" });
//     //   return;
//     // }
  
//     //  Trained skills and attacks will be sent as a stringified JSON object so this
//     //    parses it and inserts it back into the new character object 'req.body'
//     // req.body["trainedSkills"] = JSON.parse(req.body.trainedSkills);
//     // req.body["attacks"] = JSON.parse(req.body.attacks);
  
  
//     // const character = new Character(req.body);
//     // // Save Character in the database
//     // character
//     //   .save(character)
//     //   .then((data) => {
//     //     res.send(data);
//     //   })
//     //   .catch((err) => {
//     //     res.status(500).send({
//     //       message:
//     //         err.message || "Some error occurred while creating the Character",
//     //     });
//     //   });
//   };
