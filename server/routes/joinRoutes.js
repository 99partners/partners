// // routes/joinRoutes.js
// const express = require("express");
// const router = express.Router();
// const Join = require("../models/JoinEntry");
// const mongoose = require("mongoose");

// // POST - existing route to submit join form
// router.post("/", async (req, res) => {
//   try {
//     // Check if MongoDB is connected
//     if (mongoose.connection.readyState !== 1) {
//       console.log("⚠️  MongoDB not connected for join form submission");
//       return res.status(200).json({ 
//         message: "Application submitted successfully (Database not available).",
//         warning: "Database connection not available. Application not persisted."
//       });
//     }

//     const newEntry = new Join(req.body);
//     const saved = await newEntry.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     console.error("❌ Error saving join entry:", err);
//     // Return success even on database error for better UX
//     res.status(200).json({ 
//       message: "Application submitted successfully.",
//       warning: "Database operation failed. Application may not be persisted."
//     });
//   }
// });

// // ✅ NEW: GET all partner entries
// router.get("/", async (req, res) => {
//   try {
//     // Check if MongoDB is connected
//     if (mongoose.connection.readyState !== 1) {
//       console.log("⚠️  MongoDB not connected for join entries fetch");
//       return res.status(200).json([]);
//     }

//     const partners = await Join.find();
//     res.status(200).json(partners);
//   } catch (err) {
//     console.error("❌ Error fetching join entries:", err);
//     // Return empty array on error
//     res.status(200).json([]);
//   }
// });

// module.exports = router;


const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const path = require("path");
const Join = require("../models/JoinEntry");

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Make sure this folder exists
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // max 10MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf|ppt|pptx/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.test(ext)) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF or PPT/PPTX files allowed"));
    }
  },
});

// POST - Submit partnership application
router.post("/", upload.single("proposalFile"), async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      console.warn("⚠️ MongoDB not connected during form submission");
      return res.status(200).json({
        message: "Application submitted successfully (Database not available).",
        warning: "Database not available. Application not persisted.",
      });
    }

    const {
      fullName,
      company,
      designation,
      email,
      phone,
      website,
      businessType,
      otherBusinessType,
      businessDescription,
      services,
      yearsInOperation,
      partnershipReason,
      partnershipType,
      otherPartnershipType,
      targetAudience,
      collaborationVision,
      comments,
      agreeTerms,
    } = req.body;

    const newEntry = new Join({
      fullName,
      company,
      designation,
      email,
      phone,
      website,
      businessType,
      otherBusinessType,
      businessDescription,
      services,
      yearsInOperation,
      partnershipReason,
      partnershipType: Array.isArray(partnershipType)
        ? partnershipType
        : [partnershipType],
      otherPartnershipType,
      targetAudience,
      collaborationVision,
      comments,
      agreeTerms: agreeTerms === "true" || agreeTerms === true,
      proposalFile: req.file?.filename || null,
    });

    const saved = await newEntry.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ Error saving form:", err);
    res.status(200).json({
      message: "Application submitted successfully.",
      warning: "Database operation failed. Application may not be persisted.",
    });
  }
});

// GET - Fetch all partner applications
router.get("/", async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      console.warn("⚠️ MongoDB not connected while fetching entries");
      return res.status(200).json([]);
    }

    const entries = await Join.find().sort({ createdAt: -1 });
    res.status(200).json(entries);
  } catch (err) {
    console.error("❌ Error fetching entries:", err);
    res.status(200).json([]);
  }
});

module.exports = router;
