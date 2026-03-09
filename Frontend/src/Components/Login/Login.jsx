import React, { useContext, useState } from "react";
import Layout from "../../Layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import ContextStore from "../../context/contextStore";
import { FiMail, FiLock, FiBookOpen, FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
  const { setToken } = useContext(ContextStore);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.email.trim().length === 0) {
      toast.error("Please enter Email");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email.trim())) {
      toast.error("Please enter a valid Email");
      return;
    }

    if (formData.password.trim().length === 0) {
      toast.error("Please enter Password");
      return;
    }

    if (formData.password.trim().length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    
    try {
      const res = await axios.post("http://localhost:8080/user/login", {
        email: formData.email,
        password: formData.password,
      });
      
      toast.success(res.data.message);
      setFormData({
        email: "",
        password: "",
      });

      localStorage.setItem("token", res.data.token);
      setToken(localStorage.getItem("token"));

      navigate("/");
    } catch (error) {
      console.log(error.response);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-white flex items-center justify-center px-4 py-20">
        {/* Decorative elements matching footer style */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full opacity-20 blur-3xl"></div>
        </div>

        <div className="max-w-md w-full relative">
          {/* Brand Header - matching navbar style */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <FiBookOpen className="text-blue-600 text-3xl" />
              <h1 className="text-3xl font-bold text-gray-800">BookHeaven</h1>
            </div>
            <p className="text-gray-600">Welcome back! Please login to your account</p>
          </div>

          {/* Login Card - matching profile card style */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* Card Header with gradient - matching profile cover */}
            <div className="h-2 bg-gradient-to-r from-blue-600 to-blue-400"></div>
            
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Login</h2>

              <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                {/* Email Input - matching navbar input style */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="text-gray-400" size={18} />
                    </div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-gray-50"
                    />
                  </div>
                </div>

               
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="text-gray-400" size={18} />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-gray-50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    >
                      {showPassword ? (
                        <FiEyeOff className="text-gray-400 hover:text-gray-600" size={18} />
                      ) : (
                        <FiEye className="text-gray-400 hover:text-gray-600" size={18} />
                      )}
                    </button>
                  </div>
                </div>

               
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                    className="text-sm text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Login Button - matching navbar button style */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </button>

                {/* Sign Up Link - matching footer link style */}
                <div className="text-center mt-4">
                  <p className="text-gray-600 text-sm">
                    Don't have an account?{" "}
                    <Link 
                      to="/signup" 
                      className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                    >
                      Sign up here
                    </Link>
                  </p>
                </div>
              </form>

             

            
            </div>
          </div>

          {/* Footer Note - matching footer style */}
          <p className="text-center text-xs text-gray-500 mt-6">
            By logging in, you agree to our{' '}
            <button className="text-blue-600 hover:underline cursor-pointer">Terms of Service</button>
            {' '}and{' '}
            <button className="text-blue-600 hover:underline cursor-pointer">Privacy Policy</button>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Login;