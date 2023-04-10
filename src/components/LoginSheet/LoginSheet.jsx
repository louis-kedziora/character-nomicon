import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";

import { StyledTextField } from "components/StyledComponents";
import { StyledFab } from "components/StyledComponents";

export const LoginSheet = ({ loginInfo }) => {
  const { setSignIn } = loginInfo;

  const signIn = (event) => {
    event.preventDefault();
    setSignIn(true);
  };
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#0f111a",
          boxShadow: "0 2px 5px #464b4c",
          borderRadius: "7px",
          padding: "1em 2.5em",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#5aa0ff" }}>
          <LockOutlinedIcon />
        </Avatar>
        <form onSubmit={signIn}>
          <StyledTextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <StyledTextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Grid justifyContent="center" container>
            <Grid item>
              <StyledFab
                href="/characters"
                onClick={signIn}
                size="large"
                color="primary"
                variant="extended"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </StyledFab>
            </Grid>
          </Grid>

          <Grid justifyContent="center" container>
            <Grid item>
              <Link
                href="#"
                variant="body2"
                sx={{ color: "#5aa0ff", fontFamily: "Montserrat" }}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};
