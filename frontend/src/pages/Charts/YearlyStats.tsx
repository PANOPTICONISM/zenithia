import Main from 'components/Main/Main';
import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { DateTime } from 'luxon';
import { Box } from '@mui/material';
import { useGetProjectsFormatted } from 'hooks/useGetProjectsFormatted';

const useRevenueData = () => {
  const { projects, setProjects } = useGetProjectsFormatted();

  const profitableEntries = React.useMemo(() => {
    return projects.filter((entry) => entry.time_tracker ? entry?.time_tracker?.length > 0 : entry.time_tracker === undefined);
  }, [projects]);

  const groupedByLogs = profitableEntries.reduce(
    (entryMap, e) => 
      entryMap.set(DateTime.fromISO(e.finish_date).year, 
        [...entryMap.get(DateTime.fromISO(e.finish_date).year)||[], e]),
    new Map()
  );

  const yearlyLogsTotals: {id: string, label: string, value: number, color: string}[] = [];
  groupedByLogs.forEach((value, key) => {
    const initialValue = 0;
    const total = value.reduce(
      (accumulator: number, currentValue: { estimated_earnings: number; }) => accumulator + (currentValue?.estimated_earnings || 0),
      initialValue
    );
    const obj = {
      id: key,
      label: key,
      value: total,
      color: 'red'
    };
    yearlyLogsTotals.push(obj);
  });

  return { data: projects, setData: setProjects, yearlyLogsTotals };
};

const YearlyStats = () => {
  const { yearlyLogsTotals } = useRevenueData();

  return (
    <Main title='Yearly Revenue'>
      <Box height="500px">
        <ResponsivePie
          data={yearlyLogsTotals}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{
            from: 'color',
            modifiers: [
              [
                'darker',
                0.2
              ]
            ]
          }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: 'color' }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{
            from: 'color',
            modifiers: [
              [
                'darker',
                2
              ]
            ]
          }}
          defs={[
            {
              id: 'dots',
              type: 'patternDots',
              background: 'inherit',
              color: 'rgba(255, 255, 255, 0.3)',
              size: 4,
              padding: 1,
              stagger: true
            },
            {
              id: 'lines',
              type: 'patternLines',
              background: 'inherit',
              color: 'rgba(255, 255, 255, 0.3)',
              rotation: -45,
              lineWidth: 6,
              spacing: 10
            }
          ]}
          fill={[
            {
              match: {
                id: 'ruby'
              },
              id: 'dots'
            },
            {
              match: {
                id: 'c'
              },
              id: 'dots'
            },
            {
              match: {
                id: 'go'
              },
              id: 'dots'
            },
            {
              match: {
                id: 'python'
              },
              id: 'dots'
            },
            {
              match: {
                id: 'scala'
              },
              id: 'lines'
            },
            {
              match: {
                id: 'lisp'
              },
              id: 'lines'
            },
            {
              match: {
                id: 'elixir'
              },
              id: 'lines'
            },
            {
              match: {
                id: 'javascript'
              },
              id: 'lines'
            }
          ]}
          legends={[
            {
              anchor: 'bottom',
              direction: 'row',
              justify: false,
              translateX: 0,
              translateY: 56,
              itemsSpacing: 0,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: '#999',
              itemDirection: 'left-to-right',
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: 'circle',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemTextColor: '#000'
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

export default YearlyStats;