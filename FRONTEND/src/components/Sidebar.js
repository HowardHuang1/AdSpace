import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';

export default function Sidebar({ setVurl }) {
  const [videoFile, setVideoFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const onVideoFileChange = event => {
    setVideoFile(event.target.files[0] || null);
  };
  const onImageFileChange = event => {
    setImageFile(event.target.files[0] || null);
  };
  const onAudioFileChange = event => {
    setAudioFile(event.target.files[0] || null);
  };

  const handleTrainModel = async () => {
    if (!videoFile && !imageFile && !audioFile) {
      alert('Please select at least one file to upload.');
      return;
    }

    const formData = new FormData();
    if (videoFile) {
      formData.append("video", videoFile);
    }
    if (imageFile) {
      formData.append("image", imageFile);
    }
    if (audioFile) {
      formData.append("audio", audioFile);
    }

    setIsUploading(true);
    // try {
    //   const response = await axios.post('http://34.125.104.107:3001/train-model', formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data'
    //     }
    //   });
    //   console.log('Model training started:', response.data);
    //   alert('Upload successful!');
    // } catch (error) {
    //   console.error('Error training model:', error);
    //   alert('Error uploading files.');
    // }
    try {
      const response = await axios.post('http://34.125.104.107:3001/train-model', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        responseType: 'blob' // Important for handling binary data like videos
      });
      console.log('Model training started');
  
      const url = window.URL.createObjectURL(new Blob([response.data]));
      console.log("url", url)
      setVurl(url);
      // const link = document.createElement('a');
      // link.href = url;
      // link.setAttribute('download', 'trainedModel.mp4');
      // document.body.appendChild(link);
      // link.click();
      // window.URL.revokeObjectURL(url); // Clean up the URL object
      // document.body.removeChild(link);
  
      alert('Upload successful!');
    } catch (error) {
      console.error('Error training model:', error);
      alert('Error uploading files.');
    } finally {
      setIsUploading(false);
    }
    
  };

  return (
    <Box sx={{
      width: 300,
      height: '100vh',
      bgcolor: 'background.default',
      color: 'text.primary',
      p: 2
    }}>
      <Typography variant="h6" gutterBottom>
        Upload Files
      </Typography>
      <TextField
        fullWidth
        type="file"
        inputProps={{ accept: "video/*" }}
        margin="normal"
        variant="outlined"
        onChange={onVideoFileChange}
        disabled={isUploading}
      />
      <TextField
        fullWidth
        type="file"
        inputProps={{ accept: "image/*" }}
        margin="normal"
        variant="outlined"
        onChange={onImageFileChange}
        disabled={isUploading}
      />
      <TextField
        fullWidth
        type="file"
        inputProps={{ accept: "audio/*" }}
        margin="normal"
        variant="outlined"
        onChange={onAudioFileChange}
        disabled={isUploading}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleTrainModel}
        disabled={isUploading}
      >
        {isUploading ? 'Uploading...' : 'Generate'}
      </Button>
    </Box>
  );
}
