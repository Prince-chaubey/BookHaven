import React, { useState } from "react";
import Layout from "../../Layout/Layout";
import { toast } from "react-toastify";

const Signup = () => {
  const [formData, setformData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.fullname.trim().length === 0) {
      toast.error("Please enter Fullname");
      return;
    }

    if (formData.email.trim().length === 0) {
      toast.error("Please enter Email");
      return;
    }

   
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email.trim())) {
      toast.error("Please enter a valid Email");
      return;
    }

    if (formData.password.trim().length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (formData.password.trim() !== formData.confirmPassword.trim()) {
      toast.error("Passwords do not match");
      return;
    }

    toast.success("Signup Successful");
    console.log(formData);
  };
  return (
    <Layout>
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 w-[90%] max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">
            Create Account
          </h2>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              value={formData.fullname}
              name="fullname"
              className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
              onChange={handleChange}
            />

            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              name="email"
              className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
              onChange={handleChange}
            />

            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              name="password"
              className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
              onChange={handleChange}
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              name="confirmpassword"
              className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
              onChange={handleChange}
            />

            <button
              type="submit"
              className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 cursor-pointer"
            >
              Sign Up
            </button>
          </form>
          <p className="m-1">Already have an account? <a href="/login" className="text-blue-600">Login</a> </p>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
