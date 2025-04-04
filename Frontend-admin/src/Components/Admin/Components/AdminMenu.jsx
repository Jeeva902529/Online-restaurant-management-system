import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { io } from "socket.io-client";
import Pages from  "../Components/Pages";
import Navbar from "../Components/Navbar";

const socket = io("http://localhost:5000");

const AdminMenu = () => {
  const [reviews, setReviews] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0); // Default 0
  const [pendingOrders, setPendingOrders] = useState(0); // Default 0

  useEffect(() => {
    // Fetch initial order counts
    axios.get("http://localhost:5000/orders")
      .then(response => {
        setTotalOrders(response.data.totalOrders || 0);
        setPendingOrders(response.data.pendingOrders || 0);
      })
      .catch(error => console.error("Error fetching order counts:", error));
    
    // Listen for real-time updates
    const handleOrderUpdate = (data) => {
      setTotalOrders(data.totalOrders || 0);
      setPendingOrders(data.pendingOrders || 0);
    };

    socket.on("orderUpdated", handleOrderUpdate);
  
    return () => {
      socket.off("orderUpdated", handleOrderUpdate);
    };
  }, []);

  useEffect(() => {
    // Connect to the socket server
    const socket = io("http://localhost:5000");
  
    // Listen for updates
    socket.on("orderUpdate", (data) => {
      setTotalOrders(data.totalOrders);
      setPendingOrders(data.pendingOrders);
    });
  
    // Cleanup when the component is unmounted
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/reviews")
      .then((response) => {
        console.log("Fetched reviews:", response.data); // Debugging line
        setReviews(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error.message);
      });
  }, []);

  return (
    <div className="flex h-screen w-screen font-lora bg-[#2b2c40]">
      {/* Sidebar Navbar */}
      <Pages />

      {/* Main Content */}
      <div className="flex-1 p-10 text-2xl text-black bg-[#2b2c40]">
        <Navbar />
        <div className="w-[100%] h-[26%] mt-0 flex justify-evenly items-center bg-[#2b2c40]">
        <div className="bg-[#37375b] text-white p-4 rounded-xl text-center flex flex-col justify-center items-center w-[20%] h-[80%]">
            <h3 className="text-lg font-semibold">Total Orders</h3>
            <p className="text-2xl font-bold">{totalOrders}</p>
          </div>
          <div className="bg-[#37375b] text-white p-4 rounded-xl text-center flex flex-col justify-center items-center w-[20%] h-[80%]">
            <h3 className="text-lg font-semibold">Pending Orders</h3>
            <p className="text-2xl font-bold">{pendingOrders}</p>
          </div>
          <div className="bg-[#37375b] text-white p-4 rounded-xl text-center flex flex-col justify-center items-center w-[20%] h-[80%]">
            <h3 className="text-lg font-semibold">Completed Orders</h3>
            <p className="text-2xl font-bold">958</p>
          </div>
          <div className="bg-[#37375b] text-white p-4 rounded-xl text-center flex flex-col justify-center items-center w-[20%] h-[80%]">
            <h3 className="text-lg font-semibold">Active Suppliers</h3>
            <p className="text-2xl font-bold">5</p>
          </div>
        </div>

        <div className="flex flex-row justify-evenly bg-[#2b2c40] mt-2 h-[73%]">
          {/* Order Status Overview */}
          <div className="bg-[#37375b] text-white p-6 rounded-2xl w-[55%] h-[100%]">
            <h2 className="text-[25px] font-bold text-center mb-4">Order Status Overview</h2>
            <div className="flex">
              <div className="flex flex-col justify-between text-sm pr-2">
                <span>40%</span>
                <span>30%</span>
                <span>20%</span>
                <span>10%</span>
                <span>0%</span>
              </div>
              <div className="flex justify-between w-full items-end h-64 bg-[#2b2c40] p-4 rounded-lg">
                {[
                  { height: 50 },
                  { height: 100 },
                  { height: 150 },
                  { height: 200 }
                ].map((bar, index) => (
                  <div key={index} className="w-1/5 flex flex-col items-center">
                    <motion.div
                      className="bg-red-500 w-10 rounded-lg"
                      initial={{ height: 0 }}
                      animate={{ height: bar.height }}
                      transition={{ duration: 1.1, ease: "easeInOut" }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4 w-[95%] ml-[12%]">
              <div className="bg-[#2b2c40] p-2 text-center rounded-lg text-[20px] w-[73%] h-[40px] items-center">10% Out of Delivery</div>
              <div className="bg-[#2b2c40] p-2 text-center rounded-lg text-[20px] w-[73%] h-[40px] items-center">20% Pending</div>
              <div className="bg-[#2b2c40] p-2 text-center rounded-lg text-[20px] w-[73%] h-[40px] items-center">30% Preparing</div>
              <div className="bg-[#2b2c40] p-2 text-center rounded-lg text-[20px] w-[73%] h-[40px] items-center">40% Completed</div>
            </div>
          </div>

{/* Customer Reviews Section */}
<div className="w-[40%] bg-[#37375b] text-white p-6 rounded-xl flex flex-col mx-auto sm:w-[80%] md:w-[60%] lg:w-[40%]">
  <h3 className="text-[24px] font-bold mb-4 text-center">Customer Reviews</h3>

  {/* Scrollable Review List */}
  <div className="space-y-4 overflow-y-auto max-h-[330px] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 p-2">
    {reviews && reviews.length > 0 ? (
      reviews.map((review, index) => (
        <div key={index} className="bg-gray-700 p-4 rounded-lg flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            {/* User initials */}
            <div className="w-10 h-10 bg-[#52527a] rounded-full flex items-center justify-center text-white text-lg">
              {review.user ? review.user.charAt(0).toUpperCase() : "🧑"}
            </div>
            <p className="text-sm">{review.review}</p> {/* Updated from 'content' to 'review' */}
          </div>
          <button className="bg-gray-600 hover:bg-gray-500 px-3 py-1 text-xs rounded-lg transition duration-200">
            Reply
          </button>
        </div>
      ))
    ) : (
      <div className="bg-[#52527a] p-4 rounded-lg text-center">
        <p>No reviews yet</p>
      </div>
    )}
  </div>
</div>


        </div>
      </div>
    </div>
  );
};

export default AdminMenu;
