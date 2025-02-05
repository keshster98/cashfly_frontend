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
import { getAirports, deleteAirport } from "../../utils/api_airports";
import { toast } from "sonner";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

function Airport() {
  dayjs.extend(utc);
  dayjs.extend(timezone);

  const [airports, setAirports] = useState([]);
  const color = grey[800];

  useEffect(() => {
    getAirports().then((data) => {
      setAirports(data);
    });
  }, []);

  const handleDelete = async (id, name, code) => {
    const deletedAirport = await deleteAirport(id);
    if (deletedAirport) {
      toast.success(
        `${name} (${code}) has been successfully deleted from the list of airports!`
      );
      const newAirportList = await getAirports();
      setAirports(newAirportList);
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
          Manage Airports
        </Typography>

        {/* Divider Line */}
        <Divider sx={{ mb: 3 }} />

        {/* Buttons Wrapper */}
        <Grid
          container
          spacing={2}
          sx={{ mb: 3, justifyContent: "space-between" }}
        >
          {/* Back Button */}
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
              to="/admin-dashboard/airports/add"
              sx={{ textTransform: "none" }}
            >
              New Airport
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
                    <b>Airport Name</b>
                  </TableCell>
                  <TableCell>
                    <b>Airport Location</b>
                  </TableCell>
                  <TableCell>
                    <b>Airport IATA Code</b>
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
                {airports.map((airport) => (
                  <TableRow key={airport._id}>
                    <TableCell>{airport.name}</TableCell>
                    <TableCell>{airport.location}</TableCell>
                    <TableCell>{airport.code}</TableCell>
                    <TableCell>
                      {dayjs(airport.createdAt)
                        .tz("Asia/Kuala_Lumpur")
                        .format("DD/MM/YYYY HH:mm")}
                    </TableCell>
                    <TableCell>
                      {dayjs(airport.updatedAt)
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
                        to={`/admin-dashboard/airports/edit/${airport._id}`}
                      >
                        <EditIcon />
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() =>
                          handleDelete(airport._id, airport.name, airport.code)
                        }
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

export default Airport;
