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
app.post('/train-model', upload.fields([
  { name: 'video', maxCount: 1 },
  { name: 'image', maxCount: 1 },
  { name: 'audio', maxCount: 1 }
]), (req, res) => {
  console.log("/train-model triggered");

  // Check files and print the uploaded files
  if (req.files['video']) {
    console.log(`Uploaded ${req.files['video'].length} video(s).`);
  }
  if (req.files['image']) {
    console.log(`Uploaded ${req.files['image'].length} image(s).`);
  }
  if (req.files['audio']) {
    console.log(`Uploaded ${req.files['audio'].length} audio file(s).`);
  }

  // Assuming only one video and one image are required for the script
  const video_file = req.files['video'] ? req.files['video'][0].path : '';
  const image_file = req.files['image'] ? req.files['image'][0].path : '';
  const output_path = "outputs/out.mp4";
  // video_file = "video.mp4"
  // image_file = "image.jpeg"
  // output_path = "outputs/out.mp4"
  
  // You can execute the shell script here if needed, pass file info etc.
  exec(`./train.sh ${video_file} ${image_file} ${output_path}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).send('Error executing the training script');
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
    // Send the video file as a response
    res.sendFile(output_path, (err) => {
      if (err) {
          console.log('Error sending file:', err);
          res.status(500).send('Could not send the file');
      } else {
          console.log('File sent successfully');
      }
    });
  });
});

app.get("/", (req, res) => {
  console.log("/ triggered");
  res.send('Hello');
});

app.listen(port, host, () => {
  console.log(`Server running on http://${host}:${port}`);
});
