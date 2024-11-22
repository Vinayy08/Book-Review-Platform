import axios from "axios";

// Base URL for the API (Update with your backend URL if necessary)
const API_URL = "/api/reviews";

// Fetch reviews for a specific book
export const fetchReviews = async (bookId) => {
  try {
    const response = await axios.get(`${API_URL}?bookId=${bookId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch reviews");
  }
};

// Submit a new review
export const submitReview = async (reviewData) => {
  try {
    const response = await axios.post(API_URL, reviewData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to submit review");
  }
};
