import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

const Header = () => {
  return (
    <Paper elevation={3} sx={{ padding: 2, mb: 2, width: '100%' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Sketch Fest</Typography>
        <Button variant="contained" color="primary" startIcon={<SettingsIcon />}>
          Settings
        </Button>
      </Box>
    </Paper>
  );
};

export default Header;
