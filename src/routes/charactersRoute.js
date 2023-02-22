module.exports = app => {
    const characters = require("../controllers/characterController");
  
    var router = require("express").Router();

    // For whatever reason axios get requests ignore the body so post is used instead
    // see here: https://stackoverflow.com/questions/46404051/send-object-with-axios-get-request
    // For this code post requests and get requests will be used interchangably

    // Create a new Character
    router.post("/create", characters.createCharacter);

    // Retrieve character data from database
    router.post("/get", characters.getCharacter);

    router.patch("/updatehp", characters.updateHP);
    router.patch("/updateresource", characters.updateResource);
    router.patch("/updateinfo", characters.updateInfo);


    

    app.use('/api/characters', router);
  };
