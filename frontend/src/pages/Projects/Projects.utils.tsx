import { GridColDef, GridRowId } from '@mui/x-data-grid';
import React from 'react';
import { ProjectProps } from './types';
import { Box, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import HdrStrongIcon from '@mui/icons-material/HdrStrong';
import { deleteProject, getProjects } from '../../lib/projects';
import { lightBlue } from '../../App';

const CustomButton = ({ color, value } : {color: 'inherit' | 'success' | 'warning', value: string}) => {
  return (
    <Button 
      sx={{ padding: 0 }}
      variant="text" 
      color="inherit"
      endIcon={<HdrStrongIcon color={color} />}>
      {value}
    </Button>
  );
};

export const useColumnsAndRows = () => {
  const [rows, setRows] = React.useState<ProjectProps[]>([]);

  React.useEffect(() => {
    getProjects()
      .then((res) => setRows(res))
      .catch((error) => console.log('GET: ' + error));
  }, []);
  
  const deleteUser = React.useCallback(
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
      width: 120,
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
      field: 'company',
      headerName: 'Company',
      minWidth: 100,
      flex: 1,
      editable: true,
      renderCell: ({ value }) => <Box sx={{ background: lightBlue, padding: '6px 10px', borderRadius: '4px' }}>{value}</Box>
    },
    {
      field: 'start_date',
      headerName: 'Start',
      width: 150,
      valueFormatter: params => new Date(params.value).toLocaleDateString(),
      type: 'date',
      editable: true,
    },
    {
      field: 'finish_date',
      headerName: 'Finish',
      width: 150,
      valueFormatter: params => new Date(params.value).toLocaleDateString(),
      type: 'date',
      editable: true,
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      type: 'singleSelect',
      valueOptions: ['Active', 'Archived', 'Standby'],
      editable: true,
      renderCell: ({ value }) => {
        if (value === 'Archived') {
          return (<CustomButton color='inherit' value={value} />);
        }

        if (value === 'Active') {
          return (<CustomButton color='success' value={value} />);
        }

        return (<CustomButton color='warning' value={value} />);
      }
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
        <Button onClick={deleteUser(params.id)} 
          variant='contained' 
          startIcon={<DeleteIcon />}
          color='error'>Delete</Button>
    },
  ];

  return { columns, rows, setRows };
};