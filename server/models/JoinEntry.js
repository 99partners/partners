// const mongoose = require('mongoose');

// const joinSchema = new mongoose.Schema({
//   // Section 1: Contact Information
//   name: { type: String, required: true },
//   company: { type: String, required: true },
//   designation: { type: String, required: true },
//   email: { type: String, required: true },
//   phone: { type: String, required: true },
//   website: String,

//   // Section 2: Business Information
//   businessType: { type: String, required: true },
//   otherBusinessType: String,
//   businessDescription: { type: String, required: true, maxLength: 2000 }, // 200 words ≈ 2000 chars
//   productsServices: { type: String, required: true },
//   yearsInOperation: { 
//     type: String, 
//     required: true,
//     enum: ['Start-Up (Less than 2 years)', '2-5 Years', 'More than 5 Years']
//   },

//   // Section 3: Partnership Goals
//   partnershipReason: { type: String, required: true },
//   partnershipType: { type: String, required: true },
//   otherPartnershipType: String,
//   targetAudience: { type: String, required: true },
//   collaborationVision: { type: String, required: true, maxLength: 3000 }, // 300 words ≈ 3000 chars

//   // Section 4: Supporting Information
//   businessProposalFile: {
//     filename: String,
//     path: String,
//     originalName: String
//   },
//   additionalComments: String,

//   // Consent
//   consentToTerms: { type: Boolean, required: true }
// }, { timestamps: true });

// module.exports = mongoose.model('JoinEntry', joinSchema);
// models/JoinEntry.js
const mongoose = require('mongoose');

const joinEntrySchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  businessName: {
    type: String,
    required: false,
    trim: true
  },
  businessType: {
    type: String,
    required: false,
    trim: true
  },
  message: {
    type: String,
    required: false,
    trim: true
  },
  consentToTerms: {
    type: Boolean,
    required: true
  },
  businessProposalFile: {
    filename: {
      type: String
    },
    path: {
      type: String
    },
    originalName: {
      type: String
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('JoinEntry', joinEntrySchema);
