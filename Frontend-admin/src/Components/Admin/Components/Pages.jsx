import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../assets/Logo.png"; // Ensure this path is correct

const Pages = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route path

  return (
    <div className="w-65 bg-[#37375b] h-[99%] mt-[0.3%] ml-[0.4%] text-white flex flex-col p-6 rounded-md font-lora">
      {/* Logo and Admin Text */}
      <div className="flex items-center space-x-3 pb-6 border-b border-gray-600">
        <img src={Logo} alt="Logo" className="w-24" />
        <h2 className="text-lg font-semibold mt-4">Admin</h2>
      </div>

      {/* Navigation Links */}
      <ul className="mt-6 space-y-3 text-[22px] flex flex-col pl-[13%]">
        <li
          onClick={() => navigate("/Dashboard")}
          className={`cursor-pointer font-medium ${
            location.pathname === "/Dashboard" ? "text-red-500" : "text-white"
          } hover:text-red-400 px-4 py-2`}
        >
          Dashboard
        </li>
        <li
          onClick={() => navigate("/OrderDetails")}
          className={`cursor-pointer  font-medium ${
            location.pathname === "/OrderDetails" ? "text-red-500" : "text-white"
          } hover:text-red-400 px-4 py-2`}
        >
          Order
        </li>
        <li
          onClick={() => navigate("/FoodDetails")}
          className={`cursor-pointer  font-medium ${
            location.pathname === "/FoodDetails" ? "text-red-500" : "text-white"
          } hover:text-red-400 px-4 py-2`}
        >
          Menu
        </li>
        <li
          onClick={() => navigate("/CustomerDetails")}
          className={`cursor-pointer  font-medium ${
            location.pathname === "/CustomerDetails" ? "text-red-500" : "text-white"
          } hover:text-red-400 px-4 py-2`}
        >
          Customer
        </li>
        <li
          onClick={() => navigate("/SupplierInfo")}
          className={`cursor-pointer  font-medium ${
            location.pathname === "/SupplierInfo" ? "text-red-500" : "text-white"
          } hover:text-red-400 px-4 py-2`}
        >
          Supplier
        </li>
        <li
          onClick={() => navigate("/Support")}
          className={`cursor-pointer font-medium ${
            location.pathname === "/Support" ? "text-red-500" : "text-white"
          } hover:text-red-400 px-4 py-2`}
        >
          Support
        </li>
        <li
          onClick={() => navigate("/Registration")}
          className={`cursor-pointer font-medium ${
            location.pathname === "/Registration" ? "text-red-500" : "text-white"
          } hover:text-red-400 px-4 py-2`}
        >
          Regisration
        </li>
      </ul>

      {/* Footer Section */}
      <div className="mt-auto text-sm text-gray-400 border-t border-gray-600 pt-4 text-center">
        <p>Crave Corner</p>
        <p>Admin Dashboard</p>
        <p className="text-xs mt-2">2025 All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Pages;
