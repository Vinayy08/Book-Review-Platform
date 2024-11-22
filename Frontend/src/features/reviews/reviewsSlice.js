import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base API URL
const API_URL = "http://localhost:5000/reviews";

// Async Thunks

// Fetch reviews for a specific book
export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async (bookId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}?bookId=${bookId}`);
      return response.data; // Expected to return an array of reviews
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch reviews");
    }
  }
);

// Submit a new review
export const submitReview = createAsyncThunk(
  "reviews/submitReview",
  async ({ bookId, reviewData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}`, { bookId, ...reviewData });
      return response.data; // Expected to return the created review
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to submit review");
    }
  }
);

// Slice
const reviewsSlice = createSlice({
  name: "reviews",
  initialState: {
    reviews: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Reviews
      .addCase(fetchReviews.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.reviews = action.payload;
        state.error = null;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Submit Review
      .addCase(submitReview.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(submitReview.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.reviews.push(action.payload); // Add the new review to the list
        state.error = null;
      })
      .addCase(submitReview.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

// Export Reducer
export default reviewsSlice.reducer;
