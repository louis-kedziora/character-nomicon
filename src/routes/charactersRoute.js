module.exports = app => {
    const characters = require("../controllers/characterController");
  
    var router = require("express").Router();
  
    // Create a new Character
    router.post("/create", characters.createCharacter);

    // For whatever reason axios get requests ignore the body so post is used instead
    // see here: https://stackoverflow.com/questions/46404051/send-object-with-axios-get-request
    router.post("/get", characters.getCharacter);

    router.patch("/updatehp", characters.updateHP);
    router.patch("/updateresource", characters.updateResource);

    

    app.use('/api/characters', router);
  };
