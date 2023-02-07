// This is all fucked use "axios.js" and see app.js for example

import axios from "axios";

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
      name: "Gaston",
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
      name: "Gaston",
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
