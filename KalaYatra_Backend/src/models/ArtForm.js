const mongoose = require("mongoose");

const artFormSchema = new mongoose.Schema(
  {
    name: {
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

    category: {
      type: String,
      required: true,
      enum: [
        "Performing Arts",
        "Music",
        "Arts & Crafts",
        "Literature & Language"
      ]
    },

    originType: {
      type: String,
      enum: [
        "local",
        "regional",
        "performed_here"
      ],
      default: "regional"
    },

    description: {
      type: String,
      required: true,
      trim: true
    },

    history: {
      type: String,
      default: "",
      trim: true
    },

    culturalSignificance: {
      type: String,
      default: "",
      trim: true
    },

    characteristics: {
      type: [String],
      default: []
    },

    materials: {
      type: [String],
      default: []
    },

    examples: {
      type: [String],
      default: []
    },

    artists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artist"
      }
    ],

    media: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Media"
      }
    ],

    locations: {
      type: [String],
      default: []
    },

    journeyDuration: {
      type: Number,
      default: 30
    },

    tags: {
      type: [String],
      default: []
    },

    image: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

const ArtForm = mongoose.model("ArtForm", artFormSchema);

module.exports = ArtForm;