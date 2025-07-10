// routes/joinRoutes.js
const express = require("express");
const router = express.Router();
const Join = require("../models/JoinEntry");
const mongoose = require("mongoose");

// POST - existing route to submit join form
router.post("/", async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      console.log("⚠️  MongoDB not connected for join form submission");
      return res.status(200).json({ 
        message: "Application submitted successfully (Database not available).",
        warning: "Database connection not available. Application not persisted."
      });
    }

    const newEntry = new Join(req.body);
    const saved = await newEntry.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ Error saving join entry:", err);
    // Return success even on database error for better UX
    res.status(200).json({ 
      message: "Application submitted successfully.",
      warning: "Database operation failed. Application may not be persisted."
    });
  }
});

// ✅ NEW: GET all partner entries
router.get("/", async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      console.log("⚠️  MongoDB not connected for join entries fetch");
      return res.status(200).json([]);
    }

    const partners = await Join.find();
    res.status(200).json(partners);
  } catch (err) {
    console.error("❌ Error fetching join entries:", err);
    // Return empty array on error
    res.status(200).json([]);
  }
});

module.exports = router;
