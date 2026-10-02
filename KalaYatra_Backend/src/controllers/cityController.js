const City = require("../models/City");

// ============================================================================
// GET ALL CITIES
// GET /api/cities
// ============================================================================

const getCities = async (req, res) => {
  try {
    const cities = await City.find()
      .sort({ name: 1 })
      .lean();

    res.status(200).json({
      success: true,
      count: cities.length,
      data: cities
    });
  } catch (error) {
    console.error("Error fetching cities:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch cities",
      error: error.message
    });
  }
};


// ============================================================================
// GET CITY BY SLUG
// GET /api/cities/:slug
// ============================================================================

const getCityBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const city = await City.findOne({ slug })
      .lean();

    if (!city) {
      return res.status(404).json({
        success: false,
        message: "City not found"
      });
    }

    res.status(200).json({
      success: true,
      data: city
    });
  } catch (error) {
    console.error("Error fetching city:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch city",
      error: error.message
    });
  }
};


// ============================================================================
// EXPORT
// ============================================================================

module.exports = {
  getCities,
  getCityBySlug
};