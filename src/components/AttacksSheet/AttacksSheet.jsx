import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import { styled } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import mongoose from "mongoose";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

import { updateInfo } from "components/DBHandler";
import { InputForm } from "components/InputForm";

export const AttacksSheet = () => {
  const [character, setCharacter] = useState({});
  const [currentAttacks, setCurrentAttacks] = useState();
  const [addNewAttack, setAddNewAttack] = useState(false);
  const [cancelClicked, setCancelClicked] = useState(false);
  const [oldValue, setOldValue] = useState("");
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    const characterID = JSON.parse(sessionStorage.getItem("currentCharacter"))
    const getCharacter = JSON.parse(sessionStorage.getItem(characterID));
    setCharacter(getCharacter);
    setCurrentAttacks(getCharacter["attacks"]);
    setIsFetched(true);
  }, []);

  const updateSession = (newAttacks) => {
    let character = JSON.parse(sessionStorage.getItem("currentCharacter"));
    character["attacks"] = newAttacks;
    sessionStorage.setItem("currentCharacter", JSON.stringify(character));
  };

  const onDeleteClick = (event, row) => {
    event.stopPropagation();
    let newAttacks = structuredClone(currentAttacks);
    newAttacks = newAttacks.filter((element) => element._id !== row._id);
    setCurrentAttacks(newAttacks);
    updateInfo("attacks", newAttacks, character._id);
    updateSession(newAttacks);
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
      updateInfo("attacks", currentAttacks, character._id);
      updateSession(currentAttacks);
    }
  };

  const openNewAttackForm = () => {
    setAddNewAttack(true);
  };

  const submitFormHandler = (event) => {
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
      updateInfo("attacks", newAttacks, character._id);
      updateSession(newAttacks);
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
      flex: 1,
      minWidth: 200,
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
      minWidth: 100,
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
    "& .MuiDataGrid-menuIconButton": {
      opacity: 1,
      color: "white",
    },
    "& .MuiDataGrid-sortIcon": {
      opacity: 1,
      color: "white",
    },
  }));
  return (
    <Container width="100%" maxWidth={false} sx={{ ml: 0 }}>
      {isFetched && (
        <div className="attackBox">
          <Grid container spacing={2}>
            <Grid
              display="flex"
              justifyContent="center"
              alignItems="center"
              xs={12}
            >
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
                <InputForm
                  methods={{
                    submitFormHandler: submitFormHandler,
                    cancelHandler: cancelHandler,
                  }}
                  fields={columns}
                />
              )}
            </Grid>
            <Grid xs={12}></Grid>
            <div style={{ height: 400, width: "100%" }}>
              <StyledDataGrid
                hideFooter
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
      )}
    </Container>
  );
};
