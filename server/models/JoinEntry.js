// const mongoose = require('mongoose');

// const joinSchema = new mongoose.Schema({
//   name: String,
//   designation: String,
//   company: String,
//   email: String,
//   website: String,
//   businessType: String,
//   goal: String,
//   targetAudience: String,
//   description: String,
// }, { timestamps: true });
// console.log("💾 Saving to DB...");

// module.exports = mongoose.model('JoinEntry', joinSchema);


import mongoose from "mongoose";

const joinSchema = new mongoose.Schema(
  {
    fullName: String,
    company: String,
    designation: String,
    email: String,
    phone: String,
    website: String,
    businessType: String,
    otherBusinessType: String,
    businessDescription: String,
    services: String,
    yearsInOperation: String,
    partnershipReason: String,
    partnershipType: [String],
    otherPartnershipType: String,
    targetAudience: String,
    collaborationVision: String,
    comments: String,
    agreeTerms: Boolean,
    proposalFile: String,
  },
  { timestamps: true }
);

export default mongoose.model("Join", joinSchema);
