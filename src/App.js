import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Home from "./pages/Home";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Airport from "./pages/Airport";
import AirportAddNew from "./pages/AirportAddNew";
import AirportEdit from "./pages/AirportEdit";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SeatLayout from "./pages/SeatLayout";
import Flight from "./pages/Flight";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-dashboard/airports" element={<Airport />} />
          <Route
            path="/admin-dashboard/airports/add"
            element={<AirportAddNew />}
          />
          <Route
            path="/admin-dashboard/airports/edit/:id"
            element={<AirportEdit />}
          />
          <Route path="/admin-dashboard/flights" element={<Flight />} />
          <Route path="/flights/:id/seat-layout" element={<SeatLayout />} />
        </Routes>
      </BrowserRouter>
      <Toaster richColors position="top-right" />
    </div>
  );
}

export default App;
