const mongoose = require("mongoose");

const joinEntrySchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  businessName: String,
  businessWebsite: String,
  businessDescription: String,
  partnershipGoals: String,
  consentToTerms: Boolean,
  businessProposalFile: {
    filename: String,
    path: String,
    originalName: String,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("JoinEntry", joinEntrySchema);

