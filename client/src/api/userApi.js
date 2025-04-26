import axios from "../utils/axiosConfig";

// Fetch user profile
export const getUserProfile = async () => {
  const response = await axios.get("/user");
  return response.data;
};

// Update user profile
export const updateUserProfile = async (userData) => {
  const response = await axios.put("/user", userData);
  return response.data;
};

export const fetchUserBlogsAPI = async () => {
  const res = await axios.get("/blog/getBlogByUser");
  return res.data;
};
