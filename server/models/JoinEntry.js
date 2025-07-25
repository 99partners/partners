import mongoose from "mongoose";

const joinSchema = new mongoose.Schema(
  {
    // Section 1: Contact Information
    fullName: { type: String, required: true },
    company: { type: String, required: true },
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
    partnershipType: {
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
    comments: String,
    agreeTerms: { type: Boolean, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Join", joinSchema);
