import { Routes, Route } from "react-router-dom";
import CashierHome from "../../Components/FoodIncharge/Components/Foodadder.jsx";


export default function CashierRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CashierHome />} />
     
    </Routes>
  );
}
