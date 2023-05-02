import React, { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import { rollDice } from "components/UtilityFunctions";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const DiceSnack = ({ DiceSnackProps }) => {
  const { modifier, open, setOpen } = DiceSnackProps;
  const [diceRoll, setDiceRoll] = useState(null);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    
    setDiceRoll(rollDice(20));
    setIsFetched(true);
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      {isFetched && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {"Roll:  " + (diceRoll + parseInt(modifier.replace("+", "")))}
            {" ( " + (diceRoll + " + " + modifier.replace("+", "")) + " )"}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
};
