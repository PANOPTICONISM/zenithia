import { GridColDef, GridRowId } from '@mui/x-data-grid';
import React from 'react';
import { TimeTrackerProps, deleteTimeTracker, getTimeTracker, updateTimeTracker } from '../../lib/timetracker';
import { DateTime, Duration } from 'luxon';
import { Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { lightBlue } from '../../App';
import NotStartedIcon from '@mui/icons-material/NotStarted';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import { getProjects } from '../../lib/projects';
import { ProjectProps } from '../Projects/types';

export const useColumnsAndRows = () => {
  const [rows, setRows] = React.useState<TimeTrackerProps[]>([]);
  const [projects, setProjects] = React.useState<ProjectProps[]>([]);

  React.useEffect(() => {
    getTimeTracker('*, projects(*)')
      .then((res) => setRows(res))
      .catch((error) => console.log('GET: ' + error));
    
    getProjects()
      .then((res) => setProjects(res))
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

      const duration = DateTime.fromISO(finalTimestamp).diff(DateTime.fromISO(time), ['hours', 'minutes', 'seconds']).as('milliseconds');
      updateTimeTracker(id, { finish_time: finalTimestamp, total: duration })
        .catch((error) => console.log('Update: ' + error));
    }

    setIsRunning(!isRunning);
  };


  const deleteEntry = React.useCallback((id: GridRowId) => {
    deleteTimeTracker(id)
      .then(() => setRows((prevRows) => prevRows.filter((row) => row.id !== id)))
      .catch((error) => {
        console.log('DELETE: ' + error.message); 
      });
  }, []);

  const formatHours = (finish: string, start: string) => {
    const duration = DateTime.fromISO(finish).diff(DateTime.fromISO(start), ['hours', 'minutes', 'seconds']);

    return duration.hours + 'h ' +  duration.minutes + 'm';
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
      valueGetter: params => params.row.finish_time ? formatHours(params.row.finish_time, params.row.start_time) : ''	
    },
    {
      field: 'project_id',
      headerName: 'Project',
      minWidth: 100,
      flex: 1,
      editable: true,
      type: 'singleSelect',
      valueOptions: projects,
      getOptionValue: (value: any)=> value?.id,
      getOptionLabel: (value: any) => value.title,
      valueGetter: params => params.value || '',
      renderCell: (params) => params.formattedValue && <Box sx={{ background: lightBlue, padding: '6px 10px', borderRadius: '4px' }}>{params.formattedValue}</Box>
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: ({ row }) => 
        <>
          <IconButton 
            color="success" 
            onClick={() => stopWatch(row.start_time, row.id, row.date)} 
            disabled={row.finish_time !== null && selectedId !== row.id}> 
            {isRunning && row.id === selectedId ? <StopCircleIcon /> : <NotStartedIcon />} 
          </IconButton>
          <IconButton 
            color="error" 
            onClick={() => deleteEntry(row.id)}> <DeleteIcon /> </IconButton>
        </>
    },
  ];

  return { columns, rows, setRows };
};