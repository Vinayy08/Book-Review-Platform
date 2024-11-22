import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchReviews, submitReview } from "./reviewsAPI";

// Initial state for reviews
const initialState = {
  reviews: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Thunk to fetch reviews for a book
export const getReviewsForBook = createAsyncThunk(
  "reviews/getReviewsForBook",
  async (bookId, { rejectWithValue }) => {
    try {
      const reviews = await fetchReviews(bookId);
      return reviews;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to submit a new review
export const addReview = createAsyncThunk(
  "reviews/addReview",
  async (reviewData, { rejectWithValue }) => {
    try {
      const newReview = await submitReview(reviewData);
      return newReview;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Reviews slice
const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    clearReviews: (state) => {
      state.reviews = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle getReviewsForBook
      .addCase(getReviewsForBook.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getReviewsForBook.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.reviews = action.payload;
      })
      .addCase(getReviewsForBook.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Handle addReview
      .addCase(addReview.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.reviews.push(action.payload); // Add new review to the list
      })
      .addCase(addReview.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { clearReviews } = reviewsSlice.actions;

export default reviewsSlice.reducer;
