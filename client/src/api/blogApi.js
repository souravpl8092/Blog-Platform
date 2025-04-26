import axios from "../utils/axiosConfig";

export const getBlogs = async () => {
  const res = await axios.get("/blog/all");
  return res.data;
};

export const createBlog = async (blogData) => {
  const res = await axios.post("/blog", blogData);
  return res.data;
};

export const toggleLike = async (id) => {
  const res = await axios.put(`/blog/like/${id}`);
  return res.data;
};

export const addComment = async ({ id, comment }) => {
  const res = await axios.put(`/blog/comment/${id}`, { comment });
  return res.data;
};

export const updateBlog = async ({ id, title, content, tags }) => {
  const res = await axios.patch(`/blog/${id}`, { title, content, tags });
  return res.data;
};

export const removeBlog = async (id) => {
  const res = await axios.delete(`/blog/${id}`);
  console.log(id, "line 30");
  return res.data;
};
