import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import Fab from "@mui/material/Fab";
import Container from "@mui/material/Container";
import MuiAlert from "@mui/material/Alert";

export const StyledAlert = styled(MuiAlert)(({ theme }) => ({
  backgroundColor: "#0f111a",
  fontFamily: "Montserrat",
  boxShadow: "0 2px 5px black",
  fontSize: "20px",
}));

export const StyledGridFab = styled(Fab)(({ theme }) => ({
  backgroundColor: "#0f111a",
  fontFamily: "Montserrat",
  boxShadow: "0 2px 5px black",
  margin: "2em 0 2em 0",
  fontSize: "20px",
  "&:hover": {
    backgroundColor: "#464b4c",
  },
}));

export const StyledSheetContainer = styled(Container)(({ theme }) => ({
  width: "100%",
  margin: "40px 0px",
  padding: "0px",
}));

export const StyledCharacterFab = styled(Fab)(({ theme }) => ({
  fontFamily: "Montserrat",
  boxShadow: "0 2px 5px black",
  height: "25%",
  width: "35em",
  margin: "25px",
  padding: "20px",
  display: "block",
  backgroundColor: "#0f111a",
  "&:hover": {
    backgroundColor: "#464b4c",
  },
  "& h1": {
    color: "#03C988",
    fontSize: "2.5em",
    padding: "10px",
    fontWeight: "bolder",
  },
  "& h2": {
    color: "#DBE2EF",
    fontSize: "1.5em",
    fontWeight: "500",
    padding: "10px",
  },
}));

export const StyledSkillFab = styled(Fab)(({ theme }) => ({
  backgroundColor: "#0f111a",
  boxShadow: "0 2px 5px black",
  borderRadius: "7px",
  width: "350px",
  fontFamily: "Montserrat",
  padding: "10px",
  margin: "10px",
  textAlign: "left",
  "&:hover": {
    backgroundColor: "#0f111a",
  },
  "& h1": {
    color: "#DBE2EF",
    fontSize: "20px",
    padding: "10px",
    fontWeight: "lighter",
  },
  "& h2": {
    color: "#5aa0ff",
    fontSize: "30px",
    fontWeight: "bolder",
    padding: "10px",
  },
}));

export const StyledFab = styled(Fab)(({ theme }) => ({
  backgroundColor: "#0f111a",
  boxShadow: "0 2px 5px black",
  fontFamily: "Montserrat",
  fontSize: "16px",
  color: "white",
  "&:hover": {
    backgroundColor: "#464b4c",
  },
}));

const StyledGridOverlay = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  color: "white",
  backgroundColor: "white",
}));

export const CustomNoRowsOverlay = () => {
  return (
    <StyledGridOverlay>
      <Box sx={{ mt: 1 }}>No Rows Message</Box>
    </StyledGridOverlay>
  );
};

export const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  fontFamily: "Montserrat",
  border: 0,
  WebkitFontSmoothing: "auto",
  letterSpacing: "normal",
  "& .MuiDataGrid-columnsContainer": {
    backgroundColor: theme.palette.mode === "light" ? "#fafafa" : "#1d1d1d",
  },
  "& .MuiDataGrid-iconSeparator": {
    display: "none",
  },
  "& .MuiDataGrid-columnHeader, .MuiDataGrid-cell": {
    borderRight: "none",
  },
  "& .MuiDataGrid-columnHeader": {
    color: "#d97326",
  },
  "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
    borderBottom: "none",
  },
  "& .MuiDataGrid-cell": {
    color: "#5aa0ff",
  },
  "& .MuiPaginationItem-root": {
    borderRadius: 0,
  },
  "& .MuiDataGrid-menuIconButton": {
    opacity: 1,
    color: "white",
  },
  "& .MuiDataGrid-sortIcon": {
    opacity: 1,
    color: "white",
  },
  "& .MuiDataGrid-virtualScrollerContent": {
    backgroundColor: "#0f111a",
  },
}));

export const StyledTextField = styled(TextField)({
  "& .MuiInputBase-input": {
    color: "#DBE2EF",
    fontFamily: "Montserrat",
  },
  "& label": {
    color: "#464b4c",
    fontFamily: "Montserrat",
  },
  "& label.Mui-focused": {
    color: "#03C988",
    fontFamily: "Montserrat",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#03C988",
  },
  "& input:-internal-autofill-selected": {
    backgroundColor: "#0f111a",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#03C988",
      fontFamily: "Montserrat",
    },
    "&:hover fieldset": {
      borderColor: "#5aa0ff",
      fontFamily: "Montserrat",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#5aa0ff",
      fontFamily: "Montserrat",
    },
  },
});
export const StyledFormControlLabel = styled(FormControlLabel)({
  "& .MuiTypography-root": {
    fontFamily: "Montserrat",
    color: "white",
  },
});
