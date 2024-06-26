import React from 'react';
import { Box, Typography, Button, Paper, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

const Header = () => {
  return (
    <Paper elevation={3} sx={{ padding: 2, mb: 2, width: '100%' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">time and rounds</Typography>
        <IconButton color="primary">
          <SettingsIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default Header;
