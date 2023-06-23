const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
// Define the user schema
const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "first name is required"],
      trim: true,
    },
    lastname: {
      type: String,
      required: [true, "last name is required"],
      trim: true,
    },
    username: {
      type: String,
      required: [true, "username is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    picture: {
      type: String,
      default: "",
    },
    cover: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      required: [true, "gender is required"],
    },
    bYear: {
      type: Number,
      required: true,
      trim: true,
    },
    bMonth: {
      type: Number,
      required: true,
      trim: true,
    },
    bDay: {
      type: Number,
      required: [true, "gender is required"],
      trim: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    friends: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    followers: {
      type: Array,
      default: [],
    },
    requests: {
      type: Array,
      default: [],
    },
    search: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
        },
      },
    ],
    details: {
      bio: {
        type: String,
      },
      otherName: {
        type: String,
      },
      job: {
        type: String,
      },
      workPlace: {
        type: String,
      },
      highSchool: {
        type: String,
      },
      college: {
        type: String,
      },
    },
    savedPosts: [
      {
        post: {
          type: ObjectId,
          ref: "Post",
        },
        savedAt: {
          type: Date,
          default: new Date(),
        },
      },
    ],
  },
  { timestamps: true }
);

// Create the user model
const User = mongoose.model("User", userSchema);

// Export the user model
module.exports = User;
