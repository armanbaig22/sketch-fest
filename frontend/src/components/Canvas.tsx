"use client";

import React, { useRef, useEffect, useState } from 'react';
import { fabric } from 'fabric';
import { Box, Paper, Button, Slider, Typography, Divider, ToggleButton, ToggleButtonGroup } from '@mui/material';
import FormatPaintIcon from '@mui/icons-material/FormatPaint';
import CircleIcon from '@mui/icons-material/Circle';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Canvas({ roomName }: { roomName: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [color, setColor] = useState<string>('#000000');
  const [brushSize, setBrushSize] = useState<number>(5);
  const [chatSocket, setChatSocket] = useState<WebSocket | null>(null);
  const [tool, setTool] = useState<'brush' | 'eraser'>('brush');
  const [eraserSize, setEraserSize] = useState<'small' | 'medium' | 'large'>('medium');

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8000/ws/canvas/${roomName}/`);

    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type === 'canvas_event') {
        canvas?.loadFromJSON(data.canvas, canvas.renderAll.bind(canvas));
      }
    };

    setChatSocket(socket);

    return () => {
      socket.close();
    };
  }, [roomName, canvas]);

  useEffect(() => {
    if (canvasRef.current && containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;

      const canvasInstance = new fabric.Canvas(canvasRef.current, {
        isDrawingMode: true,
        width: containerWidth,
        height: containerHeight,
      });
      setCanvas(canvasInstance);

      return () => {
        canvasInstance.dispose();
      };
    }
  }, []);

  useEffect(() => {
    if (canvas && chatSocket) {
      const handleMouseUp = () => {
        chatSocket.send(
          JSON.stringify({
            type: 'canvas_event',
            canvas: JSON.stringify(canvas.toJSON()),
          })
        );
      };

      canvas.on('mouse:up', handleMouseUp);

      return () => {
        canvas.off('mouse:up', handleMouseUp);
      };
    }
  }, [canvas, chatSocket]);

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    setTool('brush');
    if (canvas) {
      canvas.freeDrawingBrush.color = newColor;
      canvas.isDrawingMode = true;
    }
  };

  const handleBrushSizeChange = (event: Event, newValue: number | number[]) => {
    const size = newValue as number;
    setBrushSize(size);
    if (canvas) {
      canvas.freeDrawingBrush.width = size;
    }
  };

  const clearCanvas = () => {
    if (canvas) {
      canvas.clear();
      chatSocket?.send(
        JSON.stringify({
          type: 'canvas_event',
          canvas: JSON.stringify(canvas.toJSON()),
        })
      );
    }
  };

  const handleToolChange = (event: React.MouseEvent<HTMLElement>, newTool: 'brush' | 'eraser') => {
    if (newTool !== null) {
      setTool(newTool);
      if (canvas) {
        if (newTool === 'eraser') {
          canvas.freeDrawingBrush.color = '#FFFFFF';
        } else {
          canvas.freeDrawingBrush.color = color;
        }
        canvas.isDrawingMode = true;
      }
    }
  };

  const handleEraserSizeChange = (event: React.MouseEvent<HTMLElement>, newSize: 'small' | 'medium' | 'large') => {
    if (newSize !== null) {
      setEraserSize(newSize);
      if (canvas) {
        let size = 10;
        switch (newSize) {
          case 'small':
            size = 5;
            break;
          case 'medium':
            size = 15;
            break;
          case 'large':
            size = 30;
            break;
        }
        canvas.freeDrawingBrush.width = size;
      }
    }
  };

  const colors = [
    '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', 
    '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080'
  ];

  return (
    <Paper elevation={3} sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
      <Box ref={containerRef} sx={{ flexGrow: 1, width: '100%' }}>
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
      </Box>
      <Divider />
      <Box sx={{ padding: '8px' }}>
        <Typography variant="subtitle2" gutterBottom>Colors</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', marginBottom: '8px' }}>
          {colors.map((c) => (
            <Button 
              key={c}
              onClick={() => handleColorChange(c)} 
              sx={{ 
                minWidth: '30px', 
                width: '30px', 
                height: '30px', 
                padding: 0, 
                margin: '2px', 
                backgroundColor: c,
                border: color === c && tool === 'brush' ? '2px solid #000' : 'none'
              }}
            />
          ))}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <ToggleButtonGroup
            value={tool}
            exclusive
            onChange={handleToolChange}
            aria-label="drawing tool"
          >
            <ToggleButton value="brush" aria-label="brush">
              <FormatPaintIcon />
            </ToggleButton>
            <ToggleButton value="eraser" aria-label="eraser">
              <CircleIcon />
            </ToggleButton>
          </ToggleButtonGroup>
          {tool === 'brush' ? (
            <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '16px' }}>
              <Typography variant="caption" sx={{ marginRight: '8px' }}>Brush Size:</Typography>
              <Slider
                value={brushSize}
                onChange={handleBrushSizeChange}
                aria-labelledby="brush-size-slider"
                min={1}
                max={50}
                size="small"
                sx={{ width: '100px' }}
              />
            </Box>
          ) : (
            <ToggleButtonGroup
              value={eraserSize}
              exclusive
              onChange={handleEraserSizeChange}
              aria-label="eraser size"
              sx={{ marginLeft: '16px' }}
            >
              <ToggleButton value="small" aria-label="small eraser">
                <CircleIcon fontSize="small" />
              </ToggleButton>
              <ToggleButton value="medium" aria-label="medium eraser">
                <CircleIcon />
              </ToggleButton>
              <ToggleButton value="large" aria-label="large eraser">
                <CircleIcon fontSize="large" />
              </ToggleButton>
            </ToggleButtonGroup>
          )}
          <Button 
            onClick={clearCanvas} 
            variant="outlined" 
            color="secondary" 
            size="small" 
            startIcon={<DeleteIcon />}
            sx={{ marginLeft: 'auto' }}
          >
            Clear All
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}