// TODO Need to implenment id for characters at this point 'gaston is hardcoded into all the methods'

import axios from "axios";
const HARDCODEDCHARACTERNAME = "Gaston";

export const updateInfo = (infoName, newInfoString) => {
  axios({
    method: "patch",
    url: "http://localhost:4000/api/characters/updateInfo",
    data: {
      name: HARDCODEDCHARACTERNAME,
      [infoName]: newInfoString,
    },
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  return newInfoString;
};

export const updateResource = (
  resourceName,
  changeAmount,
  currentValue,
  maxValue
) => {
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
    url: "http://localhost:4000/api/characters/updateResource",
    data: {
      name: HARDCODEDCHARACTERNAME,
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

export const updateHP = (updateType, changeAmount, currentHP, hpMax) => {
  if (
    updateType === undefined ||
    changeAmount === undefined ||
    currentHP === undefined ||
    hpMax === undefined
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
      //Unconcious
      newHP = currentHP - changeAmount;
    } else {
      newHP = currentHP - changeAmount;
    }
  } else if (updateType === "stabilize") {
    newHP = 0;
  }

  axios({
    method: "patch",
    url: "http://localhost:4000/api/characters/updatehp",
    data: {
      name: HARDCODEDCHARACTERNAME,
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
