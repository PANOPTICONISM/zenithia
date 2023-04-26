import { GridColDef } from '@mui/x-data-grid';
import React from 'react';
import { TimeTrackerProps, getTimeTracker, updateTimeTracker } from '../../lib/timetracker';
import { DateTime, Duration } from 'luxon';
import { Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { lightBlue } from '../../App';
import NotStartedIcon from '@mui/icons-material/NotStarted';
import StopCircleIcon from '@mui/icons-material/StopCircle';

export const useColumnsAndRows = () => {
  const [rows, setRows] = React.useState<TimeTrackerProps[]>([]);

  React.useEffect(() => {
    getTimeTracker()
      .then((res) => setRows(res))
      .catch((error) => console.log('GET: ' + error));
  }, []);

  const [selectedId, setSelectedId] = React.useState<string | undefined>(undefined);
  const [count, setCount] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(false);

  React.useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setCount((count) => count + 1000);
      }, 1000);
      rows.map((entry) => {
        if (entry.id === selectedId) {
          entry.finish_time = entry.date + 'T' + Duration.fromMillis(count).toISOTime();
        }
      });
      return () => {
        clearInterval(interval);
      };
    } 
  }, [isRunning, count]);


  const stopWatch = (time: string, id: string, date: string) => {
    const timestamp = DateTime.fromISO(time).toLocaleString(DateTime.TIME_WITH_SECONDS);
    const timeInMilliseconds = Duration.fromISOTime(timestamp).as('milliseconds');
    if (!isRunning) {
      setCount(timeInMilliseconds);
      setSelectedId(id);
    } else {
      const finalTimestamp = date + 'T' + Duration.fromMillis(count).toISOTime();
      setSelectedId(undefined);
      updateTimeTracker(id, { finish_time: finalTimestamp })
        .catch((error) => console.log('Update: ' + error));
    }

    setIsRunning(!isRunning);
  };

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
    },
    {
      field: 'finish_time',
      headerName: 'Finish',
      flex: 1,
      valueFormatter: params => params.value ? DateTime.fromISO(params.value).toLocaleString(DateTime.TIME_WITH_SECONDS) : '',
    },
    {
      field: 'hours',
      headerName: 'Hours',
      flex: 1,
    },
    {
      field: 'project',
      headerName: 'Project',
      minWidth: 100,
      flex: 1,
      editable: true,
      renderCell: ({ row }) => row?.projects && <Box sx={{ background: lightBlue, padding: '6px 10px', borderRadius: '4px' }}>{row.projects.title}</Box>
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: ({ row }) => 
        <>
          <IconButton color="success" onClick={() => stopWatch(row.start_time, row.id, row.date)} disabled={row.finish_time !== null && selectedId !== row.id}> 
            {isRunning && row.id === selectedId ? <StopCircleIcon /> : <NotStartedIcon />} 
          </IconButton>
          <IconButton color="error"> <DeleteIcon /> </IconButton>
        </>
    },
  ];

  return { columns, rows, setRows };
};