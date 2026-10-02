const express = require("express");

const {
  getArtworks,
  getArtworkBySlug,
  getArtworksByCity
} = require("../controllers/artworkController");

const router = express.Router();


// ============================================================================
// ARTWORK ROUTES
// ============================================================================

// GET /api/artworks
// Get all artworks
//
// Optional:
// /api/artworks?city=udupi
// /api/artworks?city=mysuru
// /api/artworks?artForm=...
// /api/artworks?artist=...
router.get("/", getArtworks);


// GET /api/artworks/city/:citySlug
// Get all artworks belonging to a city
//
// Example:
// /api/artworks/city/udupi
// /api/artworks/city/mysuru
router.get("/city/:citySlug", getArtworksByCity);


// GET /api/artworks/:slug
// Get one artwork by slug
//
// Example:
// /api/artworks/my-artwork
router.get("/:slug", getArtworkBySlug);


module.exports = router;