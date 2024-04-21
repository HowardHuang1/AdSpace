const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { exec } = require('child_process');
const app = express();
const port = 3001;
const host = 'localhost'; // Or your GCP VM IP address if deploying

// Configure Multer for file storage
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/') // Make sure this directory exists or create it
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + file.originalname.split(".")[-1])
  }
});

const upload = multer({ storage: storage });

// Use CORS middleware
app.use(cors());

// Setup the /train-model route to accept file uploads
app.post('/train-model', upload.array('video', 12), (req, res) => {
  // Supports up to 12 files.
  console.log("/train-model triggered");
  console.log(`Uploaded ${req.files.length} files.`);

  video_file = "video.mp4"
  image_file = ""
  output_path = "outputs/out.mp4"
  // You can execute the shell script here if needed, pass file info etc.
  exec(`./train.sh ${video_file} ${image_file} ${output_path}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).send('Error executing the training script');
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
    res.send('Model training initiated successfully');
  });
});

app.get("/", (req, res) => {
  console.log("/ triggered");
  res.send('Hello');
});

app.listen(port, host, () => {
  console.log(`Server running on http://${host}:${port}`);
});
