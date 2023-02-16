import React, { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Fab from "@mui/material/Fab";
import { DataGrid } from "@mui/x-data-grid";
import mongoose from "mongoose";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import Button from "@mui/material/Button";

import { updateInfo } from "../DBHandler";
import { NewAttackBox } from "./NewAttackBox";

export const AttacksSheet = ({ gaston }) => {
  const { attacks } = gaston;
  const [currentAttacks, setCurrentAttacks] = useState(attacks);
  const [addNewAttack, setAddNewAttack] = useState(false);
  const [cancelClicked, setCancelClicked] = useState(false);
  const [oldValue, setOldValue] = useState("");

  const onDeleteClick = (event, row) => {
    event.stopPropagation();
    let newAttacks = structuredClone(currentAttacks);
    newAttacks = newAttacks.filter((element) => element._id !== row._id);
    setCurrentAttacks(newAttacks);
    updateInfo("attacks", newAttacks);
  };

  const handleCellEditStart = (params, event) => {
    setOldValue(params.value);
  };

  const handleCellEditStop = (params, event) => {
    if (String(oldValue) !== String(event.target.value)) {
      let foundRow = currentAttacks.find(
        (element) => element._id === params.id
      );
      foundRow[params.field] = event.target.value;
      setCurrentAttacks(currentAttacks);
      updateInfo("attacks", currentAttacks);
    }
  };

  const openNewAttackForm = () => {
    setAddNewAttack(true);
  };

  const closeAddState = (event) => {
    event.preventDefault();
    // Only save the new attack if cancel was not clicked

    if (!cancelClicked) {
      const attackName = event.target.elements.attackName.value;
      const attackRange = event.target.elements.attackRange.value;
      const attackType = event.target.elements.attackType.value;
      const attackModifier = event.target.elements.attackModifier.value;
      const attackDamage = event.target.elements.attackDamage.value;

      const newAttack = {
        attackName: attackName,
        attackRange: attackRange,
        attackType: attackType,
        attackModifier: attackModifier,
        attackDamage: attackDamage,
        _id: mongoose.Types.ObjectId(),
      };
      let newAttacks = structuredClone(currentAttacks);
      newAttacks.push(newAttack);
      setCurrentAttacks(newAttacks);
      updateInfo("attacks", newAttacks);
    }
    setAddNewAttack(false);
  };
  function cancelHandler() {
    setCancelClicked(true);
  }

  const columns = [
    {
      field: "attackName",
      headerName: "Name",
      editable: true,
      flex: 0.5,
      minWidth: 100,
    },
    {
      field: "attackRange",
      headerName: "Range",
      editable: true,
      flex: 0.5,
      minWidth: 200,
    },
    {
      field: "attackType",
      headerName: "Type",
      editable: true,
      flex: 1,
      minWidth: 200,
    },
    {
      field: "attackModifier",
      headerName: "Modifier",
      editable: true,
      flex: 0.3,
      minWidth: 200,
    },
    {
      field: "attackDamage",
      headerName: "Damage",
      editable: true,
      flex: 0.5,
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
    <div className="attackBox">
      <Grid container spacing={2}>
        <Grid xs={12}>
          {!addNewAttack && (
            <Fab
              size="large"
              color="primary"
              variant="extended"
              onClick={openNewAttackForm}
            >
              <h1>New Attack</h1>
            </Fab>
          )}
          {addNewAttack && (
            <NewAttackBox
              methods={{
                closeAddState: closeAddState,
                cancelHandler: cancelHandler,
              }}
            />
          )}
        </Grid>
        <Grid xs={12}></Grid>
        <div style={{ height: 400, width: "100%", backgroundColor: "white" }}>
          <DataGrid
            experimentalFeatures={{ newEditingApi: true }}
            columnVisibilityModel={{
              id: false,
            }}
            rows={currentAttacks}
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
