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


import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import path from "path";
import Join from "../models/JoinEntry.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf|ppt|pptx/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.test(ext)) cb(null, true);
    else cb(new Error("Only PDF or PPT/PPTX files allowed"));
  },
});

// Submit form
router.post("/", upload.single("proposalFile"), async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(200).json({
        message: "Application submitted (database not connected).",
        warning: "Form not saved in database.",
      });
    }

    // Parse partnershipType as array (multer puts repeated fields as array, single as string)
    let partnershipType = req.body.partnershipType;
    if (typeof partnershipType === "string") {
      partnershipType = [partnershipType];
    } else if (!Array.isArray(partnershipType)) {
      partnershipType = [];
    }

    // Parse agreeTerms as boolean
    const agreeTerms = req.body.agreeTerms === "true" || req.body.agreeTerms === true;

    // Create new entry with all fields from req.body
    const newEntry = new Join({
      fullName: req.body.fullName,
      company: req.body.company,
      designation: req.body.designation,
      email: req.body.email,
      phone: req.body.phone,
      website: req.body.website,
      businessType: req.body.businessType,
      otherBusinessType: req.body.otherBusinessType,
      businessDescription: req.body.businessDescription,
      services: req.body.services,
      yearsInOperation: req.body.yearsInOperation,
      partnershipReason: req.body.partnershipReason,
      partnershipType,
      otherPartnershipType: req.body.otherPartnershipType,
      targetAudience: req.body.targetAudience,
      collaborationVision: req.body.collaborationVision,
      comments: req.body.comments,
      agreeTerms,
      proposalFile: req.file?.filename || null,
    });

    const saved = await newEntry.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error saving form:", err);
    res.status(200).json({
      message: "Application submitted.",
      warning: "Database error occurred.",
    });
  }
});

// Get all entries
router.get("/", async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(200).json([]);
    }

    const entries = await Join.find().sort({ createdAt: -1 });
    res.status(200).json(entries);
  } catch (err) {
    console.error("Error fetching entries:", err);
    res.status(200).json([]);
  }
});

const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData();

  // Make sure 'data' is defined and contains all form fields
  for (const key in data) {
    if (key === "partnershipType") {
      data[key].forEach((item) => formData.append("partnershipType", item));
    } else {
      formData.append(key, data[key]);
    }
  }

  if (proposalFile) {
    formData.append("proposalFile", proposalFile);
  }

  // Now send formData in your fetch/axios call
  await fetch("/api/join", {
    method: "POST",
    body: formData,
  });
};

const [data, setData] = useState({
  fullName: "",
  company: "",
  designation: "",
  email: "",
  phone: "",
  website: "",
  businessType: "",
  otherBusinessType: "",
  businessDescription: "",
  services: "",
  yearsInOperation: "",
  partnershipReason: "",
  partnershipType: [],
  otherPartnershipType: "",
  targetAudience: "",
  collaborationVision: "",
  comments: "",
  agreeTerms: false,
});

export default joinRouter;
