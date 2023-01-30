import React from "react";

function scoreMod(score) {
    let modifier = Math.floor((score - 10) / 2);
    if(modifier>0) modifier = "+" + modifier;
    return modifier;
}

// This works on the assumption that level is a whole number
function proficiencyBonus(level) {
    return "+" + (Math.floor((level / 4) - 0.1) + 2)
}

export default scoreMod;
export {proficiencyBonus};
