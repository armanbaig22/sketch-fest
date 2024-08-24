import React from 'react';
import { Box, Typography, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';

interface Player {
  id: string;
  username: string;
  avatar: string; // SVG string or URL
}

interface PlayerInfoProps {
  players: Player[];
}

const PlayerInfo: React.FC<PlayerInfoProps> = ({ players }) => {
  return (
    <Box sx={{ padding: 2, mb: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
      <Typography variant="h6" gutterBottom>
        Players
      </Typography>
      <List>
        {players.map((player) => (
          <ListItem key={player.id}>
            <ListItemAvatar>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2px solid #e0e0e0',
                }}
                dangerouslySetInnerHTML={{ __html: player.avatar }}
              />
            </ListItemAvatar>
            <ListItemText primary={player.username} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default PlayerInfo;
