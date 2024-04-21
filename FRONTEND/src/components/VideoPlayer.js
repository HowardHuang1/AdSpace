import React from 'react';

function VideoPlayer() {
  const videoPath = '~/BACKEND/outputs/out.mp4';  

  const videoStyles = {
    width: '100%',    // Take the full width of the container
    height: '100%',   // Take the full height of the container
    objectFit: 'cover' // Maintain aspect ratio while covering full area
  };

  return (
    <div>
      <video style={videoStyles} controls>
        <source src={videoPath} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default VideoPlayer;