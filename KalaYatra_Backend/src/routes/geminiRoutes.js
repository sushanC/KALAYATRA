const express = require("express");

const {
  askGuide,
  createCulturalJourney,
  createArtExperience
} = require("../controllers/geminiController");

const router = express.Router();

/*
  Ask Gemini about the selected city's culture
*/
router.post("/ask", askGuide);

/*
  Build a personalized cultural journey
*/
router.post("/journey", createCulturalJourney);

/*
  Create a personalized "Become Part of the Art" experience
*/
router.post("/become-part", createArtExperience);

module.exports = router;