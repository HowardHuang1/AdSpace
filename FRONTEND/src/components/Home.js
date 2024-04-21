import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import Sidebar from './Sidebar';
import VideoPlayer from './VideoPlayer';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
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
        <Sidebar />
        <div style={videoContainerStyle}>
          <VideoPlayer />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
