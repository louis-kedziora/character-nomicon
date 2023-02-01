module.exports = app => {
    const characters = require("../controllers/characterController");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", characters.createCharacter);

    router.patch("/", characters.updateHP);

    router.get("/", characters.getCharacter);

    app.use('/api/characters', router);
  };
