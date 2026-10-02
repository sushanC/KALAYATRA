const Artwork = require("../models/Artwork");
const City = require("../models/City");


// ============================================================================
// GET ALL ARTWORKS
// GET /api/artworks
// ============================================================================

const getArtworks = async (req, res) => {
  try {
    const { city, artForm, artist } = req.query;

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
      filter.artForm = artForm;
    }

    // Filter by artist
    if (artist) {
      filter.artist = artist;
    }

    const artworks = await Artwork.find(filter)
      .populate("city", "name slug")
      .populate(
        "artForm",
        "name slug category description"
      )
      .populate(
        "artist",
        "name slug image isDemoArtist"
      )
      .sort({ title: 1 })
      .lean();

    res.status(200).json({
      success: true,
      count: artworks.length,
      data: artworks
    });

  } catch (error) {
    console.error("Error fetching artworks:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch artworks",
      error: error.message
    });
  }
};


// ============================================================================
// GET ARTWORK BY SLUG
// GET /api/artworks/:slug
// ============================================================================

const getArtworkBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const artwork = await Artwork.findOne({ slug })
      .populate(
        "city",
        "name slug state country"
      )
      .populate(
        "artForm",
        "name slug category description history culturalSignificance"
      )
      .populate(
        "artist",
        "name slug bio shortBio image location isDemoArtist works"
      )
      .lean();

    if (!artwork) {
      return res.status(404).json({
        success: false,
        message: "Artwork not found"
      });
    }

    res.status(200).json({
      success: true,
      data: artwork
    });

  } catch (error) {
    console.error("Error fetching artwork:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch artwork",
      error: error.message
    });
  }
};


// ============================================================================
// GET ARTWORKS BY CITY
// GET /api/artworks/city/:citySlug
// ============================================================================

const getArtworksByCity = async (req, res) => {
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

    const artworks = await Artwork.find({
      city: city._id
    })
      .populate(
        "artForm",
        "name slug category"
      )
      .populate(
        "artist",
        "name slug image isDemoArtist"
      )
      .sort({ title: 1 })
      .lean();

    res.status(200).json({
      success: true,
      city: {
        name: city.name,
        slug: city.slug
      },
      count: artworks.length,
      data: artworks
    });

  } catch (error) {
    console.error(
      "Error fetching artworks by city:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch artworks for city",
      error: error.message
    });
  }
};


// ============================================================================
// EXPORT
// ============================================================================

module.exports = {
  getArtworks,
  getArtworkBySlug,
  getArtworksByCity
};