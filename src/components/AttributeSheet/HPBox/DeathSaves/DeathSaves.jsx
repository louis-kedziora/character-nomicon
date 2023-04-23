import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Divider from "@mui/material/Divider";
import { Favorite, HeartBroken } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

import { updateInfo } from "components/DBHandler";

export const DeathSaves = ({ methods }) => {
  const { characterID } = methods;
  const [isFetched, setIsFetched] = useState(false);
  const [successes, setSuccesses] = useState([]);
  const [failures, setFailures] = useState([]);

  useEffect(() => {
    const getCharacter = JSON.parse(sessionStorage.getItem("currentCharacter"));
    let intialSuccess, intialFailure;
    intialFailure = intialSuccess = [1, 2, 3];
    setSuccesses(
      intialSuccess.filter((num) => num <= getCharacter["deathSaveSuccesses"])
    );
    setFailures(
      intialFailure.filter((num) => num <= getCharacter["deathSaveFailures"])
    );
    setIsFetched(true);
  }, [characterID]);

  const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    "& .MuiToggleButtonGroup-grouped": {
      margin: theme.spacing(1),
      border: 0,
      "&.Mui-disabled": {
        border: 0,
      },
      "&.Mui-selected": {
        backgroundColor: "transparent",
      },
      "&:not(:first-of-type)": {
        borderRadius: theme.shape.borderRadius,
      },
      "&:first-of-type": {
        borderRadius: theme.shape.borderRadius,
      },
    },
  }));

  const handleSuccess = (event, newSuccess) => {
    setSuccesses(newSuccess);
    const successesNum = newSuccess.length;
    console.log(successesNum);
    let getCharacter = JSON.parse(sessionStorage.getItem("currentCharacter"));
    getCharacter["deathSaveSuccesses"] = successesNum;
    sessionStorage.setItem("currentCharacter", JSON.stringify(getCharacter));
    updateInfo("deathSaveSuccesses", successesNum, characterID);
  };

  const handleFailure = (event, newFailure) => {
    setFailures(newFailure);
    const failuresNum = newFailure.length;
    let getCharacter = JSON.parse(sessionStorage.getItem("currentCharacter"));
    getCharacter["deathSaveFailures"] = failuresNum;
    sessionStorage.setItem("currentCharacter", JSON.stringify(getCharacter));

    updateInfo("deathSaveFailures", failuresNum, characterID);
  };
  return (
    <div>
      {isFetched && (
        <Grid container spacing={2}>
          <Divider
            flexItem
            sx={{ my: 1, width: "100%", border: "1px solid #464b4c" }}
          />
          <Grid xs={12}>
            <h2>Failures</h2>
            <StyledToggleButtonGroup
              color="error"
              value={failures}
              onChange={handleFailure}
              aria-label="Failures"
              size="small"
            >
              <ToggleButton value={1} aria-label="Third">
                <HeartBroken />
              </ToggleButton>
              <ToggleButton value={2} aria-label="Second">
                <HeartBroken />
              </ToggleButton>
              <ToggleButton value={3} aria-label="First">
                <HeartBroken />
              </ToggleButton>
            </StyledToggleButtonGroup>
          </Grid>
          <Divider
            flexItem
            sx={{ my: 1, width: "100%", border: "1px solid #464b4c" }}
          />
          <Grid xs={12}>
            <h2>Successes</h2>

            <StyledToggleButtonGroup
              color="error"
              value={successes}
              onChange={handleSuccess}
              aria-label="Successes"
              size="small"
            >
              <ToggleButton value={1} aria-label="First">
                <Favorite />
              </ToggleButton>
              <ToggleButton value={2} aria-label="Second">
                <Favorite />
              </ToggleButton>
              <ToggleButton value={3} aria-label="Third">
                <Favorite />
              </ToggleButton>
            </StyledToggleButtonGroup>
          </Grid>
        </Grid>
      )}
    </div>
  );
};
