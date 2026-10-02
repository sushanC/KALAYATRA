const mongoose = require("mongoose");

const artworkSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
      required: true
    },

    artForm: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ArtForm",
      required: true
    },

    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist",
      default: null
    },

    description: {
      type: String,
      default: "",
      trim: true
    },

    year: {
      type: String,
      default: "",
      trim: true
    },

    image: {
      type: String,
      default: ""
    },

    tags: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

const Artwork = mongoose.model("Artwork", artworkSchema);

module.exports = Artwork;