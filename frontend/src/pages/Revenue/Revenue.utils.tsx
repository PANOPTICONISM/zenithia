import { Box } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { lightBlue } from 'App';
import { getProjects } from 'lib/projects';
import { Duration } from 'luxon';
import { valueFormatter } from 'pages/Projects/Projects.utils';
import { ProjectProps } from 'pages/Projects/types';
import React from 'react';
import { ProjectFormattedProps } from './types';

export const useColumnsAndRows = () => {
  const [rows, setRows] = React.useState<ProjectProps[]>([]);
  
  React.useEffect(() => {
    getProjects('*, time_tracker(*), clients(*)')
      .then((res) => setRows(res))
      .catch((error) => console.log('GET: ' + error));
  }, []);
    
  const columns: GridColDef[] = [
    { field: 'id', 
      headerName: 'ID', 
      flex: 1,
    },
    {
      field: 'title',
      headerName: 'Project',
      minWidth: 120,
      flex: 1,
      renderCell: ({ value }) => <Box sx={{ background: lightBlue, padding: '6px 10px', borderRadius: '4px' }}>{value}</Box>
    },
    {
      field: 'client',
      headerName: 'Client',
      minWidth: 120,
      flex: 1,
    },
    {
      field: 'start_date',
      headerName: 'Start',
      flex: 1,
      valueFormatter: params => new Date(params.value).toLocaleDateString(),
      type: 'date',
    },
    {
      field: 'finish_date',
      headerName: 'Finish',
      flex: 1,
      valueFormatter: params => new Date(params.value).toLocaleDateString(),
      type: 'date',
    },
    {
      field: 'base_price',
      headerName: 'Base Price',
      flex: 1,
      type: 'number',
      valueFormatter: ({ value }) => valueFormatter.format(Number(value)),
    },
    {
      field: 'revenue',
      headerName: 'Revenue',
      flex: 1,
    },
    {
      field: 'total',
      headerName: 'Time',
      minWidth: 120,
      flex: 1,
      valueFormatter: ({ value }) => Duration.fromMillis(value).toFormat('hh:mm')
    },
    {
      field: 'price_total',
      headerName: 'Total',
      minWidth: 120,
      flex: 1,
      valueFormatter: ({ value }) => valueFormatter.format(Number(value)),
    }
  ];

  const data = rows.map((entry) => {
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
  
  return { columns, data, setRows };
};

export const finalizeTotals = (logs: ProjectFormattedProps[]) => logs.map((entry) => {
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

  return totalPrice;
});