import React, { useState, useEffect } from "react";
import {
  proficiencyBonus,
  scoreMod,
} from "components/AttributeSheet/Modifiers";
import { Grid } from "@mui/material";

export const InfoBox = ({ info }) => {
  const { title, infoName, characterID, updateComponent } = info;
  const [content, setContent] = useState();
  const [isFetched, setIsFetched] = useState(false);
  const [update, setUpdate] = useState(updateComponent);

  useEffect(() => {
    const character = JSON.parse(sessionStorage.getItem("currentCharacter"));
    if (title === "Proficiency") {
      setContent(proficiencyBonus(character[infoName]));
    } else if (title === "Initiative") {
      setContent(scoreMod(character[infoName]));
    } else {
      setContent(character[infoName]);
    }
    setIsFetched(true);
    setUpdate(updateComponent);
  }, [characterID, infoName, title, updateComponent]);

  console.debug(update);

  return (
    <div>
      {isFetched && (
        <div className="basicBox statBox">
          <Grid container>
            <Grid item xs={9}>
              <h1>{title}</h1>
            </Grid>
            <Grid item xs={3}>
              <h2>{content}</h2>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
};
