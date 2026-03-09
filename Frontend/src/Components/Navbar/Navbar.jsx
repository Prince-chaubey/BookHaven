import React, { useState, useEffect, useRef } from "react";
import logo from "../../assets/logo.gif";
import profile from "../../assets/people.png";
import { useNavigate, useLocation } from "react-router-dom";
import { FiHome, FiBook, FiGrid, FiMail, FiUser, FiLogIn, FiMenu, FiX, FiSearch, FiBell, FiChevronDown } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  
  const isLoggedIn = !!localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNav = (path) => {
    navigate(path);
    setIsOpen(false);
    setIsProfileDropdownOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    handleNav("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
      setSearchQuery("");
    }
  };

  // Check if link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav 
      className={`bg-white fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? "shadow-lg" : "shadow-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo and Brand */}
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => handleNav("/")}
          >
            <img 
              src={logo} 
              alt="BookHeaven" 
              className="w-10 h-10 object-contain transition-transform group-hover:scale-105" 
            />
            <h1 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition">
              BookHeaven
            </h1>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search books..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-gray-50"
                />
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </form>
          </div>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex items-center gap-1 font-medium text-gray-700">
            <li 
              onClick={() => handleNav("/")} 
              className={`px-3 py-2 rounded-lg cursor-pointer transition-all flex items-center gap-1 ${
                isActive("/") 
                  ? "text-blue-600 bg-blue-50" 
                  : "hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              <FiHome size={18} />
              <span>Home</span>
            </li>
            <li 
              onClick={() => handleNav("/books")} 
              className={`px-3 py-2 rounded-lg cursor-pointer transition-all flex items-center gap-1 ${
                isActive("/books") 
                  ? "text-blue-600 bg-blue-50" 
                  : "hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              <FiBook size={18} />
              <span>Books</span>
            </li>
            <li 
              onClick={() => handleNav("/categories")} 
              className={`px-3 py-2 rounded-lg cursor-pointer transition-all flex items-center gap-1 ${
                isActive("/categories") 
                  ? "text-blue-600 bg-blue-50" 
                  : "hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              <FiGrid size={18} />
              <span>Categories</span>
            </li>
            <li 
              onClick={() => handleNav("/contact")} 
              className={`px-3 py-2 rounded-lg cursor-pointer transition-all flex items-center gap-1 ${
                isActive("/contact") 
                  ? "text-blue-600 bg-blue-50" 
                  : "hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              <FiMail size={18} />
              <span>Contact</span>
            </li>
          </ul>

          {/* Desktop Section */}
          <div className="hidden md:flex items-center gap-3">
           

            {/* Auth Section */}
            {!isLoggedIn ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNav("/login")}
                  className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition flex items-center gap-1"
                >
                  <FiLogIn size={18} />
                  Login
                </button>
                <button
                  onClick={() => handleNav("/signup")}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md hover:shadow-lg"
                >
                  Sign Up
                </button>
              </div>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center gap-2 focus:outline-none group"
                >
                  <img
                    src={profile}
                    alt="profile"
                    className="h-9 w-9 rounded-full border-2 border-transparent group-hover:border-blue-600 transition-all"
                  />
                  <FiChevronDown 
                    size={16} 
                    className={`text-gray-600 transition-transform duration-200 ${
                      isProfileDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Profile Dropdown */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border border-gray-100 animate-fadeIn">
                    <button
                      onClick={() => handleNav("/profile")}
                      className="w-full px-4 py-2 text-left text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition flex items-center gap-2"
                    >
                      <FiUser size={16} />
                      My Profile
                    </button>
                    <button
                      onClick={() => handleNav("/wishlist")}
                      className="w-full px-4 py-2 text-left text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition flex items-center gap-2"
                    >
                      <FiBook size={16} />
                      Wishlist
                    </button>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 transition flex items-center gap-2"
                    >
                      <FiLogIn size={16} className="rotate-180" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-50 transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-3">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-gray-50"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </form>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg animate-slideDown">
          <div className="px-4 py-3 space-y-2">
            {/* Mobile Navigation Links */}
            <button
              onClick={() => handleNav("/")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive("/") ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"
              }`}
            >
              <FiHome size={18} />
              <span className="font-medium">Home</span>
            </button>
            
            <button
              onClick={() => handleNav("/books")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive("/books") ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"
              }`}
            >
              <FiBook size={18} />
              <span className="font-medium">Books</span>
            </button>
            
            <button
              onClick={() => handleNav("/categories")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive("/categories") ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"
              }`}
            >
              <FiGrid size={18} />
              <span className="font-medium">Categories</span>
            </button>
            
            <button
              onClick={() => handleNav("/contact")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive("/contact") ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"
              }`}
            >
              <FiMail size={18} />
              <span className="font-medium">Contact</span>
            </button>

            {/* Mobile Auth Section */}
            <div className="border-t border-gray-100 pt-2 mt-2">
              {!isLoggedIn ? (
                <div className="space-y-2">
                  <button
                    onClick={() => handleNav("/login")}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                  >
                    <FiLogIn size={18} />
                    Login
                  </button>
                  <button
                    onClick={() => handleNav("/signup")}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Sign Up
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                    <img src={profile} alt="profile" className="h-8 w-8 rounded-full" />
                    <div>
                      <p className="font-medium text-gray-800">My Account</p>
                      <p className="text-xs text-gray-500">View profile</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleNav("/profile")}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition"
                  >
                    <FiUser size={18} />
                    <span>My Profile</span>
                  </button>
                  
                  <button
                    onClick={() => handleNav("/wishlist")}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition"
                  >
                    <FiBook size={18} />
                    <span>Wishlist</span>
                  </button>
                  
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    <FiLogIn size={18} className="rotate-180" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add animation styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;