import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import BookListPage from "./pages/BookListPage";
import BookDetailsPage from "./pages/BookDetailsPage";
import UserProfilePage from "./pages/UserProfilePage";
import RegisterPage from "./pages/Register";

const App = () => {
  return (
      <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books" element={<BookListPage />} />
        <Route path="/books/:id" element={<BookDetailsPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/register" element={<RegisterPage/>} />
      </Routes>
      </div>
  );
};

export default App;
