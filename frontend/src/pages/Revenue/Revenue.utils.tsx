import { Box } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { lightBlue } from 'App';
import { getProjects } from 'lib/projects';
import { valueFormatter } from 'pages/Projects/Projects.utils';
import { ProjectProps } from 'pages/Projects/types';
import React from 'react';

export const useColumnsAndRows = () => {
  const [rows, setRows] = React.useState<ProjectProps[]>([]);
  
  React.useEffect(() => {
    getProjects('*, clients(*)')
      .then((res) => setRows(res))
      .catch((error) => console.log('GET: ' + error));
  }, []);
    
  const columns: GridColDef[] = [
    { field: 'project_id', 
      headerName: 'ID', 
      flex: 1,
      valueFormatter: ({ value }) => value?.slice(0, 8),
    },
    {
      field: 'title',
      headerName: 'Project',
      minWidth: 120,
      flex: 1,
      editable: true,
      renderCell: ({ value }) => <Box sx={{ background: lightBlue, padding: '6px 10px', borderRadius: '4px' }}>{value}</Box>
    },
    {
      field: 'client',
      headerName: 'Client',
      minWidth: 120,
      flex: 1,
      editable: true,
    },
    {
      field: 'start_date',
      headerName: 'Start',
      flex: 1,
      valueFormatter: params => new Date(params.value).toLocaleDateString(),
      type: 'date',
      editable: true,
    },
    {
      field: 'finish_date',
      headerName: 'Finish',
      flex: 1,
      valueFormatter: params => new Date(params.value).toLocaleDateString(),
      type: 'date',
      editable: true,
    },
    {
      field: 'base_price',
      headerName: 'Base Price',
      flex: 1,
      type: 'number',
      editable: true,
      valueFormatter: ({ value }) => valueFormatter.format(Number(value)),
    },
    {
      field: 'revenue',
      headerName: 'Revenue',
      flex: 1,
      type: 'singleSelect',
      valueOptions: ['Hourly', 'Project'],
      editable: true,
    },
    {
      field: 'hours',
      headerName: 'Hours',
      minWidth: 120,
      flex: 1,
      editable: true,
    },
    {
      field: 'price_total',
      headerName: 'Total',
      minWidth: 120,
      flex: 1,
      editable: true,
    }
  ];
  
  return { columns, rows, setRows };
};