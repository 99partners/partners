const mongoose = require('mongoose');

const joinSchema = new mongoose.Schema({
  name: String,
  designation: String,
  company: String,
  email: String,
  website: String,
  businessType: String,
  goal: String,
  targetAudience: String,
  description: String,
}, { timestamps: true });
console.log("💾 Saving to DB...");

module.exports = mongoose.model('JoinEntry', joinSchema);
