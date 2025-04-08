import { darkBlue } from "App";
import { useGetProjectsFormatted } from "hooks/useGetProjectsFormatted";
import { currencyFromCents, valueFormatterNoCurrency } from "lib/currency";
import lodash from "lodash";
import { DateTime } from "luxon";
import React from "react";

export const useRevenueData = () => {
  const [isPlaceholderData, setIsPlaceholderData] = React.useState(false);
  const { projects, setProjects } = useGetProjectsFormatted();

  const profitableEntries = React.useMemo(() => {
    const profitableProjects = projects.filter((entry) =>
      entry.time_tracker
        ? entry?.time_tracker?.length > 0
        : entry.time_tracker === undefined
    );
    const currentYear = new Date().getFullYear();
    return profitableProjects.filter(
      (entry) => DateTime.fromISO(entry.finish_date).year === currentYear
    );
  }, [projects]);

  const result = React.useMemo(() => {
    const sortedEntries = lodash.sortBy(profitableEntries, "finish_date");
    const groupedByLogs = sortedEntries.reduce(
      (entryMap, e) =>
        entryMap.set(DateTime.fromISO(e.finish_date).monthLong, [
          ...(entryMap.get(DateTime.fromISO(e.finish_date).monthLong) || []),
          e
        ]),
      new Map()
    );

    const totalData: { x: string; y: number }[] = [];
    groupedByLogs.forEach((value, key) => {
      const initialValue = 0;
      const total = value.reduce(
        (accumulator: number, currentValue: { estimated_earnings: number }) =>
          accumulator + (currentValue?.estimated_earnings || 0),
        initialValue
      );
      const obj = {
        x: key,
        y: Number(valueFormatterNoCurrency.format(currencyFromCents(total)))
      };
      totalData.push(obj);
    });

    const containsData = totalData.length > 0;
    setIsPlaceholderData(!containsData);

    const result = {
      id: "monthlyRevenue",
      color: darkBlue,
      data: containsData
        ? totalData
        : [
            {
              x: "plane",
              y: 175
            },
            {
              x: "helicopter",
              y: 141
            },
            {
              x: "boat",
              y: 298
            }
          ]
    };

    return { ...result };
  }, [projects]);

  return { data: projects, setData: setProjects, result, isPlaceholderData };
};
