// React related
import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// API related
import { getAirports } from "../../utils/api_airports";
import { getFlights } from "../../utils/api_flights";

// For flight search UI
import Navbar from "../../components/Navbar";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import { InputAdornment } from "@mui/material";
import Button from "@mui/material/Button";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";

// For date/time management
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function Home() {
  const [airports, setAirports] = useState([]);
  const [flights, setFlights] = useState([]);
  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [departureDateTime, setDepartureDateTime] = useState("");

  useEffect(() => {
    getAirports().then((data) => {
      setAirports(data);
    });
  }, []);

  useEffect(() => {
    if (departureDateTime) {
      console.log("Updated MongoDB Format:", departureDateTime);
      console.log("Date: ", departureDate);
    }
  }, [departureDateTime]);

  const handleDeparture = (newValue) => {
    setDepartureAirport(newValue);
  };

  const handleArrival = (newValue) => {
    setArrivalAirport(newValue);
  };

  const handleDatePickerAccept = (newValue) => {
    const selectedDate = dayjs(newValue).format("YYYY-MM-DD");
    let selectedDateTime;
    selectedDateTime = dayjs(`${selectedDate}T00:00:00`)
      .add(8, "hours")
      .toISOString();

    setDepartureDate(selectedDate);
    setDepartureDateTime(selectedDateTime);
  };

  const handleFlightSearch = async (event) => {
    const filteredFlights = await getFlights(
      departureAirport,
      arrivalAirport,
      departureDateTime
    );
    setFlights(filteredFlights);
  };

  // Timezone support for MongoDB format (backend) and MYT format (frontend)
  dayjs.extend(utc);
  dayjs.extend(timezone);

  const timeZone = "Asia/Kuala_Lumpur"; // Set timezone to MYT in frontend
  const now = dayjs().tz(timeZone).startOf("day"); // Get today's date at 12:00 AM MYT

  return (
    <>
      <Navbar />
      <Container maxWidth="xl">
        <Paper elevation={3} sx={{ padding: 3, maxWidth: "100%", mt: 3 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid
              container
              spacing={2}
              alignItems="center"
              sx={{
                flexDirection: { xs: "column", md: "row" },
                display: "flex",
              }}
            >
              {/* Departure Airport Field */}
              <Grid
                item
                xs={12}
                md
                sx={{ width: { xs: "100%", md: "auto" }, flexGrow: 1 }}
              >
                <Autocomplete
                  options={airports
                    .filter((airport) => airport._id !== arrivalAirport)
                    .map((airport) => ({
                      id: airport._id,
                      label: `${airport.name} (${airport.code})`,
                    }))}
                  value={
                    departureAirport
                      ? {
                          id: departureAirport,
                          label: `${
                            airports.find(
                              (airport) => airport._id === departureAirport
                            )?.name
                          } (${
                            airports.find(
                              (airport) => airport._id === departureAirport
                            )?.code
                          })`,
                        }
                      : null
                  }
                  onChange={(event, newValue) => {
                    if (newValue) {
                      console.log(
                        "Selected Departure Airport ID:",
                        newValue.id
                      );
                      handleDeparture(newValue.id);
                    } else {
                      handleDeparture(null);
                    }
                  }}
                  fullWidth
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Departure Airport"
                      variant="outlined"
                      fullWidth
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <InputAdornment position="start">
                            <FlightTakeoffIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </Grid>

              {/* Arrival Airport Field */}
              <Grid
                item
                xs={12}
                md
                sx={{ width: { xs: "100%", md: "auto" }, flexGrow: 1 }}
              >
                <Autocomplete
                  options={airports
                    .filter((airport) => airport._id !== departureAirport)
                    .map((airport) => ({
                      id: airport._id,
                      label: `${airport.name} (${airport.code})`,
                    }))}
                  value={
                    arrivalAirport
                      ? {
                          id: arrivalAirport,
                          label: `${
                            airports.find(
                              (airport) => airport._id === arrivalAirport
                            )?.name
                          } (${
                            airports.find(
                              (airport) => airport._id === arrivalAirport
                            )?.code
                          })`,
                        }
                      : null
                  }
                  onChange={(event, newValue) => {
                    if (newValue) {
                      console.log("Selected Arrival Airport ID:", newValue.id);
                      handleArrival(newValue.id);
                    } else {
                      handleArrival(null);
                    }
                  }}
                  fullWidth
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Arrival Airport"
                      variant="outlined"
                      fullWidth
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <InputAdornment position="start">
                            <FlightLandIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </Grid>

              {/* Date Picker Field */}
              <Grid
                item
                xs={12}
                md="auto"
                sx={{ width: { xs: "100%", md: "170px" } }}
              >
                <DatePicker
                  label="Departure Date"
                  format="DD/MM/YYYY"
                  onAccept={(newValue) => handleDatePickerAccept(newValue)}
                  shouldDisableDate={(date) => date.isBefore(now)} // Disable past dates
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </Grid>

              {/* Search Flights Button */}
              <Grid
                item
                xs={12}
                md="auto"
                sx={{ width: { xs: "100%", md: "170px" } }}
              >
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{
                    height: "56px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    textTransform: "none",
                  }}
                  endIcon={<TravelExploreIcon />}
                  onClick={handleFlightSearch}
                >
                  Search Flights
                </Button>
              </Grid>
            </Grid>
          </LocalizationProvider>
        </Paper>
        {flights.length === 0 ? (
          <p>No flights available</p>
        ) : (
          flights.map((flight) => (
            <div key={flight._id}>
              <p>Flight Number: {flight.flightNumber}</p>
              <p>
                Departure Date/Time:{" "}
                {dayjs(flight.departureDateTime)
                  .subtract(8, "hour")
                  .format("DD-MM-YYYY, HH:mm")}
              </p>
              <p>Departure Airport: {flight.departureAirport.code}</p>
              <p>
                Arrival Date/Time:{" "}
                {dayjs(flight.arrivalDateTime)
                  .subtract(8, "hour")
                  .format("DD-MM-YYYY, HH:mm")}
              </p>
              <p>Arrival Airport: {flight.arrivalAirport.code}</p>
              <p>Flight Duration: {flight.duration}</p>
              <Button
                component={Link}
                to={`/flights/${flight._id}/seat-layout`}
              >
                Select Flight
              </Button>
            </div>
          ))
        )}
      </Container>
    </>
  );
}

export default Home;
