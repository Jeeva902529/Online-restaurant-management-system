import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaBell } from "react-icons/fa";

const BookingPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [viewModalTable, setViewModalTable] = useState(null);
  const [cancelMessage, setCancelMessage] = useState("");

  // Function to fetch orders from the backend
  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/booking");
      const data = await response.json();

      // Group orders by table number
      const groupedOrders = data.reduce((acc, order) => {
        if (!acc[order.tableNumber]) acc[order.tableNumber] = [];
        acc[order.tableNumber].push(order);
        return acc;
      }, {});

      setOrders(groupedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Fetch orders on component mount and auto-update every 5 seconds
  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  // Convert timestamp to readable format
  const formatDateTime = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleString("en-IN", { 
      day: "2-digit", month: "short", year: "numeric", 
      hour: "2-digit", minute: "2-digit", second: "2-digit" 
    });
  };

  // Delete Order
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/booking/${id}`, { method: "DELETE" });
      fetchOrders(); // Refresh data after deletion
      setCancelMessage("Order Cancelled");
      setTimeout(() => setCancelMessage(""), 2000);
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  // Confirm Order & Navigate to Supplier Page
  const handleConfirm = (tableNumber) => {
    navigate("/supplier", { state: { tableNumber, orders: orders[tableNumber] } });
  };

  const handleView = (tableNumber) => {
    setViewModalTable(tableNumber);
  };

  const closeViewModal = () => {
    setViewModalTable(null);
  };

  return (
    <div className="relative min-h-screen p-4 bg-gray-100">
      <div className={`transition-all duration-300 ${viewModalTable ? "blur-md" : ""}`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-black">Booking</h1>
          <FaBell className="text-black text-2xl" />
        </div>

        <div className="space-y-4">
          {Object.keys(orders).map((tableNumber) => (
            <div key={tableNumber} className="flex justify-between items-center bg-white p-4 rounded-lg shadow">
              {/* Left Side: User Icon + Table Number */}
              <div className="flex items-center gap-3">
                <FaUser className="text-blue-500 text-2xl" />
                <h2 className="font-bold text-lg">Table {tableNumber}</h2>
              </div>

              {/* Right Side: Buttons */}
              <div className="flex gap-3">
                <button onClick={() => handleView(tableNumber)} className="bg-blue-500 text-white px-3 py-1 rounded">View</button>
                <button onClick={() => handleConfirm(tableNumber)} className="bg-green-500 text-white px-3 py-1 rounded">Confirm</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cancel Message Popup */}
      {cancelMessage && (
        <div className="bg-red-500 text-white px-4 py-2 rounded fixed top-4 right-4">
          {cancelMessage}
        </div>
      )}

      {/* View Modal (Grouped Orders) */}
      {viewModalTable && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold">Table {viewModalTable} Orders</h3>
            {orders[viewModalTable].map((order) => (
              <div key={order._id} className="border-b py-2">
                <p><strong>Food:</strong> {order.foodName}</p>
                <p><strong>Price:</strong> Rs. {order.totalPrice}</p>
                <p><strong>Add-ons:</strong> {order.addOns.length ? order.addOns.join(", ") : "None"}</p>
                <p><strong>Special Instructions:</strong> {order.specialInstructions || "None"}</p>
                <p><strong>Order Time:</strong> {formatDateTime(order.createdAt)}</p>
                <button onClick={() => handleDelete(order._id)} className="bg-red-500 text-white px-3 py-1 rounded mt-2">Cancel</button>
              </div>
            ))}
            <button onClick={closeViewModal} className="bg-gray-500 text-white px-4 py-2 rounded mt-4 w-full">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
