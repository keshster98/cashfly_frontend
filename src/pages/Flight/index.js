import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Navbar from "../../components/Navbar";
import { grey } from "@mui/material/colors";
import { getFlights, deleteFlight } from "../../utils/api_flights";
import { toast } from "sonner";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

function Flight() {
  dayjs.extend(utc);
  dayjs.extend(timezone);

  const [flights, setFlights] = useState([]);
  const color = grey[800];

  useEffect(() => {
    getFlights("all", "all", "all").then((data) => {
      setFlights(data);
    });
  }, []);

  const handleDelete = async (id) => {
    const deletedFlight = await deleteFlight(id);
    if (deletedFlight) {
      toast.success(
        `Flight with ID: ${id} has been successfully deleted from the list of flights!`
      );
      const newFlightList = await getFlights("all", "all", "all");
      setFlights(newFlightList);
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        {/* Title */}
        <Typography
          variant="h5"
          align="center"
          sx={{ mb: 2, fontWeight: "bold" }}
        >
          Manage Flights
        </Typography>

        {/* Divider Line */}
        <Divider sx={{ mb: 3 }} />

        {/* Buttons Wrapper */}
        <Grid
          container
          spacing={2}
          sx={{ mb: 3, justifyContent: "space-between" }}
        >
          {/* Button */}
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<ArrowBackIcon />}
              sx={{ backgroundColor: color, mr: 2, textTransform: "none" }}
              component={Link}
              to="/admin-dashboard"
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="success"
              startIcon={<AddIcon />}
              component={Link}
              to="/admin-dashboard/flights/add"
              sx={{ textTransform: "none" }}
            >
              New Flight
            </Button>
          </Grid>
        </Grid>

        {/* Airport Table Data */}
        <Paper elevation={3} sx={{ overflowX: "auto", p: 2, mb: 6 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>Departure Airport</b>
                  </TableCell>
                  <TableCell>
                    <b>Arrival Airport</b>
                  </TableCell>
                  <TableCell>
                    <b>Departure Date/Time</b>
                  </TableCell>
                  <TableCell>
                    <b>Arrival Date/Time</b>
                  </TableCell>
                  <TableCell>
                    <b>Created At</b>
                  </TableCell>
                  <TableCell>
                    <b>Updated At</b>
                  </TableCell>
                  <TableCell>
                    <b>Action Items</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {flights.map((flight) => (
                  <TableRow key={flight._id}>
                    <TableCell>
                      {flight.departureAirport.name} (
                      {flight.departureAirport.code})
                    </TableCell>
                    <TableCell>
                      {flight.arrivalAirport.name} ({flight.arrivalAirport.code}
                      )
                    </TableCell>
                    <TableCell>
                      {dayjs(flight.departureDateTime)
                        .tz("Asia/Kuala_Lumpur")
                        .subtract(8, "hour")
                        .format("DD/MM/YYYY HH:mm")}
                    </TableCell>
                    <TableCell>
                      {dayjs(flight.arrivalDateTime)
                        .tz("Asia/Kuala_Lumpur")
                        .subtract(8, "hour")
                        .format("DD/MM/YYYY HH:mm")}
                    </TableCell>
                    <TableCell>
                      {dayjs(flight.createdAt)
                        .tz("Asia/Kuala_Lumpur")
                        .format("DD/MM/YYYY HH:mm")}
                    </TableCell>
                    <TableCell>
                      {dayjs(flight.updatedAt)
                        .tz("Asia/Kuala_Lumpur")
                        .format("DD/MM/YYYY HH:mm")}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        sx={{ mr: 1 }}
                        component={Link}
                        to={`/admin-dashboard/flights/edit/${flight._id}`}
                      >
                        <EditIcon />
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(flight._id)}
                      >
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </>
  );
}

export default Flight;
