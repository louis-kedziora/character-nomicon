import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import { styled } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import mongoose from "mongoose";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

import { updateInfo } from "../DBHandler";
import { InputForm } from "../InputForm";

export const SpellsSheet = ({ characterID }) => {
  const [currentSpells, setCurrentSpells] = useState();
  const [addNewSpell, setAddNewSpell] = useState(false);
  const [cancelClicked, setCancelClicked] = useState(false);
  const [oldValue, setOldValue] = useState("");
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    const character = JSON.parse(sessionStorage.getItem(characterID));
    setCurrentSpells(character["spells"]);
    setIsFetched(true);
  }, [characterID]);

  const updateSession = (newSpells) => {
    let character = JSON.parse(sessionStorage.getItem(characterID));
    character["spells"] = newSpells;
    sessionStorage.setItem(characterID, JSON.stringify(character));
  };

  const onDeleteClick = (event, row) => {
    event.stopPropagation();
    let newSpells = structuredClone(currentSpells);
    newSpells = newSpells.filter((element) => element._id !== row._id);
    setCurrentSpells(newSpells);
    updateInfo("spells", newSpells);
    updateSession(newSpells);
  };

  const handleCellEditStart = (params, event) => {
    setOldValue(params.value);
  };

  const handleCellEditStop = (params, event) => {
    if (String(oldValue) !== String(event.target.value)) {
      let foundRow = currentSpells.find((element) => element._id === params.id);
      foundRow[params.field] = event.target.value;
      setCurrentSpells(currentSpells);
      updateInfo("spells", currentSpells);
      updateSession(currentSpells);
    }
  };

  const openNewSpellForm = () => {
    setAddNewSpell(true);
  };

  const closeAddState = (event) => {
    // Only save the new spell if cancel was not clicked

    if (!cancelClicked) {
      const spellPrepared = false;
      const spellName = event.target.elements.spellName.value;
      const spellTime = event.target.elements.spellTime.value;
      const spellRange = event.target.elements.spellRange.value;
      const spellHitOrDC = event.target.elements.spellHitOrDC.value;
      const spellEffect = event.target.elements.spellEffect.value;
      const spellNotes = event.target.elements.spellNotes.value;

      const newSpell = {
        spellPrepared: spellPrepared,
        spellName: spellName,
        spellTime: spellTime,
        spellRange: spellRange,
        spellHitOrDC: spellHitOrDC,
        spellEffect: spellEffect,
        spellNotes: spellNotes,
        _id: mongoose.Types.ObjectId(),
      };
      let newSpells = structuredClone(currentSpells);
      newSpells.push(newSpell);
      setCurrentSpells(newSpells);
      updateInfo("spells", newSpells);
      updateSession(newSpells);
    }
    setAddNewSpell(false);
  };
  const cancelHandler = () => {
    setCancelClicked(true);
  };

  const onPreparedClick = (event, row) => {
    let foundRow = currentSpells.find((element) => element._id === row._id);

    foundRow["spellPrepared"] = !foundRow["spellPrepared"];
    setCurrentSpells(currentSpells);
    updateInfo("spells", currentSpells);
    updateSession(currentSpells);
  };

  const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
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
  }));

  const columns = [
    {
      field: "spellPrepared",
      headerName: "Prepared",
      headerClassName: "dataGrid--header",
      editable: true,
      flex: 0.25,
      minWidth: 100,
      renderCell: (params) => {
        const isPrepared = params.value;
        return (
          <div>
            {isPrepared ? (
              <IconButton
                onClick={(event) => onPreparedClick(event, params.row)}
                variant="outlined"
                color="success"
              >
                <CheckIcon />
              </IconButton>
            ) : (
              <IconButton
                onClick={(event) => onPreparedClick(event, params.row)}
                variant="contained"
                color="error"
              >
                <CloseIcon />
              </IconButton>
            )}
          </div>
        );
      },
    },
    {
      field: "spellName",
      headerName: "Name",
      headerClassName: "dataGrid--header",
      editable: true,
      flex: 0.75,
      minWidth: 100,
    },
    {
      field: "spellTime",
      headerName: "Time",
      headerClassName: "dataGrid--header",
      editable: true,
      flex: 0.25,
      minWidth: 50,
    },
    {
      field: "spellRange",
      headerName: "Range",
      headerClassName: "dataGrid--header",
      editable: true,
      flex: 0.5,
      minWidth: 50,
    },
    {
      field: "spellHitOrDC",
      headerName: "Hit / DC",
      headerClassName: "dataGrid--header",
      editable: true,
      flex: 0.5,
      minWidth: 100,
    },
    {
      field: "spellEffect",
      headerName: "Effect",
      headerClassName: "dataGrid--header",
      editable: true,
      flex: 1,
      minWidth: 200,
    },
    {
      field: "spellNotes",
      headerName: "Notes",
      headerClassName: "dataGrid--header",
      editable: true,
      flex: 1,
      minWidth: 200,
    },
    {
      field: "actions",
      headerName: "Actions",
      headerClassName: "dataGrid--header",
      width: 400,
      renderCell: (params) => {
        return (
          <IconButton
            onClick={(event) => onDeleteClick(event, params.row)}
            variant="outlined"
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        );
      },
    },
  ];

  return (
    <Container width="100%" maxWidth={false} sx={{ ml: 0 }}>
      {isFetched && (
        <div className="spellBox">
          <Grid container spacing={2}>
            <Grid
              display="flex"
              justifyContent="center"
              alignItems="center"
              xs={12}
            >
              {!addNewSpell && (
                <Fab
                  size="large"
                  color="primary"
                  variant="extended"
                  onClick={openNewSpellForm}
                >
                  <h1>New Spell</h1>
                </Fab>
              )}
              {addNewSpell && (
                <InputForm
                  methods={{
                    closeAddState: closeAddState,
                    cancelHandler: cancelHandler,
                  }}
                  fields={columns}
                />
              )}
            </Grid>
            <Grid xs={12}>
              <div
                style={{
                  height: 400,
                  width: "100%",
                  backgroundColor: "#0f111a",
                }}
              >
                <StyledDataGrid
                  className="customDataGrid"
                  hideFooter
                  experimentalFeatures={{ newEditingApi: true }}
                  columnVisibilityModel={{
                    id: false,
                  }}
                  rows={currentSpells}
                  columns={columns}
                  getRowId={(row) => row._id.toString()}
                  onCellEditStop={handleCellEditStop}
                  onCellEditStart={handleCellEditStart}
                  getRowClassName={(params) =>
                    `dataGrid--${params.row.spellPrepared}`
                  }
                />
              </div>
            </Grid>
          </Grid>
        </div>
      )}
    </Container>
  );
};
