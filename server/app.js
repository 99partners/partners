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
const PORT = process.env.PORT || 5050;
const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/blogManagement";
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map(item => item.trim())
  : [
      "https://99partners.in",
      "https://www.99partners.in",
      // "http://localhost:5173"
    ];

console.log("Environment Variables Loaded:", {
  PORT,
  NODE_ENV: process.env.NODE_ENV,
  ALLOWED_ORIGINS
});

// ✅ Strict CORS Configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (ALLOWED_ORIGINS.includes(origin)) {
      return callback(null, true);
    }
    
    console.log(`❌ CORS blocked for origin: ${origin}`);
    return callback(new Error(`Not allowed by CORS`), false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: [],
  optionsSuccessStatus: 200
};

// Apply CORS middleware only once - with debug logging
app.use((req, res, next) => {
  console.log(`Incoming ${req.method} request to ${req.path} from origin: ${req.headers.origin}`);
  next();
});

// Only use cors middleware - remove any other CORS-related middleware
app.use(cors(corsOptions));

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

// Routes
const User = require("./models/User");

// Import routes
const authRoutes = require("./routes/authRoutes");
const joinRoutes = require("./routes/joinRoutes");
const contactRoutes = require("./routes/contactRoutes");
const blogRoutes = require("./routes/blogRoutes");
const newsletterRoutes = require("./routes/newsletterRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");

// Apply routes with explicit base path
app.use("/api", authRoutes);
app.use("/api/join", joinRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

// Protected Route with explicit CORS headers
app.get("/api/protected", verifyGoogleToken, async (req, res, next) => {
  try {
    const { sub, email, name, picture } = req.user;
    const user = await User.findOneAndUpdate(
      { googleId: sub },
      { email, displayName: name, photo: picture },
      { new: true, upsert: true }
    );
    
    // Explicitly set headers for this endpoint
    const origin = req.headers.origin;
    if (ALLOWED_ORIGINS.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Credentials', 'true');
    
    res.send({ message: "Authorized access granted", user });
  } catch (err) {
    next(err);
  }
});

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
  console.log(`🌐 Allowed Origins: ${ALLOWED_ORIGINS.join(", ")}`);
});


// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const morgan = require("morgan");
// const createError = require("http-errors");
// const { OAuth2Client } = require("google-auth-library");

// // Models
// const User = require("./models/User");

// // Routes
// const authRoutes = require("./routes/authRoutes");
// const joinRoutes = require("./routes/joinRoutes");
// const contactRoutes = require("./routes/contactRoutes");
// const blogRoutes = require("./routes/blogRoutes");
// const newsletterRoutes = require("./routes/newsletterRoutes");
// const userRoutes = require("./routes/userRoutes");
// const adminRoutes = require("./routes/adminRoutes");

// const app = express();

// app.use(express.json());

// const corsOptions = {
//   origin: ["http://localhost:5173", "https://99partners.in", "https://www.99partners.in"],
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true,
// };

// app.use(cors(corsOptions));

// app.options("*", cors(corsOptions));

// // ✅ Manually handle preflight requests
// app.options('/protected', cors(corsOptions), (req, res) => {
//   res.sendStatus(200);
// });

// // Middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(morgan("dev"));

// // ✅ Register Routes
// app.use("/", authRoutes);
// app.use("/api/join", joinRoutes);
// app.use("/api/contact", contactRoutes);
// app.use("/api/blogs", blogRoutes);
// app.use("/api/newsletter", newsletterRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/admin", adminRoutes); // Admin management

// // Google OAuth Client - Handle missing environment variables

// const client = new OAuth2Client(
//   process.env.GOOGLE_CLIENT_ID,
//   process.env.GOOGLE_CLIENT_SECRET
// );

// // ✅ Middleware to verify Google ID token
// async function verify(req, res, next) {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) return next(createError.Unauthorized());

//   const token = authHeader.split(' ')[1];

//   try {
//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });

//     const payload = ticket.getPayload();
//     if (payload) {
//       req.user = payload;
//       next();
//     } else {
//       next(createError.Unauthorized());
//     }
//   } catch (err) {
//     next(createError.Unauthorized(err.message));
//   }
// }

// // ✅ Protected Route (Google login verification)
// app.get('/protected', verify, async (req, res, next) => {
//   try {
//     const { sub, email, name, picture } = req.user;

//     const user = await User.findOneAndUpdate(
//       { googleId: sub },
//       {
//         email,
//         displayName: name,
//         photo: picture,
//       },
//       { new: true, upsert: true }
//     );

//     res.send({ message: 'You are authorized', user });
//   } catch (err) {
//     next(err);
//   }
// });


// // ✅ Public Route
// app.get("/", (req, res) => {
//   res.send({ message: "✅ Server is up and running!" });
// });

// // ✅ MongoDB Connection
// const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/blogManagement";
// mongoose
//   .connect(mongoUri, {
//     // Remove deprecated options
//   })
//   .then(() => console.log("✅ MongoDB connected to:", mongoUri))
//   .catch((err) => {
//     console.error("❌ MongoDB connection error:", err);
//     console.log("💡 Make sure MongoDB is running on your system");
//     console.log("💡 Or install MongoDB locally: https://docs.mongodb.com/manual/installation/");
//   });

// // ✅ 404 Handler
// app.use((req, res, next) => {
//   next(createError.NotFound("Route not found"));
// });

// // ✅ Global Error Handler
// app.use((err, req, res, next) => {
//   console.error("Global error handler:", err);
//   res.status(err.status || 500).json({
//     status: err.status || 500,
//     message: err.message || "Internal Server Error",
//   });
// });

// // ✅ Start Server
// const PORT = process.env.PORT || 5050;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running at https://api.99partners.in`);
//   console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
//   if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
//     console.log(`⚠️  Google OAuth not configured. Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env file`);
//   }
// });


