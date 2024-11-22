import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  books: [],
  status: "idle",
  error: null,
};

// Async Thunk for fetching books
export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const response = await axios.get("http://localhost:5000/books");
  return response.data;
});

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default booksSlice.reducer;
