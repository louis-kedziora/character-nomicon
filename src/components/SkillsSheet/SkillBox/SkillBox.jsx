import React, { useState, useEffect } from "react";

import {
  modifierAndProficency,
  scoreMod,
} from "components/AttributeSheet/Modifiers";
import { StyledSkillFab } from "components/StyledComponents";

export const SkillBox = ({ info }) => {
  const { title, skill, updateComponent } = info;
  const [isTrained, setIsTrained] = useState();
  const [score, setScore] = useState();
  const [level, setLevel] = useState();
  const [isFetched, setIsFetched] = useState(false);
  const [update, setUpdate] = useState(updateComponent);

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
    setScore(character[skillDict[skill]]);
    setLevel(character["level"]);

    setIsFetched(true);
    setUpdate(updateComponent);
  }, [skill, updateComponent]);

  console.debug(update);

  return (
    <div>
      {isFetched && (
        <StyledSkillFab variant="extended">
          <h1>{title}</h1>
          <h2>
            {isTrained ? modifierAndProficency(level, score) : scoreMod(score)}
          </h2>
        </StyledSkillFab>
      )}
    </div>
  );
};
