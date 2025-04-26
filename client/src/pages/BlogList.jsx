import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlogs, likeBlog, commentBlog } from "../redux/slices/blogSlice";
import "../styles/BlogList.css";

const BlogList = () => {
  const dispatch = useDispatch();
  const { blogs, status, error } = useSelector((state) => state.blog);

  const [commentInputs, setCommentInputs] = useState({});
  const [selectedTag, setSelectedTag] = useState("All");
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const [initialLoading, setInitialLoading] = useState(true); // State for initial loading

  useEffect(() => {
    // Fetch blogs when the component mounts
    dispatch(fetchBlogs());
  }, [dispatch]);

  useEffect(() => {
    // Once blogs are fetched, set initial loading to false
    if (status !== "loading" && blogs.length > 0) {
      setInitialLoading(false);
    }
  }, [status, blogs]);

  const handleLike = async (id) => {
    setActionLoadingId(id);
    await dispatch(likeBlog(id));
    await dispatch(fetchBlogs()); // Refresh data
    setActionLoadingId(null);
  };

  const handleAddComment = async (id, comment) => {
    if (comment.trim()) {
      setActionLoadingId(id);
      await dispatch(commentBlog({ id, comment }));
      setCommentInputs((prev) => ({ ...prev, [id]: "" }));
      await dispatch(fetchBlogs()); // Refresh data
      setActionLoadingId(null);
    }
  };

  const handleTagFilter = (tag) => {
    setSelectedTag(tag);
  };

  const filteredBlogs =
    selectedTag === "All"
      ? blogs
      : blogs.filter((blog) => (blog.tags || []).includes(selectedTag));

  const sortedBlogs = [...filteredBlogs].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const allTags = ["All", ...new Set(blogs.flatMap((blog) => blog.tags || []))];

  const renderLoadingSpinner = () => <div className="spinner"></div>;

  const renderPageLoadingSpinner = () => (
    <div className="page-spinner-container">
      <div className="page-spinner"></div>
      <p>Loading blogs...</p>
    </div>
  );

  return (
    <div className="blog-page">
      <h1 className="blog-heading">Explore Inspiring Stories</h1>
      <p className="blog-subheading">
        Dive into a world of technology, health, food, and more!
      </p>
      {initialLoading && renderPageLoadingSpinner()}{" "}
      {/* Show spinner while initial data loads */}
      <div className="tag-filter">
        {allTags.map((tag, index) => (
          <button
            key={index}
            className={`tag-button ${selectedTag === tag ? "active" : ""}`}
            onClick={() => handleTagFilter(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      {status === "loading" && !initialLoading && (
        <p className="status-message">🔄 Loading blogs...</p>
      )}
      {status === "failed" && (
        <p className="status-message error">❌ {error}</p>
      )}
      {status === "succeeded" && (
        <div className="blog-list">
          {sortedBlogs.map((blog) => (
            <div key={blog._id} className="blog-card">
              <h4 className="blog-title">{blog.title}</h4>
              <div className="tags">
                <span className="tag">#{blog.tags || ""}</span>
              </div>
              <p className="blog-content">
                <i>{blog.content}</i>
              </p>

              <div className="blog-actions">
                <button
                  onClick={() => handleLike(blog._id)}
                  className="action-button"
                  disabled={actionLoadingId === blog._id}
                >
                  {actionLoadingId === blog._id
                    ? renderLoadingSpinner()
                    : `👍 ${blog.likes?.length || 0} Like${
                        blog.likes?.length === 1 ? "" : "s"
                      }`}
                </button>
              </div>

              <div className="comment-section">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={commentInputs[blog._id] || ""}
                  onChange={(e) =>
                    setCommentInputs((prev) => ({
                      ...prev,
                      [blog._id]: e.target.value,
                    }))
                  }
                  className="comment-input"
                />
                <button
                  onClick={() =>
                    handleAddComment(blog._id, commentInputs[blog._id] || "")
                  }
                  className="comment-button"
                  disabled={actionLoadingId === blog._id}
                >
                  {actionLoadingId === blog._id
                    ? renderLoadingSpinner()
                    : `💬 ${blog.comments?.length || 0} Comment${
                        blog.comments?.length === 1 ? "" : "s"
                      }`}
                </button>

                <div className="comments-list">
                  {(blog.comments || []).map((cmt, idx) => (
                    <p key={idx} className="comment-text">
                      💬 {cmt.comment}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;
