import React from "react";
import { Link } from "react-router-dom";
import { Container, Paper, Typography, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import BroadcastOnPersonalIcon from "@mui/icons-material/BroadcastOnPersonal";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import RadarIcon from "@mui/icons-material/Radar";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import GroupIcon from "@mui/icons-material/Group";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Navbar from "../../components/Navbar";
import { grey } from "@mui/material/colors";

function AdminDashboard() {
  const color = grey[800];
  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ textAlign: "center", mt: 5 }}>
        <Grid container spacing={3} justifyContent="center">
          {/* Manage Airports */}
          <Grid item xs={12} md={3}>
            <Paper
              elevation={3}
              sx={{ padding: 3, textAlign: "center", minWidth: 200 }}
            >
              <BroadcastOnPersonalIcon sx={{ fontSize: 60 }} />
              <Typography variant="h6">Manage Airports</Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                component={Link}
                to="/admin-dashboard/airports"
              >
                Access
              </Button>
            </Paper>
          </Grid>
          {/* Manage Flights */}
          <Grid item xs={12} md={3}>
            <Paper
              elevation={3}
              sx={{ padding: 3, textAlign: "center", minWidth: 200 }}
            >
              <FlightTakeoffIcon sx={{ fontSize: 60 }} />
              <Typography variant="h6">Manage Flights</Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                component={Link}
                to="/admin-dashboard/flights"
              >
                Access
              </Button>
            </Paper>
          </Grid>
          {/* Flight Status */}
          <Grid item xs={12} md={3}>
            <Paper
              elevation={3}
              sx={{ padding: 3, textAlign: "center", minWidth: 200 }}
            >
              <RadarIcon sx={{ fontSize: 60 }} />
              <Typography variant="h6">Flight Status</Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Access
              </Button>
            </Paper>
          </Grid>
          {/* Bookings */}
          <Grid item xs={12} md={3}>
            <Paper
              elevation={3}
              sx={{ padding: 3, textAlign: "center", minWidth: 200 }}
            >
              <AirplaneTicketIcon sx={{ fontSize: 60 }} />
              <Typography variant="h6">Bookings</Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Access
              </Button>
            </Paper>
          </Grid>
          {/* Manage Users */}
          <Grid item xs={12} md={3}>
            <Paper
              elevation={3}
              sx={{ padding: 3, textAlign: "center", minWidth: 200 }}
            >
              <GroupIcon sx={{ fontSize: 60 }} />
              <Typography variant="h6">Manage Users</Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Access
              </Button>
            </Paper>
          </Grid>
        </Grid>

        {/* Back Button */}
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          sx={{ mt: 3, mb: 3, backgroundColor: color }}
          component={Link}
          to="/"
        >
          Back
        </Button>
      </Container>
    </>
  );
}

export default AdminDashboard;
