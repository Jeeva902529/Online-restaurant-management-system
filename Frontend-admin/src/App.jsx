import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// import Navbar from "./Components/Food Incharge/Components/Navbar";
// import LoginPage from "./Components/Food Incharge/Components/LoginPage";
// import HomePage from "./Components/Food Incharge/Components/HomePage";
// import MenuPage from "./Components/Food Incharge/Components/Menu/MenuPage";
// import BookingPage from "./Components/Food Incharge/Components/BookingPage";
// import SupplierPage from "./Components/Food Incharge/Components/SupplierPage";
// import Support from "./Components/Food Incharge/Components/Support";
// import Footer from "./Components/Food Incharge/Components/Footer";

import LoginPage from './components/Admin/Components/LoginPage';
import AdminMenu from "./components/Admin/Components/AdminMenu";
import OrderDetails from "./components/Admin/Components/OrderDetails";
import FoodDetails from "./components/Admin/Components/FoodDetails";
import SupplierInfo from "./components/Admin/Components/SupplierInfo";
import CustomerDetails from "./components/Admin/Components/CustomerDetails";
import Support from './components/Admin/Components/Support';
import Registration from './components/Admin/Components/Registration';

function App() {

  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [loading, setLoading] = useState(true);
  // const location = useLocation();

  // useEffect(() => {
  //   fetch("http://localhost:5000/api/login/auth", {
  //     method: "GET",
  //     credentials: "include",
  //   })
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error("Not authenticated");
  //       }
  //       return res.json();
  //     })
  //     .then((data) => {
  //       if (data.username) {
  //         setIsAuthenticated(true);
  //       }
  //     })
  //     .catch(() => {
  //       setIsAuthenticated(false);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // // Hide Navbar and Footer when on LoginPage
  // const isAuthPage = location.pathname === "/login";

  return (
    <>
      {/* {!isAuthPage && isAuthenticated && <Navbar setIsAuthenticated={setIsAuthenticated} />} */}

      <Routes>
        {/* <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />

        {isAuthenticated ? (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/supplier" element={<SupplierPage />} />
            <Route path="/support" element={<Support />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )} */}

     <Route path="/" element={<LoginPage />} />
       <Route path="/Dashboard" element={<AdminMenu />} />
       <Route path="/OrderDetails" element={<OrderDetails />} />
       <Route path="/FoodDetails" element={<FoodDetails />} />
       <Route path="/CustomerDetails" element={<CustomerDetails />} />
       <Route path="/SupplierInfo" element={<SupplierInfo />} />
       <Route path="/Support" element={<Support />} />
       <Route path="/Registration" element={<Registration />} />
    </Routes>

      {/* {!isAuthPage && location.pathname === "/" && <Support />}
      {!isAuthPage && isAuthenticated && <Footer />} */}
    </>
  );
}

export default App;
