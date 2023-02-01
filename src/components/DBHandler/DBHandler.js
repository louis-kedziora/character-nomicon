import axios from "axios";

export const getCharacter = (characterName) => {
  if (characterName === undefined) {
    console.log("Missing name for getCharacter request");
    return undefined;
  }
  // try {
  //   const res = await axios.get("/api/updatecart", {
  //     data: { product: this.product },
  //   });
  // } catch (error) {
  //   console.log(error);
  // }

//   axios({
//     method: "post",
//     url: "http://localhost:4000/api/characters/get",
//     data: {
//       name: characterName,
//     },
//   })
//     .then(function (response) {
//       console.log(response);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
    // .finally(() => {
    //   return response;
    // });
};

export const updateHP = (updateType, changeAmount, currentHP, hpMax) => {
  console.log("Update Type: " + updateType);
  console.log("Change Amount: " + changeAmount);
  console.log("Current HP: " + currentHP);
  console.log("HP Max: " + hpMax);


  if (updateType === undefined || changeAmount === undefined) {
    console.log("Missing updateType and/or changeAmount parameters");
  }
  let newHP = currentHP;
  if (updateType === "heal") {
    console.log(changeAmount);
    console.log(currentHP);
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
    console.log("Stabilizing");
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
