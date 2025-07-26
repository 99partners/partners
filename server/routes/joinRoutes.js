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
    // Use absolute path from project root
    const uploadDir = path.join(__dirname, '..', 'uploads', 'proposals');
    // Create directory if it doesn't exist
    try {
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    } catch (error) {
      console.error("❌ Error creating upload directory:", error);
      cb(error);
    }
  },
  filename: function (req, file, cb) {
    // Sanitize filename
    const sanitizedOriginalName = file.originalname.replace(/[^a-zA-Z0-9.]/g, '_');
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + sanitizedOriginalName);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    fieldSize: 10 * 1024 * 1024, // Also limit field size to 10MB
    fields: 20, // Limit number of non-file fields
    files: 1 // Limit to 1 file upload
  },
  fileFilter: function (req, file, cb) {
    // Log file details
    console.log('📎 Received file:', {
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size
    });

    const allowedTypes = ['.pdf', '.doc', '.docx', '.ppt', '.pptx'];
    const ext = path.extname(file.originalname).toLowerCase();
    
    // Check file extension
    if (!allowedTypes.includes(ext)) {
      console.error('❌ Invalid file type:', ext);
      return cb(new Error(`Invalid file type. Only ${allowedTypes.join(', ')} files are allowed.`));
    }

    // Check mimetype
    const allowedMimeTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    ];
    
    if (!allowedMimeTypes.includes(file.mimetype)) {
      console.error('❌ Invalid mimetype:', file.mimetype);
      return cb(new Error('Invalid file type based on content.'));
    }

    cb(null, true);
  }
}).single('businessProposal');

// POST - Submit join form with file upload
router.post("/", (req, res) => {
  // Add request timeout for file uploads
  req.setTimeout(120000); // 2 minutes timeout for file uploads

  upload(req, res, async function(err) {
    // Handle multer errors
    if (err instanceof multer.MulterError) {
      console.error("❌ Multer error:", {
        name: err.name,
        message: err.message,
        field: err.field,
        code: err.code
      });
      
      let errorMessage = "File upload error";
      if (err.code === 'LIMIT_FILE_SIZE') {
        errorMessage = "File is too large. Maximum size is 10MB.";
      } else if (err.code === 'LIMIT_FIELD_VALUE') {
        errorMessage = "Form field is too large.";
      } else if (err.code === 'LIMIT_FILE_COUNT') {
        errorMessage = "Too many files. Only one file allowed.";
      } else if (err.code === 'LIMIT_FIELD_COUNT') {
        errorMessage = "Too many form fields.";
      }
      
      return res.status(400).json({
        message: errorMessage,
        error: err.message
      });
    } else if (err) {
      console.error("❌ Upload error:", err);
      return res.status(400).json({
        message: "Error uploading file",
        error: err.message
      });
    }

    try {
      // Check MongoDB connection
      if (mongoose.connection.readyState !== 1) {
        console.error("❌ MongoDB not connected. State:", mongoose.connection.readyState);
        // If file was uploaded but DB is not connected, delete it
        if (req.file) {
          fs.unlinkSync(req.file.path);
        }
        return res.status(503).json({
          message: "Database service unavailable",
          error: "Database connection not available"
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

      // Validate required fields
      const requiredFields = ['name', 'company', 'designation', 'email', 'phone', 'businessType'];
      const missingFields = requiredFields.filter(field => !entryData[field]);
      
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }

      const newEntry = new Join(entryData);
      const saved = await newEntry.save();
      
      console.log("✅ Successfully saved join entry:", saved._id);
      res.status(201).json(saved);
    } catch (err) {
      console.error("❌ Error processing join entry:", err);
      
      // If file was uploaded but save failed, delete it
      if (req.file) {
        try {
          fs.unlinkSync(req.file.path);
          console.log("✅ Cleaned up uploaded file after error");
        } catch (unlinkErr) {
          console.error("❌ Error cleaning up file:", unlinkErr);
        }
      }

      res.status(400).json({ 
        message: "Failed to submit application",
        error: err.message
      });
    }
  });
});

// GET all partner entries
router.get("/", async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      console.error("❌ MongoDB not connected for join entries fetch");
      return res.status(503).json({
        message: "Database service unavailable",
        error: "Database connection not available"
      });
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
