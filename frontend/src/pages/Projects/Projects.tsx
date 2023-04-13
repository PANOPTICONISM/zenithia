import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { useColumnsAndRows } from './Projects.utils';
import axios from 'axios';
import { ProductProps } from './types';
import Main from '../../components/Main/Main';
import { useFiltering } from '../../components/SearchBar/SearchBar.utils';

const Projects = () => {
  const { columns, rows, setRows } = useColumnsAndRows();
  const { filterModel, handleFilterChange } = useFiltering({ columnField: 'title' });

  const handleProcessRowUpdate = React.useCallback((newRow: ProductProps, oldRow: ProductProps) => {
    const fixDateFormat = (date: string) => {
      return new Date(date).toLocaleDateString('en-US');
    };

    const row = { ...newRow, start_date: fixDateFormat(newRow.start_date), finish_date: fixDateFormat(newRow.finish_date) };

    axios.put(`/api/projects/${oldRow.id}`, row).catch((error) => console.log('Updating: ' + error));
    return newRow;
  }, []);

  const handleProcessRowUpdateError = React.useCallback((error: Error) => {
    console.log(error);
  }, []);

  const addProject = () => {
    const date = new Date().toLocaleDateString('en-US');

    const obj = {
      id: Math.floor(Math.random() * 10000),
      title: '', 
      company: 'Phoenix', 
      start_date: date, 
      finish_date: date, 
      status: 'Standby', 
      revenue: 'Hourly'
    };

    setRows((current) => [...current, obj]);

    axios.post('/api/projects', obj).catch((error) => console.log('Posting: ' + error));
  };

  return (
    <Main title="Projects" handleClick={addProject} buttonText='Add project'>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid 
          columns={columns}
          rows={rows}
          editMode="row"
          processRowUpdate={handleProcessRowUpdate}
          onProcessRowUpdateError={handleProcessRowUpdateError}
          filterModel={filterModel}
          onFilterModelChange={handleFilterChange}
        />
      </Box>
    </Main>
  );
};

export default Projects;