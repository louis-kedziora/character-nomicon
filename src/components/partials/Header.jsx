import React from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import Fab from "@mui/material/Fab";

const Header = () => {
  return (
    <header>
      <Grid container spacing={6}>
        <Grid xs={3}>
          <Fab
            color="secondary"
            variant="extended"
            component={Link}
            to="/attacks"
          >
            <Link className="navLinks" to="/attacks">
              <h1>Attacks</h1>
            </Link>
          </Fab>
        </Grid>
        <Grid xs={3}>
          <Fab color="secondary" variant="extended" component={Link} to="/attributes">
            <Link className="navLinks" to="/attributes">
              <h1>Attributes</h1>
            </Link>
          </Fab>
        </Grid>
        <Grid xs={3}>
          <Fab
            color="secondary"
            variant="extended"
            component={Link}
            to="/features"
          >
            <Link className="navLinks" to="/features">
              <h1>Features</h1>
            </Link>
          </Fab>
        </Grid>
        <Grid xs={3}>
          <Fab
            color="secondary"
            variant="extended"
            component={Link}
            to="/loot"
          >
            <Link className="navLinks" to="/loot">
              <h1>Loot</h1>
            </Link>
          </Fab>
        </Grid>
        <Grid xs={3}>
          <Fab
            color="secondary"
            variant="extended"
            component={Link}
            to="/notes"
          >
            <Link className="navLinks" to="/notes">
              <h1>Notes</h1>
            </Link>
          </Fab>
        </Grid>
        <Grid xs={3}>
          <Fab
            color="secondary"
            variant="extended"
            component={Link}
            to="/skills"
          >
            <Link className="navLinks" to="/skills">
              <h1>Skills</h1>
            </Link>
          </Fab>
        </Grid>
        <Grid xs={3}>
          <Fab
            color="secondary"
            variant="extended"
            component={Link}
            to="/spells"
          >
            <Link className="navLinks" to="/spells">
              <h1>Spells</h1>
            </Link>
          </Fab>
        </Grid>


      </Grid>
    </header>
  );
};

export { Header };
