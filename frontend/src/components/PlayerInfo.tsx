import React from 'react';
import { Box, Avatar, Typography, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';

const players = [
  { name: 'Player 1', score: 100, avatar: '/path/to/avatar1.png' },
  { name: 'Player 2', score: 200, avatar: '/path/to/avatar2.png' },
  // Add more players here
];

const PlayerInfo = () => {
  return (
    <Box sx={{ padding: 2, mb: 2, bgcolor: 'background.paper', borderRadius: 1}}>
      <Typography variant="h6" gutterBottom>
        Players
      </Typography>
      <List>
        {players.map((player, index) => (
          <ListItem key={index}>
            <ListItemAvatar>
              <Avatar src={player.avatar} />
            </ListItemAvatar>
            <ListItemText primary={player.name} secondary={`Score: ${player.score}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default PlayerInfo;
