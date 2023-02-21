import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled } from "@mui/material/styles";


export const ChangeHPBox = ({ values, methods }) => {
  const { closeChangeState, handleRadio, cancelHandler } = methods;
  const {changeType, initialValue} = values;

  const StyledTextField = styled(TextField)({
    "& .MuiInputBase-input": {
      color: "#DBE2EF",
    },
    "& label": {
      color: "#464b4c",
    },
    "& label.Mui-focused": {
      color: "#03C988",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#03C988",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#03C988",
      },
      "&:hover fieldset": {
        borderColor: "#d97326",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#03C988",
      },
    },
  });

//   Background - #0f111a
// Text/Foreground - #5aa0ff
// Secondary Text - #c789c3
// Third Text - #d97326
// Comment Color - #464b4c 
// Nice Green - #03C988*/

  const BpIcon = styled('span')(({ theme }) => ({
    borderRadius: '50%',
    width: 16,
    height: 16,
    backgroundColor: "#464b4c",
    backgroundImage:
      theme.palette.mode === 'dark'
        ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
        : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '.Mui-focusVisible &': {
      outline: '2px auto #d97326',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5',
    },
  }));
  
  const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: '#03C988',
    boxShadow: "0px 0px 5px #03C988",
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage: 'radial-gradient(#DBE2EF,#DBE2EF 28%,transparent 32%)',
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#03C988',
    },
  });
  
  // Inspired by blueprintjs
  function BpRadio(props) {
    return (
      <Radio
        disableRipple
        color="default"
        checkedIcon={<BpCheckedIcon />}
        icon={<BpIcon />}
        {...props}
      />
    );
  }
  const StyledFormControlLabel= styled(FormControlLabel)({
    color: "#DBE2EF"
  });

  return (
    <form onSubmit={closeChangeState}>
      <Grid container spacing={2}>
        <RadioGroup name="typeHPChange" value={changeType}>
          <Grid container spacing={2}>
            <Grid xs={6}>
              <StyledFormControlLabel
                value="damage"
                control={<BpRadio onChange={handleRadio} />}
                label="Damage"
                color="#DBE2EF"
              />
            </Grid>
            <Grid xs={6}>
              <StyledFormControlLabel
                value="heal"
                control={<BpRadio onChange={handleRadio} />}
                label="Heal"
              />
            </Grid>
            <Grid xs={12}>
              <StyledFormControlLabel
                value="stabilize"
                control={<BpRadio onChange={handleRadio} />}
                label="Stabilize"
              />
            </Grid>
          </Grid>
        </RadioGroup>

        <Grid xs={12}>
          <StyledTextField
            name="changeValue"
            id="outlined-number"
            type="number"
            defaultValue={initialValue}
          />
        </Grid>
        <Grid xs={6}>
          <Button onClick={cancelHandler} name="cancelButton" variant="contained" color="error" type="submit">
            Cancel
          </Button>
        </Grid>
        <Grid xs={6}>
          <Button
            variant="contained"
            color="success"
            type="submit"
          >
            Ok
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
