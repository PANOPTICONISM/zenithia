import Main from 'components/Main/Main';
import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { darkBlue } from 'App';
import { Box } from '@mui/material';
import { DateTime } from 'luxon';
import { useGetProjectsFormatted } from 'hooks/useGetProjectsFormatted';

const useRevenueData = () => {
  const { projects, setProjects } = useGetProjectsFormatted();

  const yearlyLogs = React.useMemo(() => {
    return projects.filter((entry) => entry.time_tracker ? entry?.time_tracker?.length > 0 : entry.time_tracker === undefined);
  }, [projects]);

  const monthlyLogs = React.useMemo(() => {
    return projects.filter((entry) => entry.time_tracker ? entry?.time_tracker?.length > 0 : entry.time_tracker === undefined);
  }, [projects]);

  return { data: projects, setData: setProjects, yearlyLogs, monthlyLogs };
};

const MonthlyStats = () => {
  const { data, monthlyLogs } = useRevenueData();

  const [total] = React.useMemo(() => {
    if (!data) {
      return [];
    }

    const groupedByLogs = monthlyLogs.reduce(
      (entryMap, e) => 
        entryMap.set(DateTime.fromISO(e.finish_date).monthLong, 
          [...entryMap.get(DateTime.fromISO(e.finish_date).monthLong)||[], e]),
      new Map()
    );

    const totalData: {x: string | null, y: number | null}[] = [];
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

    const total = { 
      id: 'monthlyRevenue', 
      color: darkBlue, 
      data: totalData
    };

    return [[total]];
  }, [data]);

  if (!total) {
    return <>Is Loading...</>;
  }

  return (
    <Main title='Monthly Revenue'>
      <Box height="600px">
        <ResponsiveLine
          data={total}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: 'point' }}
          yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
          }}
          yFormat=" >-.2f"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Monthly Revenue Insights',
            legendOffset: 36,
            legendPosition: 'middle'
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle'
          }}
          pointSize={10}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemBackground: 'rgba(0, 0, 0, .03)',
                    itemOpacity: 1
                  }
                }
              ]
            }
          ]}
        />
      </Box>
    </Main>
  );
};

export default MonthlyStats;