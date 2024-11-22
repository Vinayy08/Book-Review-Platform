import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BookDetailsPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/books/${id}`).then((response) => setBook(response.data));
  }, [id]);

  if (!book) return(
    <p>Loading...</p>
  )

  return(
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{book.title}</h1>
      <p className="text-gray-600">{book.author}</p>
      <p className="mt-4">{book.description}</p>
    </div>
  );
};

export default BookDetailsPage;
