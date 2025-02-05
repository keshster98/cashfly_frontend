import * as React from "react";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <>
      <Navbar />
      <Container maxWidth="xl">
        <Paper
          elevation={3}
          sx={{ padding: 3, maxWidth: "400px", margin: "auto", mt: 5 }}
        >
          <Typography variant="h5" textAlign="center" sx={{ mb: 5 }}>
            Sign Up With CASHFLY
          </Typography>
          <Grid
            container
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Grid item>
              <TextField
                label="Full Name"
                placeholder="Example: John Doe"
                variant="outlined"
                value={name}
                onChange={(event) => setName(event.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item>
              <TextField
                label="Email"
                placeholder="Example: johndoe@gmail.com"
                variant="outlined"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item>
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item>
              <TextField
                label="Confirm Password"
                type="password"
                variant="outlined"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                fullWidth
                sx={{ mb: 3 }}
              />
            </Grid>
            <Grid item>
              <Button
                fullWidth
                variant="contained"
                color="success"
                sx={{
                  height: "50px",
                  textTransform: "none",
                  fontSize: "1.1rem",
                }}
              >
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
}

export default Signup;
