import React, { useState } from "react";
import { FaTimes, FaPlus, FaUpload } from "react-icons/fa";

const NewMenu = ({ isOpen, onClose, onAddDish, existingCategories }) => {
  const [section, setSection] = useState("");
  const [newSection, setNewSection] = useState("");
  const [useNewSection, setUseNewSection] = useState(false);
  const [dishName, setDishName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [dishType, setDishType] = useState("veg"); // Dish type: veg or non-veg
  const [foodQuantity, setFoodQuantity] = useState(""); // New field: total food quantity

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = () => {
    const finalSection = useNewSection ? newSection : section;
    if (finalSection.trim() && dishName.trim() && image && price.trim() && foodQuantity.trim()) {
      // Pass all fields, including foodQuantity, to the parent
      onAddDish(finalSection, dishName, image, price, dishType, foodQuantity);
      // Reset fields
      setSection("");
      setNewSection("");
      setUseNewSection(false);
      setDishName("");
      setPrice("");
      setImage("");
      setDishType("veg");
      setFoodQuantity("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-md flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button className="absolute top-4 right-4" onClick={onClose}>
          <FaTimes size={18} className="text-gray-600 hover:text-red-500" />
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">Add New Dish</h2>
        <div className="mb-4">
          {!useNewSection ? (
            <div className="flex items-center gap-2">
              <select
                value={section}
                onChange={(e) => setSection(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">Select a Section</option>
                {(existingCategories || []).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <button
                className="bg-blue-500 text-white p-2 rounded"
                onClick={() => setUseNewSection(true)}
              >
                <FaPlus />
              </button>
            </div>
          ) : (
            <input
              type="text"
              placeholder="Enter New Section"
              value={newSection}
              onChange={(e) => setNewSection(e.target.value)}
              className="w-full p-2 border rounded"
            />
          )}
        </div>
        <input
          type="text"
          placeholder="Dish Name"
          value={dishName}
          onChange={(e) => setDishName(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
        />
        {/* Total Food Quantity Input */}
        <input
          type="number"
          placeholder="Total Food Quantity"
          value={foodQuantity}
          onChange={(e) => setFoodQuantity(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
        />
        {/* Dish Type Selection */}
        <div className="mb-3">
          <label className="block mb-1">Dish Type</label>
          <select
            value={dishType}
            onChange={(e) => setDishType(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="veg">Veg</option>
            <option value="non-veg">Non Veg</option>
          </select>
        </div>
        <label className="border-2 border-dashed border-gray-400 rounded-lg p-4 flex flex-col items-center cursor-pointer hover:border-blue-500 transition">
          <FaUpload className="text-gray-500 mb-2" size={24} />
          <span className="text-gray-500">Click to upload image</span>
          <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
        </label>
        {image && <img src={image} alt="Preview" className="w-20 h-20 object-cover mt-3 rounded" />}
        <button
          className={`mt-4 w-full px-4 py-2 rounded text-white ${
            (section || newSection) && dishName && image && price && foodQuantity
              ? "bg-blue-500 hover:bg-blue-700"
              : "bg-gray-300 cursor-not-allowed"
          }`}
          onClick={handleAdd}
          disabled={!(section || newSection) || !dishName || !image || !price || !foodQuantity}
        >
          Add Dish
        </button>
      </div>
    </div>
  );
};

export default NewMenu;
