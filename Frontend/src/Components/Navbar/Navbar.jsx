import React, { useState } from "react";
import logo from "../../assets/logo.gif";
import profile from "../../assets/people.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = !!localStorage.getItem("token");
  const navigate = useNavigate();

  const handleNav = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        
       
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleNav("/")}
        >
          <img src={logo} alt="logo" className="w-10 h-10 object-contain" />
          <h1 className="text-xl font-bold text-gray-800">BookHeaven</h1>
        </div>

      
        <ul className="hidden md:flex gap-8 font-medium text-gray-700">
          <li onClick={() => handleNav("/")} className="cursor-pointer hover:text-blue-600">Home</li>
          <li onClick={() => handleNav("/books")} className="cursor-pointer hover:text-blue-600">Books</li>
          <li onClick={() => handleNav("/categories")} className="cursor-pointer hover:text-blue-600">Categories</li>
          <li onClick={() => handleNav("/contact")} className="cursor-pointer hover:text-blue-600">Contact</li>
        </ul>

     
        <div className="hidden md:flex gap-4 items-center">
          {!isLoggedIn ? (
            <button
              onClick={() => handleNav("/signup")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Sign Up
            </button>
          ) : (
            <img
              src={profile}
              alt="profile"
              onClick={() => handleNav("/profile")}
              className="h-9 w-9 rounded-full cursor-pointer hover:scale-105 transition"
            />
          )}
        </div>

       
        <div
          className="md:hidden text-2xl cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✕" : "☰"}
        </div>
      </div>

    
      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-6 py-4 space-y-4 font-medium text-gray-700">
          <p onClick={() => handleNav("/")} className="hover:text-blue-600 cursor-pointer">Home</p>
          <p onClick={() => handleNav("/books")} className="hover:text-blue-600 cursor-pointer">Books</p>
          <p onClick={() => handleNav("/categories")} className="hover:text-blue-600 cursor-pointer">Categories</p>
          <p onClick={() => handleNav("/contact")} className="hover:text-blue-600 cursor-pointer">Contact</p>

          {!isLoggedIn ? (
            <button
              onClick={() => handleNav("/signup")}
              className="w-full bg-blue-600 py-2 rounded-lg text-white"
            >
              Sign Up
            </button>
          ) : (
            <div className="flex justify-center">
              <img
                src={profile}
                alt="profile"
                onClick={() => handleNav("/profile")}
                className="h-9 w-9 rounded-full cursor-pointer"
              />
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;