import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { useColumnsAndRows } from './Projects.utils';
import axios from 'axios';
import { ProductProps } from './types';
import Main from '../../components/Main/Main';

const Projects = () => {
  const { columns, rows } = useColumnsAndRows();

  const handleProcessRowUpdate = React.useCallback((newRow: ProductProps, oldRow: ProductProps) => {
    const fixDateFormat = (date: string) => {
      return new Date(date).toLocaleDateString('en-US');
    };

    const row = { ...newRow, start_date: fixDateFormat(newRow.start_date), finish_date: fixDateFormat(newRow.finish_date) };

    axios.put(`/api/projects/${oldRow.id}`, row);
    return newRow;
  }, []);

  const handleProcessRowUpdateError = React.useCallback((error: Error) => {
    console.log(error);
  }, []);

  const addProject = () => {
    console.log('oi');
  };

  const [search, setSearch] = React.useState<string>('');

  console.log(search, 'oi');

  return (
    <Main title='Projects' handleClick={addProject} buttonText='Add project' searchValue={search} setSearchValue={setSearch}>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid 
          columns={columns}
          rows={rows}
          editMode="row"
          processRowUpdate={handleProcessRowUpdate}
          onProcessRowUpdateError={handleProcessRowUpdateError}
        />
      </Box>
    </Main>
  );
};

export default Projects;