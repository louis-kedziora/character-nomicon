import React from "react";
import Grid from '@mui/material/Unstable_Grid2'; 
import scoreMod from "./Modifiers"


function AttributeBox(props) {
  

  return (
    <div className="attributeBox">
      <h1>{props.attributeName}</h1>
      <Grid container spacing={2}>
        <Grid xs={4}>
          <p>Score</p>
        </Grid>
        <Grid xs={4}>
          <p>Mod</p>
        </Grid>
        <Grid xs={4}>
          <p>Save</p>
        </Grid>
      </Grid>    
      <Grid container spacing={2}>
        <Grid xs={4}>
          <p>{props.attributeScore}</p>
        </Grid>
        <Grid xs={4}>
          <p>{scoreMod(props.attributeScore)}</p>
        </Grid>
        <Grid xs={4}>
          <p>{scoreMod(props.attributeScore)}</p>
        </Grid>
      </Grid>      
    </div>
  );
}

export default AttributeBox;
