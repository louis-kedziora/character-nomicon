import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import mongoose from "mongoose";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

import { updateInfo } from "components/DBHandler";
import { InputForm } from "components/InputForm";
import {
  StyledDataGrid,
  StyledGridFab,
  StyledSheetContainer,
} from "components/StyledComponents";
import { SpellsSheet } from "components/SpellsSheet";

export const AttacksSheet = () => {
  const [character, setCharacter] = useState({});
  const [currentAttacks, setCurrentAttacks] = useState();
  const [addNewAttack, setAddNewAttack] = useState(false);
  const [cancelClicked, setCancelClicked] = useState(false);
  const [oldValue, setOldValue] = useState("");
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    const getCharacter = JSON.parse(sessionStorage.getItem("currentCharacter"));
    setCharacter(getCharacter);
    setCurrentAttacks(getCharacter["attacks"]);
    setIsFetched(true);
  }, []);

  const updateLocalStorage = (newAttacks) => {
    let updateCharacter = JSON.parse(
      sessionStorage.getItem("currentCharacter")
    );
    updateCharacter["attacks"] = newAttacks;
    sessionStorage.setItem("currentCharacter", JSON.stringify(updateCharacter));
  };

  const onDeleteClick = (event, row) => {
    event.stopPropagation();
    let newAttacks = structuredClone(currentAttacks);
    newAttacks = newAttacks.filter(
      (element) => element.attackID !== row.attackID
    );
    setCurrentAttacks(newAttacks);
    updateInfo("attacks", newAttacks, character._id);
    updateLocalStorage(newAttacks);
  };

  const handleCellEditStart = (params, event) => {
    setOldValue(params.value);
  };

  const handleCellEditStop = (params, event) => {
    if (String(oldValue) !== String(event.target.value)) {
      let foundRow = currentAttacks.find(
        (element) => element.attackID === params.id
      );
      foundRow[params.field] = event.target.value;
      setCurrentAttacks(currentAttacks);
      updateInfo("attacks", currentAttacks, character._id);
      updateLocalStorage(currentAttacks);
    }
  };

  const openNewAttackForm = () => {
    setAddNewAttack(true);
  };

  const submitAttackFormHandler = (event) => {
    // Only save the new attack if cancel was not clicked
    event.preventDefault();

    setAddNewAttack(false);
    if (!cancelClicked) {
      const attackName = event.target.elements.attackName.value;
      const attackRange = event.target.elements.attackRange.value;
      const attackType = event.target.elements.attackType.value;
      const attackModifier = event.target.elements.attackModifier.value;
      const attackDamage = event.target.elements.attackDamage.value;
      const attackNotes = event.target.elements.attackNotes.value;
      const newID = new mongoose.Types.ObjectId();
      const newAttack = {
        attackName: attackName,
        attackRange: attackRange,
        attackType: attackType,
        attackModifier: attackModifier,
        attackDamage: attackDamage,
        attackNotes: attackNotes,
        attackID: newID.toString(),
      };
      let newAttacks = structuredClone(currentAttacks);
      newAttacks.push(newAttack);
      setCurrentAttacks(newAttacks);
      updateInfo("attacks", newAttacks, character._id);
      updateLocalStorage(newAttacks);
    }
  };
  function cancelHandler(event) {
    event.preventDefault();
    setCancelClicked(true);
    setAddNewAttack(false);
    setCancelClicked(false);
  }

  const defaultColumnOptions = {
    headerClassName: "dataGrid--header",
    type: "text",
    editable: true,
    hideSortIcons: true,
    disableColumnMenu: true,
  };

  const createColumn = (
    field,
    headerName,
    flex,
    minWidth,
    align,
    headerAlign,
    renderCell
  ) => ({
    field,
    headerName,
    flex,
    minWidth,
    align,
    headerAlign,
    renderCell,
    ...defaultColumnOptions,
  });

  const columns = [

    createColumn("attackName", "Name", 0.75, 150, "left", "left", null),
    createColumn("attackRange", "Range", 0.5, 100, "center", "center", null),
    createColumn("attackType", "Type", 1, 100, "left", "left", null),
    createColumn("attackModifier", "Modifier", 0.3, 100, "center", "center", null),
    createColumn("attackDamage", "Damage", 0.5, 100, "center", "center", null),
    createColumn("attackNotes", "Notes", 0.5, 200, "left", "left", null),
    createColumn("actions", "", 0.25, 75, "center", "center", (params) => {
      return (
        <IconButton
          onClick={(event) => onDeleteClick(event, params.row)}
          variant="outlined"
          color="error"
        >
          <DeleteIcon />
        </IconButton>
      );
    }),

  ];

  return (
    <StyledSheetContainer maxWidth={false}>
      {isFetched && (
        <div className="attackBox">
          <Grid container spacing={2}>
            <div style={{ width: "100%" }}>
              <StyledDataGrid
                pageSize={20}
                autoHeight={true}
                hideFooter
                experimentalFeatures={{ newEditingApi: true }}
                columnVisibilityModel={{
                  id: false,
                }}
                rows={currentAttacks}
                columns={columns}
                getRowId={(row) => row.attackID}
                onCellEditStop={handleCellEditStop}
                onCellEditStart={handleCellEditStart}
              />
            </div>
            <Grid
              display="flex"
              justifyContent="center"
              alignItems="center"
              xs={12}
            >
              <StyledGridFab
                size="large"
                color="primary"
                variant="extended"
                onClick={openNewAttackForm}
              >
                New Attack
              </StyledGridFab>
              <InputForm
                methods={{
                  submitFormHandler: submitAttackFormHandler,
                  cancelHandler: cancelHandler,
                  openForm: addNewAttack,
                  newTitle: "New Attack",
                }}
                fields={columns}
              />
            </Grid>
          </Grid>
        </div>
      )}
      <SpellsSheet />
    </StyledSheetContainer>
  );
};
