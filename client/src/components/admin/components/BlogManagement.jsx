// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import '../styles/main.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'summernote/dist/summernote-bs4.css';
// import $ from 'jquery';
// import 'bootstrap/dist/js/bootstrap.bundle.min';
// import 'summernote/dist/summernote-bs4.min.js';

// const BlogManagement = () => {
//   const existingCategories = [
//     'AI & IT Services',
//     'Digital Commerce',
//     'Financial Service',
//     'Spiritual Ecosystem'
//   ];

//   const [blogPosts, setBlogPosts] = useState([]);
//   const [formData, setFormData] = useState({
//     _id: null,
//     title: '',
//     shortDescription: '',
//     description: '',
//     author: '',
//     status: 'Draft',
//     date: '',
//     photo: '',
//     tag: '',
//     category: ''
//   });

//   const [isEditing, setIsEditing] = useState(false);
//   const [showForm, setShowForm] = useState(false);
//   const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });
//   const editorRef = useRef(null);

//   // ✅ Fetch all blogs (Draft + Published) for admin
//   useEffect(() => {
//     axios
//       .get('https://api.99partners.in/api/blogs?all=true')
//       .then((res) => setBlogPosts(res.data))
//       .catch((err) => console.error('Error fetching blogs:', err));
//   }, []);

//   useEffect(() => {
//     if (showForm) {
//       $(editorRef.current).summernote({
//         height: 300,
//         padding: 0,
//         callbacks: {
//           onChange: function (contents) {
//             setFormData((prev) => ({ ...prev, description: contents }));
//           }
//         }
//       });
//       if (isEditing) {
//         $(editorRef.current).summernote('code', formData.description);
//       }
//     } else {
//       if ($(editorRef.current).hasClass('note-editor')) {
//         $(editorRef.current).summernote('destroy');
//       }
//     }
//   }, [showForm, isEditing, formData.description]);

//   const showNotification = (message, type = 'success') => {
//     setNotification({ show: true, message, type });
//     setTimeout(() => setNotification({ show: false, message: '', type: 'success' }), 5000);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'tag') {
//       const formatted = value.startsWith('#') ? value : `#${value}`;
//       setFormData((prev) => ({ ...prev, tag: formatted }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleAddOrUpdate = async (e) => {
//     e.preventDefault();

//     // Validate required fields
//     const requiredFields = ['title', 'shortDescription', 'description', 'author', 'date', 'category', 'status'];
//     const missingFields = requiredFields.filter(field => !formData[field]);

//     if (missingFields.length > 0) {
//       console.error("❌ Missing required fields:", missingFields);
//       showNotification(`Missing required fields: ${missingFields.join(', ')}`, 'error');
//       return;
//     }

//     try {
//       console.log("🔄 Starting blog save/update operation...");
//       console.log("📝 Form data:", {
//         isEditing,
//         _id: formData._id,
//         title: formData.title,
//         author: formData.author,
//         status: formData.status,
//         category: formData.category
//       });

//       let response;
//       if (isEditing && formData._id) {
//         console.log("📝 Updating existing blog...");
//         response = await axios.put(`https://api.99partners.in/api/blogs/${formData._id}`, formData);
//         showNotification('Blog updated successfully!');
//       } else {
//         console.log("📝 Creating new blog...");
//         response = await axios.post('https://api.99partners.in/api/blogs', formData);
//         showNotification('Blog created successfully!');
//       }

//       console.log("✅ Server response:", response.data);
//       const saved = response.data;

//       // Update local state
//       const updatedList = isEditing
//         ? blogPosts.map((post) => (post._id === saved._id ? saved : post))
//         : [saved, ...blogPosts];

//       console.log("📊 Updating local state with", updatedList.length, "blogs");
//       setBlogPosts(updatedList);
//       resetForm();

