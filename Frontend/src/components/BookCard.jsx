import React from "react";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <h2 className="text-xl font-bold">{book.title}</h2>
      <p className="text-gray-600">{book.author}</p>
      <p className="text-sm text-gray-500">{book.description.slice(0, 100)}...</p>
      <Link to={`/books/${book._id}`} className="text-blue-500 mt-2 inline-block">
        Read More
      </Link>
    </div>
  );
};

export default BookCard;
