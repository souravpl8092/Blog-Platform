import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, updateUser } from "../redux/slices/userSlice";
import { fetchUserBlogs } from "../redux/slices/userBlogSlice";
import { editBlog, deleteBlog } from "../redux/slices/blogSlice";
import TAG_OPTIONS from "../constants/tagOptions";
import "../styles/Profile.css";

const Profile = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({ name: "", email: "" });
  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [editedTag, setEditedTag] = useState("");

  const {
    userInfo,
    status: userStatus,
    error: userError,
  } = useSelector((state) => state.user);

  const {
    blogs: userPosts,
    status: blogStatus,
    error: blogError,
  } = useSelector((state) => state.userBlog);

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchUserBlogs());
  }, [dispatch]);

  useEffect(() => {
    if (userInfo) {
      setFormData({ name: userInfo.name || "", email: userInfo.email || "" });
    }
  }, [userInfo]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(formData)).then(() => {
      // Refetch user and blogs after update
      dispatch(fetchUser());
      dispatch(fetchUserBlogs());
    });
  };

  const handleEdit = (id, currentTitle, currentContent, currentTag) => {
    setEditingId(id);
    setEditedTitle(currentTitle);
    setEditedContent(currentContent);
    setEditedTag(currentTag);
  };

  const handleDelete = (id) => {
    dispatch(deleteBlog(id)).then(() => {
      // Refetch blogs after delete
      dispatch(fetchUserBlogs());
    });
  };

  const handleSave = (id) => {
    if (editedTitle.trim() && editedContent.trim() && editedTag.trim()) {
      dispatch(
        editBlog({
          id,
          title: editedTitle,
          content: editedContent,
          tags: editedTag,
        })
      ).then(() => {
        // Refetch blogs after save
        dispatch(fetchUserBlogs());
      });

      setEditingId(null);
      setEditedTitle("");
      setEditedContent("");
      setEditedTag("");
    }
  };

  const renderLoadingSpinner = () => <div className="spinner"></div>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-avatar-container">
          <img
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
            alt="User"
            className="profile-avatar"
          />
        </div>
        <h2 className="profile-name">
          {userStatus === "loading"
            ? "Loading..."
            : userInfo?.name || "No Name"}
        </h2>
        <p className="profile-email">
          {userStatus === "loading"
            ? "Loading..."
            : userInfo?.email || "No Email"}
        </p>

        <form className="profile-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="update-btn"
            disabled={userStatus === "loading"}
          >
            {userStatus === "loading"
              ? renderLoadingSpinner()
              : "Update Profile"}
          </button>
        </form>

        {userError && <p className="error-message">{userError}</p>}
      </div>

      {/* User Posts Section */}
      <div className="posts-section">
        <h3>Your Posts</h3>

        {blogStatus === "loading" ? (
          <p>Loading blogs...</p>
        ) : blogError ? (
          <p className="error-message">{blogError}</p>
        ) : userPosts.length === 0 ? (
          <p>No blogs found.</p>
        ) : (
          <div className="posts-grid">
            {userPosts.map((blog, idx) => (
              <div key={idx} className="blog-card">
                {editingId === blog._id ? (
                  <div className="edit-form-container">
                    <input
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      placeholder="Edit Title"
                      className="edit-input"
                    />
                    <textarea
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                      placeholder="Edit Content"
                      className="edit-textarea"
                    />
                    <select
                      value={editedTag}
                      onChange={(e) => setEditedTag(e.target.value)}
                      className="edit-select"
                    >
                      <option value="">Select Tag</option>
                      {TAG_OPTIONS.map((tag) => (
                        <option key={tag} value={tag}>
                          {tag}
                        </option>
                      ))}
                    </select>
                    <div className="btn-container">
                      <button
                        onClick={() => handleSave(blog._id)}
                        className="save-button"
                      >
                        {blogStatus === "loading"
                          ? renderLoadingSpinner()
                          : "💾 Save"}
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="save-button"
                      >
                        ❌ Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h4 className="blog-title">{blog.title}</h4>
                    <div className="tags">
                      {Array.isArray(blog.tags)
                        ? blog.tags.map((tag, i) => (
                            <span key={i} className="tag">
                              #{tag}
                            </span>
                          ))
                        : blog.tags && (
                            <span className="tag">#{blog.tags}</span>
                          )}
                    </div>
                    <p className="blog-content">
                      <i>{blog.content}</i>
                    </p>
                  </>
                )}

                <div className="blog-actions">
                  <button
                    onClick={() =>
                      handleEdit(
                        blog._id,
                        blog.title,
                        blog.content,
                        Array.isArray(blog.tags)
                          ? blog.tags[0]
                          : blog.tags || ""
                      )
                    }
                    className="action-button"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="action-button"
                  >
                    {blogStatus === "loading"
                      ? renderLoadingSpinner()
                      : "🗑️ Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
