const Artist = require("../models/Artist");
const City = require("../models/City");


// ============================================================================
// GET ALL ARTISTS
// GET /api/artists
// ============================================================================

const getArtists = async (req, res) => {
  try {
    const { city, artForm } = req.query;

    const filter = {};

    // Filter by city
    if (city) {
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

    // Filter by art form
    if (artForm) {
      filter.artForms = artForm;
    }

    const artists = await Artist.find(filter)
      .populate("city", "name slug state")
      .populate(
        "artForms",
        "name slug category description image"
      )
      .sort({ name: 1 })
      .lean();

    res.status(200).json({
      success: true,
      count: artists.length,
      data: artists
    });

  } catch (error) {
    console.error("Error fetching artists:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch artists",
      error: error.message
    });
  }
};


// ============================================================================
// GET ARTIST BY SLUG
// GET /api/artists/:slug
// ============================================================================

const getArtistBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const artist = await Artist.findOne({ slug })
      .populate(
        "city",
        "name slug state country description"
      )
      .populate(
        "artForms",
        "name slug category description history culturalSignificance image"
      )
      .lean();

    if (!artist) {
      return res.status(404).json({
        success: false,
        message: "Artist not found"
      });
    }

    res.status(200).json({
      success: true,
      data: artist
    });

  } catch (error) {
    console.error("Error fetching artist:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch artist",
      error: error.message
    });
  }
};


// ============================================================================
// GET ARTISTS BY CITY
// GET /api/artists/city/:citySlug
// ============================================================================

const getArtistsByCity = async (req, res) => {
  try {
    const { citySlug } = req.params;

    const city = await City.findOne({
      slug: citySlug.toLowerCase()
    });

    if (!city) {
      return res.status(404).json({
        success: false,
        message: "City not found"
      });
    }

    const artists = await Artist.find({
      city: city._id
    })
      .populate(
        "artForms",
        "name slug category description image"
      )
      .sort({ name: 1 })
      .lean();

    res.status(200).json({
      success: true,
      city: {
        name: city.name,
        slug: city.slug
      },
      count: artists.length,
      data: artists
    });

  } catch (error) {
    console.error(
      "Error fetching artists by city:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch artists for city",
      error: error.message
    });
  }
};


// ============================================================================
// GET DEMO ARTISTS
// GET /api/artists/demo
// ============================================================================

const getDemoArtists = async (req, res) => {
  try {
    const artists = await Artist.find({
      isDemoArtist: true
    })
      .populate("city", "name slug")
      .populate(
        "artForms",
        "name slug category"
      )
      .sort({ name: 1 })
      .lean();

    res.status(200).json({
      success: true,
      count: artists.length,
      data: artists
    });

  } catch (error) {
    console.error(
      "Error fetching demo artists:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch demo artists",
      error: error.message
    });
  }
};


// ============================================================================
// EXPORT
// ============================================================================

module.exports = {
  getArtists,
  getArtistBySlug,
  getArtistsByCity,
  getDemoArtists
};