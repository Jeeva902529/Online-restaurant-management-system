import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./Components/Login";
import CashierRoutes from "./Components/Routes/CashierRoutes";
import AdminRoutes from "./Components/Routes/AdminRoutes";
import FoodRoutes from "./Components/Routes/FoodRoutes";

function DashboardRouter() {
  const role = localStorage.getItem("userRole");

  if (role === "cashier") return <CashierRoutes />;
  if (role === "admin") return <AdminRoutes />;
  if (role === "foodincharge") return <FoodRoutes />;
  return <Navigate to="/" />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard/*" element={<DashboardRouter />} />
      </Routes>
    </Router>
  );
}
