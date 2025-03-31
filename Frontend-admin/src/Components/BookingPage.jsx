import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";  // Import the bell icon from react-icons

const BookingPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([
    {
      id: 1,
      userName: "Sri Priya",
      userImage: "https://example.com/path/to/user-image1.jpg",
      foodItems: [
        {
          sectionName: "Main Course",
          foodName: "Chicken Biriyani",
          quantity: 2,
          extras: "Spicy, no onions",
        },
        {
          sectionName: "Sides",
          foodName: "Raita",
          quantity: 1,
          extras: "",
        },
        {
          sectionName: "Sides",
          foodName: "65-Boneless",
          quantity: 1,
          extras: "",
        },
      ],
    },
    {
      id: 2,
      userName: "Sri Priya",
      userImage: "https://example.com/path/to/user-image2.jpg",
      foodItems: [
        {
          sectionName: "Main Course",
          foodName: "Egg Rice",
          quantity: 1,
          extras: "",
        },
        {
          sectionName: "Sides",
          foodName: "Pepper Egg",
          quantity: 1,
          extras: "",
        },
      ],
    },
    {
      id: 3,
      userName: "Sri Priya",
      userImage: "https://example.com/path/to/user-image2.jpg",
      foodItems: [
        {
          sectionName: "Main Course",
          foodName: "Shork Rice",
          quantity: 1,
          extras: "Extra spice",
        },
      ],
    },
    {
      id: 4,
      userName: "Sri Priya",
      userImage: "https://example.com/path/to/user-image4.jpg",
      foodItems: [
        {
          sectionName: "Dessert",
          foodName: "Ice Cream",
          quantity: 1,
          extras: "Vanilla",
        },
        {
          sectionName: "Sides",
          foodName: "Gulfi",
          quantity: 2,
          extras: "",
        },
      ],
    },
  ]);

  // State for showing all orders or only the first three
  const [showAll, setShowAll] = useState(false);
  // For the View modal popup
  const [viewModalOrder, setViewModalOrder] = useState(null);
  // For showing a cancel message popup
  const [cancelMessage, setCancelMessage] = useState("");

  const handleView = (order) => {
    setViewModalOrder(order);
  };

  const closeViewModal = () => {
    setViewModalOrder(null);
  };

  const handleDelete = (id) => {
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
    setCancelMessage("Order Cancelled");
    setTimeout(() => setCancelMessage(""), 2000);
  };

  // Determine orders to display (first 3 if showAll is false)
  const displayedOrders = showAll ? orders : orders.slice(0, 3);

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      {/* Top Section with Title and Notification Icon */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-black cursor-pointer hover:scale-105 transition-transform">
            Booking
          </h1>
          <p className="text-red-500 cursor-pointer hover:scale-105 transition-transform">
            Checking and Confirm Order
          </p>
        </div>
        {/* Updated Notification: Bell Icon with red indicator */}
        <div className="flex items-center relative">
          <FaBell className="text-black text-2xl" />
          <span className="absolute top-0 right-0 inline-block w-3 h-3 bg-red-600 rounded-full"></span>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {displayedOrders.map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              {/* Display user image if available; otherwise, show an icon */}
              <div className="w-10 h-10">
                {order.userImage ? (
                  <img
                    src={order.userImage}
                    alt="User"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <i className="fas fa-user text-2xl"></i>
                )}
              </div>
              <div>
                <h2 className="font-bold">{order.userName}</h2>
                <p className="text-gray-600">
                  {order.foodItems[0].foodName}
                  {order.foodItems.length > 1 && (
                    <span className="ml-2 text-gray-400">
                      +{order.foodItems.length - 1} more
                    </span>
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {/* Delete Icon Button */}
              <button
                onClick={() => handleDelete(order.id)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <i className="fas fa-trash"></i>
              </button>
              {/* View Button */}
              <button
                onClick={() => handleView(order)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
              >
                View
              </button>
              {/* Confirmed Button: Navigate to SupplierPage */}
              <button
                onClick={() => navigate("/supplier")}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors"
              >
                Confirmed
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Toggle More/Less Button */}
      {orders.length > 3 && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-transform transform hover:scale-105"
          >
            {showAll ? "Less" : "More"}
          </button>
        </div>
      )}

      {/* Cancel Message Popup */}
      {cancelMessage && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-md">
          {cancelMessage}
        </div>
      )}

      {/* View Modal Popup with Enhanced Details */}
      {viewModalOrder && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={closeViewModal}
          ></div>
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative z-10">
            <h3 className="text-xl font-bold mb-4">Order Details</h3>
            <div className="mb-4">
              <p className="text-sm">
                <span className="font-semibold">Order ID:</span> {viewModalOrder.id}
              </p>
              <p className="text-sm">
                <span className="font-semibold">User Name:</span> {viewModalOrder.userName}
              </p>
            </div>
            <div className="space-y-3">
              {viewModalOrder.foodItems.map((item, index) => (
                <div key={index} className="p-3 border rounded">
                  <p className="text-sm font-semibold">{item.sectionName}</p>
                  <p className="text-sm">
                    <span className="font-medium">Food:</span> {item.foodName}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Quantity:</span> {item.quantity}
                  </p>
                  {item.extras && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Extras:</span> {item.extras}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={closeViewModal}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-transform transform hover:scale-105"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
