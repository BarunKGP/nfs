import mongoose from "mongoose";

const File = new mongoose.Schema({
  path: {
    type: String,
    required: true,
  },
  originalName: {
    type: String,
    required: true,
  },
  password: String,
  createdAt: Date,
  lastModifiedAt: Date,
  downloads: {
    type: Number,
    required: True,
    default: 0,
  },
});

mongoose.model("File", File);
module.exports = File;
