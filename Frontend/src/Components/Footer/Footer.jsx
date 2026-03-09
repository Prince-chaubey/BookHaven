import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const go = (path) => navigate(path);

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">
        
        
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">BookHeaven</h2>
          <p className="text-sm leading-6">
            Discover your next favorite book.  
            Explore categories, trending titles, and timeless classics —
            all in one place.
          </p>
        </div>

      
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li onClick={() => go("/")} className="hover:text-white cursor-pointer">Home</li>
            <li onClick={() => go("/books")} className="hover:text-white cursor-pointer">Books</li>
            <li onClick={() => go("/categories")} className="hover:text-white cursor-pointer">Categories</li>
            <li onClick={() => go("/contact")} className="hover:text-white cursor-pointer">Contact</li>
          </ul>
        </div>

      
        <div>
          <h3 className="text-white font-semibold mb-4">Account</h3>
          <ul className="space-y-2 text-sm">
            <li onClick={() => go("/profile")} className="hover:text-white cursor-pointer">My Profile</li>
            <li onClick={() => go("/orders")} className="hover:text-white cursor-pointer">My Orders</li>
            <li onClick={() => go("/wishlist")} className="hover:text-white cursor-pointer">Wishlist</li>
            <li onClick={() => go("/login")} className="hover:text-white cursor-pointer">Login</li>
          </ul>
        </div>

       
        <div>
          <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
          <p className="text-sm mb-4">Get updates on new arrivals and offers.</p>
          
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-l-lg text-gray-800 outline-none"
            />
            <button className="bg-blue-600 px-4 rounded-lg text-white hover:bg-blue-700 cursor-pointer">
              Subscribe
            </button>
          </div>
        </div>
      </div>

     
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>© {new Date().getFullYear()} BookHeaven. All rights reserved.</p>
          <div className="flex gap-6 mt-2 md:mt-0">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span className="hover:text-white cursor-pointer">Help</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;