//       // Refresh the list from server to ensure consistency
//       setTimeout(async () => {
//         try {
//           console.log("🔄 Refreshing blog list from server...");
//           const refreshResponse = await axios.get('https://api.99partners.in/api/blogs?all=true');
//           console.log("📊 Refreshed list has", refreshResponse.data.length, "blogs");
//           setBlogPosts(refreshResponse.data);
//         } catch (refreshError) {
//           console.error("❌ Error refreshing blog list:", refreshError);
//         }
//       }, 1000);

//     } catch (error) {
//       console.error("❌ Error saving blog:", error);
//       console.error("❌ Error details:", error.response?.data);
//       showNotification(`Failed to save blog: ${error.response?.data?.error || error.message}`, 'error');
//     }
//   };

//   const handleEdit = (post) => {
//     setFormData(post);
//     setIsEditing(true);
//     setShowForm(true);
//   };

//   const handleDelete = async (id) => {
//     const confirmed = window.confirm('Are you sure you want to delete this blog?');
//     if (confirmed) {
//       try {
//         await axios.delete(`https://api.99partners.in/api/blogs/${id}`);
//         setBlogPosts(blogPosts.filter((post) => post._id !== id));
//         showNotification('Blog deleted successfully! Note: Frontend will need to be refreshed to see changes.');
//       } catch (error) {
//         console.error('Error deleting blog:', error);
//         showNotification('Failed to delete blog', 'error');
//       }
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       _id: null,
//       title: '',
//       shortDescription: '',
//       description: '',
//       author: '',
//       status: 'Draft',
//       date: '',
//       photo: '',
//       tag: '',
//       category: ''
//     });
//     setIsEditing(false);
//     setShowForm(false);
//   };

//   return (
//     <div className="content-section">
//       {/* Notification */}
//       {notification.show && (
//         <div className={`notification ${notification.type}`} style={{
//           position: 'fixed',
//           top: '20px',
//           right: '20px',
//           padding: '12px 20px',
//           borderRadius: '8px',
//           color: 'white',
//           zIndex: 1000,
//           maxWidth: '400px',
//           backgroundColor: notification.type === 'success' ? '#10b981' : '#ef4444',
//           boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
//         }}>
//           {notification.message}
//         </div>
//       )}

//       <h2>Blog Management</h2>
//       <p>Create and manage blog posts</p>

//       {/* Helpful note about frontend refresh */}
//       <div style={{
//         backgroundColor: '#fef3c7',
//         border: '1px solid #f59e0b',
//         borderRadius: '8px',
//         padding: '12px 16px',
//         marginBottom: '20px',
//         fontSize: '14px',
//         color: '#92400e'
//       }}>
//         <strong>💡 Note:</strong> When you publish, update, or delete blogs, the frontend website will need to be refreshed to see the changes. Users can use the refresh button on the blogs page or simply reload the page.
//       </div>

//       <button className="add-btn" onClick={() => {
//         resetForm();
//         setShowForm(true);
//       }}>
//         + Add Blog
//       </button>

//       {/* Debug button to check database state */}
//       <button
//         onClick={async () => {
//           try {
//             const response = await axios.get('https://api.99partners.in/api/blogs/debug/state');
//             console.log("🔍 Database state:", response.data);
//             showNotification(`DB: ${response.data.totalBlogs} total, ${response.data.publishedBlogs} published, ${response.data.draftBlogs} draft`, 'success');
//           } catch (error) {
//             console.error("❌ Error checking database state:", error);
//             showNotification('Failed to check database state', 'error');
//           }
//         }}
//         style={{
//           marginLeft: '10px',
//           padding: '8px 16px',
//           backgroundColor: '#6b7280',
//           color: 'white',
//           border: 'none',
//           borderRadius: '4px',
//           cursor: 'pointer'
//         }}
//       >
//         🔍 Debug DB
//       </button>

