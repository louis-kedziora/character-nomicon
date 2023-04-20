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
    const prof = (Math.floor((level / 4) - 0.1) + 2);
    const mod = (Math.floor((score - 10) / 2));
    let result = prof + mod;
    if(result > 0) result = "+" + result;
    return result;
}

export const spellSaveDC =(level, score) => {
    let modAndProf = modifierAndProficency(level, score);
    modAndProf = (modAndProf.toString()).replace("+", "");
    return (parseInt(modAndProf) + 8);
}
