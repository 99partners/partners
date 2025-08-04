const express = require("express");
const { OAuth2Client } = require("google-auth-library");
const createError = require("http-errors");
const User = require("../models/User");

const router = express.Router();

// Google OAuth Client - Handle missing environment variables
let client = null;
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );
}

// Middleware
async function verifyGoogleToken(req, res, next) {
  // Check if Google OAuth is configured
  if (!client) {
    return res.status(500).json({
      error: "Google OAuth not configured. Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env file."
    });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "No authorization header" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Invalid token format" });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(401).json({ error: "Invalid token payload" });
    }

    req.user = payload;
    next();
  } catch (err) {
    console.error("Token verification error:", err.message);
    return res.status(401).json({ error: "Token verification failed: " + err.message });
  }
}

// Routes
router.get("/", (req, res) => {
  res.send({ message: "Server is running" });
});

router.get("/protected", verifyGoogleToken, async (req, res, next) => {
  try {
    const { sub, email, name, picture } = req.user;

    const user = await User.findOneAndUpdate(
      { googleId: sub },
      { email, displayName: name, photo: picture },
      { new: true, upsert: true }
    );

    res.send({ message: "You are authorized", user });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Database operation failed" });
  }
});

// Google One Tap Login endpoint
router.post("/api/auth/google", async (req, res) => {
  const { credential } = req.body;
  
  if (!credential) {
    return res.status(400).json({ error: "No credential provided" });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const { sub, email, name, picture } = payload;

    // Create or update user in MongoDB
    const user = await User.findOneAndUpdate(
      { googleId: sub },
      { 
        email, 
        displayName: name, 
        photo: picture,
        lastLogin: new Date()
      },
      { new: true, upsert: true }
    );

    res.json({ 
      success: true, 
      user,
      message: "Successfully authenticated"
    });
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ 
      error: "Authentication failed", 
      message: error.message 
    });
  }
});

module.exports = router;
