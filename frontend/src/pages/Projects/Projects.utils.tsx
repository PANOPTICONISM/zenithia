import { GridColDef, GridRowId } from '@mui/x-data-grid';
import React from 'react';
import { ProjectProps } from './types';
import { Box, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteProject, getProjects } from '../../lib/projects';
import { lightBlue } from '../../App';
import { ClientProps, getClients } from 'lib/clients';
import StatusTag from 'components/StatusTag/StatusTag';

export const valueFormatter = Intl.NumberFormat('da-DK', {
  style: 'currency',
  currency: 'DKK',
});

export const useColumnsAndRows = () => {
  const [rows, setRows] = React.useState<ProjectProps[]>([]);
  const [clients, setClients] = React.useState<ClientProps[]>([]);

  React.useEffect(() => {
    getProjects('*, clients(*)')
      .then((res) => setRows(res))
      .catch((error) => console.log('GET: ' + error));

    getClients()
      .then((res) => setClients(res))
      .catch((error) => console.log('GET: ' + error));
  }, []);
  
  const deleteEntry = React.useCallback(
    (id: GridRowId) => () => {
      setTimeout(() => {
        deleteProject(id)
          .then(() => setRows((prevRows) => prevRows.filter((row) => row.id !== id)))
          .catch((error) => {
            console.log('DELETE: ' + error.message); 
          });
      });
    },
    [],
  );
  
  const columns: GridColDef[] = [
    { field: 'project_id', 
      headerName: 'ID', 
      flex: 1,
      valueFormatter: ({ value }) => value?.slice(0, 8),
    },
    {
      field: 'title',
      headerName: 'Title',
      minWidth: 120,
      flex: 1,
      editable: true,
    },
    {
      field: 'client_id',
      headerName: 'Client',
      minWidth: 100,
      flex: 1,
      type: 'singleSelect',
      editable: true,
      valueOptions: clients,
      getOptionValue: (value: any)=> value?.id,
      getOptionLabel: (value: any) => value.name,
      valueGetter: params => params.value || '',
      renderCell: (params) => params.formattedValue && <Box sx={{ background: lightBlue, padding: '6px 10px', borderRadius: '4px' }}>{params.formattedValue}</Box>
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
      field: 'status',
      headerName: 'Status',
      width: 110,
      type: 'singleSelect',
      valueOptions: ['Active', 'Archived', 'Standby'],
      editable: true,
      renderCell: ({ value }) => {
        if (value === 'Archived') {
          return (<StatusTag color='inherit' value={value} />);
        }

        if (value === 'Active') {
          return (<StatusTag color='success' value={value} />);
        }

        return (<StatusTag color='warning' value={value} />);
      }
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
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => 
        <Button onClick={deleteEntry(params.id)} 
          variant='contained' 
          startIcon={<DeleteIcon />}
          color='error'>Delete</Button>
    },
  ];

  return { columns, rows, setRows };
};