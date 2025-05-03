import React, { useState, useEffect, lazy, Suspense } from "react";
import { FaPlus, FaEye, FaEdit, FaTrash } from "react-icons/fa";

// Lazy load modal components
const NewMenu = lazy(() => import("./NewMenu"));
const ViewMenu = lazy(() => import("./ViewMenu"));
const EditMenu = lazy(() => import("./EditMenu"));

const MenuPage = () => {
  const [menuCategories, setMenuCategories] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [viewFood, setViewFood] = useState(null);
  const [editFood, setEditFood] = useState(null);
  const [dishToDelete, setDishToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({});

  // ✅ Fetch Menu Data
  const fetchMenu = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/menu/all");
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      console.log("Fetched menu data:", data);
      if (!Array.isArray(data)) {
        console.error("Error: Menu data is not an array", data);
        setMenuCategories([]);
        return;
      }
      // First, group items by category, then further group by type (veg vs non-veg)
      const categorized = data.reduce((acc, item) => {
        const cat = item.category || "Uncategorized";
        if (!acc[cat]) {
          acc[cat] = { veg: [], "non-veg": [] };
        }
        const type = item.type ? item.type.toLowerCase() : "veg";
        if (type === "veg" || type === "non-veg") {
          acc[cat][type].push(item);
        } else {
          acc[cat]["veg"].push(item);
        }
        return acc;
      }, {});
      // Convert grouped data into an array format
      const menuData = Object.keys(categorized).map((cat) => ({
        category: cat,
        vegItems: categorized[cat].veg,
        nonVegItems: categorized[cat]["non-veg"],
      }));
      setMenuCategories(menuData);
    } catch (error) {
      console.error("Error fetching menu:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch menu on component mount
  useEffect(() => {
    fetchMenu();
  }, []);

  // ✅ Add Dish Function (includes dishType and foodQuantity)
  const handleAddDish = async (section, dishName, image, price, dishType, foodQuantity) => {
    // Check if the dish already exists in the specified section and type.
    let existingDish = null;
    const categoryIndex = menuCategories.findIndex((cat) => cat.category === section);
    if (categoryIndex >= 0) {
      const items = dishType.toLowerCase() === "veg" ? menuCategories[categoryIndex].vegItems : menuCategories[categoryIndex].nonVegItems;
      existingDish = items.find((item) => item.name.toLowerCase() === dishName.toLowerCase());
    }

    if (existingDish) {
      // If dish exists, update the quantity.
      const newQuantity =
        parseInt(existingDish.foodQuantity || 0, 10) +
        parseInt(foodQuantity, 10);
      try {
        const response = await fetch(`http://localhost:5000/api/menu/update/${section}/${existingDish._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...existingDish, foodQuantity: newQuantity }),
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Server error: ${response.status} ${response.statusText} - ${errorData.error}`);
        }
        alert("Dish quantity updated successfully!");
        fetchMenu();
        return;
      } catch (error) {
        console.error("Error updating dish quantity:", error);
        alert("Failed to update dish. Error: " + error.message);
        fetchMenu();
        return;
      }
    }

    // If dish doesn't exist, create a new dish entry.
    const tempDish = {
      _id: Date.now().toString(), // temporary unique id
      name: dishName,
      image,
      price,
      category: section,
      type: dishType.toLowerCase(),
      foodQuantity,
    };

    // Optimistically update UI.
    setMenuCategories((prevCategories) => {
      const updated = [...prevCategories];
      const catIndex = updated.findIndex((cat) => cat.category === section);
      if (catIndex >= 0) {
        if (dishType.toLowerCase() === "veg") {
          updated[catIndex] = {
            ...updated[catIndex],
            vegItems: [...(updated[catIndex].vegItems || []), tempDish],
          };
        } else {
          updated[catIndex] = {
            ...updated[catIndex],
            nonVegItems: [...(updated[catIndex].nonVegItems || []), tempDish],
          };
        }
      } else {
        updated.push(
          dishType.toLowerCase() === "veg"
            ? { category: section, vegItems: [tempDish], nonVegItems: [] }
            : { category: section, vegItems: [], nonVegItems: [tempDish] }
        );
      }
      return updated;
    });

    try {
      const response = await fetch("http://localhost:5000/api/menu/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: section,
          name: dishName,
          image,
          price,
          type: dishType,
          foodQuantity, // send the quantity to backend
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Server error: ${response.status} ${response.statusText} - ${errorData.error}`);
      }
      alert("Dish added successfully!");
      fetchMenu(); // Refresh menu after adding dish
    } catch (error) {
      console.error("Error adding dish:", error);
      alert("Failed to add dish. Error: " + error.message);
      fetchMenu(); // Revert optimistic update if needed
    }
  };

  // ✅ Delete Dish Function (with confirmation)
  const handleDeleteDish = async (dishId, category) => {
    setDishToDelete(null); // Close the confirmation popup
    try {
      // Optimistically update UI for the matching category
      setMenuCategories((prevCategories) =>
        prevCategories.map((catObj) =>
          catObj.category === category
            ? {
                ...catObj,
                vegItems: catObj.vegItems.filter(
                  (item) => (item._id || item.id) !== dishId
                ),
                nonVegItems: catObj.nonVegItems.filter(
                  (item) => (item._id || item.id) !== dishId
                ),
              }
            : catObj
        )
      );
      const response = await fetch(`http://localhost:5000/api/menu/delete/${category}/${dishId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete dish");
      }
    } catch (error) {
      console.error("Error deleting dish:", error);
      fetchMenu(); // Refresh in case of failure
    }
  };

  // Handler when user confirms deletion from the popup
  const handleConfirmDelete = () => {
    if (dishToDelete) {
      const dishId = dishToDelete._id || dishToDelete.id;
      const category = dishToDelete.category;
      handleDeleteDish(dishId, category);
    }
  };

  // ✅ Update Dish Function (requires dish category)
  const handleUpdateDish = async (updatedDish) => {
    const dishId = updatedDish._id || updatedDish.id;
    const category = updatedDish.category;
    // Optimistically update UI
    setMenuCategories((prevCategories) =>
      prevCategories.map((catObj) =>
        catObj.category === category
          ? {
              ...catObj,
              vegItems: catObj.vegItems.map((item) =>
                (item._id || item.id) === dishId ? { ...item, ...updatedDish } : item
              ),
              nonVegItems: catObj.nonVegItems.map((item) =>
                (item._id || item.id) === dishId ? { ...item, ...updatedDish } : item
              ),
            }
          : catObj
      )
    );
    try {
      const response = await fetch(`http://localhost:5000/api/menu/update/${category}/${dishId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedDish),
      });
      if (!response.ok) {
        throw new Error("Failed to update dish");
      }
    } catch (error) {
      console.error("Error updating dish:", error);
      fetchMenu();
    }
  };

  // ✅ Toggle category visibility (expand/collapse)
  const toggleCategory = (categoryName) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }));
  };

  return (
    <div className="relative bg-white text-gray-900 min-h-screen px-8 md:px-24">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-4xl pt-5 font-bold">Food</h1>
          <p className="text-red-400">Add & Update Foods</p>
        </div>
        <button
          className="bg-gray-800 text-white flex items-center gap-2 p-2 px-5 text-sm rounded-md shadow-lg"
          onClick={() => setIsPopupOpen(true)}
        >
          <FaPlus /> New Menu
        </button>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-10">
          <div className="w-16 h-16 border-8 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-xl text-gray-700">Loading menu data...</p>
        </div>
      ) : menuCategories.length === 0 ? (
        <div className="text-center text-gray-500">No menu data available.</div>
      ) : (
        menuCategories.map((catObj, catIndex) => (
          <div key={catIndex} className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{catObj.category}</h2>
            {/* Veg Section */}
            {catObj.vegItems && catObj.vegItems.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Veg</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {catObj.vegItems.map((item) => (
                    <div
                      key={item._id || item.id}
                      className="relative bg-gray-800 p-6 rounded-lg shadow-xl flex flex-col items-center overflow-visible"
                    >
                      {item.image && (
                        <div className="relative w-20 h-20 mb-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-full border-4 border-white absolute top-[-50%] left-1/2 transform -translate-x-1/2"
                          />
                        </div>
                      )}
                      <h3 className="font-semibold text-center text-white mt-10">{item.name}</h3>
                      {/* Action Buttons: View, Edit, Delete */}
                      <div className="flex justify-around w-full mt-2">
                        <button
                          onClick={() => setViewFood(item)}
                          className="text-blue-400 hover:text-blue-600 text-lg"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => setEditFood(item)}
                          className="text-green-400 hover:text-green-600 text-lg"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() =>
                            setDishToDelete({ ...item, category: catObj.category })
                          }
                          className="text-red-400 hover:text-red-600 text-lg"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Non-Veg Section */}
            {catObj.nonVegItems && catObj.nonVegItems.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Non Veg</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {catObj.nonVegItems.map((item) => (
                    <div
                      key={item._id || item.id}
                      className="relative bg-gray-800 p-6 rounded-lg shadow-xl flex flex-col items-center overflow-visible"
                    >
                      {item.image && (
                        <div className="relative w-20 h-20 mb-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-full border-4 border-white absolute top-[-50%] left-1/2 transform -translate-x-1/2"
                          />
                        </div>
                      )}
                      <h3 className="font-semibold text-center text-white mt-10">{item.name}</h3>
                      {/* Action Buttons: View, Edit, Delete */}
                      <div className="flex justify-around w-full mt-2">
                        <button
                          onClick={() => setViewFood(item)}
                          className="text-blue-400 hover:text-blue-600 text-lg"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => setEditFood(item)}
                          className="text-green-400 hover:text-green-600 text-lg"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() =>
                            setDishToDelete({ ...item, category: catObj.category })
                          }
                          className="text-red-400 hover:text-red-600 text-lg"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))
      )}

      {/* Modals */}
      <Suspense fallback={<div>Loading...</div>}>
        {viewFood && <ViewMenu food={viewFood} onClose={() => setViewFood(null)} />}
        {editFood && (
          <EditMenu food={editFood} onClose={() => setEditFood(null)} onUpdate={handleUpdateDish} />
        )}
        {isPopupOpen && (
          <NewMenu
            isOpen={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
            onAddDish={handleAddDish}
            existingCategories={menuCategories?.map((cat) => cat.category) || []}
          />
        )}
      </Suspense>

      {/* Delete Confirmation Popup */}
      {dishToDelete && (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-80">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p className="mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{dishToDelete.name}</span>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setDishToDelete(null)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuPage;
