import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import blogReducer from "./slices/blogSlice";
import userBlogReducer from "./slices/userBlogSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    blog: blogReducer,
    userBlog: userBlogReducer,
  },
});
