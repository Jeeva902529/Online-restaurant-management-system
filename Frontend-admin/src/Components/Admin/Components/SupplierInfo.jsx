import React, { useState, useEffect } from "react";
import Axios from "axios";
import Pages from "../Components/Pages.jsx";
import Navbar from "../Components/Navbar.jsx";

function SupplierInfo() {
  const totalSuppliers = 8;
  const [presentCount, setPresentCount] = useState(0); 
  const [absentCount, setAbsentCount] = useState(0); 
  const [attendance, setAttendance] = useState(Array(totalSuppliers).fill(null));

  // Fetch attendance data on mount
  useEffect(() => {
    Axios.get("http://localhost:5000/attendance/today")
      .then((response) => {
        const data = response.data;
        const updatedAttendance = Array(totalSuppliers).fill(null);
        let present = 0;
        let absent = 0;

        data.forEach((entry) => {
          const index = parseInt(entry.username.split(" ")[1]) - 1; // "Supplier 1" => 0
          if (entry.present === "present") {
            updatedAttendance[index] = "present";
            present++;
          } else if (entry.present === "absent") {
            updatedAttendance[index] = "absent";
            absent++;
          }
        });

        setAttendance(updatedAttendance);
        setPresentCount(present);
        setAbsentCount(absent);
      })
      .catch((error) => console.error("Error fetching attendance:", error));
  }, []);

  const handlePresenceChange = (index, isPresent) => {
    if (attendance[index] !== null) return; // Prevent multiple entries

    const presentStatus = isPresent ? "present" : "absent";

    // UI update
    const newAttendance = [...attendance];
    newAttendance[index] = presentStatus;
    setAttendance(newAttendance);
    setPresentCount((prev) => (isPresent ? prev + 1 : prev));
    setAbsentCount((prev) => (!isPresent ? prev + 1 : prev));

    const username = `Supplier ${index + 1}`;
    const role = `Position ${index + 1}`;

    Axios.post("http://localhost:5000/attendance/mark", {
      username,
      role,
      present: presentStatus,
    })
      .then((res) => console.log(res.data))
      .catch((err) => console.error("Error saving attendance:", err));
  };

  return (
    <div className="flex h-screen font-lora">
      <Pages />
      <div className="flex-1 p-10 text-2xl">
        <Navbar />
        <div className="w-[100%] h-[26%] flex justify-evenly items-center bg-[#2b2c40]">
          <InfoCard title="Total Suppliers" count={totalSuppliers} />
          <InfoCard title="Present Suppliers" count={presentCount} />
          <InfoCard title="Absent Suppliers" count={absentCount} />
          <InfoCard title="Active Suppliers" count={5} />
        </div>

        <div
          className="overflow-y-auto bg-[#37375b] text-white p-6 rounded-[20px] shadow-md mt-[0.3%]"
          style={{ height: "460px" }}
        >
          <table className="w-full">
            <thead className="bg-[#2b2c40] text-white text-center">
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

function InfoCard({ title, count }) {
  return (
    <div className="bg-[#37375b] text-white p-4 rounded-xl text-center flex flex-col justify-center items-center w-[20%] h-[80%]">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold">{count}</p>
    </div>
  );
}

export default SupplierInfo;
