import { Button } from '@mui/material';
import HdrStrongIcon from '@mui/icons-material/HdrStrong';
import React from 'react';

const StatusTag = ({ color, value } : { color: 'inherit' | 'success' | 'warning', value: string }) => {
  return (
    <Button 
      sx={{ padding: 0 }}
      variant="text" 
      color="inherit"
      endIcon={<HdrStrongIcon color={color} />}>
      {value}
    </Button>
  );
};

export default StatusTag;