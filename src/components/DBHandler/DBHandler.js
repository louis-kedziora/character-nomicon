
import axios from "axios";
const serverURL = process.env.REACT_APP_SERVER_URL || "http://localhost:4000";

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

export const updateResource = (
  resourceName,
  changeAmount,
  currentValue,
  maxValue,
  characterID
) => {
  if (
    resourceName === undefined ||
    changeAmount === undefined ||
    currentValue === undefined ||
    maxValue === undefined ||
    characterID === undefined
  ) {
    console.log("Missing parameters");
  }
  let newValue;
  if (currentValue + changeAmount < 0) {
    newValue = 0;
  } else if (currentValue + changeAmount >= maxValue) {
    newValue = maxValue;
  } else {
    newValue = currentValue + changeAmount;
  }
  axios({
    method: "patch",
    url: serverURL + "/api/characters/updateResource",
    data: {
      characterID: characterID,
      [resourceName]: newValue,
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

export const updateHP = (
  updateType,
  changeAmount,
  currentHP,
  hpMax,
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
      newHP: newHP,
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
