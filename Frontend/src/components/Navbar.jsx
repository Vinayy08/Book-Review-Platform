import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Book Review</Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-gray-200">Home</Link>
          <Link to="/books" className="hover:text-gray-200">Books</Link>
          <Link to="/profile" className="hover:text-gray-200">Profile</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
