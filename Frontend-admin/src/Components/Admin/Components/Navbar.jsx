import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBell, faMoon, faUserCircle, faSearch } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ }) => {
  return (
    <nav className="mt-[-3%] flex justify-between items-center ml-[-3.1%] bg-[#37375b] w-[106%] rounded-md p-2 font-lora">
      {/* Left: Sidebar Toggle & Search Bar */}
      <div className="flex items-center pl-6">
        <FontAwesomeIcon icon={faBars} style={{ fontSize: "35px" }} color="black" className="mr-4" />

        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="m-[1.1%] w-[100%] h-[44px] bg-[#2b2c40] text-white px-4 py-2 pl-5 rounded-lg outline-none border border-gray-600 focus:border-purple-500"
          />
           <FontAwesomeIcon icon={faSearch} className="absolute right-5 top-3 text-gray-400 text-lg mt-[2%]" />
        </div>
      </div>

      {/* Right: Notifications, Theme Toggle, User Icon */}
      <div className="flex justify-evenly w-1/5">
        <FontAwesomeIcon icon={faBell} style={{ fontSize: "40px" }} color="black" />
        <FontAwesomeIcon icon={faUserCircle} style={{ fontSize: "40px", color: "black" }} />
      </div>
    </nav>
  );
};

export default Navbar;
