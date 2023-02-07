// This is all fucked use "axios.js" and see app.js for example

import axios from "axios";

export async function getCharacter(characterName) {
  axios({
    method: "post",
    url: "http://localhost:4000/api/characters/get",
    data: {
      name: characterName,
    },
  })
    .then(function (response) {
      // console.log("Then Response:");
      // console.log(response);
      return response;
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function (response) {
      // console.log("Finally Payload: ")
      // console.log(payload);
      return response;
    });
}

export const updateHP = (updateType, changeAmount, currentHP, hpMax) => {
  if (updateType === undefined || changeAmount === undefined) {
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
