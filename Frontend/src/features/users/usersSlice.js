import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base API URL
const API_URL = "http://localhost:5000/users";

// Async Thunks

// Fetch user profile by ID
export const fetchUserProfile = createAsyncThunk(
  "users/fetchUserProfile",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch user profile");
    }
  }
);

// Update user profile
export const updateUserProfile = createAsyncThunk(
  "users/updateUserProfile",
  async ({ userId, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${userId}`, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update user profile");
    }
  }
);

// Register a new user
export const registerUser = createAsyncThunk(
    "users/registerUser",
    async (userData, { rejectWithValue }) => {
      try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data; // Expected to return user details
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to register user");
      }
    }
  );

// Slice
const usersSlice = createSlice({
  name: "users",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch User Profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Update User Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

// Export Reducer
export default usersSlice.reducer;
