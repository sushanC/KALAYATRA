const {
  askCulturalGuide,
  buildCulturalJourney,
  becomePartOfArt
} = require("../services/geminiService");


/* =========================================================
   1. ASK CULTURAL GUIDE
   POST /api/gemini/ask
   ========================================================= */

const askGuide = async (req, res) => {
  try {
    const {
      citySlug,
      question,
      artFormSlug
    } = req.body;

    // Validate required fields
    if (!citySlug || !question) {
      return res.status(400).json({
        success: false,
        message: "citySlug and question are required"
      });
    }

    const answer = await askCulturalGuide({
      citySlug,
      question,
      artFormSlug
    });

    return res.status(200).json({
      success: true,
      data: {
        question,
        answer
      }
    });

  } catch (error) {
    console.error("Cultural Guide Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to generate cultural guide response",
      error: error.message
    });
  }
};


/* =========================================================
   2. BUILD MY CULTURAL JOURNEY
   POST /api/gemini/journey
   ========================================================= */

const createCulturalJourney = async (req, res) => {
  try {
    const {
      citySlug,
      timeAvailable,
      interests
    } = req.body;

    // Validate required fields
    if (!citySlug || !timeAvailable) {
      return res.status(400).json({
        success: false,
        message: "citySlug and timeAvailable are required"
      });
    }

    // Interests are optional
    const userInterests = Array.isArray(interests)
      ? interests
      : [];

    const journey = await buildCulturalJourney({
      citySlug,
      timeAvailable: Number(timeAvailable),
      interests: userInterests
    });

    return res.status(200).json({
      success: true,
      data: journey
    });

  } catch (error) {
    console.error("Cultural Journey Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to build cultural journey",
      error: error.message
    });
  }
};


/* =========================================================
   3. BECOME PART OF THE ART
   POST /api/gemini/become-part
   ========================================================= */

const createArtExperience = async (req, res) => {
  try {
    const {
      citySlug,
      artFormSlug,
      name,
      personality
    } = req.body;

    // Validate required fields
    if (
      !citySlug ||
      !artFormSlug ||
      !name ||
      !personality
    ) {
      return res.status(400).json({
        success: false,
        message:
          "citySlug, artFormSlug, name and personality are required"
      });
    }

    const experience = await becomePartOfArt({
      citySlug,
      artFormSlug,
      name,
      personality
    });

    return res.status(200).json({
      success: true,
      data: experience
    });

  } catch (error) {
    console.error("Become Part of Art Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to create art experience",
      error: error.message
    });
  }
};


/* =========================================================
   EXPORTS
   ========================================================= */

module.exports = {
  askGuide,
  createCulturalJourney,
  createArtExperience
};