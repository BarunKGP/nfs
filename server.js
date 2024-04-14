import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import "dotenv/config";
import { hash } from "bcrypt";
import mongoose from "mongoose";
import { File } from "./models/File.js";

// Compatibility with CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up database and express app
mongoose
  .connect(process.env.DATABASE_URL)
  .then(console.log(`Connected to ${process.env.DATABASE_URL}`))
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Set up EJS view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Set up multer for file uploads
const upload = multer({ dest: path.join(__dirname, "uploads") });

app.get("/", (req, res) => {
  res.render("index");
});

// Handle file upload
app.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No files uploaded.");
  }

  console.log("Adding files to Mongo");

  const fileData = {
    originalName: req.file.originalname,
    path: req.file.path,
    createdAt: Date.now(),
    lastModifiedAt: Date.now(),
  };

  if (
    req.body.password != null &&
    req.body.password !== "" &&
    req.body.password !== " "
  ) {
    console.log("Hashing password");
    fileData.password = hash(req.body.password, Number(process.env.HASH_SALT));
    console.log("Hashing completed!");
  }

  const fileUpload = await File.create(fileData);

  console.log(fileUpload);
  console.log["File uploaded successfully"];
  // res.statusCode = 201;

  const fileLink = req.headers.origin + `/file/${fileUpload._id}`;

  res.render("index", { fileLink: fileLink });
});

app.get("/file/:id", async (req, res) => {
  const [filePath, fileOgName] = await handleDownload(req.params.id);
  res.download(filePath, fileOgName);
});

async function handleDownload(id) {
  const file = await File.findById(id);
  if (file == null) {
    console.error(`file: ${id} is unavailable`);
    return;
  }

  console.log(`Downloading ${file.originalName}`);
  file.downloads++;
  await file.save();

  console.log(`This file has been downloaded ${file.downloads} times!`);

  return [file.path, file.originalName];
}

// // Render the download.ejs file
// app.get("/download", (req, res) => {
//   const fileUrls = JSON.parse(req.query.urls);
//   res.render("download", { fileUrls });
// });

// Run the app
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




