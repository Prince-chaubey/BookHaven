import React, { useState } from "react";
import logo from "../../assets/logo.gif";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

       
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="logo" className="w-10 h-10 object-contain" />
          <h1 className="text-xl font-bold text-gray-800">
            BookHeaven
          </h1>
        </div>

       
        <ul className="hidden md:flex gap-8 font-medium text-gray-700">
          <li onClick={() => navigate("/")} className="cursor-pointer hover:text-blue-600">Home</li>
          <li className="cursor-pointer hover:text-blue-600">Books</li>
          <li className="cursor-pointer hover:text-blue-600">Categories</li>
          <li className="cursor-pointer hover:text-blue-600">Contact</li>
        </ul>

       
        <div className="hidden md:flex gap-4">
          <button
            onClick={() => navigate("/signup")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            Sign Up
          </button>
        </div>

       
        <div
          className="md:hidden text-2xl cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-6 py-4 space-y-4">
          <p onClick={() => navigate("/")} className="hover:text-blue-600 cursor-pointer">Home</p>
          <p className="hover:text-blue-600 cursor-pointer">Books</p>
          <p className="hover:text-blue-600 cursor-pointer">Categories</p>
          <p className="hover:text-blue-600 cursor-pointer">Contact</p>

          <button
            onClick={() => navigate("/signup")}
            className="w-full bg-blue-600 py-2 rounded-lg text-white cursor-pointer"
          >
            Sign Up
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;