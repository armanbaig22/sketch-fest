"use client";
import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Paper, Typography, List, ListItem, ListItemText } from '@mui/material';

export default function Chat({ roomName }: { roomName: string }) {
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [chatSocket, setChatSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8000/ws/chat/${roomName}/`);

    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setMessages((prevMessages) => [...prevMessages, data.message]);
    };

    socket.onclose = (e) => {
      console.error('Chat socket closed unexpectedly');
    };

    setChatSocket(socket);

    return () => {
      socket.close();
    };
  }, [roomName]);

  const sendMessage = () => {
    if (chatSocket && newMessage.trim() !== '') {
      chatSocket.send(JSON.stringify({ message: newMessage }));
      setNewMessage('');
    }
  };

  return (
    <Paper elevation={3} sx={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '16px' }}>
      <Typography variant="h6" gutterBottom>
        Chat
      </Typography>
      <List sx={{ flexGrow: 1, overflowY: 'auto', marginBottom: '16px', padding: '16px' }}>
        {messages.map((message, index) => (
          <ListItem key={index}>
            <ListItemText primary={message} />
          </ListItem>
        ))}
      </List>
      <Box sx={{ display: 'flex' }}>
        <TextField
          sx={{ flexGrow: 1, marginRight: '8px' }}
          variant="outlined"
          placeholder="Enter message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={sendMessage}>
          Send
        </Button>
      </Box>
    </Paper>
  );
}
