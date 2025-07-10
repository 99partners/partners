const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Newsletter = require("../models/Newsletter");
const Blog = require("../models/Blog");
const JoinEntry = require("../models/JoinEntry");

// GET /api/admin/stats – dashboard summary
router.get("/stats", async (req, res) => {
  try {
    const [userCount, newsletterCount, blogCount, partnerCount] = await Promise.all([
      User.countDocuments(),
      Newsletter.countDocuments(),
      Blog.countDocuments(),
      JoinEntry.countDocuments(),
    ]);

    res.json({
      totalUsers: userCount,
      totalSubscribers: newsletterCount,
      totalBlogs: blogCount,
      totalPartners: partnerCount,
    });
  } catch (err) {
    console.error("Error fetching dashboard stats:", err);
    res.status(500).json({ message: "Failed to fetch stats" });
  }
});

module.exports = router;
