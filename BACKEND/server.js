const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { exec } = require('child_process');
const app = express();
const port = 3001;

// Configure Multer for file storage
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/') // Make sure this directory exists or create it
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + "." + file.originalname.split(".").slice(-1))
  }
});

const upload = multer({ storage: storage });

// Use CORS middleware
app.use(cors());

app.post('/train-model', upload.fields([
  { name: 'video', maxCount: 12 },
  { name: 'image', maxCount: 10 },
]), (req, res) => {
  console.log("/train-model triggered");
  console.log(`Uploaded ${req.files.length} files.`);

  video_file = "/home/zihanxue/AdSpace/BACKEND/uploads/video.mp4"
  image_file = "/home/zihanxue/AdSpace/BACKEND/uploads/image.jpg"
  output_path = "/home/zihanxue/AdSpace/BACKEND/outputs/out.mp4"
  // You can execute the shell script here if needed, pass file info etc.
  exec(
    `conda run -n gc python3 run.py --input_video ${video_file} --input_image ${image_file} --output_path ${output_path}`,
    { cwd: '/home/zihanxue/AdSpace/BACKEND/gc/sber-swap' },
    (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        console.log(`stdout: ${stdout}`);
        // console.error(`stderr: ${stderr}`);
        return res.status(500).send('Error executing the training script');
      }
      // console.log(`stdout: ${stdout}`);
      // console.error(`stderr: ${stderr}`);
      // res.send('Model training initiated successfully');
      res.sendFile(output_path, (err) => {
        if (err) {
            console.log('Error sending file:', err);
            res.status(500).send('Could not send the file');
        } else {
            console.log('File sent successfully');
        }
      });
    }
  );
});

app.get("/", (req, res) => {
  console.log("/ triggered");
  res.send('Hello');
});

app.post("/test", (req, res) => {
  console.log("/test triggered");
  res.send('Hello');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
