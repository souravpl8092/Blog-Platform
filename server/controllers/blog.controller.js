const Blog = require("../model/blog.model");

// Create blog
const createBlog = async (req, res) => {
  const { title, content, tags } = req.body;

  try {
    const blog = new Blog({
      title,
      content,
      tags,
      createdBy: req.user.id,
    });
    await blog.save();

    res.status(201).json({ message: "Blog post created successfully", blog });
  } catch (error) {
    res.status(500).json({ message: "Error creating blogs" });
  }
};

// Get all blogs list
const getAllBlog = async (req, res) => {
  try {
    const blogs = await Blog.find({}).populate("createdBy", "username email");
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs" });
  }
};

const getUserBlogs = async (req, res) => {
  try {
    const userId = req.user.id;

    const blogs = await Blog.find({ createdBy: userId }).sort({
      createdAt: -1,
    });

    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching user's blogs:", error);
    res.status(500).json({ message: "Error fetching user blogs" });
  }
};

// Update a blog post by ID
const updateBlog = async (req, res) => {
  const { title, content, tags } = req.body;
  try {
    const blogId = req.params.id;
    const userId = req.user.id;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    if (blog.createdBy.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this blog" });
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.tags = tags || blog.tags;

    await blog.save();

    res.status(200).json({ message: "Blog post updated successfully", blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating blogs" });
  }
};

// Delete a blog post by ID
const deleteBlog = async (req, res) => {
  const blogId = req.params.id;

  try {
    const userId = req.user.id;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    if (blog.createdBy.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this blog" });
    }

    await Blog.findByIdAndDelete(blogId);
    res.status(200).json({ message: "Blog post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting blogs" });
  }
};

// Like a blog post by ID
const blogLikes = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    const userId = req.user.id;
    const alreadyLiked = blog.likes.includes(userId);

    if (alreadyLiked) {
      blog.likes = blog.likes.filter((id) => id.toString() !== userId);
    } else {
      blog.likes.push(userId);
    }

    await blog.save();

    res.status(200).json({ message: "Post liked successfully", blog });
  } catch (error) {
    console.error("Error liking blog:", error);
    res.status(500).json({ message: "Error liking blogs" });
  }
};

//Add comment to blog post by ID
const blogComments = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    const { comment } = req.body;
    if (!comment) {
      return res.status(400).json({ message: "Comment is required" });
    }

    const newComment = {
      commentedBy: req.user.userId,
      comment: comment,
    };

    blog.comments.push(newComment);
    await blog.save();

    res.status(200).json({ message: "Comment added successfully", blog });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Error commenting blogs" });
  }
};

module.exports = {
  getAllBlog,
  getUserBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  blogLikes,
  blogComments,
};
