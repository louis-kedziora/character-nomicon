import React, { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { DataGrid } from '@mui/x-data-grid';

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
  const [cellChange, setCellChange] = useState();

  const handleCellEditStart = (params, event) => {
    console.log("START");
    console.log(params);
    console.log(event.target);

  }
  const handleCellEditStop = (params, event) => {
    console.log("EditStop");

    setCellChange(event.target.value);
    console.log(cellChange);
  }


  return (
    <div>
      <Grid container spacing={2}>
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
            onCellEditStart={handleCellEditStart}
            onCellEditStop={handleCellEditStop}
          />
        </div>
      </Grid>
    </div>
  );
};
