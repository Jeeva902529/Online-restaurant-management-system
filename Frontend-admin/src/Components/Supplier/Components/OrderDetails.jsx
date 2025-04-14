import React from "react";

const OrderDetails = () => {
  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Supplier</h1>
        <h2 className="text-3xl font-bold text-gray-800">Order Details</h2>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-6 mb-12">
        <div className="bg-indigo-900 text-white rounded-lg shadow-lg p-6 w-52 text-center">
          <h3 className="text-lg font-semibold">Total Orders</h3>
          <p className="text-2xl font-bold">08</p>
        </div>
        <div className="bg-indigo-900 text-white rounded-lg shadow-lg p-6 w-52 text-center">
          <h3 className="text-lg font-semibold">Completed</h3>
          <p className="text-2xl font-bold">05</p>
        </div>
        <div className="bg-indigo-900 text-white rounded-lg shadow-lg p-6 w-52 text-center">
          <h3 className="text-lg font-semibold">Rejected</h3>
          <p className="text-2xl font-bold">03</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-around items-center w-full max-w-6xl">
        <div className="text-center md:text-left md:w-1/2 p-2">
          <p className="text-2xl font-semibold">
            "New Order Ready! <br />
            Pickup and Deliver with Care." <br />
            "Your Next Delivery Awaits <br /> – Handle with Speed!" <br />
            "Order Assigned! Get Ready to Serve!"
          </p>
          {/* View Order Button */}
          <button className="mt-4 bg-indigo-900 text-white py-2 px-6 rounded-lg shadow-lg">
            View Order
          </button>
        </div>
        <div className="flex justify-center md:w-1/2 p-2">
          <img
            alt="A man in a cafe looking at a tablet and smiling"
            className="rounded-lg shadow-lg"
            height="100"
            width="400"
            src="https://storage.googleapis.com/a1aa/image/tqD4qltX0SMKwoDgLmL4uas_jHwPYZUzKWrG2YbNtao.jpg"
          />
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
