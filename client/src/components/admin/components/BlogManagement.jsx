import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/main.css';

const BlogManagement = () => {
  const existingCategories = [
    'AI & IT Services',
    'Digital Commerce',
    'Financial Service',
    'Spiritual Ecosystem'
  ];

  const [blogPosts, setBlogPosts] = useState([]);
  const [formData, setFormData] = useState({
    _id: null,
    title: '',
    shortDescription: '',
    description: '',
    author: '',
    status: 'Draft',
    date: '',
    photo: '',
    tag: '',
    category: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

  // ✅ Fetch all blogs (Draft + Published) for admin
  useEffect(() => {
    axios
      .get('http://localhost:5050/api/blogs?all=true')
      .then((res) => setBlogPosts(res.data))
      .catch((err) => console.error('Error fetching blogs:', err));
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: 'success' }), 5000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'tag') {
      const formatted = value.startsWith('#') ? value : `#${value}`;
      setFormData((prev) => ({ ...prev, tag: formatted }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = ['title', 'shortDescription', 'description', 'author', 'date', 'category', 'status'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      console.error("❌ Missing required fields:", missingFields);
      showNotification(`Missing required fields: ${missingFields.join(', ')}`, 'error');
      return;
    }
    
    try {
      console.log("🔄 Starting blog save/update operation...");
      console.log("📝 Form data:", {
        isEditing,
        _id: formData._id,
        title: formData.title,
        author: formData.author,
        status: formData.status,
        category: formData.category
      });

      let response;
      if (isEditing && formData._id) {
        console.log("📝 Updating existing blog...");
        response = await axios.put(`http://localhost:5050/api/blogs/${formData._id}`, formData);
        showNotification('Blog updated successfully!');
      } else {
        console.log("📝 Creating new blog...");
        response = await axios.post('http://localhost:5050/api/blogs', formData);
        showNotification('Blog created successfully!');
      }

      console.log("✅ Server response:", response.data);
      const saved = response.data;
      
      // Update local state
      const updatedList = isEditing
        ? blogPosts.map((post) => (post._id === saved._id ? saved : post))
        : [saved, ...blogPosts];

      console.log("📊 Updating local state with", updatedList.length, "blogs");
      setBlogPosts(updatedList);
      resetForm();
      
      // Refresh the list from server to ensure consistency
      setTimeout(async () => {
        try {
          console.log("🔄 Refreshing blog list from server...");
          const refreshResponse = await axios.get('http://localhost:5050/api/blogs?all=true');
          console.log("📊 Refreshed list has", refreshResponse.data.length, "blogs");
          setBlogPosts(refreshResponse.data);
        } catch (refreshError) {
          console.error("❌ Error refreshing blog list:", refreshError);
        }
      }, 1000);
      
    } catch (error) {
      console.error("❌ Error saving blog:", error);
      console.error("❌ Error details:", error.response?.data);
      showNotification(`Failed to save blog: ${error.response?.data?.error || error.message}`, 'error');
    }
  };

  const handleEdit = (post) => {
    setFormData(post);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this blog?');
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:5050/api/blogs/${id}`);
        setBlogPosts(blogPosts.filter((post) => post._id !== id));
        showNotification('Blog deleted successfully! Note: Frontend will need to be refreshed to see changes.');
      } catch (error) {
        console.error('Error deleting blog:', error);
        showNotification('Failed to delete blog', 'error');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      _id: null,
      title: '',
      shortDescription: '',
      description: '',
      author: '',
      status: 'Draft',
      date: '',
      photo: '',
      tag: '',
      category: ''
    });
    setIsEditing(false);
    setShowForm(false);
  };

  return (
    <div className="content-section">
      {/* Notification */}
      {notification.show && (
        <div className={`notification ${notification.type}`} style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          padding: '12px 20px',
          borderRadius: '8px',
          color: 'white',
          zIndex: 1000,
          maxWidth: '400px',
          backgroundColor: notification.type === 'success' ? '#10b981' : '#ef4444',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          {notification.message}
        </div>
      )}

      <h2>Blog Management</h2>
      <p>Create and manage blog posts</p>

      {/* Helpful note about frontend refresh */}
      <div style={{
        backgroundColor: '#fef3c7',
        border: '1px solid #f59e0b',
        borderRadius: '8px',
        padding: '12px 16px',
        marginBottom: '20px',
        fontSize: '14px',
        color: '#92400e'
      }}>
        <strong>💡 Note:</strong> When you publish, update, or delete blogs, the frontend website will need to be refreshed to see the changes. Users can use the refresh button on the blogs page or simply reload the page.
      </div>

      <button className="add-btn" onClick={() => {
        resetForm();
        setShowForm(true);
      }}>
        + Add Blog
      </button>

      {/* Debug button to check database state */}
      <button 
        onClick={async () => {
          try {
            const response = await axios.get('http://localhost:5050/api/blogs/debug/state');
            console.log("🔍 Database state:", response.data);
            showNotification(`DB: ${response.data.totalBlogs} total, ${response.data.publishedBlogs} published, ${response.data.draftBlogs} draft`, 'success');
          } catch (error) {
            console.error("❌ Error checking database state:", error);
            showNotification('Failed to check database state', 'error');
          }
        }}
        style={{
          marginLeft: '10px',
          padding: '8px 16px',
          backgroundColor: '#6b7280',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        🔍 Debug DB
      </button>

      {showForm && (
        <form className="blog-form" onSubmit={handleAddOrUpdate}>
          <input type="text" name="photo" placeholder="Image URL" value={formData.photo} onChange={handleChange} required />
          <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
          <input type="text" name="shortDescription" placeholder="Short Description" value={formData.shortDescription} onChange={handleChange} required />
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required></textarea>
          <input type="text" name="author" placeholder="Author" value={formData.author} onChange={handleChange} required />
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />
          <input type="text" name="tag" placeholder="Tag (e.g., React)" value={formData.tag} onChange={handleChange} required />
          <select name="category" value={formData.category} onChange={handleChange} required>
            <option value="">Select Category</option>
            {existingCategories.map((cat, i) => (
              <option key={i} value={cat}>{cat}</option>
            ))}
          </select>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>
          <button type="submit">{isEditing ? 'Update Blog' : 'Add Blog'}</button>
        </form>
      )}

      <h3>Blog Posts</h3>
      <div className="blog-list">
        <div className="blog-header">
          <span>Image</span>
          <span>Title</span>
          <span>Author</span>
          <span>Tag</span>
          <span>Category</span>
          <span>Status</span>
          <span>Date</span>
          <span>Actions</span>
        </div>

        {blogPosts.map((post, index) => (
          <div className="blog-item" key={post._id || `temp-${index}`}>
            <span>
              <img
                src={post.photo}
                alt="Blog"
                width="60"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/default-blog.png';
                }}
              />
            </span>
            <span>{post.title}</span>
            <span>{post.author}</span>
            <span>{post.tag}</span>
            <span>{post.category}</span>
            <span><span className={`status-badge ${post.status.toLowerCase()}`}>{post.status}</span></span>
            <span>{post.date}</span>
            <span>
              <button className="action-btn" onClick={() => handleEdit(post)}>✏️</button>
              <button className="action-btn" onClick={() => handleDelete(post._id)}>🗑️</button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogManagement;
