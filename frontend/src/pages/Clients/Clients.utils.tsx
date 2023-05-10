import { Avatar, Box, Button, Stack, Typography } from '@mui/material';
import { GridColDef, GridRowId } from '@mui/x-data-grid';
import { ClientProps, deleteClient, getClients } from 'lib/clients';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import StatusTag from 'components/StatusTag/StatusTag';
import { lightBlue } from 'App';
import { deepOrange } from '@mui/material/colors';

export const useColumnsAndRows = () => {
  const [rows, setRows] = React.useState<ClientProps[]>([]);
  
  React.useEffect(() => {  
    getClients()
      .then((res) => setRows(res))
      .catch((error) => console.log('GET: ' + error));
  }, []);
    
  const deleteUser = React.useCallback(
    (id: GridRowId) => () => {
      setTimeout(() => {
        deleteClient(id)
          .then(() => setRows((prevRows) => prevRows.filter((row) => row.id !== id)))
          .catch((error) => {
            console.log('DELETE: ' + error.message); 
          });
      });
    },
    [],
  );
    
  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      minWidth: 120,
      flex: 1,
      editable: true,
      renderCell: ({ value }) => <Stack direction="row" spacing={1} alignItems="center">
        <Avatar
          sx={{ bgcolor: deepOrange[500], width: 26, height: 26, fontSize: '12px' }}
          alt={value}
        >
          {value.slice(0, 1)}
        </Avatar>
        <Typography fontSize="14px">{value}</Typography>
      </Stack>
    },
    {
      field: 'occupation',
      headerName: 'Occupation',
      minWidth: 100,
      flex: 1,
      editable: true,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      type: 'singleSelect',
      valueOptions: ['Active', 'Archived'],
      editable: true,
      renderCell: ({ value }) => {
        if (value === 'Archived') {
          return (<StatusTag color='inherit' value={value} />);
        }
  
        return (<StatusTag color='success' value={value} />);
      }
    },
    {
      field: 'location',
      headerName: 'Location',
      minWidth: 100,
      flex: 1,
      editable: true,    
    },
    {
      field: 'company',
      headerName: 'Company',
      flex: 1,
      renderCell: ({ value }) => value && <Box sx={{ background: lightBlue, padding: '6px 10px', borderRadius: '4px' }}>{value}</Box>,
      editable: true,
    },
    {
      field: 'email',
      headerName: 'Email',
      minWidth: 100,
      flex: 1,
      editable: true,    
    },
    {
      field: 'phone_number',
      headerName: 'Phone-number',
      minWidth: 100,
      flex: 1,
      editable: true,    
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => 
        <Button onClick={deleteUser(params.id)} 
          variant='contained' 
          startIcon={<DeleteIcon />}
          color='error'>Delete</Button>
    },
  ];
  
  return { columns, rows, setRows };
};