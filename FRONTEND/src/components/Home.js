import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import Sidebar from './Sidebar';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1 }}>
          Main Content Area
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
