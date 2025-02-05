import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { addNewAirport } from "../../utils/api_airports";
import { toast } from "sonner";
import { grey } from "@mui/material/colors";

function AirportAddNew() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [code, setCode] = useState("");
  const color = grey[800];

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const newAirport = await addNewAirport(name, location, code);
    if (newAirport) {
      toast.success(`${name} (${code}) has been added to CASHFLY!`);
      navigate("/admin-dashboard/airports");
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="xl">
        <Paper
          elevation={3}
          sx={{ padding: 3, maxWidth: "400px", margin: "auto", mt: 5 }}
        >
          <Typography variant="h5" textAlign="center" sx={{ mb: 5 }}>
            Add A New Airport to CASHFLY
          </Typography>
          <Grid
            container
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Grid item>
              <TextField
                label="Airport Name"
                placeholder="Example: X International Airport"
                variant="outlined"
                value={name}
                onChange={(event) => setName(event.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item>
              <TextField
                label="Location"
                placeholder="Example: City, State"
                variant="outlined"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item>
              <TextField
                label="Airport IATA Code"
                placeholder="Example: XYZ"
                variant="outlined"
                value={code}
                onChange={(event) => setCode(event.target.value)}
                fullWidth
                sx={{ mb: 3 }}
              />
            </Grid>
            <Grid item>
              <Button
                fullWidth
                variant="contained"
                color="success"
                onClick={handleFormSubmit}
                sx={{
                  height: "50px",
                  textTransform: "none",
                  fontSize: "1.1rem",
                }}
              >
                Add Airport
              </Button>
            </Grid>
            <Grid item>
              <Button
                fullWidth
                variant="contained"
                color="warning"
                component={Link}
                to="/admin-dashboard/airports"
                sx={{
                  height: "50px",
                  textTransform: "none",
                  fontSize: "1.1rem",
                  backgroundColor: color,
                }}
              >
                Back
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
}

export default AirportAddNew;
