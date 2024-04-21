import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

export default function Sidebar() {
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
      />
      <TextField
        fullWidth
        type="file"
        inputProps={{ accept: "audio/*" }}
        margin="normal"
        variant="outlined"
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        type="submit"
      >
        Generate
      </Button>
    </Box>
  );
}
