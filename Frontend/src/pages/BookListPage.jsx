import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../features/books/booksSlice";
import { Link } from "react-router-dom";

const BookListPage = () => {
  const dispatch = useDispatch();
  const { books, status, error } = useSelector((state) => state.books);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  if (status === "loading") return <p>Loading books...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Book List</h1>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search books..."
          className="border p-2 w-full"
        />
      
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredBooks.map((book) => (
          <Link to={`/books/${book._id}`} key={book._id} className="border p-4 hover:shadow-lg">
            <h2 className="font-bold text-lg">{book.title}</h2>
            <p className="text-sm text-gray-500">{book.author}</p>
            <p className="text-sm text-gray-400">{book.genre}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BookListPage;
