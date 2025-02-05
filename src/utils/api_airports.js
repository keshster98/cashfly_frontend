import axios from "axios";
import { API_URL } from "../constants";
import { toast } from "sonner";

// Get all airports
export const getAirports = async () => {
  try {
    const response = await axios.get(API_URL + "/airports");
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

// Get the details of a specific airport from the database.
export const getAirport = async (id) => {
  try {
    const response = await axios.get(API_URL + "/airports/" + id);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

// Add a new airport to the database.
export const addNewAirport = async (name, location, code) => {
  try {
    const response = await axios.post(API_URL + "/airports", {
      name: name,
      location: location,
      code: code,
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

// Update the details of a specific airport in the database.
export const updateAirport = async (id, name, location, code) => {
  try {
    const response = await axios.put(API_URL + "/airports/" + id, {
      name: name,
      location: location,
      code: code,
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

// Delete a specific airport from the database.
export const deleteAirport = async (id) => {
  try {
    const response = await axios.delete(API_URL + "/airports/" + id);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};
