import React, { useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import Signup from "./Components/Signup/signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Login from "./Components/Login/Login";
import ContextStore from "./context/contextStore";
import "./App.css"
import Profile from "./Components/Profile/Profile";
const App = () => {
  const [token,setToken]=useState();
  

  return (
    <BrowserRouter>
     <ContextStore.Provider value={{token, setToken}}>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/" element={<Home />} />
      </Routes>
      <ToastContainer />
      </ContextStore.Provider>
    </BrowserRouter>
  );
};

export default App;
