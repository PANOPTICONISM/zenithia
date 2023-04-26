import React from 'react';
import Main from '../../components/Main/Main';
import { useColumnsAndRows } from './TimeTracker.utils';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useFiltering } from '../../components/SearchBar/SearchBar.utils';
import { DateTime } from 'luxon';
import { TimeTrackerProps, postTimeTracker, updateTimeTracker } from '../../lib/timetracker';
import { v4 as uuidv4 } from 'uuid';

export const TimeTracker = () => {
  const { columns, rows, setRows } = useColumnsAndRows();
  const { filterModel, handleFilterChange } = useFiltering({ columnField: 'title' });

  const addTracking = () => {
    const randomId = uuidv4();
    const date = DateTime.now().toFormat('yyyy-MM-dd');
    const startTime = DateTime.now().toFormat('yyyy-MM-dd\'T\'HH:mm:ss.SSS');
   
    const obj = {
      id: randomId,
      date,
      start_time: startTime,
      finish_time: null,
      total: null,
      project_id: null,
    };
    setRows((current) => [...current, obj]);
    postTimeTracker(obj).catch((error) => console.log('POST: ' + error));

  };

  const handleProcessRowUpdate = React.useCallback((newRow: TimeTrackerProps, oldRow: TimeTrackerProps) => {
    if (!oldRow.id) {
      return oldRow;
    }

    const fixDateFormat = (date: string) => {
      return new Date(date).toLocaleDateString('en-US');
    };

    delete newRow.projects;

    const row = { 
      ...newRow,
      date: fixDateFormat(newRow.date),
    };

    updateTimeTracker(oldRow.id, row).catch((error) => console.log('UPDATE: ' + error));
    return newRow;
  }, []);

  const handleProcessRowUpdateError = React.useCallback((error: Error) => {
    console.log(error);
  }, []);
  
  return (
    <Main title="TimeTracker" handleClick={addTracking} buttonText='Add hours'>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid 
          columns={columns}
          rows={rows}
          editMode="row"
          processRowUpdate={handleProcessRowUpdate}
          onProcessRowUpdateError={handleProcessRowUpdateError}
          filterModel={filterModel}
          onFilterModelChange={handleFilterChange}
        />
      </Box>
    </Main>
  );
};
