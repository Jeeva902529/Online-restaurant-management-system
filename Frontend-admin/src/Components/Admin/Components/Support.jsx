import React, { useState, useEffect } from "react";
import Pages from "../Components/Pages.jsx";
import Navbar from "../Components/Navbar.jsx";
import io from "socket.io-client";

const Support = () => {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:5000", {
      reconnectionAttempts: 3,
      reconnectionDelay: 1000,
    });

    const fetchComplaints = async () => {
      try {
        const response = await fetch("http://localhost:5000/get-complaints");
        if (!response.ok) {
          throw new Error("Failed to fetch complaints");
        }
        const data = await response.json();
        setComplaints(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching complaints:", error);
        setError("Failed to load complaints. Please try again later.");
        setComplaints([]); // Ensure complaints is always an array
      }
    };

    fetchComplaints();

    // Listen for real-time complaint updates
    socket.on("newComplaint", (newComplaint) => {
      if (newComplaint) {
        setComplaints((prevComplaints) => [newComplaint, ...prevComplaints]);
      }
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
      setError("Error connecting to server. Please try again later.");
    });

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleResponseChange = (id, value) => {
    setComplaints((prevComplaints) =>
      prevComplaints.map((complaint) =>
        complaint.id === id ? { ...complaint, response: value } : complaint
      )
    );
  };

  const handleResponseSubmit = async (id) => {
    const complaint = complaints.find((comp) => comp.id === id);
    if (!complaint) return;

    try {
      const res = await fetch(`http://localhost:5000/update-complaint/${id}`, {
        method: "PUT",
        body: JSON.stringify({ response: complaint.response || "" }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error("Failed to submit response");
      }

      const data = await res.json();
      alert(`Response Sent for Complaint ID ${id}: ${data.response}`);

      // Update state after successful submission
      setComplaints((prevComplaints) =>
        prevComplaints.map((comp) =>
          comp.id === id ? { ...comp, response: data.response } : comp
        )
      );
    } catch (error) {
      console.error("Error submitting response:", error);
      setError("Error submitting response. Please try again.");
    }
  };

  return (
    <div className="flex h-screen w-screen font-lora bg-[#2b2c40]">
      {/* Sidebar Navbar */}
      <Pages />

      {/* Main Content */}
      <div className="flex-1 p-10 text-2xl text-black bg-[#2b2c40]">
        <Navbar />

        <div className="w-full bg-[#2b2c40] text-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-4 text-center">Complaint Management</h2>

          {/* Error Handling */}
          {error && (
            <div className="bg-red-500 text-white p-4 rounded mb-4">
              <strong>Error:</strong> {error}
            </div>
          )}
          
          {/* Complaints List */}
          <div className="overflow-y-auto bg-[#37375b] p-4 rounded-lg h-[500px]">
            <table className="w-full border-collapse">
              {/* Table Header */}
              <thead>
                <tr className="bg-[#2b2c40] text-white text-center">
                  <th className="p-3">Complaint ID</th>
                  <th className="p-3">From</th>
                  <th className="p-3">Message</th>
                  <th className="p-3">Response</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="text-[18px]">
                {complaints.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center p-3">
                      No complaints available.
                    </td>
                  </tr>
                ) : (
                  complaints.map((complaint) => (
                    <tr key={complaint.id} className="text-center border-b border-gray-500">
                      <td className="p-3">#{complaint.id}</td>
                      <td className="p-3">{complaint.from}</td>
                      <td className="p-3">{complaint.message}</td>
                      <td className="p-3">
                        <textarea
                          className="w-full p-2 text-white text-[18px] rounded-lg"
                          rows="2"
                          value={complaint.response || ""}
                          onChange={(e) => handleResponseChange(complaint.id, e.target.value)}
                        />
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => handleResponseSubmit(complaint.id)}
                          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg shadow-md"
                        >
                          Send
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
