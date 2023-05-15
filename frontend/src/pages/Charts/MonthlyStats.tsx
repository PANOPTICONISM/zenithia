import Main from 'components/Main/Main';
import React from 'react';
import { darkBlue } from 'App';
import { Box } from '@mui/material';
import { DateTime } from 'luxon';
import { useGetProjectsFormatted } from 'hooks/useGetProjectsFormatted';
import LineChart from 'components/Charts/LineChart';
import lodash from 'lodash';
import Loading from 'components/Loading/Loading';

const useRevenueData = () => {
  const { projects, setProjects } = useGetProjectsFormatted();

  const profitableEntries = React.useMemo(() => {
    return projects.filter((entry) => entry.time_tracker ? entry?.time_tracker?.length > 0 : entry.time_tracker === undefined);
  }, [projects]);

  const result = React.useMemo(() => {
    const sortedEntries = lodash.sortBy(profitableEntries, 'finish_date');
    const groupedByLogs = sortedEntries.reduce(
      (entryMap, e) => 
        entryMap.set(DateTime.fromISO(e.finish_date).monthLong, 
          [...entryMap.get(DateTime.fromISO(e.finish_date).monthLong)||[], e]),
      new Map()
    );
  
    const totalData: {x: string, y: number}[] = [];
    groupedByLogs.forEach((value, key) => {
      const initialValue = 0;
      const total = value.reduce(
        (accumulator: number, currentValue: { estimated_earnings: number; }) => accumulator + (currentValue?.estimated_earnings || 0),
        initialValue
      );
      const obj = {
        x: key,
        y: total
      };
      totalData.push(obj);
    });
  
    const result = { 
      id: 'monthlyRevenue', 
      color: darkBlue, 
      data: totalData
    };

    return { ...result };
  }, [projects]);

  return { data: projects, setData: setProjects, result };
};

const MonthlyStats = () => {
  const { result } = useRevenueData();

  if (!result) {
    return <Loading />;
  }

  return (
    <Main title='Monthly Revenue'>
      <Box height="600px">
        <LineChart result={result} />
      </Box>
    </Main>
  );
};

export default MonthlyStats;