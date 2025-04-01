import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginImg from '../Assets/Login BG.jpg';

const LoginPage = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/login/login", {
        method: "POST",
        credentials: "include",  // Ensure cookies are included
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
      if (response.ok) {
        setIsAuthenticated(true);
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  
  
  return (
    <div className="h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${LoginImg})` }}>
      <div className="bg-white/10 backdrop-blur-2xl p-8 rounded-xl w-full max-w-md">
        <h1 className="text-4xl font-bold text-red-600 text-center mb-4">Log In</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          {/* User ID Input */}
          <div>
            <label htmlFor="username" className="block text-white font-semibold mb-1">User ID</label>
            <input 
              type="text" 
              id="username" 
              placeholder="Enter your user id" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
              className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition duration-300"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-white font-semibold mb-1">Password</label>
            <input 
              type="password" 
              id="password" 
              placeholder="Enter your password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition duration-300"
            />
          </div>

          {/* Login Button */}
          <button type="submit" className="bg-red-600 text-white py-2 px-4 rounded-lg w-full mt-3 transition transform hover:scale-105">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
