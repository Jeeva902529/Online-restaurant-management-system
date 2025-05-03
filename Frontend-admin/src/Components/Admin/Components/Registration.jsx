import React, { useState } from 'react';
import axios from 'axios';
import Pages from "../Components/Pages";
import Navbar from "../Components/Navbar";
import Restaurantcrew from "../assets/Restaurantcrew.jpg"

const Registration = () => {
  const [showForm, setShowForm] = useState(false);
  const [role, setRole] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleButtonClick = (selectedRole) => {
    setRole(selectedRole);
    setShowForm(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/register', {
        role,
        ...formData,
      });

      alert(`${role} Registered Successfully`);
      setShowForm(false);
      setFormData({ username: '', password: '' });
    } catch (error) {
      console.error('Registration Error:', error);
      alert('Registration Failed');
    }
  };

  const roles = ["Cashier", "Supplier", "Food Incharge"];

  return (
    <div className="flex h-screen w-screen font-lora bg-[#2b2c40]">
      <Pages />

      <div className="flex-1 p-10 text-2xl text-black bg-[#2b2c40]">
        <Navbar />
        <h1 className="text-3xl font-bold mb-[3%] text-[#ffffff] mt-[3%] flex justify-center items-center">
          Registration Page
        </h1>

        <div className="w-full h-[510px] rounded-[20px] flex justify-center items-center bg-[#373754]">
          <div className="w-[95%] h-[90%] flex justify-evenly bg-[#373754] rounded-xl">

            {/* Left Side */}
            <div className="w-[45%] p-5 rounded-[20px] flex flex-col justify-evenly items-center bg-[#2b2c40]">
              <h1 className="text-3xl text-white font-bold mb-10">Restaurant Crew</h1>

              {roles.map((item) => (
                <button
                  key={item}
                  className="bg-[#373754] text-white w-[80%] h-[70px] py-3 mb-5 rounded-lg hover:bg-[#4b4c64] duration-200"
                  onClick={() => handleButtonClick(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Right Side */}
            <div className="w-[45%] text-white p-5 border-2 border-black rounded-[20px] flex flex-col justify-center items-center">
              {!showForm ? (
                <img
                  src={Restaurantcrew}
                  alt="Hotel Staff"
                  className="w-[95%] h-[95%] object-cover rounded-lg border-[5px] border-[#2b2c40] shadow-lg"
                />
              ) : (
                <form onSubmit={handleSubmit} className="w-[80%]">
                  <h2 className="text-2xl font-semibold mb-5">{role} Registration</h2>

                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="w-full border border-gray-400 px-3 py-2 mb-4 pl-[6%] rounded-lg text-black"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />

                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full border border-gray-400 px-3 py-2 mb-4 pl-[6%] rounded-lg text-black"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />

                  <button type="submit" className="bg-black text-white w-full py-2 rounded-lg hover:bg-gray-800 duration-200">
                    Register
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Registration;
