// routes/joinRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Join = require("../models/JoinEntry");
const mongoose = require("mongoose");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/proposals';
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: function (req, file, cb) {
    const allowedTypes = ['.pdf', '.doc', '.docx', '.ppt', '.pptx'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, DOC, DOCX, PPT, and PPTX files are allowed.'));
    }
  }
});

// POST - Submit join form with file upload
router.post("/", upload.single('businessProposal'), async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      // If file was uploaded but DB is not connected, delete it
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      console.log("⚠️  MongoDB not connected for join form submission");
      return res.status(200).json({ 
        message: "Application submitted successfully (Database not available).",
        warning: "Database connection not available. Application not persisted."
      });
    }

    // Prepare the entry data
    const entryData = {
      ...req.body,
      businessProposalFile: req.file ? {
        filename: req.file.filename,
        path: req.file.path,
        originalName: req.file.originalname
      } : undefined
    };

    // Convert consent string to boolean
    if (typeof entryData.consentToTerms === 'string') {
      entryData.consentToTerms = entryData.consentToTerms.toLowerCase() === 'true';
    }

    const newEntry = new Join(entryData);
    const saved = await newEntry.save();
    res.status(201).json(saved);
  } catch (err) {
    // If file was uploaded but save failed, delete it
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    console.error("❌ Error saving join entry:", err);
    res.status(400).json({ 
      message: "Failed to submit application.",
      error: err.message
    });
  }
});

// GET all partner entries
router.get("/", async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      console.log("⚠️  MongoDB not connected for join entries fetch");
      return res.status(200).json([]);
    }

    const partners = await Join.find();
    res.status(200).json(partners);
  } catch (err) {
    console.error("❌ Error fetching join entries:", err);
    res.status(500).json({ 
      message: "Failed to fetch entries",
      error: err.message 
    });
  }
});

module.exports = router;
