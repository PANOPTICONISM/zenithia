import { Box, CircularProgress } from '@mui/material';
import React from 'react';

const Loading = () => {

  return (
    <Box sx={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
      <CircularProgress />
    </Box>
  );
};

export default Loading;