const Media = require("../models/Media");
const City = require("../models/City");


// ============================================================================
// GET ALL MEDIA
// GET /api/media
// ============================================================================

const getMedia = async (req, res) => {
  try {
    const { city, type, artForm, artist } = req.query;

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

    // Filter by media type
    if (type) {
      filter.type = type.toLowerCase();
    }

    // Filter by art form
    if (artForm) {
      filter.artForm = artForm;
    }

    // Filter by artist
    if (artist) {
      filter.artist = artist;
    }

    const media = await Media.find(filter)
      .populate("city", "name slug")
      .populate(
        "artForm",
        "name slug category description"
      )
      .populate(
        "artist",
        "name slug image isDemoArtist"
      )
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      count: media.length,
      data: media
    });

  } catch (error) {
    console.error("Error fetching media:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch media",
      error: error.message
    });
  }
};


// ============================================================================
// GET MEDIA BY ID
// GET /api/media/:id
// ============================================================================

const getMediaById = async (req, res) => {
  try {
    const { id } = req.params;

    const media = await Media.findById(id)
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

    if (!media) {
      return res.status(404).json({
        success: false,
        message: "Media not found"
      });
    }

    res.status(200).json({
      success: true,
      data: media
    });

  } catch (error) {
    console.error("Error fetching media:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch media",
      error: error.message
    });
  }
};


// ============================================================================
// GET MEDIA BY CITY
// GET /api/media/city/:citySlug
// ============================================================================

const getMediaByCity = async (req, res) => {
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

    const media = await Media.find({
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
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      city: {
        name: city.name,
        slug: city.slug
      },
      count: media.length,
      data: media
    });

  } catch (error) {
    console.error(
      "Error fetching media by city:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch media for city",
      error: error.message
    });
  }
};


// ============================================================================
// GET MEDIA BY ART FORM
// GET /api/media/art-form/:artFormId
// ============================================================================

const getMediaByArtForm = async (req, res) => {
  try {
    const { artFormId } = req.params;

    const media = await Media.find({
      artForm: artFormId
    })
      .populate(
        "city",
        "name slug"
      )
      .populate(
        "artist",
        "name slug image isDemoArtist"
      )
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      count: media.length,
      data: media
    });

  } catch (error) {
    console.error(
      "Error fetching media by art form:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch media for art form",
      error: error.message
    });
  }
};


// ============================================================================
// EXPORT
// ============================================================================

module.exports = {
  getMedia,
  getMediaById,
  getMediaByCity,
  getMediaByArtForm
};