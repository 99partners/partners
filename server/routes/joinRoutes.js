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
//       return res.status(503).json({ 
//         error: "Database service is currently unavailable. Please try again later."
//       });
//     }

//     // Validate required fields
//     const requiredFields = [
//       'name', 'company', 'designation', 'email', 'phone',
//       'businessType', 'businessDescription', 'productsServices',
//       'yearsInOperation', 'partnershipReason', 'partnershipType',
//       'targetAudience', 'collaborationVision', 'consentToTerms'
//     ];

//     for (const field of requiredFields) {
//       if (!req.body[field]) {
//         return res.status(400).json({
//           error: `${field} is required`
//         });
//       }
//     }

//     const newEntry = new Join(req.body);
//     const saved = await newEntry.save();
//     res.status(201).json({
//       message: "Application submitted successfully",
//       data: saved
//     });
//   } catch (err) {
//     console.error("❌ Error saving join entry:", err);
//     if (err.name === 'ValidationError') {
//       return res.status(400).json({
//         error: "Invalid form data. Please check your inputs."
//       });
//     }
//     res.status(500).json({ 
//       error: "An error occurred while processing your application. Please try again."
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



// routes/joinRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const mongoose = require("mongoose");
const Join = require("../models/JoinEntry");

// Multer setup: store file in memory as buffer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST - join form submission with optional file
router.post("/", upload.single("businessProposal"), async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      console.log("⚠️  MongoDB not connected for join form submission");
      return res.status(503).json({ 
        error: "Database service is currently unavailable. Please try again later."
      });
    }

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

    // Create new entry with form data
    const entryData = { ...req.body };

    // If file was uploaded, add it to the document
    if (req.file) {
      entryData.businessProposal = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
        filename: req.file.originalname,
      };
    }

    const newEntry = new Join(entryData);
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

// ✅ GET all partner entries
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
    res.status(200).json([]);
  }
});


// ✅ GET a specific partner's business proposal
router.get("/:id/business-proposal", async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: "Database service is unavailable." });
    }

    const partner = await Join.findById(req.params.id);

    if (!partner || !partner.businessProposal || !partner.businessProposal.data) {
      return res.status(404).send("Proposal not found.");
    }

    res.set("Content-Type", partner.businessProposal.contentType);
    res.set("Content-Disposition", `attachment; filename="${partner.businessProposal.filename}"`);
    res.send(partner.businessProposal.data);
  } catch (err) {
    console.error("❌ Error fetching business proposal:", err);
    res.status(500).send("Server error while fetching the file.");
  }
});


module.exports = router;
