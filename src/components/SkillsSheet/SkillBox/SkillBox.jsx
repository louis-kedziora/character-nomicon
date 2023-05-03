import React, { useState, useEffect } from "react";

import {
  modifierAndProficency,
  scoreMod,
} from "components/AttributeSheet/Modifiers";
import { StyledSkillFab } from "components/StyledComponents";
import { DiceSnack } from "components/DiceSnack";

export const SkillBox = ({ info }) => {
  const { title, skill, updateComponent } = info;
  const [isTrained, setIsTrained] = useState();
  const [trainedMod, setTrainedMod] = useState();
  const [mod, setMod] = useState();
  const [isFetched, setIsFetched] = useState(false);
  const [update, setUpdate] = useState(updateComponent);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const character = JSON.parse(sessionStorage.getItem("currentCharacter"));
    const skillDict = {
      athletics: "str",
      acrobatics: "dex",
      sleightOfHand: "dex",
      stealth: "dex",
      arcana: "int",
      history: "int",
      investigation: "int",
      nature: "int",
      religion: "int",
      animalHandling: "wis",
      insight: "wis",
      medicine: "wis",
      perception: "wis",
      survival: "wis",
      deception: "char",
      intimidation: "char",
      performance: "char",
      persuasion: "char",
    };
    const trainedSkills = character["trainedSkills"];
    setIsTrained(trainedSkills[skill]);
    if (trainedSkills[skill])
      setTrainedMod(
        modifierAndProficency(character["level"], character[skillDict[skill]])
      );
    setMod(scoreMod(character[skillDict[skill]]));
    setIsFetched(true);
    setUpdate(updateComponent);
  }, [skill, updateComponent]);

  console.debug(update);

  const handleClick = () => {
    setOpen(true);
  };

  return (
    <div>
      {isFetched && (
        <div>
          <StyledSkillFab onClick={handleClick} variant="extended">
            <h1>{title}</h1>
            <h2>{isTrained ? trainedMod : mod}</h2>
          </StyledSkillFab>
          {open && (
            <DiceSnack
              DiceSnackProps={{
                modifier: isTrained ? trainedMod : mod,
                open: open,
                setOpen: setOpen,
                title: title,
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};
