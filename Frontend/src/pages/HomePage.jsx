import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../features/books/booksSlice";
import BookCard from "../components/BookCard";

const HomePage = () => {
  const dispatch = useDispatch();
  const { books, status } = useSelector((state) => state.books);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBooks());
    }
  }, [status, dispatch]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Featured Books</h1>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Failed to load books.</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {books?.slice(0, 6).map((book,index) => (
          <BookCard key={index} book={book} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
