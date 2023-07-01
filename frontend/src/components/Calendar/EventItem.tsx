import { EventContentArg } from '@fullcalendar/core';
import { Box, Typography } from '@mui/material';

export const EventItem = ({ info }: { info: EventContentArg }) => {
  const { event, timeText } = info;
  
  return (
    <Box px="5px">
      <Typography variant='overline' fontWeight={700}>{event.title}</Typography>
      <Typography>{timeText}</Typography>
    </Box>
  );
};