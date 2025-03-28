import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Home = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  if (!token) {
    navigate('/login');
    return null;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      {/* Center the welcome text */}
      <h1 className="text-4xl font-extrabold text-blue-600 mb-12 text-center">
        Welcome to User Management App
      </h1>

      {/* Improved button styling */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <button
          className="px-8 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
          onClick={() => navigate('/users')}
        >
          View Users
        </button>
        <button
          className="px-20 py-3 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-100 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
