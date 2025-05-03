import { useState } from "react";
import { FaTimes, FaEdit } from "react-icons/fa";

const EditMenu = ({ food, onClose, onUpdate }) => {
  const [dishName, setDishName] = useState(food.name);
  const [price, setPrice] = useState(food.price || "");
  const [preview, setPreview] = useState(food.image);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    onUpdate({ ...food, name: dishName, image: preview, price });
    onClose();
  };

  return (
    <div className="fixed inset-0 backdrop-blur-md flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-96 relative animate-fadeIn">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl"
          onClick={onClose}
        >
          <FaTimes />
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Dish</h2>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            value={dishName}
            onChange={(e) => setDishName(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
            placeholder="Dish Name"
          />
          <input
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-gray-800 file:text-white hover:file:bg-gray-700"
          />
          {preview && (
            <div className="flex justify-center">
              <img src={preview} alt="Preview" className="w-24 h-24 object-cover rounded-lg border" />
            </div>
          )}
          <button
            onClick={handleSubmit}
            className="w-full bg-gray-800 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-700 transition"
          >
            <FaEdit /> Update Dish
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditMenu;
