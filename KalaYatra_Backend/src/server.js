// ============================================================================
// LOAD ENVIRONMENT VARIABLES FIRST
// ============================================================================

const dotenv = require("dotenv");

dotenv.config();


// ============================================================================
// IMPORTS
// ============================================================================

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

// Models
const City = require("./models/City");
const Artist = require("./models/Artist");
const ArtForm = require("./models/ArtForm");
const Artwork = require("./models/Artwork");
const Media = require("./models/Media");

// Routes
const cityRoutes = require("./routes/cityRoutes");
const artFormRoutes = require("./routes/artFormRoutes");
const artistRoutes = require("./routes/artistRoutes");
const artworkRoutes = require("./routes/artworkRoutes");
const mediaRoutes = require("./routes/mediaRoutes");
const geminiRoutes = require("./routes/geminiRoutes");


// ============================================================================
// CONNECT TO MONGODB
// ============================================================================

connectDB();


// ============================================================================
// CREATE EXPRESS APP
// ============================================================================

const app = express();


// ============================================================================
// MIDDLEWARE
// ============================================================================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


// ============================================================================
// ROOT ROUTE
// ============================================================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to KalaYatra API",
    status: "Backend is running"
  });
});


// ============================================================================
// HEALTH CHECK
// ============================================================================

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "KalaYatra backend is healthy"
  });
});


// ============================================================================
// API ROUTES
// ============================================================================

app.use("/api/cities", cityRoutes);

app.use("/api/art-forms", artFormRoutes);

app.use("/api/artists", artistRoutes);

app.use("/api/artworks", artworkRoutes);

app.use("/api/media", mediaRoutes);

app.use("/api/gemini", geminiRoutes);


// ============================================================================
// 404 HANDLER
// ============================================================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found"
  });
});


// ============================================================================
// START SERVER
// ============================================================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("=================================");
  console.log("       KALAYATRA BACKEND");
  console.log("=================================");
  console.log(`Server running on port ${PORT}`);
  console.log(`URL: http://localhost:${PORT}`);
  console.log("=================================");
});