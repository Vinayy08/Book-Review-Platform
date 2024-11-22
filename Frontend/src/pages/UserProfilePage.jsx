import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, updateUserProfile } from "../features/users/usersSlice";

const UserProfilePage = () => {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.users);
  const [formData, setFormData] = useState({ username: "", email: "" });

  useEffect(() => {
    dispatch(fetchUserProfile(user._id));
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormData({ username: user.username, email: user.email });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(formData));
  };

  if (status === "loading") return <p>Loading profile...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>

      <form onSubmit={handleFormSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="border p-2 w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UserProfilePage;
