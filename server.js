import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { nanoid } from 'nanoid';

// Compatibility with CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

app.use(express.static('public'));

// Set up EJS view engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

// Set up multer for file uploads
const upload = multer({ dest: "uploads/" });
// Set up multer for file uploads
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     }
// });
//
// const upload = multer({ storage: storage });

app.get('/', (req, res) => {
  res.render('index')
})


///////////// Old implementation /////////////
// // File upload route
// app.post('/upload', upload.single('file'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).send('No file uploaded');
//   }
//
//   const fileUrl = `${req.protocol}://${req.get('host')}/${req.file.path}`;
//   res.send(fileUrl);
// });
//
// // File download route
// app.get('/download/:fileName', (req, res) => {
//   const fileName = req.params.fileName;
//   const filePath = __dirname + '/uploads/' + fileName;
//   res.download(filePath);
// });
//

function generateURL(prefix) {
  prefix = prefix || '/download';
  res = prefix + '/' + nanoid();
  downloadURLs = downloadURLs.concat(res);
  return res;
}

// Handle file upload
let downloadURLs = [];
app.post('/upload', upload.array('files'), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).send('No files uploaded.');
    }

    const fileUrls = req.files.map(file => ({
        downloadUrl: generateURL(),
        filename: file.originalname,
        url: `${req.protocol}://${req.get('host')}/${file.originalname}`
    }));
    res.json(fileUrls);
});

// Render the download.ejs file
app.get('/download', (req, res) => {
    const fileUrls = JSON.parse(req.query.urls);
    res.render('download', { fileUrls });
});


// Run the app
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})



