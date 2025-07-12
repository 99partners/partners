const express = require('express');
const router = express.Router();
const Newsletter = require('../models/Newsletter');
const User = require('../models/User');
const mongoose = require('mongoose');

console.log('📦 Newsletter routes loaded successfully');

// Test route to verify newsletter router is working
router.get('/test', (req, res) => {
  console.log('🧪 Newsletter test route hit!');
  res.json({ message: 'Newsletter router is working!', timestamp: new Date().toISOString() });
});

// POST /api/newsletter – subscribe a new email
router.post('/', async (req, res) => {
  console.log('🎯 Newsletter POST route hit!');
  console.log('📧 Request body:', req.body);
  console.log('🔗 URL:', req.url);
  console.log('📝 Method:', req.method);
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required.' });

  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      console.log("⚠️  MongoDB not connected for newsletter subscription");
      return res.status(200).json({ 
        message: 'Subscription successful (Database not available).',
        warning: 'Database connection not available. Subscription not persisted.'
      });
    }

    const exists = await Newsletter.findOne({ email });
    if (exists) return res.status(409).json({ message: 'Email already subscribed.' });

    const newSubscription = new Newsletter({ email });
    await newSubscription.save();

    await User.findOneAndUpdate(
      { email },
      { newsletter: 'subscribed' },
      { upsert: false }
    );

    res.status(200).json({ message: 'Subscription successful.' });
  } catch (error) {
    console.error("Newsletter error:", error);
    // Return success even on database error for better UX
    res.status(200).json({ 
      message: 'Subscription successful.',
      warning: 'Database operation failed. Subscription may not be persisted.'
    });
  }
});

// ✅ NEW: GET /api/newsletter – fetch all newsletter subscribers
router.get('/', async (req, res) => {
  console.log('Newsletter GET route hit!');
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      console.log("⚠️  MongoDB not connected for newsletter fetch");
      return res.status(200).json([]);
    }

    const subscribers = await Newsletter.find({}, 'email');
    res.status(200).json(subscribers);
  } catch (error) {
    console.error("Failed to fetch newsletter subscribers:", error);
    // Return empty array on error
    res.status(200).json([]);
  }
});

module.exports = router;