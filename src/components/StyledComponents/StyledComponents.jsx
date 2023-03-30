import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import { DataGrid } from "@mui/x-data-grid";
import Fab from "@mui/material/Fab";

export const StyledFab = styled(Fab)(({ theme }) => ({
  backgroundColor: "#0f111a",
  fontFamily: "Montserrat",
  fontSize: "20px",
  "&:hover": {
    backgroundColor: "#464b4c"
  }
}));

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
