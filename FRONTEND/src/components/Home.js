import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import Sidebar from './Sidebar';
import VideoPlayer from './VideoPlayer';
import { useState } from 'react';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [vurl, setVurl] = useState(null);
  const appStyle = {
    display: 'flex',  // Use flexbox for layout
    height: '100vh',  // Full viewport height
  };

  const videoContainerStyle = {
    flex: 1,  // Take remaining space
    display: 'flex',  // Nested flexbox for video player sizing
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div style={appStyle}>
        <Sidebar setVurl={setVurl} />
        <div style={videoContainerStyle}>
          <VideoPlayer vurl={vurl} />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
