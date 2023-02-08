import React from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import Fab from "@mui/material/Fab";

const Header = () => {
  return (
    <header>
      <Grid container spacing={1}>
        <Grid xs={6}>
          <Fab color="secondary"  variant="extended" component={Link} to="/">
            <Link className="navLinks" to="/">
              <h1>Attributes</h1>
            </Link>
          </Fab>
        </Grid>
        <Grid xs={6}>
          <Fab color="secondary" variant="extended" component={Link} to="/skills-sheet">
            <Link className="navLinks" to="/skills-sheet">
              <h1>Skills</h1>
            </Link>
          </Fab>
        </Grid>
      </Grid>
    </header>
  );
};

export { Header };
