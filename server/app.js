require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// Dynamic allowed origins from environment
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',') 
  : [
      "https://99partners.in",
      "https://www.99partners.in",
      "http://localhost:5173" // optional for development
    ];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('Blocked by CORS:', origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "X-Custom-Request",
    "Cache-Control",
    "Pragma",
  ],
  credentials: true,
  exposedHeaders: ["X-Custom-Request"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

const mongoose = require("mongoose");
const morgan = require("morgan");
const createError = require("http-errors");
const { OAuth2Client } = require("google-auth-library");

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

// ✅ Models & Routes
const User = require("./models/User");
const authRoutes = require("./routes/authRoutes");
const joinRoutes = require("./routes/joinRoutes");
const contactRoutes = require("./routes/contactRoutes");
const blogRoutes = require("./routes/blogRoutes");
const newsletterRoutes = require("./routes/newsletterRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use("/", authRoutes);
app.use("/api/join", joinRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

// ✅ Google OAuth Client
const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

// ✅ Middleware to verify Google ID token
async function verify(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return next(createError.Unauthorized());

  const token = authHeader.split(" ")[1];

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (payload) {
      req.user = payload;
      next();
    } else {
      next(createError.Unauthorized());
    }
  } catch (err) {
    next(createError.Unauthorized(err.message));
  }
}

// ✅ Protected Route
app.get("/protected", verify, async (req, res, next) => {
  try {
    const { sub, email, name, picture } = req.user;

    const user = await User.findOneAndUpdate(
      { googleId: sub },
      { email, displayName: name, photo: picture },
      { new: true, upsert: true }
    );

    res.send({ message: "You are authorized", user });
  } catch (err) {
    next(err);
  }
});

// ✅ Root Route
app.get("/", (req, res) => {
  res.send({ message: "✅ Server is up and running!" });
});

// ✅ MongoDB Connection
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/blogManagement";
mongoose
  .connect(mongoUri)
  .then(() => console.log("✅ MongoDB connected to:", mongoUri))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ 404 Handler
app.use((req, res, next) => {
  next(createError.NotFound("Route not found"));
});

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error("Global error handler:", err);
  res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message || "Internal Server Error",
  });
});

// ✅ Start Server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`🚀 Server running at https://api.99partners.in`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || "development"}`);
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


