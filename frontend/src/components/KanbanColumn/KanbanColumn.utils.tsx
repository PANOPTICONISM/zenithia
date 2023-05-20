import { Box, Typography, Stack } from '@mui/material';
import { white, highlight, green, yellow, red, grey } from 'App';
import React from 'react';

export const DateAndLevel = ({ level, deadline } : { level: string | null, deadline: string }) => {
  if (level === 'low') {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
        <Typography 
          fontSize="14px" 
          marginRight="6px" 
          sx={{ background: green, color: white, padding: '8px', borderRadius: '4px' }}>{deadline}</Typography>
        <Stack spacing={0.5} direction="row">
          <Box sx={{ width: '24px', height: '12px', borderRadius: '0 0 60px 0', background: green }} />
          <Box sx={{ width: '24px', height: '12px', borderRadius: '0 0 60px 0', background: grey }} />
          <Box sx={{ width: '24px', height: '12px', borderRadius: '0 0 60px 0', background: grey }} />
        </Stack>
      </Box>
    );
  }
  if (level === 'medium') {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
        <Typography 
          fontSize="14px" 
          marginRight="6px" 
          sx={{ background: yellow, color: white, padding: '8px', borderRadius: '4px' }}>{deadline}</Typography>
        <Stack spacing={0.5} direction="row">
          <Box sx={{ width: '24px', height: '12px', borderRadius: '0 0 60px 0', background: yellow }} />
          <Box sx={{ width: '24px', height: '12px', borderRadius: '0 0 60px 0', background: yellow }} />
          <Box sx={{ width: '24px', height: '12px', borderRadius: '0 0 60px 0', background: grey }} />
        </Stack>
      </Box>
    );
  }
  if (level === 'high') {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
        <Typography 
          fontSize="14px" 
          marginRight="6px" 
          sx={{ background: red, color: white, padding: '8px', borderRadius: '4px' }}>{deadline}</Typography>
        <Stack spacing={0.5} direction="row">
          <Box sx={{ width: '24px', height: '12px', borderRadius: '0 0 60px 0', background: red }} />
          <Box sx={{ width: '24px', height: '12px', borderRadius: '0 0 60px 0', background: red }} />
          <Box sx={{ width: '24px', height: '12px', borderRadius: '0 0 60px 0', background: red }} />
        </Stack>
      </Box>
    );
  }
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
      <Typography 
        fontSize="14px" 
        marginRight="6px" 
        sx={{ background: highlight, color: white, padding: '8px', borderRadius: '4px' }}>{deadline}</Typography>
      <Stack spacing={0.5} direction="row">
        <Box sx={{ width: '24px', height: '12px', borderRadius: '0 0 60px 0', background: grey }} />
        <Box sx={{ width: '24px', height: '12px', borderRadius: '0 0 60px 0', background: grey }} />
        <Box sx={{ width: '24px', height: '12px', borderRadius: '0 0 60px 0', background: grey }} />
      </Stack>
    </Box>
  );
};