import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import profileImg from "../../assets/people.png";
import Layout from "../../Layout/Layout";
import axios from "axios";
import { 
  FiMail, 
  FiCalendar, 
  FiBookOpen, 
  FiAward,
  FiClock,
  FiHeart,
  FiBookmark,
  FiSettings,
  FiLogOut,
  FiEdit2,
  FiStar
} from "react-icons/fi";

const Profile = () => {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    fullname: "",
    email: "",
    joined: "",
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:8080/user/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setUserDetails(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err); 
      }
    };

    fetchProfile();
  }, []);

  // Calculate member duration
  const getMemberDuration = () => {
    if (!userDetails.joined) return "";
    const joinDate = new Date(userDetails.joined);
    const now = new Date();
    const diffTime = Math.abs(now - joinDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffMonths / 12);

    if (diffYears > 0) {
      return `${diffYears} ${diffYears === 1 ? 'year' : 'years'}`;
    } else if (diffMonths > 0) {
      return `${diffMonths} ${diffMonths === 1 ? 'month' : 'months'}`;
    } else {
      return `${diffDays} ${diffDays === 1 ? 'day' : 'days'}`;
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 pt-24 px-4 pb-12">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header Card - Matching navbar white with shadow */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
            {/* Cover Photo with BookHeaven blue gradient */}
            <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-400 relative">
              <div className="absolute inset-0 bg-black opacity-10"></div>
            </div>

            {/* Profile Info Section */}
            <div className="relative px-6 pb-6">
              {/* Avatar - matching navbar profile style */}
              <div className="flex justify-between items-start -mt-12 mb-4">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
                    <img
                      src={profileImg}
                      alt="profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button 
                    onClick={() => navigate("/edit-profile")}
                    className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 rounded-full shadow-lg hover:bg-blue-700 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                  >
                    <FiEdit2 size={14} />
                  </button>
                </div>
                
                {/* Quick stats badges */}
                <div className="flex gap-2 mt-12">
                  <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <FiStar className="text-yellow-400" size={12} />
                    Book Lover
                  </span>
                  <span className="bg-purple-50 text-purple-600 px-3 py-1 rounded-full text-xs font-medium">
                    Premium
                  </span>
                </div>
              </div>

              {/* User Info - matching navbar text style */}
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  {userDetails.fullname || "Loading..."}
                </h2>
                <div className="flex items-center gap-2 text-gray-600 mt-1">
                  <FiMail size={16} className="text-gray-400" />
                  <p className="text-sm">{userDetails.email || "Loading..."}</p>
                </div>
              </div>

              {/* Stats Grid - matching footer card style */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                      <FiCalendar size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">MEMBER SINCE</p>
                      <p className="text-sm font-semibold text-gray-800">
                        {userDetails.joined ? new Date(userDetails.joined).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        }) : "Loading..."}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 text-purple-600 p-2 rounded-lg">
                      <FiClock size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">MEMBER FOR</p>
                      <p className="text-sm font-semibold text-gray-800">
                        {getMemberDuration() || "Loading..."}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 text-green-600 p-2 rounded-lg">
                      <FiBookOpen size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">BOOKS READ</p>
                      <p className="text-sm font-semibold text-gray-800">24 this year</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Activity & Stats */}
            <div className="lg:col-span-2 space-y-6">
              {/* Recent Activity Card */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FiBookOpen className="text-blue-600" />
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FiBookOpen className="text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">Started reading "The Great Gatsby"</p>
                      <p className="text-xs text-gray-500">2 days ago</p>
                    </div>
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">In Progress</span>
                  </div>
                  
                  <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <FiAward className="text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">Completed reading challenge</p>
                      <p className="text-xs text-gray-500">1 week ago</p>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">Completed</span>
                  </div>

                  <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <FiStar className="text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">Left a review on "1984"</p>
                      <p className="text-xs text-gray-500">2 weeks ago</p>
                    </div>
                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">Review</span>
                  </div>
                </div>
              </div>

              {/* Reading Stats Card */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Reading Progress</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Yearly Goal</span>
                      <span className="font-medium text-gray-800">24/30 books</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{width: '80%'}}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">This Month</span>
                      <span className="font-medium text-gray-800">4 books</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-purple-600 h-2.5 rounded-full" style={{width: '40%'}}></div>
                    </div>
                  </div>
                </div>

                {/* Favorite Genres */}
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Favorite Genres</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">Fiction</span>
                    <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-medium">Science Fiction</span>
                    <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-medium">Mystery</span>
                    <span className="px-3 py-1 bg-yellow-50 text-yellow-600 rounded-full text-xs font-medium">Fantasy</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Quick Actions & Info */}
            <div className="space-y-6">
              {/* Quick Actions Card - matching footer dark style but lighter */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button 
                    onClick={() => navigate("/wishlist")}
                    className="w-full flex items-center gap-3 p-3 text-left bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                  >
                    <div className="w-8 h-8 bg-red-100 text-red-600 rounded-lg flex items-center justify-center">
                      <FiHeart size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Wishlist</p>
                      <p className="text-xs text-gray-500">12 items</p>
                    </div>
                  </button>

                  <button 
                    onClick={() => navigate("/bookmarks")}
                    className="w-full flex items-center gap-3 p-3 text-left bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                  >
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                      <FiBookmark size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Bookmarks</p>
                      <p className="text-xs text-gray-500">8 saved books</p>
                    </div>
                  </button>

                  <button 
                    onClick={() => navigate("/settings")}
                    className="w-full flex items-center gap-3 p-3 text-left bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                  >
                    <div className="w-8 h-8 bg-gray-200 text-gray-600 rounded-lg flex items-center justify-center">
                      <FiSettings size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Account Settings</p>
                      <p className="text-xs text-gray-500">Manage preferences</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Reading Challenge Card */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl shadow-md p-6 text-white">
                <div className="flex items-center gap-3 mb-3">
                  <FiAward size={24} />
                  <h3 className="text-lg font-semibold">Reading Challenge</h3>
                </div>
                <p className="text-blue-100 text-sm mb-4">You're 80% to your goal!</p>
                <div className="w-full bg-blue-300/30 rounded-full h-2.5 mb-4">
                  <div className="bg-white h-2.5 rounded-full" style={{width: '80%'}}></div>
                </div>
                <button className="w-full bg-white/20 hover:bg-white/30 text-white py-2 rounded-lg transition text-sm font-medium cursor-pointer">
                  View Details
                </button>
              </div>

              {/* Action Buttons - matching navbar button style */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <button
                  onClick={() => navigate("/edit-profile")}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all mb-3 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FiEdit2 size={18} />
                  Edit Profile
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all border border-gray-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FiLogOut size={18} />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;