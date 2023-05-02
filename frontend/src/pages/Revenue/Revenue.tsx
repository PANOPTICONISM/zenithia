import { Box, Stack, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Main from 'components/Main/Main';
import React from 'react';
import { useColumnsAndRows } from './Revenue.utils';
import PublicIcon from '@mui/icons-material/Public';
import TodayIcon from '@mui/icons-material/Today';
import { grey } from 'App';

const EarningsTimeline = ({ text, total, icon } : {text: string, total: string, icon: React.ReactNode}) => {

  return (
    <Stack direction="row" spacing={1} padding="24px" sx={{ border: `1px solid ${grey}`, width: '100%' }} alignItems="center">
      {icon}
      <Box>
        <Typography fontWeight={700}>{text}</Typography>
        <Typography fontSize="30px">{total}</Typography>
      </Box>
    </Stack>
  );
};

const Revenue = () => {
  const { columns, data } = useColumnsAndRows();

  return (
    <Main title="Revenue">
      <Stack direction="row" spacing={2} paddingBottom="24px">
        <EarningsTimeline text="Earnings this year" total="0" icon={<PublicIcon sx={{ height: '100%', width: '70px' }} />} />
        <EarningsTimeline text="Earnings this month" total="0" icon={<TodayIcon sx={{ height: '100%', width: '70px' }} />} />
      </Stack>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid 
          columns={columns}
          rows={data}
        />
      </Box>
    </Main>
  );
};

export default Revenue;