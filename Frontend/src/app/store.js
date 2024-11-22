import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "../features/books/booksSlice";
import reviewsReducer from "../features/reviews/reviewsSlice";
import userReducer from '../features/users/usersSlice'

export const store = configureStore({
  reducer: {
    books: booksReducer,
    reviews: reviewsReducer,
    users:userReducer,
  },
});
