// routes/joinRoutes.js
const express = require('express');
const router = express.Router();
const JoinEntry = require('../models/JoinEntry');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/proposals/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.pdf', '.doc', '.docx', '.ppt', '.pptx'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, DOC, DOCX, PPT, and PPTX files are allowed.'));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// POST - Create new partnership application
router.post('/', upload.single('proposalFile'), async (req, res) => {
  try {
    const {
      fullName,
      companyName,
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
      partnershipTypes,
      otherPartnershipType,
      targetAudience,
      collaborationVision,
      additionalComments,
      agreeToTerms
    } = req.body;

    // Create new join entry
    const newEntry = new JoinEntry({
      fullName,
      companyName,
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
      partnershipTypes: Array.isArray(partnershipTypes) ? partnershipTypes : [partnershipTypes],
      otherPartnershipType,
      targetAudience,
      collaborationVision,
      additionalComments,
      proposalFile: req.file ? req.file.filename : null,
      agreeToTerms: agreeToTerms === 'true'
    });

    await newEntry.save();
    res.status(201).json({ message: 'Partnership application submitted successfully' });
  } catch (error) {
    console.error('Error saving partnership application:', error);
    res.status(500).json({ message: 'Error submitting application', error: error.message });
  }
});

// GET - Fetch all partnership applications (for admin)
router.get('/', async (req, res) => {
  try {
    const entries = await JoinEntry.find().sort({ createdAt: -1 });
    res.json(entries);
  } catch (error) {
    console.error('Error fetching partnership applications:', error);
    res.status(500).json({ message: 'Error fetching applications', error: error.message });
  }
});

// GET - Fetch single partnership application
router.get('/:id', async (req, res) => {
  try {
    const entry = await JoinEntry.findById(req.id);
    if (!entry) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.json(entry);
  } catch (error) {
    console.error('Error fetching partnership application:', error);
    res.status(500).json({ message: 'Error fetching application', error: error.message });
  }
});

module.exports = router;
