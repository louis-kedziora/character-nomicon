import React, { useState, useEffect } from "react";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Unstable_Grid2";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { updateResource } from "components/DBHandler";

export const ResourceBox = ({ characterInfo }) => {
  const { title, resourceName, characterID, extraInfo } = characterInfo;
  const [resourceValue, setResourceValue] = useState();
  const [maxValue, setMaxValue] = useState();
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    const character = JSON.parse(sessionStorage.getItem(characterID));
    setResourceValue(character[resourceName]);
    setMaxValue(character[resourceName.replace("current", "max")]);
    setIsFetched(true);
  }, [characterID, resourceName]);

  function onClickHandler(event) {
    const changeType = event.currentTarget.name;
    let newValue = -1;
    if (changeType === "Remove") {
      if (resourceValue > 0) {
        setResourceValue(resourceValue - 1);
        updateResource(resourceName, -1, resourceValue, maxValue, characterID);
        newValue = resourceValue - 1;
      }
    } else if (changeType === "Add") {
      if (resourceValue < maxValue) {
        setResourceValue(resourceValue + 1);
        updateResource(resourceName, 1, resourceValue, maxValue, characterID);
        newValue = resourceValue + 1;
      }
    }
    if (newValue > -1) {
      let character = JSON.parse(sessionStorage.getItem(characterID));
      character[resourceName] = newValue;
      sessionStorage.setItem(characterID, JSON.stringify(character));
    }
  }
  // extraInfo is seemingly only needed for hitDice resource but because of Variance probably
  //  need its own component ie. multiclassing can result in hitDice = 3/3d8s and 2/2d10s
  return (
    <div>
      {isFetched && (
        <div>
          {/* If the maxValue <= 0 do not render or in other words
          if the Character does not have the resource do not render the box */}
          {maxValue > 0 && (
            <div className="basicBox resourceBox">
              <h1>{title}</h1>
              <div className="resourceCount">
                <h2>
                  {extraInfo
                    ? resourceValue + " / " + maxValue + extraInfo
                    : resourceValue + " / " + maxValue}
                </h2>
              </div>
              <Grid container spacing={2}>
                <Grid xs={6}>
                  <Fab
                    size="small"
                    name="Remove"
                    color="error"
                    onClick={onClickHandler}
                  >
                    <RemoveIcon fontSize="large" name="Remove" />
                  </Fab>
                </Grid>
                <Grid xs={6}>
                  <Fab
                    size="small"
                    name="Add"
                    color="success"
                    onClick={onClickHandler}
                  >
                    <AddIcon fontSize="large" name="Add" />
                  </Fab>
                </Grid>
              </Grid>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResourceBox;
