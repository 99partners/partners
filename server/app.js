require('dotenv').config({ path: __dirname + '/.env' });

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const createError = require("http-errors");
const { OAuth2Client } = require("google-auth-library");

// Initialize Express App
const app = express();

// ✅ Load Environment Variables
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/blogManagement";
const ALLOWED_ORIGIN = process.env.NODE_ENV === 'production' 
  ? "https://99partners.in" 
  : "http://localhost:5173"; // Allow development server origin

console.log("Environment Variables Loaded:", {
  PORT,
  NODE_ENV: process.env.NODE_ENV,
  ALLOWED_ORIGIN
});

// ✅ Strict CORS Configuration
const corsOptions = {
  origin: ALLOWED_ORIGIN,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};

// Apply CORS middleware only once
app.use(cors(corsOptions));

// Add middleware to prevent duplicate headers
app.use((req, res, next) => {
  // Remove any duplicate headers
  res.removeHeader('Access-Control-Allow-Origin');
  res.removeHeader('Access-Control-Allow-Methods');
  res.removeHeader('Access-Control-Allow-Headers');
  next();
});

// Standard middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

// MongoDB Connection
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected:", MONGO_URI))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Google OAuth Setup
const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

// Import User model
const User = require('./models/User');

// Auth Middleware
async function verifyGoogleToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return next(createError.Unauthorized("Missing token"));

  const token = authHeader.split(" ")[1];
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) return next(createError.Unauthorized("Invalid token"));

    req.user = payload;
    next();
  } catch (error) {
    next(createError.Unauthorized(error.message));
  }
}

// Create API router
const apiRouter = express.Router();

// Protected Route
apiRouter.get("/protected", verifyGoogleToken, async (req, res, next) => {
  try {
    const { sub, email, name, picture } = req.user;
    const user = await User.findOneAndUpdate(
      { googleId: sub },
      { email, displayName: name, photo: picture },
      { new: true, upsert: true }
    );
    
    res.json({ 
      success: true,
      message: "Authorized access granted", 
      user 
    });
  } catch (err) {
    next(err);
  }
});

// Import and register additional routes
const authRoutes = require("./routes/authRoutes");
const joinRoutes = require("./routes/joinRoutes");
const contactRoutes = require("./routes/contactRoutes");
const blogRoutes = require("./routes/blogRoutes");
const newsletterRoutes = require("./routes/newsletterRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");

// ✅ Register Routes
app.use("/", authRoutes);
app.use("/api/join", joinRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

// Mount API router for protected routes
app.use("/api", apiRouter);

// Default Route
app.get("/", (req, res) => {
  res.send({ message: "✅ Server is up and running!" });
});

// 404 Handler
app.use((req, res, next) => {
  console.log(`❌ 404 - Route not found: ${req.method} ${req.originalUrl}`);
  next(createError.NotFound("Route not found"));
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("❌ Global error:", err.message);
  res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message || "Internal Server Error"
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📝 Mode: ${process.env.NODE_ENV || "development"}`);
  console.log(`🌐 Allowed Origin: ${ALLOWED_ORIGIN}`);
});