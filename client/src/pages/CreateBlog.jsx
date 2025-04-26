import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBlog } from "../redux/slices/blogSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TAG_OPTIONS from "../constants/tagOptions";
import "../styles/CreateBlog.css";

const CreateBlog = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTagClick = (tag) => {
    setSelectedTag((prev) => (prev === tag ? "" : tag));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim() && content.trim() && selectedTag) {
      setLoading(true);
      const newBlog = {
        title,
        content,
        tags: selectedTag,
      };
      try {
        await dispatch(addBlog(newBlog));
        setTitle("");
        setContent("");
        setSelectedTag("");
        toast.success("Blog created successfully!");
      } catch (error) {
        console.error(error);
        toast.error("Error creating blog. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Please fill all fields and select a tag!");
    }
  };

  return (
    <div className="create-blog-container">
      <h2>Create a New Blog Post</h2>
      <form onSubmit={handleSubmit} className="create-blog-form">
        <input
          type="text"
          placeholder="Enter Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Write your content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <div className="tags-container">
          <p>Select One Tag:</p>
          <div className="tags-list">
            {TAG_OPTIONS.map((tag, idx) => (
              <button
                key={idx}
                type="button"
                className={`tag-button ${
                  selectedTag === tag ? "selected" : ""
                }`}
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <button type="submit" className="create-blog-button" disabled={loading}>
          {loading ? <div className="spinner"></div> : "🚀 Publish Blog"}
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
