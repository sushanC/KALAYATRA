const express = require("express");

const {
  getCities,
  getCityBySlug
} = require("../controllers/cityController");

const router = express.Router();


// GET /api/cities
router.get("/", getCities);


// GET /api/cities/:slug
router.get("/:slug", getCityBySlug);


module.exports = router;