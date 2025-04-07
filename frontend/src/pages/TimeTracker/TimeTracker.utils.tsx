import DeleteIcon from "@mui/icons-material/Delete";
import NotStartedIcon from "@mui/icons-material/NotStarted";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import { Box, IconButton } from "@mui/material";
import { GridColDef, GridRowId } from "@mui/x-data-grid";
import { useUserData } from "contexts/UserProvider";
import { dateFromISOToLocaleString } from "lib/dates";
import { DateTime } from "luxon";
import React from "react";
import { toast } from "react-toastify";
import { getProjects } from "../../api/projects";
import {
  TimeTrackerProps,
  deleteTimeTracker,
  getTimeTracker,
  updateTimeTracker,
} from "../../api/timetracker";
import { lightBlue } from "../../App";
import { ProjectProps } from "../Projects/Projects.types";

export const useColumnsAndRows = () => {
  const [rows, setRows] = React.useState<TimeTrackerProps[]>([]);
  const [projects, setProjects] = React.useState<ProjectProps[]>([]);

  const [user] = useUserData();

  React.useEffect(() => {
    if (!user) {
      return;
    }
    getTimeTracker(user.token)
      .then((res) => setRows(res))
      .catch((error) => toast.error(error));

    getProjects<ProjectProps[]>(user.token)
      .then((res) => setProjects(res))
      .catch((error) => toast.error(error));
  }, [user]);

  const [selectedId, setSelectedId] = React.useState<string | undefined>(
    undefined
  );
  const [count, setCount] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(false);

  React.useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setCount((count) => count + 1000);
      }, 1000);
      setRows((currentRows) => {
        return currentRows.map((entry) => {
          if (entry.id === selectedId) {
            const startTime = DateTime.fromISO(entry.start_time);
            const finishTime = startTime
              .plus({ milliseconds: count })
              .toUTC()
              .toFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
            return { ...entry, finish_time: finishTime };
          }
          return entry;
        });
      });
      return () => clearInterval(interval);
    }
  }, [isRunning, count]);

  const startWatch = (time: string, id: string) => {
    setCount(0);
    setSelectedId(id);
    setIsRunning(true);
  };

  const stopWatch = (time: string, id: string) => {
    const startTime = DateTime.fromISO(time);
    const finalTime = startTime.plus({ milliseconds: count });
    const finalTimestamp = finalTime
      .toUTC()
      .toFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");

    setSelectedId(undefined);
    setIsRunning(false);

    if (!user) {
      return;
    }
    updateTimeTracker(user.token, id, {
      finish_time: finalTimestamp,
      total: count,
    }).catch((error) => toast.error(error));

    setIsRunning(false);
  };

  const deleteEntry = React.useCallback(
    (id: GridRowId) => {
      if (!user) {
        return;
      }
      deleteTimeTracker(user.token, id)
        .then(() =>
          setRows((prevRows) => prevRows.filter((row) => row.id !== id))
        )
        .catch((error) => toast.error(error));
    },
    [user]
  );

  const formatHours = (finish: string, start: string) => {
    const duration = DateTime.fromISO(finish).diff(DateTime.fromISO(start), [
      "hours",
      "minutes",
      "seconds",
    ]);

    return duration.hours + "h " + duration.minutes + "m";
  };

  const columns: GridColDef[] = [
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      valueFormatter: (params) => dateFromISOToLocaleString(params.value),
      type: "date",
      editable: true,
    },
    {
      field: "start_time",
      headerName: "Start",
      flex: 1,
      valueFormatter: (params) =>
        DateTime.fromISO(params.value)
          .toLocal()
          .toLocaleString(DateTime.TIME_WITH_SECONDS),
    },
    {
      field: "finish_time",
      headerName: "Finish",
      flex: 1,
      valueFormatter: (params) =>
        params.value
          ? DateTime.fromISO(params.value)
              .toLocal()
              .toLocaleString(DateTime.TIME_WITH_SECONDS)
          : "",
    },
    {
      field: "hours",
      headerName: "Hours",
      flex: 1,
      valueGetter: (params) =>
        params.row.finish_time
          ? formatHours(params.row.finish_time, params.row.start_time)
          : "",
    },
    {
      field: "project_id",
      headerName: "Project",
      minWidth: 100,
      flex: 1,
      editable: true,
      type: "singleSelect",
      valueOptions: projects.map((project) => ({
        value: project.id,
        label: project.title,
      })),
      valueGetter: (params) => params.value || "",
      renderCell: (params) =>
        params.formattedValue && (
          <Box
            sx={{
              background: lightBlue,
              padding: "6px 10px",
              borderRadius: "4px",
            }}
          >
            {params.formattedValue}
          </Box>
        ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: ({ row }) => (
        <>
          <IconButton
            color="success"
            onClick={() =>
              isRunning
                ? stopWatch(row.start_time, row.id)
                : startWatch(row.start_time, row.id)
            }
            disabled={
              (row.finish_time !== null && selectedId !== row.id) ||
              (isRunning && row.id !== selectedId)
            }
          >
            {isRunning && row.id === selectedId ? (
              <StopCircleIcon />
            ) : (
              <NotStartedIcon />
            )}
          </IconButton>
          <IconButton color="error" onClick={() => deleteEntry(row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return { columns, rows, setRows };
};
