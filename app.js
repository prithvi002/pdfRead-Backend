const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
// Middleware to parse JSON and URL-encoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up multer storage for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('file:');
    return cb(null, './public/files');
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// Endpoint to handle file upload
app.post('/upload-pdf', upload.single('file'), (req, res) => {
  try {
    console.log('File:', req.file);

    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No PDF file uploaded' });
    }
    // Process the uploaded file, e.g., save it to a database or perform further operations
    // For now, just send a success message
    return res.status(200).json({ message: 'PDF file uploaded successfully' });
  } catch (error) {
    console.error('Error handling PDF upload:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to handle the POST request from the frontend
app.post('/ask-question', (req, res) => {
  // Access the question data from the request body
  const question = req.body.question;

  // Do something with the question data (e.g., save to a database)
  console.log('Received question:', question);

  // Send a response back to the client
  res.send('Question received successfully');
});


// Start the server
app.listen(5000, () => {
  console.log(`Server is running on http://localhost:5000`);
});
