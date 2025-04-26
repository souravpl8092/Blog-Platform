import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserBlogsAPI } from "../../api/userBlogApi";

export const fetchUserBlogs = createAsyncThunk(
  "userBlogs/fetchUserBlogs",
  async (_, thunkAPI) => {
    try {
      return await fetchUserBlogsAPI();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed");
    }
  }
);

const userBlogSlice = createSlice({
  name: "userBlog",
  initialState: {
    blogs: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchUserBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userBlogSlice.reducer;
