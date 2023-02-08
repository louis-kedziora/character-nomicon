export const scoreMod = (score) => {
    let modifier = Math.floor((score - 10) / 2);
    if(modifier>0) modifier = "+" + modifier;
    return modifier;
}

// This works on the assumption that level is a whole number
export const proficiencyBonus = (level) => {
    return "+" + (Math.floor((level / 4) - 0.1) + 2)
}

export const modifierAndProficency = (level, score) => {
    let result = Math.floor((score - 10) / 2) + (Math.floor((level / 4) - 0.1) + 2)
    if(result > 0) result = "+" + result;
    return result;
}
