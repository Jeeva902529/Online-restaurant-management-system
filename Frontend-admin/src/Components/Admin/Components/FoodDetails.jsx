import React  from "react";
import Pages from "../Components/Pages.jsx";
import Navbar from "../Components/Navbar.jsx";
import { FaSearch } from "react-icons/fa";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import Noodle from "../Assets/Noodle.jpg";
import chickenbriyani from "../Assets/chickenbriyani.jpg";
import dosa from "../Assets/dosa.jpg";
import idly from "../Assets/idly.jpg";
import tomatorice from "../Assets/tomatorice.jpg";
import meals from "../Assets/meals.jpg";

function FoodDetails() {

  return (
    <div className="flex h-screen font-lora">
    {/* Sidebar Navbar */}
    <Pages />

    {/* Main Content */}
    <div className="flex-1 p-10 text-2xl">
      <Navbar />
      <div className="flex justify-between items-center bg-[#37375b] text-white p-4 rounded-lg m-[0.7%]">
  {/* Left Side - Title (Column Layout) */}
  <div className="flex flex-col">
    <h2 className="text-[30px] font-bold">Your Orders</h2>
    <h3 className="text-[20px]">This is your ordered list data</h3>
  </div>
 {/* Center - Search Bar */}
  <div className="relative">
    <input
      type="text"
      placeholder="Search..."
      className="m-[1.1%] w-[100%] h-[44px] bg-[#2b2c40] text-white px-4 py-2 pl-10 rounded-lg outline-none border border-gray-600 focus:border-purple-500"
    />
    <FaSearch className="absolute right-5 top-3 text-gray-400" />
  </div>
  {/* Right Side - Filter Button */}
  <button className="bg-[#2b2c40] hover:bg-purple-700 border-1 border-white text-white px-4 py-2 rounded-lg shadow-md transition">
    Filter
  </button>
</div>
  
  <div className="grid grid-cols-4 gap-1 place-items-center w-full mt-[0.7%] h-[515px] overflow-y-auto">
  {/* Noodle Card */}
  <div className="bg-[#37375b] p-6 rounded-lg text-center w-70 h-65 flex flex-col justify-center items-center">
    <img src={Noodle} alt="foodpic" className="w-24 h-24 bg-[#444] rounded-full mb-4" />
    <p className="text-xl text-white font-poppins">Noodle</p>
    <div className="flex justify-center gap-4 mt-4">
      <FaEye className="cursor-pointer text-white text-xl" />
      <FaEdit className="cursor-pointer text-white text-xl" />
      <FaTrash className="cursor-pointer text-white text-xl" />
    </div>
  </div>

  {/* Chicken Briyani Card */}
  <div className="bg-[#37375b] p-6 rounded-lg text-center w-70 h-65 flex flex-col justify-center items-center">
    <img src={chickenbriyani} alt="foodpic" className="w-24 h-24 bg-[#444] rounded-full mb-4" />
    <p className="text-xl text-white font-poppins">Chicken Briyani</p>
    <div className="flex justify-center gap-4 mt-4">
      <FaEye className="cursor-pointer text-white text-xl" />
      <FaEdit className="cursor-pointer text-white text-xl" />
      <FaTrash className="cursor-pointer text-white text-xl" />
    </div>
  </div>

  {/* Dosa Card */}
  <div className="bg-[#37375b] p-6 rounded-lg text-center w-70 h-65 flex flex-col justify-center items-center">
    <img src={dosa} alt="foodpic" className="w-24 h-24 bg-[#444] rounded-full mb-4" />
    <p className="text-xl text-white font-poppins">Dosa</p>
    <div className="flex justify-center gap-4 mt-4">
      <FaEye className="cursor-pointer text-white text-xl" />
      <FaEdit className="cursor-pointer text-white text-xl" />
      <FaTrash className="cursor-pointer text-white text-xl" />
    </div>
  </div>

  {/* Idly Card */}
  <div className="bg-[#37375b] p-6 rounded-lg text-center w-70 h-65 flex flex-col justify-center items-center">
    <img src={idly} alt="foodpic" className="w-24 h-24 bg-[#444] rounded-full mb-4" />
    <p className="text-xl text-white font-poppins">Idly</p>
    <div className="flex justify-center gap-4 mt-4">
      <FaEye className="cursor-pointer text-white text-xl" />
      <FaEdit className="cursor-pointer text-white text-xl" />
      <FaTrash className="cursor-pointer text-white text-xl" />
    </div>
  </div>

  {/* Tomato Rice Card */}
  <div className="bg-[#37375b] p-6 rounded-lg text-center w-70 h-65 flex flex-col justify-center items-center">
    <img src={tomatorice} alt="foodpic" className="w-24 h-24 bg-[#444] rounded-full mb-4" />
    <p className="text-xl text-white font-poppins">Tomato Rice</p>
    <div className="flex justify-center gap-4 mt-4">
      <FaEye className="cursor-pointer text-white text-xl" />
      <FaEdit className="cursor-pointer text-white text-xl" />
      <FaTrash className="cursor-pointer text-white text-xl" />
    </div>
  </div>

  {/* Meals Card */}
  <div className="bg-[#37375b] p-6 rounded-lg text-center w-70 h-65 flex flex-col justify-center items-center">
    <img src={meals} alt="foodpic" className="w-24 h-24 bg-[#444] rounded-full mb-4" />
    <p className="text-xl text-white font-poppins">Meals</p>
    <div className="flex justify-center gap-4 mt-4">
      <FaEye className="cursor-pointer text-white text-xl" />
      <FaEdit className="cursor-pointer text-white text-xl" />
      <FaTrash className="cursor-pointer text-white text-xl" />
    </div>
  </div>
  
  {/* Dosa Card */}
  <div className="bg-[#37375b] p-6 rounded-lg text-center w-70 h-65 flex flex-col justify-center items-center">
    <img src={dosa} alt="foodpic" className="w-24 h-24 bg-[#444] rounded-full mb-4" />
    <p className="text-xl text-white font-poppins">Dosa</p>
    <div className="flex justify-center gap-4 mt-4">
      <FaEye className="cursor-pointer text-white text-xl" />
      <FaEdit className="cursor-pointer text-white text-xl" />
      <FaTrash className="cursor-pointer text-white text-xl" />
    </div>
  </div>
  
  {/* Dosa Card */}
  <div className="bg-[#37375b] p-6 rounded-lg text-center w-70 h-65 flex flex-col justify-center items-center">
    <img src={dosa} alt="foodpic" className="w-24 h-24 bg-[#444] rounded-full mb-4" />
    <p className="text-xl text-white font-poppins">Dosa</p>
    <div className="flex justify-center gap-4 mt-4">
      <FaEye className="cursor-pointer text-white text-xl" />
      <FaEdit className="cursor-pointer text-white text-xl" />
      <FaTrash className="cursor-pointer text-white text-xl" />
    </div>
  </div>
     
     {/* Chicken Briyani Card */}
  <div className="bg-[#37375b] p-6 rounded-lg text-center w-70 h-65 flex flex-col justify-center items-center">
    <img src={chickenbriyani} alt="foodpic" className="w-24 h-24 bg-[#444] rounded-full mb-4" />
    <p className="text-xl text-white font-poppins">Chicken Briyani</p>
    <div className="flex justify-center gap-4 mt-4">
      <FaEye className="cursor-pointer text-white text-xl" />
      <FaEdit className="cursor-pointer text-white text-xl" />
      <FaTrash className="cursor-pointer text-white text-xl" />
    </div>
  </div>

{/* Chicken Briyani Card */}
<div className="bg-[#37375b] p-6 rounded-lg text-center w-70 h-65 flex flex-col justify-center items-center">
    <img src={chickenbriyani} alt="foodpic" className="w-24 h-24 bg-[#444] rounded-full mb-4" />
    <p className="text-xl text-white font-poppins">Chicken Briyani</p>
    <div className="flex justify-center gap-4 mt-4">
      <FaEye className="cursor-pointer text-white text-xl" />
      <FaEdit className="cursor-pointer text-white text-xl" />
      <FaTrash className="cursor-pointer text-white text-xl" />
    </div>
  </div>

     {/* Chicken Briyani Card */}
  <div className="bg-[#37375b] p-6 rounded-lg text-center w-70 h-65 flex flex-col justify-center items-center">
    <img src={chickenbriyani} alt="foodpic" className="w-24 h-24 bg-[#444] rounded-full mb-4" />
    <p className="text-xl text-white font-poppins">Chicken Briyani</p>
    <div className="flex justify-center gap-4 mt-4">
      <FaEye className="cursor-pointer text-white text-xl" />
      <FaEdit className="cursor-pointer text-white text-xl" />
      <FaTrash className="cursor-pointer text-white text-xl" />
    </div>
  </div>

     {/* Chicken Briyani Card */}
  <div className="bg-[#37375b] p-6 rounded-lg text-center w-70 h-65 flex flex-col justify-center items-center">
    <img src={chickenbriyani} alt="foodpic" className="w-24 h-24 bg-[#444] rounded-full mb-4" />
    <p className="text-xl text-white font-poppins">Chicken Briyani</p>
    <div className="flex justify-center gap-4 mt-4">
      <FaEye className="cursor-pointer text-white text-xl" />
      <FaEdit className="cursor-pointer text-white text-xl" />
      <FaTrash className="cursor-pointer text-white text-xl" />
    </div>
  </div>


</div>

       </div>
   </div>
  )
}

export default FoodDetails;