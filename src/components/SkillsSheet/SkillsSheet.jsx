import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";

import { scoreMod } from "components/AttributeSheet/Modifiers";
import { SkillBox } from "components/SkillsSheet/SkillBox";

export const SkillsSheet = () => {
  const [character, setCharacter] = useState({});
  const [isFetched, setIsFetched] = useState(false);
  const [str, setStr] = useState();
  const [dex, setDex] = useState();
  const [wis, setWis] = useState();
  const [char, setChar] = useState();
  const [int, setInt] = useState();


  useEffect(() => {
    const characterID = JSON.parse(sessionStorage.getItem("currentCharacter"))
    const getCharacter = JSON.parse(sessionStorage.getItem(characterID));
    setCharacter(getCharacter);
    setStr(getCharacter["str"]);
    setDex(getCharacter["dex"]);
    setWis(getCharacter["wis"]);
    setChar(getCharacter["char"]);
    setInt(getCharacter["int"]);
    setIsFetched(true);
  }, []);
  // This all relies on everything being present and in order
  //    Prehaps make this safer somehow
  return (
    <Container width="100%" maxWidth={false} sx={{ ml: 0 }}>
      {isFetched && (
        <div className="skillSheet">
          <Grid container spacing={1}>
            <h1>Strength {scoreMod(str)}</h1>
            <Grid xs={12}>
              <SkillBox
                info={{
                  skill: "athletics",
                  title: "Athletics",
                  characterID: character._id
                  
                }}
              />
            </Grid>

            <h1>Dexterity {scoreMod(dex)}</h1>
            <Grid xs={12}>
              <SkillBox
                info={{
                  skill: "acrobatics",
                  title: "Acrobatics",
                  characterID: character._id
                }}
              />
              <SkillBox
                info={{
                  skill: "sleightOfHand",
                  title: "Sleight Of Hand",
                  characterID: character._id
                }}
              />
              <SkillBox
                info={{
                  skill: "stealth",
                  title: "Stealth",
                  characterID: character._id
                }}
              />
            </Grid>

            <h1>Intelligence {scoreMod(int)}</h1>
            <Grid xs={12}>
              <SkillBox
                info={{
                  skill: "arcana",
                  title: "Arcana",
                  characterID: character._id
                }}
              />
              <SkillBox
                info={{
                  skill: "history",
                  title: "History",
                  characterID: character._id
                }}
              />
              <SkillBox
                info={{
                  skill: "investigation",
                  title: "Investigation",
                  characterID: character._id
                }}
              />
              <SkillBox
                info={{
                  skill: "nature",
                  title: "Nature",
                  characterID: character._id
                }}
              />
              <SkillBox
                info={{
                  skill: "religion",
                  title: "Religion",
                  characterID: character._id
                }}
              />
            </Grid>

            <h1>Wisdom {scoreMod(wis)}</h1>
            <Grid xs={12}>
              <SkillBox
                info={{
                  skill: "animalHandling",
                  title: "Animal Handling",
                  characterID: character._id
                }}
              />
              <SkillBox
                info={{
                  skill: "insight",
                  title: "Insight",
                  characterID: character._id
                }}
              />
              <SkillBox
                info={{
                  skill: "medicine",
                  title: "Medicine",
                  characterID: character._id
                }}
              />
              <SkillBox
                info={{
                  skill: "perception",
                  title: "Perception",
                  characterID: character._id
                }}
              />
              <SkillBox
                info={{
                  skill: "survival",
                  title: "Survival",
                  characterID: character._id
                }}
              />
            </Grid>

            <h1>Charisma {scoreMod(char)}</h1>
            <Grid xs={12}>
              <SkillBox
                info={{
                  skill: "deception",
                  title: "Deception",
                  characterID: character._id
                }}
              />
              <SkillBox
                info={{
                  skill: "intimidation",
                  title: "Intimidation",
                  characterID: character._id
                }}
              />
              <SkillBox
                info={{
                  skill: "performance",
                  title: "Performance",
                  characterID: character._id
                }}
              />
              <SkillBox
                info={{
                  skill: "persuasion",
                  title: "Persuasion",
                  characterID: character._id
                }}
              />
            </Grid>
          </Grid>
        </div>
      )}
    </Container>
  );
};
