import * as React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { getAirport, updateAirport } from "../../utils/api_airports";
import { toast } from "sonner";
import { grey } from "@mui/material/colors";

function AirportEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [originalData, setOriginalData] = useState([]);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [code, setCode] = useState("");
  const color = grey[800];

  useEffect(() => {
    getAirport(id).then((data) => {
      if (data) {
        setOriginalData(data);
        setName(data.name);
        setLocation(data.location);
        setCode(data.code);
      } else {
        navigate("/");
      }
    });
  }, [id]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const editedAirport = await updateAirport(id, name, location, code);

    if (editedAirport) {
      toast.success(`Airport with ID: ${id} has been updated successfully!`);
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
            Update Airport Details to CASHFLY
          </Typography>
          <Grid
            container
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Grid item>
              <Typography sx={{ mb: 1 }}>Airport Name</Typography>
              <TextField
                variant="outlined"
                value={name}
                onChange={(event) => setName(event.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item>
              <Typography sx={{ mb: 1 }}>Airport Location</Typography>
              <TextField
                variant="outlined"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item>
              <Typography sx={{ mb: 1 }}>Airport IATA Code</Typography>
              <TextField
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
                color="warning"
                onClick={handleFormSubmit}
                sx={{
                  height: "50px",
                  textTransform: "none",
                  fontSize: "1.1rem",
                }}
                disabled={
                  originalData.name === name &&
                  originalData.location === location &&
                  originalData.code === code
                    ? true
                    : false
                }
              >
                Update Airport Details
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

export default AirportEdit;
