import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { scoreMod } from "../AttributeSheet/Modifiers";


import { SkillBox } from "./SkillBox";

export const SkillsSheet = ({ gaston }) => {
  const { trainedSkills, level, str, dex, wis, char, int } = gaston;
  // This all relies on everything being present and in order
  //    Prehaps make this safer somehow
  return (
    <div className="skillSheet">
      <Grid container spacing={1}>
        <h1>Strength {scoreMod(str)}</h1>
        <Grid xs={12}>
          <SkillBox
            info={{
              isTrained: trainedSkills.athletics,
              skill: "Athletics",
              score: str,
              level: level,
            }}
          />
        </Grid>

        <h1>Dexterity {scoreMod(dex)}</h1>
        <Grid xs={12}>
          <SkillBox
            info={{
              isTrained: trainedSkills.acrobatics,
              skill: "Acrobatics",
              score: dex,
              level: level,
            }}
          />
          <SkillBox
            info={{
              isTrained: trainedSkills.sleightOfHand,
              skill: "Sleight Of Hand",
              score: dex,
              level: level,
            }}
          />
          <SkillBox
            info={{
              isTrained: trainedSkills.stealth,
              skill: "Stealth",
              score: dex,
              level: level,
            }}
          />
        </Grid>

        <h1>Intelligence {scoreMod(int)}</h1>
        <Grid xs={12}>
          <SkillBox
            info={{
              isTrained: trainedSkills.arcana,
              skill: "Arcana",
              score: int,
              level: level,
            }}
          />
          <SkillBox
            info={{
              isTrained: trainedSkills.history,
              skill: "History",
              score: int,
              level: level,
            }}
          />
          <SkillBox
            info={{
              isTrained: trainedSkills.investigation,
              skill: "Investigation",
              score: int,
              level: level,
            }}
          />
          <SkillBox
            info={{
              isTrained: trainedSkills.nature,
              skill: "Nature",
              score: int,
              level: level,
            }}
          />
          <SkillBox
            info={{
              isTrained: trainedSkills.religion,
              skill: "Religion",
              score: int,
              level: level,
            }}
          />
        </Grid>

        <h1>Wisdom {scoreMod(wis)}</h1>
        <Grid xs={12}>
          <SkillBox
            info={{
              isTrained: trainedSkills.animalHandling,
              skill: "Animal Handling",
              score: wis,
              level: level,
            }}
          />
          <SkillBox
            info={{
              isTrained: trainedSkills.insight,
              skill: "Insight",
              score: wis,
              level: level,
            }}
          />
          <SkillBox
            info={{
              isTrained: trainedSkills.medicine,
              skill: "Medicine",
              score: wis,
              level: level,
            }}
          />
          <SkillBox
            info={{
              isTrained: trainedSkills.perception,
              skill: "Perception",
              score: wis,
              level: level,
            }}
          />
          <SkillBox
            info={{
              isTrained: trainedSkills.survival,
              skill: "Survival",
              score: wis,
              level: level,
            }}
          />
        </Grid>

        <h1>Charisma {scoreMod(char)}</h1>
        <Grid xs={12}>
          <SkillBox
            info={{
              isTrained: trainedSkills.deception,
              skill: "Deception",
              score: char,
              level: level,
            }}
          />
          <SkillBox
            info={{
              isTrained: trainedSkills.Intimidation,
              skill: "Intimidation",
              score: char,
              level: level,
            }}
          />
          <SkillBox
            info={{
              isTrained: trainedSkills.performance,
              skill: "Performance",
              score: char,
              level: level,
            }}
          />
          <SkillBox
            info={{
              isTrained: trainedSkills.persuasion,
              skill: "Persuasion",
              score: char,
              level: level,
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};
