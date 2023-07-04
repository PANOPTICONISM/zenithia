import { GridColDef, GridRowId } from '@mui/x-data-grid';
import React from 'react';
import { ProjectProps } from './Projects.types';
import { Box, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteProject, getProjects } from '../../lib/projects';
import { lightBlue } from '../../App';
import { ClientProps, getClients } from 'lib/clients';
import StatusTag from 'components/StatusTag/StatusTag';
import { toast } from 'react-toastify';
import { useUserData } from 'contexts/UserProvider';

export const valueFormatter = Intl.NumberFormat('da-DK', {
  style: 'currency',
  currency: 'DKK',
});

export const useColumnsAndRows = () => {
  const [rows, setRows] = React.useState<ProjectProps[]>([]);
  const [clients, setClients] = React.useState<ClientProps[]>([]);

  const [user] = useUserData();

  React.useEffect(() => {
    if (!user) {
      return;
    }
    getClients(user.token)
      .then((res) => setClients(res))
      .catch((error) => toast.error(error));

    getProjects(user.token, '*, clients(*)')
      .then((res) => setRows(res))
      .catch((error) => toast.error(error));
  }, [user]);
  
  const deleteEntry = React.useCallback(
    (id: GridRowId) => () => {
      setTimeout(() => {
        if (!user) {
          return;
        }
        deleteProject(user.token, id)
          .then(() => setRows((prevRows) => prevRows.filter((row) => row.id !== id)))
          .catch((error) => toast.error(error));
      });
    },
    [],
  );
  
  const columns: GridColDef[] = [
    {
      field: 'id', 
      headerName: 'ID', 
      valueFormatter: ({ value }) => value?.slice(0, 8),
    },
    {
      field: 'title',
      headerName: 'Title',
      minWidth: 100,
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
      getOptionValue: (value: any) => value?.id,
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
      flex: 1,
      type: 'singleSelect',
      valueOptions: ['Active', 'Standby', 'Archived'],
      editable: true,
      renderCell: ({ value }) => {
        if (value === 'Archived') {
          return (<StatusTag color='inherit' value={value} />);
        }

        if (value === 'Standby') {
          return (<StatusTag color='warning' value={value} />);
        }

        return (<StatusTag color='success' value={value} />);
      }
    },
    {
      field: 'base_price',
      headerName: 'Base Price',
      minWidth: 80,
      type: 'number',
      editable: true,
      valueFormatter: ({ value }) => valueFormatter.format(Number(value)),
    },
    {
      field: 'revenue',
      headerName: 'Revenue',
      minWidth: 80,
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