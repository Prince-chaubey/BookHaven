import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import profileImg from "../../assets/people.png";
import Layout from "../../Layout/Layout";
import axios from "axios";

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

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 pt-24 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow">

          <div className="flex items-center gap-6 p-6 border-b">
            <img
              src={profileImg}
              alt="profile"
              className="w-20 h-20 rounded-full border"
            />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                {userDetails.fullname}
              </h2>
              <p className="text-gray-500">{userDetails.email}</p>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-500">Member Since</span>
              <span className="font-medium text-gray-800">
                {new Date(userDetails.joined).toDateString()}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Account Type</span>
              <span className="font-medium text-gray-800">Reader</span>
            </div>
          </div>

          <div className="p-6 border-t flex gap-4">
            <button
              onClick={() => navigate("/edit-profile")}
              className="flex-1 py-2 border border-blue-600 text-blue-600 rounded-lg cursor-pointer"
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