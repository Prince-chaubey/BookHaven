import React from "react";
import { useNavigate } from "react-router-dom";
import profileImg from "../../assets/people.png";
import Layout from "../../Layout/Layout";

const Profile = () => {
  const navigate = useNavigate();

  const user = {
    name: "Ashish",
    email: "ashish@email.com",
    joined: "March 2026",
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
      <Layout>
            <div className="min-h-screen bg-gray-100 pt-24 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow">
        
        {/* Header */}
        <div className="flex items-center gap-6 p-6 border-b">
          <img
            src={profileImg}
            alt="profile"
            className="w-20 h-20 rounded-full border"
          />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {user.name}
            </h2>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>

        {/* Info */}
        <div className="p-6 space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-500">Member Since</span>
            <span className="font-medium text-gray-800">{user.joined}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Account Type</span>
            <span className="font-medium text-gray-800">Reader</span>
          </div>
        </div>


        <div className="p-6 border-t flex gap-4">
          <button
            onClick={() => navigate("/edit-profile")}
            className="flex-1 py-2 border border-blue-600 text-blue-600 rounded-lg  cursor-pointer "
          >
            Edit Profile
          </button>

          <button
            onClick={handleLogout}
            className="cursor-pointer flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
      </Layout>
  );
};

export default Profile;