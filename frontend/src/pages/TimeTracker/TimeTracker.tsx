import React from 'react';
import Main from '../../components/Main/Main';
import { useColumnsAndRows } from './TimeTracker.utils';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { DateTime } from 'luxon';
import { TimeTrackerProps, postTimeTracker, updateTimeTracker } from '../../lib/timetracker';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { useUserData } from 'contexts/UserProvider';

const TimeTracker = () => {
  const { columns, rows, setRows } = useColumnsAndRows();

  const [user] = useUserData();

  const addTracking = () => {
    const date = DateTime.now().toFormat('yyyy-MM-dd');
    const startTime = DateTime.now().toFormat('yyyy-MM-dd\'T\'HH:mm:ss.SSS');

    if (!user) {
      return;
    }

    const obj = {
      id: uuidv4(),
      date,
      start_time: startTime,
      finish_time: null,
      total: null,
      project_id: null,
      user_id: user.id
    };
    postTimeTracker(user.token, obj)
      .then(() => setRows((current) => [...current, obj]))
      .catch((error) => toast.error(error));

  };

  const handleProcessRowUpdate = React.useCallback((newRow: TimeTrackerProps, oldRow: TimeTrackerProps) => {
    if (!oldRow.id || !user) {
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

    updateTimeTracker(user.token, oldRow.id, row)
      .catch((error) => toast.error(error));
    return newRow;
  }, [user]);

  const handleProcessRowUpdateError = React.useCallback((error: Error) => {
    console.log(error);
  }, []);
  
  return (
    <Main title="Time Tracker" handleClick={addTracking} buttonText='Add hours'>
      <Box sx={{ height: 620, width: '100%' }}>
        <DataGrid 
          columns={columns}
          rows={rows}
          editMode="row"
          processRowUpdate={handleProcessRowUpdate}
          onProcessRowUpdateError={handleProcessRowUpdateError}
        />
      </Box>
    </Main>
  );
};

export default TimeTracker;
