import React, { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Fab from "@mui/material/Fab";
import { DataGrid } from "@mui/x-data-grid";
import mongoose from "mongoose";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import Button from "@mui/material/Button";

import { updateInfo } from "../DBHandler";
import { InputForm } from "../InputForm";


export const SpellsSheet = ({ gaston }) => {

  const { spells } = gaston;
  const [currentSpells, setCurrentSpells] = useState(spells);
  const [addNewSpell, setAddNewSpell] = useState(false);
  const [cancelClicked, setCancelClicked] = useState(false);
  const [oldValue, setOldValue] = useState("");

  const onDeleteClick = (event, row) => {
    event.stopPropagation();
    let newSpells = structuredClone(currentSpells);
    newSpells = newSpells.filter((element) => element._id !== row._id);
    setCurrentSpells(newSpells);
    updateInfo("spells", newSpells);
  };

  const handleCellEditStart = (params, event) => {
    setOldValue(params.value);
  };

  const handleCellEditStop = (params, event) => {
    if (String(oldValue) !== String(event.target.value)) {
      let foundRow = currentSpells.find(
        (element) => element._id === params.id
      );
      foundRow[params.field] = event.target.value;
      setCurrentSpells(currentSpells);
      updateInfo("spells", currentSpells);
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
    }
    setAddNewSpell(false);
  };
  function cancelHandler() {
    setCancelClicked(true);
  }

  const columns = [
    {
      field: "spellPrepared",
      headerName: "Spell Prepared",
      editable: true,
      flex: 0.75,
      minWidth: 125,
    },
    {
      field: "spellName",
      headerName: "Name",
      editable: true,
      flex: 0.5,
      minWidth: 100,
    },
    {
      field: "spellTime",
      headerName: "Time",
      editable: true,
      flex: 0.25,
      minWidth: 50,
    },
    {
      field: "spellRange",
      headerName: "Range",
      editable: true,
      flex: 0.5,
      minWidth: 50,
    },
    {
      field: "spellHitOrDC",
      headerName: "Hit / DC",
      editable: true,
      flex: 0.5,
      minWidth: 100,
    },
    {
      field: "spellEffect",
      headerName: "Effect",
      editable: true,
      flex: 1,
      minWidth: 200,
    },
    {
      field: "spellNotes",
      headerName: "Notes",
      editable: true,
      flex: 1,
      minWidth: 200,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 400,
      renderCell: (params) => {
        return (
          <Button
            onClick={(event) => onDeleteClick(event, params.row)}
            variant="outlined"
            color="error"
          >
            <DeleteIcon/>
          </Button>
        );
      },
    },
  ];

  return (
    <div className="spellBox">
      <Grid container spacing={2}>
        <Grid xs={12}>
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
        <Grid xs={12}></Grid>
        <div style={{ height: 400, width: "100%", backgroundColor: "white" }}>
          <DataGrid
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
          />
        </div>
      </Grid>
    </div>
  );
};
