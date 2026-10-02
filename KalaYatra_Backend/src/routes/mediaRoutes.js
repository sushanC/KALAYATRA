const express = require("express");

const {
  getMedia,
  getMediaById,
  getMediaByCity,
  getMediaByArtForm
} = require("../controllers/mediaController");

const router = express.Router();


// ============================================================================
// MEDIA ROUTES
// ============================================================================

// GET /api/media
// Get all media
//
// Optional filters:
// /api/media?city=udupi
// /api/media?city=mysuru
// /api/media?type=youtube
// /api/media?city=udupi&type=youtube
router.get("/", getMedia);


// GET /api/media/city/:citySlug
// Get all media belonging to a city
//
// Example:
// /api/media/city/udupi
// /api/media/city/mysuru
router.get("/city/:citySlug", getMediaByCity);


// GET /api/media/art-form/:artFormId
// Get all media belonging to a specific art form
router.get("/art-form/:artFormId", getMediaByArtForm);


// GET /api/media/:id
// Get one media item by MongoDB ID
router.get("/:id", getMediaById);


module.exports = router;