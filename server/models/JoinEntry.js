const mongoose = require('mongoose');

const joinSchema = new mongoose.Schema({
  // Section 1: Contact Information
  fullName: { type: String, required: true },
  companyName: { type: String, required: true },
  designation: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  website: String,

  // Section 2: Business Information
  businessType: { type: String, required: true },
  otherBusinessType: String,
  businessDescription: { type: String, required: true, maxlength: 1000 }, // ~200 words
  services: { type: String, required: true },
  yearsInOperation: { 
    type: String, 
    required: true,
    enum: ['Start-Up', '2-5 Years', 'More than 5 Years']
  },

  // Section 3: Partnership Goals
  partnershipReason: { type: String, required: true },
  partnershipTypes: {
    type: [String],
    required: true,
    validate: {
      validator: function(v) {
        return v.length > 0;
      },
      message: 'At least one partnership type must be selected'
    }
  },
  otherPartnershipType: String,
  targetAudience: { type: String, required: true },
  collaborationVision: { type: String, required: true, maxlength: 1500 }, // ~300 words

  // Section 4: Supporting Information
  proposalFile: String,
  additionalComments: String,
  
  // Consent & Declaration
  agreeToTerms: { type: Boolean, required: true }
}, { timestamps: true });

module.exports = mongoose.model('JoinEntry', joinSchema);
