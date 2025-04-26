const express = require("express");
const blogRouter = express.Router();
const authMiddleware = require("../middleware/authenticate.middleware");
const {
  getAllBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  blogLikes,
  blogComments,
  getUserBlogs,
} = require("../controllers/blog.controller");

blogRouter.use(authMiddleware);
blogRouter.route("/").get(getUserBlogs).post(createBlog);
blogRouter.route("/:id").patch(updateBlog).delete(deleteBlog);
blogRouter.route("/all").get(getAllBlog);
blogRouter.route("/like/:id").put(blogLikes);
blogRouter.route("/comment/:id").put(blogComments);

module.exports = blogRouter;
