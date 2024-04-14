import mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
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
    default: 0,
  },
});

const File = mongoose.model("File", FileSchema);

export { File };
