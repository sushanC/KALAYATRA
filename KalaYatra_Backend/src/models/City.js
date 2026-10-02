const mongoose = require("mongoose");

const citySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    state: {
      type: String,
      default: "Karnataka",
      trim: true
    },

    country: {
      type: String,
      default: "India",
      trim: true
    },

    description: {
      type: String,
      required: true,
      trim: true
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

const City = mongoose.model("City", citySchema);

module.exports = City;