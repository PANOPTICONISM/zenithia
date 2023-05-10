import Main from 'components/Main/Main';
import React from 'react';
import { useColumnsAndRows } from './Clients.utils';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const Clients = () => {
  const { columns, rows } = useColumnsAndRows();

  const addUser = () => {
    return null;
  };

  return (
    <Main title="Clients" handleClick={addUser} buttonText='Add client' isSearch>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid 
          columns={columns}
          rows={rows}
          editMode="row"
        //   processRowUpdate={handleProcessRowUpdate}
        //   onProcessRowUpdateError={handleProcessRowUpdateError}
        //   filterModel={filterModel}
        //   onFilterModelChange={handleFilterChange}
        />
      </Box>
    </Main>
  );
};

export default Clients;