//       {showForm && (
//         <form className="blog-form" onSubmit={handleAddOrUpdate}>
//           <input type="text" name="photo" placeholder="Image URL" value={formData.photo} onChange={handleChange} required />
//           <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
//           <input type="text" name="shortDescription" placeholder="Short Description" value={formData.shortDescription} onChange={handleChange} required />
//           <div ref={editorRef} />
//           <input type="text" name="author" placeholder="Author" value={formData.author} onChange={handleChange} required />
//           <input type="date" name="date" value={formData.date} onChange={handleChange} required />
//           <input type="text" name="tag" placeholder="Tag (e.g., React)" value={formData.tag} onChange={handleChange} required />
//           <select name="category" value={formData.category} onChange={handleChange} required>
//             <option value="">Select Category</option>
//             {existingCategories.map((cat, i) => (
//               <option key={i} value={cat}>{cat}</option>
//             ))}
//           </select>
//           <select name="status" value={formData.status} onChange={handleChange}>
//             <option value="Published">Published</option>
//             <option value="Draft">Draft</option>
//           </select>
//           <button type="submit">{isEditing ? 'Update Blog' : 'Add Blog'}</button>
//         </form>
//       )}

//       <h3>Blog Posts</h3>
//       <div className="blog-list">
//         <div className="blog-header">
//           <span>Image</span>
//           <span>Title</span>
//           <span>Author</span>
//           <span>Tag</span>
//           <span>Category</span>
//           <span>Status</span>
//           <span>Date</span>
//           <span>Actions</span>
//         </div>

