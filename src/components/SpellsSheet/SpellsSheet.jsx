import Grid from "@mui/material/Unstable_Grid2";
import mongoose from "mongoose";
import { useEffect, useState } from "react";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";


import {
  modifierAndProficency,
  spellSaveDC,
} from "components/AttributeSheet/Modifiers";
import { updateInfo } from "components/DBHandler";
import { InputForm } from "components/InputForm";
import { StyledDataGrid, StyledGridFab } from "components/StyledComponents";
import { sortSpells } from "components/UtilityFunctions";

export const SpellsSheet = () => {
  const [character, setCharacter] = useState({});
  const [castingAttribute, setCastingAttribute] = useState("None");

  const [currentSpells, setCurrentSpells] = useState();
  const [filteredSpells, setFilteredSpells] = useState(currentSpells);
  const [addNewSpell, setAddNewSpell] = useState(false);
  const [cancelClicked, setCancelClicked] = useState(false);
  const [oldValue, setOldValue] = useState("");
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    const getCharacter = JSON.parse(sessionStorage.getItem("currentCharacter"));
    setCharacter(getCharacter);
    setCurrentSpells(sortSpells(getCharacter["spells"]));
    setFilteredSpells(sortSpells(getCharacter["spells"]))
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

      const newID = new mongoose.Types.ObjectId();
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
      setCurrentSpells(sortSpells(newSpells));
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
    createColumn(
      "spellPrepared",
      "Prepared",
      0.25,
      100,
      "center",
      "center",
      (params) => {
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
      }
    ),
    createColumn("spellLevel", "Level", 0.25, 75, "center", "center", null),
    createColumn("spellName", "Name", 0.75, 100, "left", "left", null),
    createColumn("spellTime", "Time", 0.25, 75, "center", "center", null),
    createColumn("spellRange", "Range", 0.25, 75, "center", "center", null),
    createColumn("spellHitOrDC", "Hit|DC", 0.5, 100, "center", "center", null),
    createColumn("spellEffect", "Effect", 1, 200, "left", "left", null),
    createColumn("spellNotes", "Notes", 1, 200, "left", "left", null),
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
  const filterSpells = (level) => {
    setFilteredSpells(currentSpells.filter((row) => parseInt(row.spellLevel) === parseInt(level)));
  };

  return (
    <div>
      {isFetched && (
        <div className="spellBox">
          <Grid container spacing={2}>
            <Grid xs={12}>
              {[...Array(10).keys()].map((num) => (
                <StyledGridFab
                  size="large"
                  color="primary"
                  variant="extended"
                  onClick={() => filterSpells(num)}
                  key={num}
                >
                  {num}
                </StyledGridFab>
              ))}
            </Grid>
            <Grid xs={12}>
              <div
                style={{
                  width: "100%",
                  backgroundColor: "#0f111a",
                }}
              >
                <StyledDataGrid
                  pageSize={30}
                  autoHeight={true}
                  hideFooter
                  experimentalFeatures={{ newEditingApi: true }}
                  columnVisibilityModel={{
                    id: false,
                  }}
                  rows={filteredSpells}
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
