import React, { useState, useEffect } from "react";
import Axios from "axios";
import Pages from "../Components/Pages.jsx";
import Navbar from "../Components/Navbar.jsx";

function SupplierInfo() {
  const totalSuppliers = 8;
  const [presentCount, setPresentCount] = useState(0); // Default: 0
  const [absentCount, setAbsentCount] = useState(0); // Default: 0

  // Array to track attendance for each supplier
  const [attendance, setAttendance] = useState(Array(totalSuppliers).fill(null));

  // Fetch attendance data on component mount
  useEffect(() => {
    Axios.get('http://localhost:5000/attendance')
      .then(response => {
        const data = response.data;
        const present = data.filter(supplier => supplier.present === 'present').length;
        const absent = data.filter(supplier => supplier.present === 'absent').length;
        
        setAttendance(data.map(supplier => supplier.present));
        setPresentCount(present);
        setAbsentCount(absent);
      })
      .catch(error => console.error("There was an error fetching attendance data:", error));
  }, []);

  const handlePresenceChange = (index, isPresent) => {
    if (attendance[index] !== null) return; // Prevent multiple attendance entries

    // Update state
    setAttendance((prev) => {
      const newAttendance = [...prev];
      newAttendance[index] = isPresent ? "present" : "absent";
      return newAttendance;
    });

    // Update present/absent count
    if (isPresent) {
      setPresentCount((prev) => prev + 1);
    } else {
      setAbsentCount((prev) => prev + 1);
    }

    // Send data to backend
    Axios.post(`http://localhost:5000/attendance/${index + 1}`, { isPresent })
      .then(response => {
        console.log('Attendance updated successfully:', response.data);
      })
      .catch(error => {
        console.error('Error updating attendance:', error);
      });
  };

  return (
    <div className="flex h-screen font-lora">
      {/* Sidebar Navbar */}
      <Pages />

      {/* Main Content */}
      <div className="flex-1 p-10 text-2xl">
        <Navbar />
        <div className="w-[100%] h-[26%] flex justify-evenly items-center bg-[#2b2c40]">
          {/* Total Suppliers */}
          <div className="bg-[#37375b] text-white p-4 rounded-xl text-center flex flex-col justify-center items-center w-[20%] h-[80%]">
            <h3 className="text-lg font-semibold">Total Suppliers</h3>
            <p className="text-2xl font-bold">{totalSuppliers}</p>
          </div>

          {/* Present Suppliers */}
          <div className="bg-[#37375b] text-white p-4 rounded-xl text-center flex flex-col justify-center items-center w-[20%] h-[80%]">
            <h3 className="text-lg font-semibold">Present Suppliers</h3>
            <p className="text-2xl font-bold">{presentCount}</p>
          </div>

          {/* Absent Suppliers */}
          <div className="bg-[#37375b] text-white p-4 rounded-xl text-center flex flex-col justify-center items-center w-[20%] h-[80%]">
            <h3 className="text-lg font-semibold">Absent Suppliers</h3>
            <p className="text-2xl font-bold">{absentCount}</p>
          </div>

          {/* Active Suppliers */}
          <div className="bg-[#37375b] text-white p-4 rounded-xl text-center flex flex-col justify-center items-center w-[20%] h-[80%]">
            <h3 className="text-lg font-semibold">Active Suppliers</h3>
            <p className="text-2xl font-bold">5</p>
          </div>
        </div>

        <div
          className="overflow-y-auto bg-[#37375b] text-white p-6 rounded-[20px] shadow-md mt-[0.3%]"
          style={{ height: "460px" }}
        >
          <table className="w-full">
            <thead className="bg-[#2b2c40] text-white border-white text-center rounded-full">
              <tr>
                <th className="p-3">Supplier ID</th>
                <th className="p-3">Supplier Name</th>
                <th className="p-3">Position</th>
                <th className="p-3">Status</th>
                <th className="p-3">Orders</th>
                <th className="p-3">Action</th>
                <th className="p-3">Presence</th>
              </tr>
            </thead>

            <tbody className="text-[18px]">
              {Array.from({ length: totalSuppliers }).map((_, index) => (
                <tr className="text-center" key={index}>
                  <td className="p-3">#{index + 1}</td>
                  <td className="p-3">Supplier {index + 1}</td>
                  <td className="p-3">Position {index + 1}</td>
                  <td className="p-3">Assigned</td>
                  <td className="p-3">2</td>
                  <td className="p-3">View</td>
                  <td className="px-4 py-2">
                    <div className="flex justify-around">
                      {attendance[index] === null ? (
                        <>
                          <button
                            className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600"
                            onClick={() => handlePresenceChange(index, true)}
                          >
                            P
                          </button>
                          <button
                            className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
                            onClick={() => handlePresenceChange(index, false)}
                          >
                            A
                          </button>
                        </>
                      ) : attendance[index] === "present" ? (
                        <span className="text-green-500 text-2xl">✅</span>
                      ) : (
                        <span className="text-red-500 text-2xl">❌</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SupplierInfo;
