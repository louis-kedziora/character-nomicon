import React from "react";
import Grid from "@mui/material/Unstable_Grid2";

import { AttributeBox } from "./AttributeBox";
import { InfoBox } from "./InfoBox";
import { proficiencyBonus, scoreMod } from "./Modifiers";
import { HPBox } from "./HPBox";
import { ResourceBox } from "./ResourceBox";

export const AttributeSheet = ({ gaston }) => {
  //Helper Function could put it in utils.js
  const variableToString = (varObj) => Object.keys(varObj)[0];
  const {
    ac,
    level,
    speed,
    str,
    int,
    dex,
    wis,
    con,
    char,
    hpMax,
    currentHP,
    hitDice,
    maxHitDice,
    currentHitDice,
    maxOneSpellSlots,
    currentOneSpellSlots,
    maxTwoSpellSlots,
    currentTwoSpellSlots,
    maxThreeSpellSlots,
    currentThreeSpellSlots,
    maxWildShapes,
    currentWildShapes,
    maxGuidingBolts,
    currentGuidingBolts,
    maxCosmicOmens,
    currentCosmicOmens,
  } = gaston;

  return (
    <div>

      <Grid container spacing={1}>
        <Grid xs={12}>
          <AttributeBox
            attribute={{ attributeName: "Strength", attributeScore: str }}
          />
          <AttributeBox
            attribute={{ attributeName: "Intelligence", attributeScore: int }}
          />
          <AttributeBox
            attribute={{ attributeName: "Dexterity", attributeScore: dex }}
          />
          <AttributeBox
            attribute={{ attributeName: "Wisdom", attributeScore: wis }}
          />
          <AttributeBox
            attribute={{ attributeName: "Constitution", attributeScore: con }}
          />
          <AttributeBox
            attribute={{ attributeName: "Charisma", attributeScore: char }}
          />
        </Grid>
        <Grid xs={12}>
          <InfoBox info={{ title: "AC", content: ac }} />
          <InfoBox
            info={{ title: "Proficiency", content: proficiencyBonus(level) }}
          />
          <InfoBox info={{ title: "Speed", content: speed }} />
          <InfoBox info={{ title: "Initiative", content: scoreMod(dex) }} />
        </Grid>

        <Grid xs={12}>
          <HPBox
            characterInfo={{ title: "HP", hpMax: hpMax, currentHP: currentHP }}
          />
          <ResourceBox
            characterInfo={{
              title: "Hit Dice",
              currentValue: currentHitDice,
              maxValue: maxHitDice,
              extraInfo: hitDice,
              resourceName: variableToString({ currentHitDice }),
            }}
          />
          <ResourceBox
            characterInfo={{
              title: "1st Level Spells",
              currentValue: currentOneSpellSlots,
              maxValue: maxOneSpellSlots,
              resourceName: variableToString({ currentOneSpellSlots }),
            }}
          />
          <ResourceBox
            characterInfo={{
              title: "2nd Level Spells",
              currentValue: currentTwoSpellSlots,
              maxValue: maxTwoSpellSlots,
              resourceName: variableToString({ currentTwoSpellSlots }),
            }}
          />
          <ResourceBox
            characterInfo={{
              title: "3rd Level Spell",
              currentValue: currentThreeSpellSlots,
              maxValue: maxThreeSpellSlots,
              resourceName: variableToString({ currentThreeSpellSlots }),
            }}
          />
          <ResourceBox
            characterInfo={{
              title: "Wild Shapes",
              currentValue: currentWildShapes,
              maxValue: maxWildShapes,
              resourceName: variableToString({ currentWildShapes }),
            }}
          />
          <ResourceBox
            characterInfo={{
              title: "Guiding Bolts",
              currentValue: currentGuidingBolts,
              maxValue: maxGuidingBolts,
              resourceName: variableToString({ currentGuidingBolts }),
            }}
          />
          {/* May need a specific box for this or a additional Info for this
      ie. Woe / Weal*/}
          <ResourceBox
            characterInfo={{
              title: "Cosmic Omens",
              currentValue: currentCosmicOmens,
              maxValue: maxCosmicOmens,
              resourceName: variableToString({ currentCosmicOmens }),
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};
