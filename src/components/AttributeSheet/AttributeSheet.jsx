import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";

import { AttributeBox } from "./AttributeBox";
import { InfoBox } from "./InfoBox";
import { proficiencyBonus, scoreMod } from "./Modifiers";
import { HPBox } from "./HPBox";
import { ResourceBox } from "./ResourceBox";

export const AttributeSheet = ({ characterID }) => {
  const [character, setCharacter] = useState();
  const [isFetched, setIsFetched] = useState(false);
  //Helper Function could put it in utils.js
  // const variableToString = (varObj) => Object.keys(varObj)[0];

  useEffect(() => {
    const character = JSON.parse(sessionStorage.getItem(characterID));
    setCharacter(character);
    setIsFetched(true);
  }, [characterID]);


  return (
    <div>
      {isFetched && (
        <div>
          <Grid container spacing={1}>
            <Grid xs={12}>
              <AttributeBox
                attribute={{ attributeName: "Strength", attributeScore: character.str }}
              />
              <AttributeBox
                attribute={{
                  attributeName: "Intelligence",
                  attributeScore: character.int,
                }}
              />
              <AttributeBox
                attribute={{ attributeName: "Dexterity", attributeScore: character.dex }}
              />
              <AttributeBox
                attribute={{ attributeName: "Wisdom", attributeScore: character.wis }}
              />
              <AttributeBox
                attribute={{
                  attributeName: "Constitution",
                  attributeScore: character.con,
                }}
              />
              <AttributeBox
                attribute={{ attributeName: "Charisma", attributeScore: character.char }}
              />
            </Grid>
            <Grid xs={12}>
              <InfoBox info={{ title: "AC", content: character.ac }} />
              <InfoBox
                info={{
                  title: "Proficiency",
                  content: proficiencyBonus(character.level),
                }}
              />
              <InfoBox info={{ title: "Speed", content: character.speed }} />
              <InfoBox info={{ title: "Initiative", content: scoreMod(character.dex) }} />
            </Grid>

            <Grid xs={12}>
              <HPBox
                characterInfo={{
                  title: "HP",
                  characterID: characterID
                }}
              />
              <ResourceBox
                characterInfo={{
                  title: "Hit Dice",
                  resourceName: "currentHitDice",
                  characterID: characterID,
                  extraInfo: character.hitDice
                }}
              />
              <ResourceBox
                characterInfo={{
                  title: "1st Level Spells",
                  resourceName: "currentOneSpellSlots",
                  characterID: characterID
                }}
              />
              <ResourceBox
                characterInfo={{
                  title: "2nd Level Spells",
                  resourceName: "currentTwoSpellSlots",
                  characterID: characterID
                }}
              />
              <ResourceBox
                characterInfo={{
                  title: "3rd Level Spell",
                  resourceName: "currentThreeSpellSlots",
                  characterID: characterID
                }}
              />
              <ResourceBox
                characterInfo={{
                  title: "Wild Shapes",
                  resourceName: "currentWildShapes",
                  characterID: characterID
                }}
              />
              <ResourceBox
                characterInfo={{
                  title: "Guiding Bolts",
                  resourceName: "currentGuidingBolts",
                  characterID: characterID
                }}
              />
              {/* May need a specific box for this or a additional Info for this
      ie. Woe / Weal*/}
              <ResourceBox
                characterInfo={{
                  title: "Cosmic Omens",
                  resourceName: "currentCosmicOmens",
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
