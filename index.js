// import fs from "node:fs";
// import fsPromises from "mode:fs/promises";
import path from "path";
import fs from "fs";
import { promises as fsPromises } from "fs";

const rootDir = "./files";

// Using fs.readdir() with callback
fs.readdir(rootDir, (err, files) => {
  if (err) {
    if (err.code === "ENOENT") {
      console.log(`Directory '${rootDir}' does not exist.`);
    } else {
      console.error("Error reading directory:", err);
    }
    return;
  }

  const markdownFiles = files.filter((file) => file.endsWith(".md"));
  files.filter((file) => console.log(file));
  console.log(`Total Markdown files in '${rootDir}': ${markdownFiles.length}`);
});



