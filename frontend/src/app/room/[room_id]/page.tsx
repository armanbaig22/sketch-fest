import React from 'react';
import { Box, Container, Grid, Paper, Typography, IconButton } from '@mui/material';
import Header from '@/components/Header';
import PlayerInfo from '@/components/PlayerInfo';
import Canvas from '@/components/Canvas';
import Chat from '@/components/Chat';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface RoomProps {
  params: {
    room_id: string;
  };
}

export default function Room({params}: RoomProps) {
  const roomName = params.room_id;
  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Header />
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={2}>
          <PlayerInfo />
        </Grid>

        <Grid item xs={8}>
          <Paper elevation={3} style={{ height: '70vh' }}>
            <Canvas />
          </Paper>
        </Grid>

        <Grid item xs={2}>
          <Chat roomName={roomName} />
        </Grid>
      </Grid>
    </Container>
  );
}
