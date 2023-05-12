import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import mongoose from "mongoose";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

import { updateInfo } from "components/DBHandler";
import { InputForm } from "components/InputForm";
import {
  StyledDataGrid,
  StyledGridFab,
} from "components/StyledComponents";
import {
  modifierAndProficency,
  spellSaveDC,
} from "components/AttributeSheet/Modifiers";

export const SpellsSheet = () => {
  const [character, setCharacter] = useState({});
  const [castingAttribute, setCastingAttribute] = useState("None");

  const [currentSpells, setCurrentSpells] = useState();
  const [addNewSpell, setAddNewSpell] = useState(false);
  const [cancelClicked, setCancelClicked] = useState(false);
  const [oldValue, setOldValue] = useState("");
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    const getCharacter = JSON.parse(sessionStorage.getItem("currentCharacter"));
    setCharacter(getCharacter);
    setCurrentSpells(getCharacter["spells"]);
    setCastingAttribute(getCharacter["spellCastingAttribute"]);
    setIsFetched(true);
  }, []);

  const updateSession = (newSpells) => {
    let getCharacter = JSON.parse(sessionStorage.getItem("currentCharacter"));
    getCharacter["spells"] = newSpells;
    sessionStorage.setItem("currentCharacter", JSON.stringify(getCharacter));
  };

  const onDeleteClick = (event, row) => {
    event.stopPropagation();
    let newSpells = structuredClone(currentSpells);
    newSpells = newSpells.filter((element) => element.spellID !== row.spellID);
    setCurrentSpells(newSpells);
    updateInfo("spells", newSpells, character._id);
    updateSession(newSpells);
  };

  const handleCellEditStart = (params, event) => {
    setOldValue(params.value);
  };

  const handleCellEditStop = (params, event) => {
    if (String(oldValue) !== String(event.target.value)) {
      let foundRow = currentSpells.find(
        (element) => element.spellID === params.id
      );
      foundRow[params.field] = event.target.value;
      setCurrentSpells(currentSpells);
      updateInfo("spells", currentSpells, character._id);
      updateSession(currentSpells);
    }
  };

  const openNewSpellForm = () => {
    setAddNewSpell(true);
  };

  const submitSpellFormHandler = (event) => {
    // Only save the new spell if cancel was not clicked
    event.preventDefault();

    setAddNewSpell(false);

    if (!cancelClicked) {
      const spellPrepared = false;
      const spellName = event.target.elements.spellName.value;
      const spellTime = event.target.elements.spellTime.value;
      const spellRange = event.target.elements.spellRange.value;
      const spellHitOrDC = event.target.elements.spellHitOrDC.value;
      const spellEffect = event.target.elements.spellEffect.value;
      const spellNotes = event.target.elements.spellNotes.value;
      const spellLevel = event.target.elements.spellLevel.value;

      const newID = mongoose.Types.ObjectId();
      const newSpell = {
        spellPrepared: spellPrepared,
        spellName: spellName,
        spellTime: spellTime,
        spellRange: spellRange,
        spellHitOrDC: spellHitOrDC,
        spellEffect: spellEffect,
        spellNotes: spellNotes,
        spellLevel: spellLevel,
        spellID: newID.toString(),
      };
      let newSpells = structuredClone(currentSpells);
      newSpells.push(newSpell);
      setCurrentSpells(newSpells);
      updateInfo("spells", newSpells, character._id);
      updateSession(newSpells);
    }
  };
  const cancelHandler = (event) => {
    event.preventDefault();
    setCancelClicked(true);
    setAddNewSpell(false);
    setCancelClicked(false);
  };

  const onPreparedClick = (event, row) => {
    let foundRow = currentSpells.find(
      (element) => element.spellID === row.spellID
    );

    foundRow["spellPrepared"] = !foundRow["spellPrepared"];
    setCurrentSpells(currentSpells);
    updateInfo("spells", currentSpells, character._id);
    updateSession(currentSpells);
  };

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
      field: "spellLevel",
      headerName: "Level",
      headerClassName: "dataGrid--header",
      type: "number",
      editable: true,
      flex: 0.75,
      minWidth: 100,
    },
    {
      field: "spellName",
      headerName: "Name",
      headerClassName: "dataGrid--header",
      type: "text",
      editable: true,
      flex: 0.75,
      minWidth: 100,
    },
    {
      field: "spellTime",
      headerName: "Time",
      headerClassName: "dataGrid--header",
      type: "text",
      editable: true,
      flex: 0.25,
      minWidth: 50,
    },
    {
      field: "spellRange",
      headerName: "Range",
      headerClassName: "dataGrid--header",
      type: "text",
      editable: true,
      flex: 0.5,
      minWidth: 50,
    },
    {
      field: "spellHitOrDC",
      headerName: "Hit / DC",
      headerClassName: "dataGrid--header",
      type: "text",
      editable: true,
      flex: 0.5,
      minWidth: 100,
    },
    {
      field: "spellEffect",
      headerName: "Effect",
      headerClassName: "dataGrid--header",
      type: "text",
      editable: true,
      flex: 1,
      minWidth: 200,
    },
    {
      field: "spellNotes",
      headerName: "Notes",
      headerClassName: "dataGrid--header",
      type: "text",
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
    <div>
      {isFetched && (
        <div className="spellBox">
          <Grid container spacing={2}>
            <Grid xs={12}>
              {castingAttribute === "None" ? (
                <div></div>
              ) : (
                <div>
                  <div className="basicBox statBox customModBox">
                    <h1>Spell Attack Bonus</h1>
                    <h2>
                      {modifierAndProficency(
                        character.level,
                        character[character["spellCastingAttribute"]]
                      )}
                    </h2>
                  </div>
                  <div className="basicBox statBox customModBox">
                    <h1>Spell Save DC</h1>
                    <h2>
                      {spellSaveDC(
                        character.level,
                        character[character["spellCastingAttribute"]]
                      )}
                    </h2>
                  </div>
                </div>
              )}
            </Grid>
            <Grid xs={12}>
              <div
                style={{
                  width: "100%",
                  backgroundColor: "#0f111a",
                }}
              >
                <StyledDataGrid
                  pageSize={20}
                  autoHeight={true}
                  hideFooter
                  experimentalFeatures={{ newEditingApi: true }}
                  columnVisibilityModel={{
                    id: false,
                  }}
                  rows={currentSpells}
                  columns={columns}
                  getRowId={(row) => row.spellID}
                  onCellEditStop={handleCellEditStop}
                  onCellEditStart={handleCellEditStart}
                  getRowClassName={(params) =>
                    `dataGrid--${params.row.spellPrepared}`
                  }
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
                  onClick={openNewSpellForm}
                >
                  New Spell
                </StyledGridFab>
                <InputForm
                  methods={{
                    submitFormHandler: submitSpellFormHandler,
                    cancelHandler: cancelHandler,
                    openForm: addNewSpell,
                    newTitle: "New Spell",
                  }}
                  fields={columns}
                />
              </Grid>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
};
