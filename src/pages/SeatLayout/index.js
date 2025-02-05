import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Modal } from "@mui/material";
import Typography from "@mui/material/Typography";
import Navbar from "../../components/Navbar";
import { getSeats } from "../../utils/api_flights";

export default function SeatSelection() {
  const rows = 5; // Since there are 10 seats, 5 rows with 2 on each side
  const cols = 2; // Two seats per side
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const { id } = useParams();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const toggleSeat = (seatId) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((seat) => seat !== seatId)
        : [...prev, seatId]
    );
  };

  //   useEffect(() => {
  //     console.log(selectedSeats);
  //   }, [selectedSeats]);

  useEffect(() => {
    getSeats(id).then((data) => {
      for (const seat of data) {
        if (seat.isBooked === true) {
          setBookedSeats((z) => [...z, seat.seatNumber]);
        }
      }
    });
  }, []);

  return (
    <>
      <Navbar />
      <Box display="flex" flexDirection="column" alignItems="center" p={4}>
        <Typography variant="h5" fontWeight="bold" mb={4}>
          Private Jet Seat Selection
        </Typography>
        <Box display="grid" gap={2}>
          {[...Array(rows)].map((_, row) => (
            <Box key={row} display="flex" alignItems="center" gap={4}>
              <Box display="flex" gap={2}>
                {[...Array(cols)].map((_, col) => {
                  const seatId = `${row + 1}${String.fromCharCode(65 + col)}`;
                  return (
                    <Button
                      key={seatId}
                      onClick={() => toggleSeat(seatId)}
                      variant={
                        selectedSeats.includes(seatId)
                          ? "contained"
                          : "outlined"
                      }
                      color={
                        selectedSeats.includes(seatId) ? "success" : "primary"
                      }
                    >
                      {seatId}
                    </Button>
                  );
                })}
              </Box>
              <Box width={32}></Box> {/* Aisle */}
              <Box display="flex" gap={2}>
                {[...Array(cols)].map((_, col) => {
                  const seatId = `${row + 1}${String.fromCharCode(
                    65 + col + 2
                  )}`;
                  return (
                    <Button
                      key={seatId}
                      onClick={() => toggleSeat(seatId)}
                      variant={
                        selectedSeats.includes(seatId)
                          ? "contained"
                          : "outlined"
                      }
                      color={
                        selectedSeats.includes(seatId) ? "success" : "primary"
                      }
                    >
                      {seatId}
                    </Button>
                  );
                })}
              </Box>
            </Box>
          ))}
        </Box>
        <Button
          sx={{ mt: 2 }}
          onClick={handleOpen}
          disabled={selectedSeats.length === 0}
        >
          Confirm Booking
        </Button>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Seats Confirmation
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Name: dasidosd Email: johndoe@gmail.com Selected seats:{" "}
            {selectedSeats.join(", ")}
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button>Confirm</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
