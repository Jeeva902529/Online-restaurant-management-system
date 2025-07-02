// Refactored FoodDetails.jsx to behave exactly like FoodManager.jsx with same functionality

"use client"

import React, { useState, useEffect } from "react";
import Pages from "../Components/Pages.jsx";
import Navbar from "../Components/Navbar.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {
  PlusCircle,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
  RefreshCw,
  ChevronDown,
  Filter,
  Utensils,
} from "lucide-react";

const API_BASE = "http://localhost:5000/api/foods";

const foodCategories = [
  { value: "noodles", label: "Noodles", icon: "🍜" },
  { value: "biryani", label: "Biryani", icon: "🍚" },
  { value: "dosa", label: "Dosa", icon: "🥞" },
  { value: "idli", label: "Idli", icon: "🍙" },
  { value: "meals", label: "Meals", icon: "🍱" },
  { value: "tomatorice", label: "Tomato Rice", icon: "🍅" },
];

function FoodDetails() {
  const [selectedCategory, setSelectedCategory] = useState("noodles");
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [form, setForm] = useState({ name: "", description: "", price: "", type: "veg", quantity: "" });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchItems();
    resetForm();
  }, [selectedCategory]);

  useEffect(() => {
    if (searchQuery.trim() === "" && filterType === "all") {
      setFilteredItems(items);
      return;
    }
    let filtered = [...items];
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((item) => item.name.toLowerCase().includes(query));
    }
    if (filterType !== "all") {
      filtered = filtered.filter((item) => item.type === filterType);
    }
    setFilteredItems(filtered);
  }, [searchQuery, filterType, items]);

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/${selectedCategory}`);
      const data = Array.isArray(res.data) ? res.data : [];
      setItems(data);
      setFilteredItems(data);
    } catch (err) {
      console.error(err);
      setMessage({ text: "Error fetching data", type: "error" });
      setItems([]);
      setFilteredItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, price, quantity, type } = form;
    if (!name || !price || !quantity) {
      setMessage({ text: "All required fields must be filled.", type: "error" });
      return;
    }
    const payload = { ...form, price: Number(price), quantity: Number(quantity) };
    setIsLoading(true);
    try {
      if (editingId) {
        await axios.put(`${API_BASE}/${selectedCategory}/${editingId}`, payload);
        setMessage({ text: "Item updated successfully", type: "success" });
      } else {
        await axios.post(`${API_BASE}/${selectedCategory}`, payload);
        setMessage({ text: "Item added successfully", type: "success" });
      }
      fetchItems();
      resetForm();
      if (!editingId) setShowForm(false);
    } catch (err) {
      setMessage({ text: "Submission failed", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setForm({ name: "", description: "", price: "", type: "veg", quantity: "" });
    setEditingId(null);
    setMessage({ text: "", type: "" });
  };

  const handleEdit = (item) => {
    setForm({ ...item });
    setEditingId(item._id);
    setShowForm(true);
    document.getElementById("form-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`${API_BASE}/${selectedCategory}/${id}`);
        setMessage({ text: "Item deleted", type: "success" });
        fetchItems();
      } catch (err) {
        setMessage({ text: "Delete failed", type: "error" });
      }
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getCurrentCategory = () => {
    return foodCategories.find((cat) => cat.value === selectedCategory) || { label: "Unknown", icon: "🍽️" };
  };

  return (
    <div className="flex h-screen font-lora">
      <Pages />
      <div className="flex-1 p-10 text-2xl">
        <Navbar />

        {/* Header */}
        <div className="flex justify-between items-center bg-[#37375b] text-white p-4 rounded-lg mt-2">
          <div>
            <h2 className="text-2xl font-bold">{getCurrentCategory().label} Management</h2>
            <p>Manage menu items for {getCurrentCategory().label.toLowerCase()}</p>
          </div>
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-[#2b2c40] text-white border border-gray-500 rounded-lg px-3 py-2"
            >
              {foodCategories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.icon} {cat.label}
                </option>
              ))}
            </select>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-[#ff3131] hover:bg-[#e62c2c] px-4 py-2 rounded-lg text-white"
            >
              {showForm ? "Cancel" : "Add New Item"}
            </button>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-4 mt-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="m-[1.1%] w-[100%] h-[44px] bg-[#2b2c40] text-white px-4 py-2 pl-5 rounded-lg outline-none border border-gray-600 focus:border-purple-500"
                    />
                     <FontAwesomeIcon icon={faSearch} className="absolute right-5 top-3 text-gray-400 text-lg mt-[2%]" />
                  </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-[#2b2c40] text-white border border-gray-600 focus:border-purple-500 rounded-lg ml-[60%] px-3 py-2"
          >
            <option value="all">All</option>
            <option value="veg">Veg</option>
            <option value="non-veg">Non-Veg</option>
          </select>
        </div>

        {/* Form Section */}
        {showForm && (
          <div id="form-section" className="bg-[#2b2c40] text-white p-4 rounded-lg mt-5">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="p-2 rounded bg-[#444]" />
              <input name="price" value={form.price} onChange={handleChange} placeholder="Price" className="p-2 rounded bg-[#444]" type="number" />
              <input name="quantity" value={form.quantity} onChange={handleChange} placeholder="Quantity" className="p-2 rounded bg-[#444]" type="number" />
              <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="p-2 rounded bg-[#444] md:col-span-2" />
              <div className="md:col-span-2">
                <label className="mr-4">
                  <input type="radio" name="type" value="veg" checked={form.type === "veg"} onChange={handleChange} /> Veg
                </label>
                <label>
                  <input type="radio" name="type" value="non-veg" checked={form.type === "non-veg"} onChange={handleChange} /> Non-Veg
                </label>
              </div>
              <button className="bg-[#ff3131] px-4 py-2 rounded text-white" type="submit">
                {editingId ? "Update" : "Add"}
              </button>
            </form>
          </div>
        )}

        {/* Items Grid */}
        <div className="overflow-y-auto grid grid-cols-3 gap-4 h-[400px] md:grid-cols-3 mt-6">
          {filteredItems.map((item) => (
            <div key={item._id} className="bg-[#37375b] h-[130px] text-white p-4 rounded-lg border-white">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-[22px] font-bold">{item.name}</h4>
                  <p className="text-[15px] w-65">{item.description || "No description"}</p>
                </div>
                <div className="text-right">
                  <p>{formatCurrency(item.price)}</p>
                  <p className="text-sm">Qty: {item.quantity}</p>
                </div>
              </div>
              <div className="flex justify-end gap-4 mt-2">
                <button onClick={() => handleEdit(item)} className="hover:underline text-green-400">
                  <Edit size={24} />
                </button>
                <button onClick={() => handleDelete(item._id)} className="hover:underline text-red-500">
                  <Trash2 size={24} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FoodDetails;
