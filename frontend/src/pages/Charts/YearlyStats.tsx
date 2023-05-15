import Main from 'components/Main/Main';
import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { darkBlue } from 'App';
import { Box } from '@mui/material';
import { getProjects } from 'lib/projects';
import { DateTime, Duration } from 'luxon';
import { ProjectFormattedProps } from 'pages/Revenue/types';

const YearlyStats = () => {

  return (
    <Main title='Bar chart'>
      Hello
    </Main>
  );
};

export default YearlyStats;