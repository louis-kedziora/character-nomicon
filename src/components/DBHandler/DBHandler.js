import axios from "axios";
import { serverURL } from "config/server.config";

export const updateCharacter = (newCharacter) => {
  if (!newCharacter || !newCharacter._id) {
    console.log("Missing parameters");
  }
  axios({
    method: "patch",
    url: serverURL + "/api/characters/updateCharacter",
    data: {
      newCharacter: newCharacter 
    },
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  return newCharacter;
};


export const createNewUser = (newUser) => {
  axios({
    method: "post",
    url: serverURL + "/api/users/create",
    data: {
      newUser: newUser
    },
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  return newUser;
};

export const updateUser = (infoName, newInfo, userID) => {
  axios({
    method: "patch",
    url: serverURL + "/api/users/updateUser",
    data: {
      userID: userID,
      [infoName]: newInfo,
    },
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  return newInfo;
};

export const updateResource = (resourceID, characterID, newValue) => {
  if (!characterID || !resourceID) {
    console.log("Missing parameters");
  }
  axios({
    method: "patch",
    url: serverURL + "/api/characters/updateResource",
    data: {
      characterID: characterID,
      resourceID: resourceID,
      newValue: newValue,
    },
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  return newValue;
};

export const createNewResource = (newResource, characterID) => {
  axios({
    method: "patch",
    url: serverURL + "/api/characters/createresource",
    data: {
      newResource: newResource,
      characterID: characterID,
    },
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  return characterID;
};



export const createNewCharacter = (newCharacter, mongooseID) => {
  newCharacter["_id"] = mongooseID;
  axios({
    method: "post",
    url: serverURL + "/api/characters/create",
    data: {
      newCharacter: newCharacter,
    },
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  return mongooseID;
};

export const updateInfo = (infoName, newInfo, characterID) => {
  axios({
    method: "patch",
    url: serverURL + "/api/characters/updateInfo",
    data: {
      characterID: characterID,
      [infoName]: newInfo,
    },
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  return newInfo;
};

export const updateHP = (
  updateType,
  changeAmount,
  currentHP,
  hpMax,
  tempHP,
  characterID
) => {
  if (
    updateType === undefined ||
    changeAmount === undefined ||
    currentHP === undefined ||
    hpMax === undefined ||
    characterID === undefined
  ) {
    console.log("Missing updateType and/or changeAmount parameters");
  }
  let newHP = currentHP;
  if (updateType === "heal") {
    if (currentHP + changeAmount >= hpMax) {
      newHP = hpMax;
    } else if (currentHP <= 0) {
      newHP = changeAmount;
    } else {
      newHP = currentHP + changeAmount;
    }
  } else if (updateType === "damage") {
    if (currentHP - changeAmount <= 0) {
      newHP = currentHP - changeAmount;
    } else {
      newHP = currentHP - changeAmount;
    }
  } else if (updateType === "stabilize") {
    newHP = 0;
  }

  axios({
    method: "patch",
    url: serverURL + "/api/characters/updatehp",
    data: {
      characterID: characterID,
      newHP: parseInt(newHP),
    },
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  return newHP;
};
