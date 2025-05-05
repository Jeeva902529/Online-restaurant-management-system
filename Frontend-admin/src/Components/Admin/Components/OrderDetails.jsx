import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import Pages from "../Components/Pages.jsx";
import Navbar from "../Components/Navbar.jsx";

const socket = io("http://localhost:5000");

function OrderDetails() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders initially
    axios.get("http://localhost:5000/api/orders/my-orders").then((res) => {
      setOrders(res.data.reverse()); // Latest order first
    });

    // Listen for new orders via socket
    socket.on("orderUpdate", ({ orders }) => {
      setOrders(orders);
    });

    return () => {
      socket.off("orderUpdate");
    };
  }, []);

  return (
    <div className="flex h-screen min-h-screen font-lora">
      <Pages />
      <div className="flex-1 p-10 text-2xl text-black">
        <Navbar />
        <div className="flex justify-between items-center bg-[#37375b] text-white p-4 rounded-lg mt-[0.5%]">
          <div className="flex flex-col">
            <h2 className="text-[30px] font-bold">Your Orders</h2>
            <h3 className="text-[20px]">This is your ordered list data</h3>
          </div>
          <button className="bg-[#2b2c40] hover:bg-purple-700 border-1 border-white text-white px-4 py-2 rounded-lg shadow-md transition">
            Filter
          </button>
        </div>

        <div className="overflow-y-auto bg-[#37375b] text-white p-4 rounded-[20px] shadow-md mt-[0.5%] h-[515px]">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#2b2c40] rounded-md text-white border-white text-center">
                <th className="p-3">Order ID</th>
                <th className="p-3">Table No.</th>
                <th className="p-3">Food Items</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="text-[20px]">
              {orders.map((order, index) => (
                <tr key={index} className="text-center">
                  <td className="p-3">{order.orderId}</td>
                  <td className="p-3">{order.tableNumber}</td>
                  <td className="p-3 text-left pl-[7%]">{order.foodName}</td>
                  <td className="p-3 text-left pl-[5%]">Pending</td> {/* static status */}
                  <td className="p-3 text-left pl-[5.1%]">View</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
