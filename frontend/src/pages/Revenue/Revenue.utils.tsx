import { Box } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { lightBlue } from 'App';
import { getProjects } from 'lib/projects';
import { TimeTrackerProps, getTimeTracker } from 'lib/timetracker';
import { Duration } from 'luxon';
import { valueFormatter } from 'pages/Projects/Projects.utils';
import { ProjectProps } from 'pages/Projects/types';
import React from 'react';

export const useColumnsAndRows = () => {
  const [rows, setRows] = React.useState<TimeTrackerProps[]>([]);
  
  React.useEffect(() => {
    getTimeTracker('*, projects(*, clients(*))')
      .then((res) => setRows(res))
      .catch((error) => console.log('GET: ' + error));
  }, []);

  console.log(rows, 'oi');
    
  const columns: GridColDef[] = [
    { field: 'id', 
      headerName: 'ID', 
      flex: 1,
      valueFormatter: ({ value }) => value?.slice(0, 8),
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
      headerName: 'Hours',
      minWidth: 120,
      flex: 1,
      valueFormatter: ({ value }) => Duration.fromMillis(value).toFormat('hh:mm')
    },
    {
      field: 'price_total',
      headerName: 'Total',
      minWidth: 120,
      flex: 1,
    }
  ];

  const data = rows.map((entry) => {
    console.log(entry, 'hello');
    const obj = {
      id: entry.id,
      title: entry.projects?.title,
      client: entry.projects?.clients?.name,
      start_date: entry.projects?.start_date,
      finish_date: entry.projects?.finish_date,
      base_price: entry.projects?.base_price,
      revenue: entry.projects?.revenue,
      total: entry.total
    };
    return obj;
  });
  
  return { columns, data, setRows };
};