//         {blogPosts.map((post, index) => (
//           <div className="blog-item" key={post._id || `temp-${index}`}>
//             <span>
//               <img
//                 src={post.photo}
//                 alt="Blog"
//                 width="60"
//                 onError={(e) => {
//                   e.target.onerror = null;
//                   e.target.src = '/default-blog.png';
//                 }}
//               />
//             </span>
//             <span>{post.title}</span>
//             <span>{post.author}</span>
//             <span>{post.tag}</span>
//             <span>{post.category}</span>
//             <span><span className={`status-badge ${post.status.toLowerCase()}`}>{post.status}</span></span>
//             <span>{post.date}</span>
//             <span>
//               <button className="action-btn" onClick={() => handleEdit(post)}>✏️</button>
//               <button className="action-btn" onClick={() => handleDelete(post._id)}>🗑️</button>
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BlogManagement;

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../styles/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'summernote/dist/summernote-bs4.css';
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'summernote/dist/summernote-bs4.min.js';
import { FaEdit, FaTrash } from 'react-icons/fa';  

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
    date: new Date().toISOString().split('T')[0],
    photo: '',
    tag: '',
    category: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });
  const [isLoading, setIsLoading] = useState(true);
  const editorRef = useRef(null);

  // Fetch all blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('https://api.99partners.in/api/blogs?all=true');
        setBlogPosts(response.data);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        showNotification('Failed to load blogs', 'error');
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Initialize Summernote editor
   useEffect(() => {
    let summernoteInitialized = false;

    if (showForm && editorRef.current) {
      // Initialize Summernote
      $(editorRef.current).summernote({
        height: 300,
        toolbar: [
          ['style', ['style']],
          ['font', ['bold', 'italic', 'underline', 'clear']],
          ['fontname', ['fontname']],
          ['color', ['color']],
          ['para', ['ul', 'ol', 'paragraph']],
          ['height', ['height']],
          ['table', ['table']],
          ['insert', ['link', 'picture', 'video']],
          ['view', ['fullscreen', 'codeview']],
          ['help', ['help']]
        ],
        callbacks: {
          onChange: function(contents) {
            setFormData(prev => ({ ...prev, description: contents }));
          },
          onInit: function() {
            summernoteInitialized = true;
            if (isEditing && formData.description) {
              $(editorRef.current).summernote('code', formData.description);
            }
          }
        }
      });
    }

    return () => {
      if (summernoteInitialized && editorRef.current && $(editorRef.current).hasClass('note-editor')) {
        // Save the content before destroying
        const content = $(editorRef.current).summernote('code');
        setFormData(prev => ({ ...prev, description: content }));
        $(editorRef.current).summernote('destroy');
      }
    };
  }, [showForm, isEditing]);
  // useEffect(() => {
  //   if (showForm && editorRef.current) {
  //     $(editorRef.current).summernote({
  //       height: 300,
  //       toolbar: [
  //         ['style', ['style']],
  //         ['font', ['bold', 'italic', 'underline', 'clear']],
  //         ['fontname', ['fontname']],
  //         ['color', ['color']],
  //         ['para', ['ul', 'ol', 'paragraph']],
  //         ['height', ['height']],
  //         ['table', ['table']],
  //         ['insert', ['link', 'picture', 'video']],
  //         ['view', ['fullscreen', 'codeview']],
  //         ['help', ['help']]
  //       ],
  //       callbacks: {
  //         onChange: function (contents) {
  //           setFormData(prev => ({ ...prev, description: contents }));
  //         },
  //         onInit: function () {
  //           if (isEditing && formData.description) {
  //             $(editorRef.current).summernote('code', formData.description);
  //           }
  //         }
  //       }
  //     });
  //   }

  //   return () => {
  //     if (editorRef.current && $(editorRef.current).hasClass('note-editor')) {
  //       $(editorRef.current).summernote('destroy');
  //     }
  //   };
  // }, [showForm, isEditing, formData.description]);

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: 'success' }), 5000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTagChange = (e) => {
    const value = e.target.value;
    const formatted = value.startsWith('#') ? value : `#${value}`;
    setFormData(prev => ({ ...prev, tag: formatted }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let response;
      if (isEditing && formData._id) {
        response = await axios.put(`https://api.99partners.in/api/blogs/${formData._id}`, formData);
        showNotification('Blog updated successfully!');
      } else {
        response = await axios.post('https://api.99partners.in/api/blogs', formData);
        showNotification('Blog created successfully!');
      }

      const updatedBlogs = isEditing
        ? blogPosts.map(blog => blog._id === response.data._id ? response.data : blog)
        : [response.data, ...blogPosts];

      setBlogPosts(updatedBlogs);
      resetForm();
    } catch (error) {
      console.error('Error saving blog:', error);
      showNotification(error.response?.data?.message || 'Failed to save blog', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (blog) => {
    setFormData({
      ...blog,
      date: blog.date.split('T')[0] // Format date for input
    });
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;

    setIsLoading(true);
    try {
      await axios.delete(`https://api.99partners.in/api/blogs/${id}`);
      setBlogPosts(blogPosts.filter(blog => blog._id !== id));
      showNotification('Blog deleted successfully!');
    } catch (error) {
      console.error('Error deleting blog:', error);
      showNotification('Failed to delete blog', 'error');
    } finally {
      setIsLoading(false);
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
      date: new Date().toISOString().split('T')[0],
      photo: '',
      tag: '',
      category: ''
    });
    setIsEditing(false);
    setShowForm(false);
  };

  return (
    <div className="content-section">
      {/* Notification Toast */}
      {notification.show && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
          <button onClick={() => setNotification({ show: false, message: '', type: 'success' })}>
            &times;
          </button>
        </div>
      )}

      <h2>Blog Management</h2>
      <p>Create, edit, and manage your blog posts</p>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Blogs</h3>
          <p>{blogPosts.length}</p>
        </div>
        <div className="stat-card">
          <h3>Published</h3>
          <p>{blogPosts.filter(blog => blog.status === 'Published').length}</p>
        </div>
        <div className="stat-card">
          <h3>Drafts</h3>
          <p>{blogPosts.filter(blog => blog.status === 'Draft').length}</p>
        </div>
        <div
          className="stat-card clickable highlight-card"
          onClick={() => setShowForm(true)}
        >
          <h3>Create New</h3>
          <p>+ Add Blog Post</p>
        </div>
      </div>

      {/* Blog Form */}
      {showForm && (
        <div className="form-container">
          <div className="form-header">
            <h3>{isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}</h3>
            <button className="close-btn" onClick={resetForm}>&times;</button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Enter blog title"
                />
              </div>

              <div className="form-group">
                <label>Short Description *</label>
                <input
                  type="text"
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleChange}
                  required
                  placeholder="Brief summary of your blog"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Featured Image URL</label>
                <input
                  type="text"
                  name="photo"
                  value={formData.photo}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                />
                {formData.photo && (
                  <div className="image-preview">
                    <img src={formData.photo} alt="Preview" onError={(e) => e.target.src = 'https://via.placeholder.com/150'} />
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Author *</label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  required
                  placeholder="Author name"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Publish Date *</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Tag</label>
                <input
                  type="text"
                  name="tag"
                  value={formData.tag}
                  onChange={handleTagChange}
                  placeholder="#technology"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a category</option>
                  {existingCategories.map((cat, index) => (
                    <option key={index} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Status *</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Content *</label>
              <div ref={editorRef}></div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn btn-outline"
                onClick={resetForm}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="spinner"></span>
                ) : isEditing ? (
                  'Update Blog'
                ) : (
                  'Publish Blog'
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Blog List */}
      <div className="blog-list">
        <h3>All Blog Posts</h3>

        {isLoading && blogPosts.length === 0 ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading blog posts...</p>
          </div>
        ) : blogPosts.length === 0 ? (
          <div className="empty-state">
            <p>No blog posts found</p>
            <button className="btn btn-primary" onClick={() => setShowForm(true)}>
              Create Your First Blog
            </button>
          </div>
        ) : (
          <div className="blog-grid">
            {blogPosts.map(blog => (
              <div key={blog._id} className="blog-card">
                <div className="blog-card-header">
                  {blog.photo && (
                    <img
                      src={blog.photo}
                      alt={blog.title}
                      className="blog-image"
                      onError={(e) => e.target.src = 'https://via.placeholder.com/300x200'}
                    />
                  )}
                  <span className={`status-badge ${blog.status.toLowerCase()}`}>
                    {blog.status}
                  </span>
                </div>
                <div className="blog-card-body">
                  <h4>{blog.title}</h4>
                  <p className="blog-description">{blog.shortDescription}</p>
                  <div className="blog-meta">
                    <span><strong>Author:</strong> {blog.author}</span>
                    <span><strong>Date:</strong> {new Date(blog.date).toLocaleDateString()}</span>
                    <span><strong>Category:</strong> {blog.category}</span>
                  </div>
                </div>
                <div className="blog-card-footer">
                  <button
                    className="btn btn-sm btn-outline"
                    onClick={() => handleEdit(blog)}
                    disabled={isLoading}
                    title="Edit"
                  >
                    <FaEdit className="icon" />
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(blog._id)}
                    disabled={isLoading}
                    title="Delete"
                  >
                    <FaTrash className="icon" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .content-section {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        h2 {
          color: #333;
          margin-bottom: 0.5rem;
        }
        
        p {
          color: #666;
          margin-bottom: 2rem;
        }
        
        /* Stats Cards */
        .dashboard-stats {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        
        .stat-card {
          background: white;
          border-radius: 8px;
          padding: 1.5rem;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          text-align: center;
        }
        
        .stat-card h3 {
          font-size: 1rem;
          color: #666;
          margin-bottom: 0.5rem;
        }
        
        .stat-card p {
          font-size: 1.5rem;
          font-weight: 600;
          color: #333;
          margin: 0;
        }
        
        .clickable {
          cursor: pointer;
          transition: transform 0.2s;
        }
        
        .clickable:hover {
          transform: translateY(-3px);
        }
        
        .highlight-card {
          background: #f0f7ff;
        }

        .note-editor {
          position: relative;
          padding: 0;
        }
        
        /* Form Styles */
        .form-container {
          background: white;
          border-radius: 8px;
          padding: 2rem;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          margin-bottom: 2rem;
        }
        
        .form-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        
        .form-header h3 {
          margin: 0;
          color: #333;
          font-size: 1.5rem;
          font-weight: 500;
        }
        
        .close-btn {
          background: none;
          border: none;
          font-size: 1.5rem;
          color: #666;
          cursor: pointer;
        }
        
        .form-row {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 1rem;
        }
        
        .form-group {
          flex: 1;
          margin-bottom: 1rem;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #444;
        }
        
        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 1rem;
        }
        
        .form-group input:focus,
        .form-group select:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        .image-preview {
          margin-top: 0.5rem;
        }
        
        .image-preview img {
          max-width: 100px;
          max-height: 100px;
          border-radius: 4px;
          border: 1px solid #eee;
        }
        
        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid #eee;
        }
        
        .btn {
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          border: 1px solid transparent;
        }
        
        .btn-primary {
          background-color: #3b82f6;
          color: white;
        }
        
        .btn-primary:hover {
          background-color: #2563eb;
        }
        
        .btn-outline {
          background-color: transparent;
          border-color: #ddd;
          color: #333;
        }
        
        .btn-outline:hover {
          background-color: #f5f5f5;
        }
        
        .btn-danger {
          background-color: #ef4444;
          color: white;
        }
        
        .btn-danger:hover {
          background-color: #dc2626;
        }
        
        .btn-sm {
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
        }
        
        /* Blog Grid */
        .blog-list h3 {
          margin-bottom: 1.5rem;
          color: #333;
          font-size: 1.5rem;
        }
        
        .blog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        
        .blog-card {
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          transition: transform 0.2s;
        }
        
        .blog-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .blog-card-header {
          position: relative;
        }
        
        .blog-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }
        
        .status-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
        }
        
        .status-badge.published {
          background-color: #d1fae5;
          color: #065f46;
        }
        
        .status-badge.draft {
          background-color: #fef3c7;
          color: #92400e;
        }
        
        .blog-card-body {
          padding: 1.5rem;
        }
        
        .blog-card-body h4 {
          margin: 0 0 1rem 0;
          color: #333;
        }
        
        .blog-description {
          color: #666;
          margin-bottom: 1rem;
          font-size: 0.9rem;
        }
        
        .blog-meta {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          font-size: 0.8rem;
          color: #666;
        }
        
        .blog-meta span {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .blog-meta strong {
          color: #444;
        }
        
        .blog-card-footer {
          display: flex;
          justify-content: space-between;
          padding: 1rem 1.5rem;
          border-top: 1px solid #eee;
        }
        
        /* Loading and Empty States */
        .loading-state,
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }
        
        .loading-state p,
        .empty-state p {
          margin-top: 1rem;
          color: #666;
        }
        
        .spinner {
          display: inline-block;
          width: 1rem;
          height: 1rem;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s ease-in-out infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        /* Notification */
        .notification {
          position: fixed;
          top: 20px;
          right: 20px;
          padding: 1rem 1.5rem;
          border-radius: 8px;
          color: white;
          z-index: 1000;
          max-width: 400px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          justify-content: space-between;
          animation: slideIn 0.3s ease-out;
        }
        
        .notification.success {
          background-color: #10b981;
        }
        
        .notification.error {
          background-color: #ef4444;
        }
        
        .notification button {
          background: none;
          border: none;
          color: white;
          font-size: 1.25rem;
          cursor: pointer;
          margin-left: 1rem;
        }
        
        @keyframes slideIn {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          .dashboard-stats {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .form-row {
            flex-direction: column;
            gap: 0;
          }
          
          .blog-grid {
            grid-template-columns: 1fr;
          }
        }
          .icon {
          font-size: 1rem;
          vertical-align: middle;
        }

        .btn-outline .icon {
          color: #3b82f6;
        }

        .btn-danger .icon {
          color: white;
        }

        /* Add some spacing between icons */
        .blog-card-footer button:first-child {
          margin-right: 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default BlogManagement;

