import { Box } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { DateTime, Duration } from "luxon";
import React from "react";
import { lightBlue } from "../../App";
import {
  ProjectFormattedProps,
  useGetProjectsFormatted,
} from "../../hooks/useGetProjectsFormatted";
import { currencyToLocale } from "../../lib/currency";
import { dateFromISOToLocaleString } from "../../lib/dates";
import { ProjectProps } from "../Projects/Projects.types";

export const useColumnsAndRows = () => {
  const { projects } = useGetProjectsFormatted();
  const [rows, setRows] = React.useState<ProjectFormattedProps[]>([]);
  const [filteredData, setFilteredData] = React.useState<
    ProjectFormattedProps[]
  >([]);

  React.useEffect(() => {
    if (!projects) {
      return;
    }

    setRows(projects);
    setFilteredData(projects);
  }, [projects]);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 85,
      valueFormatter: (value: string | undefined) => value?.slice(0, 8),
    },
    {
      field: "title",
      headerName: "Project",
      minWidth: 120,
      flex: 1,
      renderCell: (params) => {
        if (!params.value) {
          return null;
        }
        return (
          <Box
            sx={{
              background: lightBlue,
              padding: "0 10px",
            }}
          >
            {params.value}
          </Box>
        );
      },
    },
    {
      field: "client",
      headerName: "Client",
      minWidth: 120,
      flex: 1,
    },
    {
      field: "start_date",
      headerName: "Start",
      minWidth: 100,
      flex: 1,
      valueFormatter: (value) => dateFromISOToLocaleString(value),
      type: "date",
    },
    {
      field: "finish_date",
      headerName: "Finish",
      minWidth: 100,
      flex: 1,
      valueFormatter: (value) => dateFromISOToLocaleString(value),
      type: "date",
    },
    {
      field: "base_price",
      headerName: "Base Price",
      minWidth: 120,
      flex: 1,
      type: "number",
      valueFormatter: (value) => currencyToLocale(value),
    },
    {
      field: "revenue",
      headerName: "Revenue",
      minWidth: 80,
      flex: 1,
    },
    {
      field: "tracked_time_in_milliseconds",
      headerName: "Time",
      minWidth: 80,
      flex: 1,
      valueFormatter: (value) => Duration.fromMillis(value).toFormat("hh:mm"),
    },
    {
      field: "estimated_earnings",
      headerName: "Total",
      minWidth: 120,
      flex: 1,
      valueFormatter: (value) => currencyToLocale(value),
    },
  ];

  return { columns, rows, setRows, filteredData, setFilteredData };
};

export const finalizeTotals = (
  logs: ProjectFormattedProps[] | ProjectProps[]
) =>
  logs.map((entry) => {
    const initialValue = 0;
    const totalMilliseconds = entry?.time_tracker?.reduce(
      (accumulator, currentValue) =>
        accumulator + Number(currentValue?.total || 0),
      initialValue
    );

    const totalMinutes =
      totalMilliseconds &&
      Math.floor(Duration.fromMillis(totalMilliseconds).as("minutes"));
    let totalPrice = 0;
    if (entry.base_price && totalMinutes) {
      if (entry.revenue === "Project") {
        totalPrice = entry.base_price;
      } else {
        totalPrice = (entry.base_price * totalMinutes) / 60;
      }
    }

    return { totalPrice, totalMilliseconds };
  });

export const logsByTimeline = (rows: ProjectFormattedProps[] | undefined) => {
  if (!rows) {
    return { totalMonthlySum: 0, totalYearlySum: 0 };
  }

  const currentYear = new Date().getFullYear();
  const thisYearLogs = rows.filter(
    (entry) => DateTime.fromISO(entry.finish_date).year === currentYear
  );

  const totalYearlySum = finalizeTotals(thisYearLogs).reduce(
    (partialSum, { totalPrice }) => partialSum + totalPrice,
    0
  );

  const currentMonth = new Date().getMonth();
  const thisMonthLogs = rows.filter(
    (entry) =>
      DateTime.fromISO(entry.finish_date).month === currentMonth + 1 &&
      DateTime.fromISO(entry.finish_date).year === currentYear
  );
  const totalMonthlySum = finalizeTotals(thisMonthLogs).reduce(
    (partialSum, { totalPrice }) => partialSum + totalPrice,
    0
  );

  return { totalMonthlySum, totalYearlySum };
};
