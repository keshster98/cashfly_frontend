import axios from "axios";
import { API_URL } from "../constants";
import { toast } from "sonner";

// Get all flights
export const getFlights = async (
  departureAirport,
  arrivalAirport,
  departureDateTime
) => {
  try {
    const response = await axios.get(
      API_URL +
        "/flights?departureAirport=" +
        departureAirport +
        "&arrivalAirport=" +
        arrivalAirport +
        "&departureDateTime=" +
        departureDateTime
    );
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

// Get the details of a specific airport from the database.
export const getFlight = async (id) => {
  try {
    const response = await axios.get(API_URL + "/flights/" + id);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

// Add a new flight to the database.
export const addNewFlight = async (
  departureDateTime,
  arrivalDateTime,
  departureAirport,
  arrivalAirport,
  flightNumber,
  price
) => {
  try {
    const response = await axios.post(API_URL + "/flights", {
      departureDateTime: departureDateTime,
      arrivalDateTime: arrivalDateTime,
      departureAirport: departureAirport,
      arrivalAirport: arrivalAirport,
      flightNumber: flightNumber,
      price: price,
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

// Update the details of a specific flight in the database.
export const updateFlight = async (
  id,
  departureDateTime,
  arrivalDateTime,
  departureAirport,
  arrivalAirport,
  flightNumber,
  price
) => {
  try {
    const response = await axios.put(API_URL + "/flights/" + id, {
      departureDateTime: departureDateTime,
      arrivalDateTime: arrivalDateTime,
      departureAirport: departureAirport,
      arrivalAirport: arrivalAirport,
      flightNumber: flightNumber,
      price: price,
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

// Delete a specific flight from the database.
export const deleteFlight = async (id) => {
  try {
    const response = await axios.delete(API_URL + "/flights/" + id);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

// Get all seats
export const getSeats = async (flightId) => {
  try {
    const response = await axios.get(API_URL + "/flights/" + flightId);
    return response.data.seats;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};
