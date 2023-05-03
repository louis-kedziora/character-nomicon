import React, { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import CasinoIcon from "@mui/icons-material/Casino";

import { StyledAlert } from "components/StyledComponents";
import { rollDice } from "components/UtilityFunctions";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <StyledAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const DiceSnack = ({ DiceSnackProps }) => {
  const { modifier, title, open, setOpen } = DiceSnackProps;
  const [diceRoll, setDiceRoll] = useState(null);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    setDiceRoll(rollDice(20));
    setIsFetched(true);
  }, []);

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  return (
    <div>
      {isFetched && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            sx={{ width: "100%" }}
            severity="success"
            iconMapping={{
              success: <CasinoIcon fontSize="inherit" />,
            }}
          >
            {title +
              " Check = " +
              (diceRoll + parseInt(modifier.replace("+", "")))}
            {" ( " + (diceRoll + " + " + modifier.replace("+", "")) + " )"}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
};
