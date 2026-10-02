const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    type: {
      type: String,
      required: true,
      enum: ["youtube", "image", "audio"]
    },

    url: {
      type: String,
      required: true,
      trim: true
    },

    thumbnail: {
      type: String,
      default: ""
    },

    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
      required: true
    },

    artForm: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ArtForm",
      default: null
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

    sourceUrl: {
      type: String,
      default: "",
      trim: true
    },

    attribution: {
      type: String,
      default: "",
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const Media = mongoose.model("Media", mediaSchema);

module.exports = Media;