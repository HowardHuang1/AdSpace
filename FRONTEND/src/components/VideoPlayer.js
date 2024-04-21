import React from 'react';

function VideoPlayer({ vurl }) {  

  const videoStyles = {
    width: '100%',    // Take the full width of the container
    height: '100%',   // Take the full height of the container
    objectFit: 'cover' // Maintain aspect ratio while covering full area
  };

  return (
    vurl && (
      <div>
      <video style={videoStyles} controls>
        <source src={vurl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
    )
  );
}

export default VideoPlayer;