import React, { useState } from "react";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Unstable_Grid2";
// import Button from "@mui/material/Button";
// import AddIcon from '@mui/icons-material/Add';
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { updateResource } from "../../DBHandler";

export const ResourceBox = ({ characterInfo }) => {
  const {
    title,
    currentValue,
    maxValue,
    extraInfo,
    characterName,
    resourceName,
  } = characterInfo;
  const [resourceValue, setResourceValue] = useState(currentValue);

  function onClickHandler(event) {
    const changeType = event.currentTarget.name;
    if (changeType === "Remove") {
      if (resourceValue > 0) {
        setResourceValue(resourceValue - 1);
        updateResource(resourceName, -1, resourceValue, maxValue);
      }
    } else if (changeType === "Add") {
      if (resourceValue < maxValue) {
        setResourceValue(resourceValue + 1);
        updateResource(resourceName, 1, resourceValue, maxValue);
      }
    }
  }
  // extraInfo is seemingly only needed for hitDice resource but because of Variance probably
  //  need its own component ie. multiclassing can result in hitDice = 3/3d8s and 2/2d10s
  return (
    <div className="attributeBox">
      <h1>{title}</h1>
      <p>{resourceValue + " / " + maxValue + extraInfo}</p>

      <Grid container spacing={2}>
        <Grid xs={6}>
          <Fab name="Remove" onClick={onClickHandler}>
            <RemoveIcon name="Remove" />
          </Fab>
        </Grid>
        <Grid xs={6}>
          <Fab name="Add" onClick={onClickHandler}>
            <AddIcon name="Add" />
          </Fab>
        </Grid>
      </Grid>
    </div>
  );
};

export default ResourceBox;
