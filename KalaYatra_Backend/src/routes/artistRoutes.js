const express = require("express");

const {
  getArtists,
  getArtistBySlug,
  getArtistsByCity,
  getDemoArtists
} = require("../controllers/artistController");

const router = express.Router();


// ============================================================================
// ARTIST ROUTES
// ============================================================================

// GET /api/artists
// Get all artists
//
// Optional:
// /api/artists?city=udupi
// /api/artists?city=mysuru
router.get("/", getArtists);


// GET /api/artists/demo
// Get demo artists used for the hackathon prototype
router.get("/demo", getDemoArtists);


// GET /api/artists/city/:citySlug
// Get all artists from a particular city
//
// Example:
// /api/artists/city/udupi
// /api/artists/city/mysuru
router.get("/city/:citySlug", getArtistsByCity);


// GET /api/artists/:slug
// Get one artist by slug
//
// Example:
// /api/artists/udupi-bannanje-sanjeeva-suvarna
router.get("/:slug", getArtistBySlug);


module.exports = router;