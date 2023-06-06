import Main from 'components/Main/Main';
import React from 'react';
import { useColumnsAndRows } from './Clients.utils';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { ClientProps, postClient, updateClient } from 'lib/clients';
import { v4 as uuidv4 } from 'uuid';
import { useFiltering } from 'components/SearchBar/SearchBar.utils';
import { toast } from 'react-toastify';

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
  
    postClient(obj)
      .then(() => setRows((current) => [...current, obj]))
      .catch((error) => toast.error(error));
  };

  const handleProcessRowUpdate = React.useCallback((newRow: ClientProps, oldRow: ClientProps) => {
    if (!oldRow.id) {
      return oldRow;
    }

    updateClient(oldRow.id, newRow)
      .catch((error) => toast.error(error));
    return newRow;
  }, []);

  const handleProcessRowUpdateError = React.useCallback((error: Error) => {
    console.log(error);
  }, []);

  return (
    <Main title="Clients" handleClick={addUser} buttonText='Add client' isSearch>
      <Box sx={{ height: 620, width: '100%' }}>
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

export default Clients;