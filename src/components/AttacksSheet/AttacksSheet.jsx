import React, { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Fab from "@mui/material/Fab";
import { DataGrid } from "@mui/x-data-grid";

import { updateInfo } from "../DBHandler";
import { NewAttackBox } from "./NewAttackBox";

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
];

export const AttacksSheet = ({ gaston }) => {
  const { attacks } = gaston;
  const [currentAttacks, setCurrentAttacks] = useState(attacks);
  const [addNewAttack, setAddNewAttack] = useState(false);
  const [cancelClicked, setCancelClicked] = useState(false);

  const handleCellEditStop = (params, event) => {
    let foundRow = currentAttacks.find((element) => element._id === params.id);
    foundRow[params.field] = event.target.value;
    setCurrentAttacks(currentAttacks);
    updateInfo("attacks", currentAttacks);
  };

  const openNewAttackForm = () => {
    setAddNewAttack(true);
  };

  const closeAddState = (event) => {
    event.preventDefault();
    // Only save the new attack if cancel was not clicked

    if(!cancelClicked) {
      // console.log(event.target.elements);
      console.log(event.target.elements.attackName.value);

    }
    setAddNewAttack(false);
  };
  function cancelHandler() {
    setCancelClicked(true);
  }

  return (
    <div className="attributeBox">
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
                // handleRadio: handleRadio,
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
            getRowId={(row) => row._id}
            onCellEditStop={handleCellEditStop}
          />
        </div>
      </Grid>
    </div>
  );
};
