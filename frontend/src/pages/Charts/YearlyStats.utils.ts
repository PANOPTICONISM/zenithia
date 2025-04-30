import { DateTime } from "luxon";
import React from "react";
import { useGetProjectsFormatted } from "../../hooks/useGetProjectsFormatted";
import { currencyFromCents } from "../../lib/currency";

const PLACEHOLDER_DATA = [
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

export const useRevenueData = () => {
  const [isPlaceholderData, setIsPlaceholderData] = React.useState(false);
  const { projects, setProjects } = useGetProjectsFormatted();

  const profitableEntries = React.useMemo(
    () =>
      projects?.filter((entry) =>
        entry.time_tracker
          ? entry?.time_tracker?.length > 0
          : entry.time_tracker === undefined
      ),
    [projects]
  );

  const result = React.useMemo(() => {
    if (!profitableEntries) {
      return;
    }

    const yearlyTotals: Record<number, number> = {};

    profitableEntries.forEach((entry) => {
      const year = DateTime.fromISO(entry.finish_date).year;
      yearlyTotals[year] =
        (yearlyTotals[year] || 0) + (entry?.estimated_earnings || 0);
    });

    const yearlyLogsTotals = Object.entries(yearlyTotals).map(
      ([year, total]) => ({
        id: year,
        label: year,
        value: Number(currencyFromCents(total).toFixed(2)),
        color: "red",
      })
    );

    const containsData = yearlyLogsTotals.length > 0;
    setIsPlaceholderData(!containsData);

    return containsData ? yearlyLogsTotals : PLACEHOLDER_DATA;
  }, [profitableEntries]);

  return {
    data: projects,
    setData: setProjects,
    result,
    isPlaceholderData,
  };
};
