import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getBlogs,
  toggleLike,
  addComment,
  updateBlog,
  removeBlog,
  createBlog,
} from "../../api/blogApi";

const initialState = {
  blogs: [],
  status: "idle",
  error: null,
};

export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", getBlogs);
export const likeBlog = createAsyncThunk("blogs/likeBlog", toggleLike);
export const commentBlog = createAsyncThunk("blogs/commentBlog", addComment);
export const editBlog = createAsyncThunk("blogs/editBlog", updateBlog);
export const deleteBlog = createAsyncThunk("blogs/deleteBlog", removeBlog);
export const addBlog = createAsyncThunk("blogs/addBlog", async (blogData) => {
  return await createBlog(blogData);
});

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // ✅ Handle blog creation
      .addCase(addBlog.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addBlog.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.blogs.unshift(action.payload); // Add new blog at top
      })
      .addCase(addBlog.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(likeBlog.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.blogs.findIndex((b) => b.id === updated.id);
        if (index !== -1) {
          state.blogs[index] = updated;
        }
      })

      .addCase(commentBlog.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.blogs.findIndex((b) => b.id === updated.id);
        if (index !== -1) {
          state.blogs[index] = updated;
        }
      })

      .addCase(editBlog.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.blogs.findIndex((b) => b.id === updated.id);
        if (index !== -1) {
          state.blogs[index] = updated;
        }
      })

      .addCase(deleteBlog.fulfilled, (state, action) => {
        const id = action.payload.id || action.meta.arg;
        state.blogs = state.blogs.filter((b) => b.id !== id);
      });
  },
});

export default blogSlice.reducer;
