import { darkBlue } from "App";
import { useGetProjectsFormatted } from "hooks/useGetProjectsFormatted";
import { currencyFromCents, valueFormatterNoCurrency } from "lib/currency";
import { DateTime } from "luxon";
import React from "react";

const getPlaceholderData = () => ({
  id: "monthlyRevenue",
  color: darkBlue,
  data: [
    { x: "plane", y: 175 },
    { x: "helicopter", y: 141 },
    { x: "boat", y: 298 }
  ]
});

export const useRevenueData = () => {
  const [isPlaceholderData, setIsPlaceholderData] = React.useState(false);
  const { projects, setProjects } = useGetProjectsFormatted();

  const profitableEntries = React.useMemo(() => {
    const currentYear = new Date().getFullYear();
    return projects
      ?.filter((entry) =>
        entry.time_tracker
          ? entry?.time_tracker?.length > 0
          : entry.time_tracker === undefined
      )
      .filter((entry) => {
        const date = DateTime.fromISO(entry.finish_date);
        return date.isValid && date.year === currentYear;
      })
      .sort((a, b) => a.finish_date.localeCompare(b.finish_date));
  }, [projects]);

  const result = React.useMemo(() => {
    if (!profitableEntries) {
      return;
    }

    const monthlyTotals: Record<string, number> = {};

    profitableEntries.forEach((entry) => {
      const date = DateTime.fromISO(entry.finish_date);
      if (!date.isValid) {
        return;
      }

      const month = date.monthLong;
      if (month) {
        monthlyTotals[month] =
          (monthlyTotals[month] || 0) + (entry?.estimated_earnings || 0);
      }
    });

    const totalData = Object.entries(monthlyTotals).map(([month, total]) => ({
      x: month,
      y: Number(valueFormatterNoCurrency.format(currencyFromCents(total)))
    }));

    const containsData = totalData.length > 0;
    setIsPlaceholderData(!containsData);

    return containsData
      ? { id: "monthlyRevenue", color: darkBlue, data: totalData }
      : getPlaceholderData();
  }, [profitableEntries]);

  return { data: projects, setData: setProjects, result, isPlaceholderData };
};
