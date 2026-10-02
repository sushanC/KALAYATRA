const express = require("express");

const {
  getArtForms,
  getArtFormBySlug,
  getArtFormsByCity,
  getArtFormsByCategory
} = require("../controllers/artFormController");

const router = express.Router();


// ============================================================================
// ART FORM ROUTES
// ============================================================================

// GET /api/art-forms
// Get all art forms
// Optional:
// /api/art-forms?city=udupi
// /api/art-forms?city=mysuru
// /api/art-forms?city=udupi&category=Performing%20Arts
router.get("/", getArtForms);


// GET /api/art-forms/city/:citySlug
// Get all art forms belonging to a city
// Example:
// /api/art-forms/city/udupi
// /api/art-forms/city/mysuru
router.get("/city/:citySlug", getArtFormsByCity);


// GET /api/art-forms/category/:category
// Get art forms by category
// Example:
// /api/art-forms/category/Music
router.get("/category/:category", getArtFormsByCategory);


// GET /api/art-forms/:slug
// Get one specific art form
// Example:
// /api/art-forms/yakshagana-badagutittu
router.get("/:slug", getArtFormBySlug);


module.exports = router;