import Main from 'components/Main/Main';
import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { darkBlue } from 'App';
import { Box } from '@mui/material';
import { getProjects } from 'lib/projects';
import { DateTime, Duration } from 'luxon';
import { ProjectFormattedProps } from 'pages/Revenue/types';

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
            total: hoursTotal,
            price_total: totalPrice,
            time_tracker: entry.time_tracker,
          };
          return obj;
        });
        setData(result);
      })
      .catch((error) => console.log('GET: ' + error));
  }, []);

  const currentYear = new Date().getFullYear();
  const yearlyLogs = React.useMemo(() => {
    const yearlyEntries = data.map((entry) => {
      const entries = entry?.time_tracker?.filter((time) => DateTime.fromFormat(time.date, 'yyyy-MM-dd').year === currentYear);
      return { ...entry, time_tracker: entries };
    });
    const result = yearlyEntries.filter((entry) => entry.time_tracker ? entry?.time_tracker?.length > 0 : entry.time_tracker === undefined);
    return result;
  }, [data]);

  const currentMonth = new Date().getMonth();
  const monthlyLogs = React.useMemo(() => {
    return data.map((entry) => {
      const entries = entry?.time_tracker?.filter((time) => DateTime.fromFormat(time.date, 'yyyy-MM-dd').month === currentMonth + 1);
      return { ...entry, time_tracker: entries };
    });
  }, [data]);

  return { data, setData, yearlyLogs, monthlyLogs };
};

const YearlyStats = () => {
  const { data, yearlyLogs } = useRevenueData();

  const [total] = React.useMemo(() => {
    if (!data) {
      return [];
    }

    const groupedByLogs = yearlyLogs.reduce(
      (entryMap, e) => 
        entryMap.set(DateTime.fromISO(e.finish_date).monthLong, 
          [...entryMap.get(DateTime.fromISO(e.finish_date).monthLong)||[], e]),
      new Map()
    );

    const totalData: {x: string | null, y: number | null}[] = [];
    groupedByLogs.forEach((value, key) => {
      const initialValue = 0;
      const total = value.reduce(
        (accumulator: number, currentValue: { price_total: number; }) => accumulator + (currentValue?.price_total || 0),
        initialValue
      );
      const obj = {
        x: key,
        y: total
      };
      totalData.push(obj);
    });

    const total = { 
      id: 'yearlyRevenue', 
      color: darkBlue, 
      data: totalData
    };

    return [[total]];
  }, [data]);

  if (!total) {
    return <>Is Loading...</>;
  }

  return (
    <Main title='Bar chart'>
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
            legend: 'Yearly Revenue Insights',
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

export default YearlyStats;