const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema(
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

    artForms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ArtForm"
      }
    ],

    bio: {
      type: String,
      default: "",
      trim: true
    },

    shortBio: {
      type: String,
      default: "",
      trim: true
    },

    image: {
      type: String,
      default: ""
    },

    location: {
      type: String,
      default: "",
      trim: true
    },

    email: {
      type: String,
      default: null,
      trim: true
    },

    isDemoArtist: {
      type: Boolean,
      default: false
    },

    works: {
      type: [String],
      default: []
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

const Artist = mongoose.model("Artist", artistSchema);

module.exports = Artist;