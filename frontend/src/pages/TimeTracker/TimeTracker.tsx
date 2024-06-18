import React from "react";
import Main from "../../components/Main/Main";
import { useColumnsAndRows } from "./TimeTracker.utils";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  TimeTrackerProps,
  postTimeTracker,
  updateTimeTracker,
} from "../../api/timetracker";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { useUserData } from "contexts/UserProvider";
import {
  currentDate,
  currentTime,
  dateFromJSDateToISOForApi,
  timeFromISOToFormatForApi,
} from "lib/dates";

const TimeTracker = () => {
  const { columns, rows, setRows } = useColumnsAndRows();

  const [user] = useUserData();

  const addTracking = () => {
    if (!user) {
      return;
    }

    const obj = {
      id: uuidv4(),
      date: currentDate(),
      total: null,
      start_time: currentTime(),
      finish_time: null,
      project_id: null,
    };
    postTimeTracker(user.token, obj)
      .then(() => setRows((current) => [...current, obj]))
      .catch((error) => toast.error(error));
  };

  const handleProcessRowUpdate = React.useCallback(
    (newRow: TimeTrackerProps, oldRow: TimeTrackerProps) => {
      if (!oldRow.id || !user) {
        return oldRow;
      }

      const row = {
        date: dateFromJSDateToISOForApi(newRow.date),
        start_time: timeFromISOToFormatForApi(oldRow.start_time),
        finish_time:
          oldRow.finish_time !== null
            ? timeFromISOToFormatForApi(oldRow.finish_time)
            : null,
        project_id: newRow.project_id || null,
      };

      updateTimeTracker(user.token, oldRow.id, row)
        .then(() =>
          setRows((currentRows) => {
            return currentRows.map((currentRow) => {
              if (currentRow.id === oldRow.id) {
                return {
                  ...currentRow,
                  date: dateFromJSDateToISOForApi(newRow.date),
                  project_id: newRow.project_id || null,
                };
              }
              return currentRow;
            });
          }),
        )
        .catch((error) => toast.error(error));
      return newRow;
    },
    [user],
  );

  const handleProcessRowUpdateError = React.useCallback((error: Error) => {
    console.log(error);
  }, []);

  return (
    <Main title="Time Tracker" handleClick={addTracking} buttonText="Add hours">
      <Box sx={{ height: 620, width: "100%" }}>
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
