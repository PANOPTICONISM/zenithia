import Main from 'components/Main/Main';
import React from 'react';
import { useColumnsAndRows } from './Clients.utils';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { postClient } from 'lib/clients';
import { v4 as uuidv4 } from 'uuid';
import { useFiltering } from 'components/SearchBar/SearchBar.utils';

const Clients = () => {
  const { columns, rows, setRows } = useColumnsAndRows();
  const { filterModel, handleFilterChange } = useFiltering({ columnField: 'name' });

  const addUser = () => {
    const randomId = uuidv4();
    
    const obj = {
      id: randomId,
      name: null, 
      occupation: null,
      status: 'Standby', 
      location: '',
      company: null,
      email: null,
      phone_number: null
    };
  
    postClient(obj).then(() => setRows((current) => [...current, obj])).catch((error) => console.log('POST: ' + error));
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
          filterModel={filterModel}
          onFilterModelChange={handleFilterChange}
        />
      </Box>
    </Main>
  );
};

export default Clients;