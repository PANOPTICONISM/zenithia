import { Box, CircularProgress } from '@mui/material';

const Loading = () => {

  return (
    <Box sx={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
      <CircularProgress />
    </Box>
  );
};

export default Loading;