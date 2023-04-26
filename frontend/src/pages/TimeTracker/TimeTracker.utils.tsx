import { GridColDef } from '@mui/x-data-grid';
import React from 'react';
import { getTimeTracker } from '../../lib/timetracker';
import { DateTime } from 'luxon';
import { Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { lightBlue } from '../../App';
import NotStartedIcon from '@mui/icons-material/NotStarted';
import StopCircleIcon from '@mui/icons-material/StopCircle';

export const useColumnsAndRows = () => {
  const [rows, setRows] = React.useState<string[]>([]);

  React.useEffect(() => {
    getTimeTracker()
      .then((res) => setRows(res))
      .catch((error) => console.log('GET: ' + error));
  }, []);

  console.log(rows);

  const columns: GridColDef[] = [
    {
      field: 'date',
      headerName: 'Date',
      flex: 1,
      valueFormatter: params => new Date(params.value).toLocaleDateString(),
      type: 'date',
      editable: true,
    },
    {
      field: 'start_time',
      headerName: 'Start',
      flex: 1,
      valueFormatter: params => DateTime.fromISO(params.value).toLocaleString(DateTime.TIME_WITH_SECONDS),
      editable: true,
    },
    {
      field: 'finish_time',
      headerName: 'Finish',
      flex: 1,
      valueFormatter: params => DateTime.fromISO(params.value).toLocaleString(DateTime.TIME_WITH_SECONDS),
      editable: true,
    },
    {
      field: 'hours',
      headerName: 'Hours',
      flex: 1,
      editable: true,
    },
    {
      field: 'project_id',
      headerName: 'Project',
      minWidth: 100,
      flex: 1,
      editable: true,
      renderCell: ({ value }) => <Box sx={{ background: lightBlue, padding: '6px 10px', borderRadius: '4px' }}>{value}</Box>
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => 
        <>
          <IconButton color="success"> <NotStartedIcon /> </IconButton>
          <IconButton color="error"> <DeleteIcon /> </IconButton>
        </>
    },
  ];

  return { columns, rows, setRows };
};