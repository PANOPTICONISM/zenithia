import Main from 'components/Main/Main';
import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { getProjects } from 'lib/projects';
import { DateTime, Duration } from 'luxon';
import { ProjectFormattedProps } from 'pages/Revenue/types';
import { Box } from '@mui/material';

const useRevenueData = () => {
  const [data, setData] = React.useState<ProjectFormattedProps[]>([]);

  React.useEffect(() => {
    getProjects('*, time_tracker(*), clients(*)')
      .then((res) => {
        const result = res.map((entry) => {
          const initialValue = 0;
          const hoursTotal = entry?.time_tracker?.reduce(
            (accumulator, currentValue) => accumulator + (currentValue?.total || 0),
            initialValue
          );
      
          const totalMinutes = hoursTotal && Duration.fromMillis(hoursTotal).toFormat('mm');
          let totalPrice = 0;
          if (entry.base_price && hoursTotal) {
            if (entry.revenue === 'Project') {
              totalPrice = entry.base_price;
            } else {
              totalPrice = (entry.base_price / 100) * Number(totalMinutes);
            }
          }
      
          const obj = {
            id: entry.id,
            title: entry.title,
            client: entry.clients?.name,
            start_date: entry.start_date,
            finish_date: entry.finish_date,
            base_price: entry.base_price,
            revenue: entry.revenue,
            tracked_time_in_milliseconds: hoursTotal,
            estimated_earnings: totalPrice,
            time_tracker: entry.time_tracker,
          };
          return obj;
        });
        setData(result);
      })
      .catch((error) => console.log('GET: ' + error));
  }, []);

  const profitableEntries = React.useMemo(() => {
    return data.filter((entry) => entry.time_tracker ? entry?.time_tracker?.length > 0 : entry.time_tracker === undefined);
  }, [data]);

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

  return { data, setData, yearlyLogsTotals };
};

const YearlyStats = () => {
  const { yearlyLogsTotals } = useRevenueData();

  console.log(yearlyLogsTotals, 'ahou');

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