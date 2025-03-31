import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import LoginPage from "./Components/LoginPage";
import HomePage from "./Components/HomePage";
import MenuPage from "./Components/Menu/MenuPage";
import BookingPage from "./Components/BookingPage";
import SupplierPage from "./Components/SupplierPage";
import Support from "./Components/Support";
import Footer from "./Components/Footer";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    fetch("http://localhost:5000/api/login/auth", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Not authenticated");
        }
        return res.json();
      })
      .then((data) => {
        if (data.username) {
          setIsAuthenticated(true);
        }
      })
      .catch(() => {
        setIsAuthenticated(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Hide Navbar and Footer when on LoginPage
  const isAuthPage = location.pathname === "/login";

  return (
    <>
      {!isAuthPage && isAuthenticated && <Navbar setIsAuthenticated={setIsAuthenticated} />}

      <Routes>
        <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />

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
        )}
      </Routes>

      {!isAuthPage && location.pathname === "/" && <Support />}
      {!isAuthPage && isAuthenticated && <Footer />}
    </>
  );
}

export default App;
