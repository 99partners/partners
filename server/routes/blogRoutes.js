const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const mongoose = require("mongoose");

// ✅ Updated GET route to fetch all blogs if ?all=true is passed
router.get("/", async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      console.log("⚠️  MongoDB not connected for blog fetch");
      return res.status(200).json([]);
    }

    const filter = req.query.all === 'true' ? {} : { status: "Published" };
    const blogs = await Blog.find(filter).sort({ date: -1 });
    console.log(`📊 Fetched ${blogs.length} blogs from database`);
    res.json(blogs);
  } catch (err) {
    console.error("❌ Error fetching blogs:", err);
    res.status(200).json([]);
  }
});


// ✅ GET a single published blog by ID
router.get("/:id", async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      console.log("⚠️  MongoDB not connected for blog fetch");
      return res.status(404).json({ error: "Blog not found" });
    }

    const blog = await Blog.findById(req.params.id);
    if (!blog || blog.status !== "Published") {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.json(blog);
  } catch (err) {
    console.error("Error fetching blog:", err);
    res.status(404).json({ error: "Blog not found" });
  }
});

// ✅ POST: Create a new blog
router.post("/", async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      console.log("⚠️  MongoDB not connected for blog creation");
      return res.status(200).json({ 
        message: "Blog created successfully (Database not available).",
        warning: "Database connection not available. Blog not persisted."
      });
    }

    const data = req.body;
    console.log("📝 Creating new blog with data:", {
      title: data.title,
      author: data.author,
      status: data.status,
      category: data.category
    });

    if (
      !data.title ||
      !data.shortDescription ||
      !data.description ||
      !data.author ||
      !data.date ||
      !data.category ||
      !data.status
    ) {
      console.log("❌ Missing required fields:", {
        title: !!data.title,
        shortDescription: !!data.shortDescription,
        description: !!data.description,
        author: !!data.author,
        date: !!data.date,
        category: !!data.category,
        status: !!data.status
      });
      return res.status(400).json({ error: "Missing required fields" });
    }

    const blog = new Blog(data);
    const savedBlog = await blog.save();
    console.log("✅ Blog created successfully with ID:", savedBlog._id);
    res.status(201).json(savedBlog);
  } catch (err) {
    console.error("❌ Error creating blog:", err);
    res.status(500).json({ 
      error: "Failed to create blog",
      details: err.message
    });
  }
});

// ✅ PUT: Update existing blog by ID
router.put("/:id", async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      console.log("⚠️  MongoDB not connected for blog update");
      return res.status(200).json({ 
        message: "Blog updated successfully (Database not available).",
        warning: "Database connection not available. Blog not persisted."
      });
    }

    console.log("📝 Updating blog with ID:", req.params.id);
    console.log("📝 Update data:", {
      title: req.body.title,
      author: req.body.author,
      status: req.body.status,
      category: req.body.category
    });

    const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updated) {
      console.log("❌ Blog not found for update:", req.params.id);
      return res.status(404).json({ error: "Blog not found" });
    }

    console.log("✅ Blog updated successfully:", updated._id);
    res.status(200).json(updated);
  } catch (err) {
    console.error("❌ Error updating blog:", err);
    res.status(500).json({ 
      error: "Failed to update blog",
      details: err.message
    });
  }
});

// ✅ DELETE: Delete blog by ID
router.delete("/:id", async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      console.log("⚠️  MongoDB not connected for blog deletion");
      return res.status(200).json({ 
        message: "Blog deleted successfully (Database not available).",
        warning: "Database connection not available. Blog not persisted."
      });
    }

    console.log("🗑️  Deleting blog with ID:", req.params.id);
    const deleted = await Blog.findByIdAndDelete(req.params.id);
    
    if (!deleted) {
      console.log("❌ Blog not found for deletion:", req.params.id);
      return res.status(404).json({ error: "Blog not found" });
    }

    console.log("✅ Blog deleted successfully:", req.params.id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting blog:", err);
    res.status(500).json({ 
      error: "Failed to delete blog",
      details: err.message
    });
  }
});

// ✅ Test endpoint to check database state
router.get("/debug/state", async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(500).json({ 
        error: "MongoDB not connected",
        connectionState: mongoose.connection.readyState
      });
    }

    const allBlogs = await Blog.find({});
    const publishedBlogs = await Blog.find({ status: "Published" });
    const draftBlogs = await Blog.find({ status: "Draft" });

    res.json({
      totalBlogs: allBlogs.length,
      publishedBlogs: publishedBlogs.length,
      draftBlogs: draftBlogs.length,
      connectionState: mongoose.connection.readyState,
      databaseName: mongoose.connection.name,
      allBlogs: allBlogs.map(blog => ({
        _id: blog._id,
        title: blog.title,
        status: blog.status,
        createdAt: blog.createdAt,
        updatedAt: blog.updatedAt
      }))
    });
  } catch (err) {
    console.error("❌ Error in debug endpoint:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
