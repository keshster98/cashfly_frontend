import React from "react";
import { Link } from "react-router-dom";
import { Container, Paper, Typography, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Navbar from "../../components/Navbar";
import { grey } from "@mui/material/colors";

function UserDashboard() {
  const color = grey[800];
  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ textAlign: "center", mt: 5 }}>
        <Grid container spacing={3} justifyContent="center">
          {/* Personal Details */}
          <Grid item xs={12} md={3}>
            <Paper
              elevation={3}
              sx={{ padding: 3, textAlign: "center", minWidth: 200 }}
            >
              <AccountCircleIcon sx={{ fontSize: 60 }} />
              <Typography variant="h6">Personal Details</Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                component={Link}
                to="/user-dashboard/personal-details"
              >
                Access
              </Button>
            </Paper>
          </Grid>
          {/* Change Password */}
          <Grid item xs={12} md={3}>
            <Paper
              elevation={3}
              sx={{ padding: 3, textAlign: "center", minWidth: 200 }}
            >
              <SettingsIcon sx={{ fontSize: 60 }} />
              <Typography variant="h6">Change Password</Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                component={Link}
                to="/user-dashboard/change-password"
              >
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

export default UserDashboard;
