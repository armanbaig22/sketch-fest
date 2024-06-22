import React from 'react';
import { Box, Paper } from '@mui/material';

const Canvas = () => {
  return (
    <Paper elevation={3} sx={{ padding: 2, mb: 2, height: '100%', backgroundColor: '#f5f5f5' }}>
      {/* Canvas drawing logic goes here */}
      <Box height="100%"></Box>
    </Paper>
  );
};

export default Canvas;
