import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { scoreMod } from "../AttributeSheet/Modifiers";

import { SkillBox } from "./SkillBox";

export const SkillsSheet = ({ characterID }) => {
  const [str, setStr] = useState();
  const [dex, setDex] = useState();
  const [wis, setWis] = useState();
  const [char, setChar] = useState();
  const [int, setInt] = useState();

  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    const character = JSON.parse(sessionStorage.getItem(characterID));
    setStr(character["str"]);
    setDex(character["dex"]);
    setWis(character["wis"]);
    setChar(character["char"]);
    setInt(character["int"]);

    setIsFetched(true);
  }, [characterID]);
  // This all relies on everything being present and in order
  //    Prehaps make this safer somehow
  return (
    <div>
      {isFetched && (
        <div className="skillSheet">
          <Grid container spacing={1}>
            <h1>Strength {scoreMod(str)}</h1>
            <Grid xs={12}>
              <SkillBox
                info={{
                  skill: "athletics",
                  title: "Athletics",
                  characterID: characterID
                  
                }}
              />
            </Grid>

            <h1>Dexterity {scoreMod(dex)}</h1>
            <Grid xs={12}>
              <SkillBox
                info={{
                  skill: "acrobatics",
                  title: "Acrobatics",
                  characterID: characterID
                }}
              />
              <SkillBox
                info={{
                  skill: "sleightOfHand",
                  title: "Sleight Of Hand",
                  characterID: characterID
                }}
              />
              <SkillBox
                info={{
                  skill: "stealth",
                  title: "Stealth",
                  characterID: characterID
                }}
              />
            </Grid>

            <h1>Intelligence {scoreMod(int)}</h1>
            <Grid xs={12}>
              <SkillBox
                info={{
                  skill: "arcana",
                  title: "Arcana",
                  characterID: characterID
                }}
              />
              <SkillBox
                info={{
                  skill: "history",
                  title: "History",
                  characterID: characterID
                }}
              />
              <SkillBox
                info={{
                  skill: "investigation",
                  title: "Investigation",
                  characterID: characterID
                }}
              />
              <SkillBox
                info={{
                  skill: "nature",
                  title: "Nature",
                  characterID: characterID
                }}
              />
              <SkillBox
                info={{
                  skill: "religion",
                  title: "Religion",
                  characterID: characterID
                }}
              />
            </Grid>

            <h1>Wisdom {scoreMod(wis)}</h1>
            <Grid xs={12}>
              <SkillBox
                info={{
                  skill: "animalHandling",
                  title: "Animal Handling",
                  characterID: characterID
                }}
              />
              <SkillBox
                info={{
                  skill: "insight",
                  title: "Insight",
                  characterID: characterID
                }}
              />
              <SkillBox
                info={{
                  skill: "medicine",
                  title: "Medicine",
                  characterID: characterID
                }}
              />
              <SkillBox
                info={{
                  skill: "perception",
                  title: "Perception",
                  characterID: characterID
                }}
              />
              <SkillBox
                info={{
                  skill: "survival",
                  title: "Survival",
                  characterID: characterID
                }}
              />
            </Grid>

            <h1>Charisma {scoreMod(char)}</h1>
            <Grid xs={12}>
              <SkillBox
                info={{
                  skill: "deception",
                  title: "Deception",
                  characterID: characterID
                }}
              />
              <SkillBox
                info={{
                  skill: "intimidation",
                  title: "Intimidation",
                  characterID: characterID
                }}
              />
              <SkillBox
                info={{
                  skill: "performance",
                  title: "Performance",
                  characterID: characterID
                }}
              />
              <SkillBox
                info={{
                  skill: "persuasion",
                  title: "Persuasion",
                  characterID: characterID
                }}
              />
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
};
