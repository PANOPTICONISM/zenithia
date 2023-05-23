import React from 'react';
import Main from '../components/Main/Main';
import { Typography } from '@mui/material';
import { DateTime } from 'luxon';

const Dashboard = () => {
  const date = new Date();
  const time = date.getHours();
  const greeting = (time < 12)? 'morning' :
    ((time <= 18 && time >= 12 ) ? 'afternoon' : 'night');

  return (
    <Main title={`Good ${greeting}`} hideMargin>
      <Typography fontSize={24} fontWeight={500}>{DateTime.now().toFormat('cccc, MMMM dd')}</Typography>
    </Main>
  );
};

export default Dashboard;
