import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from "../assets/Logo.png";

function LoginPage() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !password) {
      setError('Please fill in both name and password');
    } else {
      console.log('Login successful', name, password);
      setName('');
      setPassword('');
      setError('');
      navigate('/Dashboard');
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-gray-900 flex items-center p-12">
        <img src={Logo} alt="Logo" className="w-24 h-12" />
      </nav>

      {/* Login Form */}
      <div className="flex flex-col items-center justify-start min-h-screen bg-gray-900">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-100">
          <h2 className="text-red-500 text-[35px] flex justify-center items-center font-bold">Welcome</h2>

          {/* Username Field */}
          <label className="block ml-[10%] text-[22px] text-white mt-8">Username:</label>
          <input
            className="w-[79%] ml-[10%] p-2 rounded text-[19px] mt-1 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            type="text"
            placeholder="Enter your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Password Field */}
          <label className="block ml-[10%] text-[22px] text-white mt-3">Password:</label>
          <input
            className="w-[79%] ml-[10%] p-2 rounded text-[19px] mt-1 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Error Message */}
          {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

          {/* Login Button */}
          <button
            onClick={handleSubmit}
            className="bg-red-500 ml-[32%] text-[20px] text-white px-4 py-2 rounded-lg w-[35%] mt-5 hover:bg-red-600 transition"
          >
            Login
          </button>

          {/* Forgot Password Link */}
          <p className="text-sm ml-[60%] text-gray-400 text-center mt-2 cursor-pointer hover:underline">
            Forgot Password?
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
