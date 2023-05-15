import Main from 'components/Main/Main';
import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { darkBlue } from 'App';
import { Box } from '@mui/material';

const YearlyStats = () => {
  const [data, setData] = React.useState([]);

  const [total] = React.useMemo(() => {
    if (!data) {
      return [];
    }

    const total = { id: 'yearlyRevenue', color: darkBlue, data: [{
      'x': 'plane',
      'y': 63
    },
    {
      'x': 'helicopter',
      'y': 293
    },] };
    return [[total]];
  }, [data]);

  console.log(total);

  if (!total) {
    return <>Is Loading...</>;
  }

  return (
    <Main title='Bar chart'>
      <Box height="500px">
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
            legend: 'transportation',
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