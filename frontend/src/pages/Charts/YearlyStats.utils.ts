import { PieChartProps } from "components/Charts/Charts.types";
import { useGetProjectsFormatted } from "hooks/useGetProjectsFormatted";
import { currencyFromCents, valueFormatterNoCurrency } from "lib/currency";
import { DateTime } from "luxon";
import React from "react";

export const useRevenueData = () => {
  const [isPlaceholderData, setIsPlaceholderData] = React.useState(false);
  const { projects, setProjects } = useGetProjectsFormatted();

  const profitableEntries = React.useMemo(() => {
    return projects.filter((entry) =>
      entry.time_tracker
        ? entry?.time_tracker?.length > 0
        : entry.time_tracker === undefined
    );
  }, [projects]);

  const result = React.useMemo(() => {
    const groupedByLogs = profitableEntries.reduce(
      (entryMap, e) =>
        entryMap.set(DateTime.fromISO(e.finish_date).year, [
          ...(entryMap.get(DateTime.fromISO(e.finish_date).year) || []),
          e
        ]),
      new Map()
    );

    const yearlyLogsTotals: PieChartProps = [];
    groupedByLogs.forEach((value, key) => {
      const initialValue = 0;
      const total = value.reduce(
        (accumulator: number, currentValue: { estimated_earnings: number }) =>
          accumulator + (currentValue?.estimated_earnings || 0),
        initialValue
      );
      const obj = {
        id: key,
        label: key,
        value: Number(
          valueFormatterNoCurrency.format(currencyFromCents(total))
        ),
        color: "red"
      };
      yearlyLogsTotals.push(obj);
    });

    const containsData = yearlyLogsTotals.length > 0;
    setIsPlaceholderData(!containsData);

    const result = containsData
      ? yearlyLogsTotals
      : [
          {
            id: "php",
            label: "php",
            value: 202,
            color: "hsl(306, 70%, 50%)"
          },
          {
            id: "java",
            label: "java",
            value: 244,
            color: "hsl(343, 70%, 50%)"
          },
          {
            id: "hack",
            label: "hack",
            value: 369,
            color: "hsl(87, 70%, 50%)"
          }
        ];

    return result;
  }, [projects]);

  return {
    data: projects,
    setData: setProjects,
    yearlyLogsTotals: result,
    isPlaceholderData
  };
};
