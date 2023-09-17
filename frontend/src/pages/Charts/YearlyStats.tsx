import Main from "components/Main/Main";
import React from "react";
import { DateTime } from "luxon";
import { Box } from "@mui/material";
import { useGetProjectsFormatted } from "hooks/useGetProjectsFormatted";
import PieChart from "components/Charts/PieChart";
import { PieChartProps } from "components/Charts/Charts.types";

const useRevenueData = () => {
  const { projects, setProjects } = useGetProjectsFormatted();

  const profitableEntries = React.useMemo(() => {
    return projects.filter((entry) =>
      entry.time_tracker
        ? entry?.time_tracker?.length > 0
        : entry.time_tracker === undefined,
    );
  }, [projects]);

  const groupedByLogs = profitableEntries.reduce(
    (entryMap, e) =>
      entryMap.set(DateTime.fromISO(e.finish_date).year, [
        ...(entryMap.get(DateTime.fromISO(e.finish_date).year) || []),
        e,
      ]),
    new Map(),
  );

  const yearlyLogsTotals: PieChartProps = [];
  groupedByLogs.forEach((value, key) => {
    const initialValue = 0;
    const total = value.reduce(
      (accumulator: number, currentValue: { estimated_earnings: number }) =>
        accumulator + (currentValue?.estimated_earnings || 0),
      initialValue,
    );
    const obj = {
      id: key,
      label: key,
      value: total,
      color: "red",
    };
    yearlyLogsTotals.push(obj);
  });

  return { data: projects, setData: setProjects, yearlyLogsTotals };
};

const YearlyStats = () => {
  const { yearlyLogsTotals } = useRevenueData();
  const exampleData =
    yearlyLogsTotals.length > 0
      ? yearlyLogsTotals
      : [
          {
            id: "php",
            label: "php",
            value: 202,
            color: "hsl(306, 70%, 50%)",
          },
          {
            id: "java",
            label: "java",
            value: 244,
            color: "hsl(343, 70%, 50%)",
          },
          {
            id: "hack",
            label: "hack",
            value: 369,
            color: "hsl(87, 70%, 50%)",
          },
        ];

  return (
    <Main title="Yearly Revenue">
      <Box height="500px">
        <PieChart logs={exampleData} />
      </Box>
    </Main>
  );
};

export default YearlyStats;
