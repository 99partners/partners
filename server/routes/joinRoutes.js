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
      return res.status(503).json({ 
        error: "Database service is currently unavailable. Please try again later."
      });
    }

    // Validate required fields
    const requiredFields = [
      'name', 'company', 'designation', 'email', 'phone',
      'businessType', 'businessDescription', 'productsServices',
      'yearsInOperation', 'partnershipReason', 'partnershipType',
      'targetAudience', 'collaborationVision', 'consentToTerms'
    ];

    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({
          error: `${field} is required`
        });
      }
    }

    const newEntry = new Join(req.body);
    const saved = await newEntry.save();
    res.status(201).json({
      message: "Application submitted successfully",
      data: saved
    });
  } catch (err) {
    console.error("❌ Error saving join entry:", err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        error: "Invalid form data. Please check your inputs."
      });
    }
    res.status(500).json({ 
      error: "An error occurred while processing your application. Please try again."
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
