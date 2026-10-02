const ArtForm = require("../models/ArtForm");


// ============================================================================
// GET ALL ART FORMS
// GET /api/art-forms
// ============================================================================

const getArtForms = async (req, res) => {
  try {
    const { city, category } = req.query;

    const filter = {};

    // Filter by city slug
    if (city) {
      const City = require("../models/City");

      const cityData = await City.findOne({
        slug: city.toLowerCase()
      });

      if (!cityData) {
        return res.status(404).json({
          success: false,
          message: "City not found"
        });
      }

      filter.city = cityData._id;
    }

    // Filter by category
    if (category) {
      filter.category = category;
    }

    const artForms = await ArtForm.find(filter)
      .populate("city", "name slug")
      .populate("artists", "name slug image isDemoArtist")
      .populate("media", "title type url thumbnail")
      .sort({ name: 1 })
      .lean();

    res.status(200).json({
      success: true,
      count: artForms.length,
      data: artForms
    });

  } catch (error) {
    console.error("Error fetching art forms:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch art forms",
      error: error.message
    });
  }
};


// ============================================================================
// GET ART FORM BY SLUG
// GET /api/art-forms/:slug
// ============================================================================

const getArtFormBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const artForm = await ArtForm.findOne({ slug })
      .populate("city", "name slug state country")
      .populate(
        "artists",
        "name slug bio shortBio image location isDemoArtist works"
      )
      .populate(
        "media",
        "title type url thumbnail description"
      )
      .lean();

    if (!artForm) {
      return res.status(404).json({
        success: false,
        message: "Art form not found"
      });
    }

    res.status(200).json({
      success: true,
      data: artForm
    });

  } catch (error) {
    console.error("Error fetching art form:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch art form",
      error: error.message
    });
  }
};


// ============================================================================
// GET ART FORMS BY CITY
// GET /api/art-forms/city/:citySlug
// ============================================================================

const getArtFormsByCity = async (req, res) => {
  try {
    const { citySlug } = req.params;

    const City = require("../models/City");

    const city = await City.findOne({
      slug: citySlug.toLowerCase()
    });

    if (!city) {
      return res.status(404).json({
        success: false,
        message: "City not found"
      });
    }

    const artForms = await ArtForm.find({
      city: city._id
    })
      .populate("city", "name slug")
      .populate("artists", "name slug image isDemoArtist")
      .populate("media", "title type url thumbnail")
      .sort({ category: 1, name: 1 })
      .lean();

    res.status(200).json({
      success: true,
      city: {
        name: city.name,
        slug: city.slug
      },
      count: artForms.length,
      data: artForms
    });

  } catch (error) {
    console.error(
      "Error fetching art forms by city:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch art forms for city",
      error: error.message
    });
  }
};


// ============================================================================
// GET ART FORMS BY CATEGORY
// GET /api/art-forms/category/:category
// ============================================================================

const getArtFormsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const artForms = await ArtForm.find({
      category
    })
      .populate("city", "name slug")
      .populate("artists", "name slug image isDemoArtist")
      .sort({ name: 1 })
      .lean();

    res.status(200).json({
      success: true,
      category,
      count: artForms.length,
      data: artForms
    });

  } catch (error) {
    console.error(
      "Error fetching art forms by category:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch art forms by category",
      error: error.message
    });
  }
};


// ============================================================================
// EXPORT
// ============================================================================

module.exports = {
  getArtForms,
  getArtFormBySlug,
  getArtFormsByCity,
  getArtFormsByCategory
};