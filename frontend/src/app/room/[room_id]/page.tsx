"use client";

import React, { useEffect } from 'react';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import Header from '@/components/Header';
import PlayerInfo from '@/components/PlayerInfo';
import Canvas from '@/components/Canvas';
import Chat from '@/components/Chat';
import { Socket } from 'dgram';

interface RoomProps {
  params: {
    room_id: string;
  };
}

export default function Room({params}: RoomProps) {
  const roomName = params.room_id;

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8000/ws/room/${roomName}/`);
  })

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: '#f0f0f0' }}>
      <Box sx={{ width: '80%', textAlign: 'left' }}>
        <Typography variant="h4" sx={{ mt: 2 }}>
          Sketch Fest
        </Typography>
      </Box>
      <Box sx={{ flexShrink: 0, width: '80%', my: 2 }}>
        <Paper elevation={3}>
          <Header/>
        </Paper>
      </Box>
      
      <Box sx={{ flexGrow: 1, overflow: 'hidden', width: '80%', mb: 2 }}>
        <Grid container spacing={2} sx={{ height: '100%' }}>
          <Grid item xs={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Paper elevation={3} sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
              <PlayerInfo />
            </Paper>
          </Grid>
        
          <Grid item xs={6} sx={{ height: '100%' }}>
            <Paper elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>Canvas</Typography>
              <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
                <Canvas roomName={roomName} />
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Paper elevation={3} sx={{ flexGrow: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
                <Chat roomName={roomName} />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}