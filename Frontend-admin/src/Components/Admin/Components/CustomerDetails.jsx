import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Pages from "../Components/Pages";
import Navbar from "../Components/Navbar";
import axios from "axios";

const socket = io("http://localhost:5000");

function CustomerDetails() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // ✅ Fetch initial customer data from corrected route
    axios.get("http://localhost:5000/api/orders/get-customers").then((res) => {
      setCustomers(res.data);
    });

    // ✅ Listen for real-time customer updates
    socket.on("customerUpdate", (updatedCustomers) => {
      setCustomers(updatedCustomers);
    });

    return () => {
      socket.off("customerUpdate");
    };
  }, []);

  return (
    <div className="flex h-screen font-lora">
      <Pages />
      <div className="flex-1 p-10 text-2xl">
        <Navbar />
        <div className="flex justify-between items-center bg-[#37375b] text-white p-4 rounded-lg m-[0.7%]">
          <div className="flex flex-col">
            <h2 className="text-[30px] font-bold">Customers</h2>
            <h3 className="text-[20px]">This is your Customers data</h3>
          </div>
        </div>
        <div className="overflow-x-auto bg-[#37375b] text-white p-6 rounded-[20px] shadow-md mt-[0.7%]">
          <div className="max-h-[465px] overflow-y-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#2b2c40] text-white text-center text-[22px]">
                  <th className="p-3 font-bold">Customer ID</th>
                  <th className="p-3 font-bold">Table No.</th>
                  <th className="p-3 font-bold">Customer Name</th>
                  <th className="p-3 font-bold">Food Items</th>
                  <th className="p-3 font-bold">Price</th>
                  <th className="p-3 font-bold">Payment</th>
                  <th className="p-3 font-bold">Mode</th>
                </tr>
              </thead>
              <tbody className="text-[18px]">
                {customers.map((customer, index) => (
                  <tr key={index} className="text-center border-b border-gray-600">
                    <td className="p-3 text-blue-400">{customer.id}</td>
                    <td className="p-3">{customer.tableNo}</td>
                    <td className="p-3">{customer.name}</td>
                    <td className="p-3">{customer.foodItems}</td>
                    <td className="p-3 text-right pr-[2.5%]">{customer.price}</td>
                    <td className={`p-3 ${customer.payment === "Paid" ? "text-green-400" : "text-red-400"}`}>
                      {customer.payment}
                    </td>
                    <td className="p-3">{customer.mode}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerDetails;
