import { GridColDef, GridRowId } from '@mui/x-data-grid';
import React from 'react';
import { ProductProps } from './types';
import axios from 'axios';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export const useColumnsAndRows = () => {
  const [rows, setRows] = React.useState<ProductProps[]>([]);

  React.useEffect(() => {
    axios.get('/api/projects')
      .then((res) => setRows(res.data));
  }, []);
  
  const deleteUser = React.useCallback(
    (id: GridRowId) => () => {
      setTimeout(() => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      });
    },
    [],
  );
  
  const columns: GridColDef[] = [
    { field: 'id', 
      headerName: 'ID', 
      width: 90 
    },
    {
      field: 'title',
      headerName: 'Title',
      flex: 1,
      editable: true,
    },
    {
      field: 'company',
      headerName: 'Company',
      flex: 1,
      editable: true,
    },
    {
      field: 'start_date',
      headerName: 'Start',
      width: 200,
      valueFormatter: params => new Date(params?.value).toLocaleDateString(),
      type: 'date',
      editable: true,
    },
    {
      field: 'finish_date',
      headerName: 'Finish',
      width: 200,
      valueFormatter: params => new Date(params?.value).toLocaleDateString(),
      type: 'date',
      editable: true,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 200,
      type: 'singleSelect',
      valueOptions: ['Active', 'Archived', 'Standby'],
      editable: true,
    },
    {
      field: 'revenue',
      headerName: 'Revenue',
      width: 200,
      type: 'singleSelect',
      valueOptions: ['Hourly', 'Project'],
      editable: true,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => 
        <Button onClick={deleteUser(params.id)} 
          variant='contained' 
          startIcon={<DeleteIcon />}
          color='error'>Delete</Button>
    },
  ];

  return { columns, rows };
};