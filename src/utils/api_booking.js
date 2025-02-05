import axios from "axios";
import { API_URL } from "../constants";
import { toast } from "sonner";

// Get all seats
export const bookSeats = async (flightId, seats) => {
  try {
    const response = await axios.post(
      API_URL + "/airports",
      {
        name: name,
        location: location,
        code: code,
      },
      {
        //authentication
      }
    );
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};
