import { FaTimes } from "react-icons/fa";

const ViewMenu = ({ food, onClose }) => {
  return (
    <div className="fixed inset-0 backdrop-blur-md flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-96">
        <button onClick={onClose} className="absolute top-4 right-4">
          <FaTimes size={20} />
        </button>
        <img
          src={food.image}
          alt={food.name}
          className="w-40 h-40 object-cover rounded-lg mx-auto"
        />
        <h2 className="mt-4 text-xl font-bold text-center">{food.name}</h2>
        {food.price && (
          <p className="mt-2 text-center text-gray-700">Price: ${food.price}</p>
        )}
        <button
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg w-full mt-4"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewMenu;
