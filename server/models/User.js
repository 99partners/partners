const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  displayName: String,
  photo: String,
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  newsletter: { type: String, enum: ['subscribed', 'unsubscribed'], default: 'unsubscribed' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);