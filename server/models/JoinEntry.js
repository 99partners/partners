const mongoose = require('mongoose');

const joinSchema = new mongoose.Schema({
  // Section 1: Contact Information
  name: { type: String, required: true },
  company: { type: String, required: true },
  designation: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  website: { type: String },

  // Section 2: Business Information
  businessType: { type: String, required: true },
  otherBusinessType: { type: String },
  businessDescription: { type: String, required: true },
  productsServices: { type: String, required: true },
  yearsInOperation: { type: String, required: true },

  // Section 3: Partnership Goals
  partnershipReason: { type: String, required: true },
  partnershipType: { type: String, required: true },
  otherPartnershipType: { type: String },
  targetAudience: { type: String, required: true },
  collaborationVision: { type: String, required: true },

  // Section 4: Supporting Information
  businessProposal: { type: String }, // Path to the uploaded file
  additionalComments: { type: String },

  // Consent
  consentToTerms: { type: Boolean, required: true },
}, { timestamps: true });
console.log("💾 Saving to DB...");

module.exports = mongoose.model('JoinEntry', joinSchema);
