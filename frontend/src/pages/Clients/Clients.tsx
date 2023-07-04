import Main from 'components/Main/Main';
import React from 'react';
import { useColumnsAndRows } from './Clients.utils';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { ClientProps, postClient, updateClient } from 'lib/clients';
import { v4 as uuidv4 } from 'uuid';
import { useFiltering } from 'components/SearchBar/SearchBar.utils';
import { toast } from 'react-toastify';
import { useUserData } from 'contexts/UserProvider';

const Clients = () => {
  const { columns, rows, setRows } = useColumnsAndRows();
  const { filterModel, handleFilterChange } = useFiltering({ columnField: 'name' });

  const [user] = useUserData();

  const addUser = () => {
    if (!user) {
      return;
    }
    
    const obj = {
      id: uuidv4(),
      name: null, 
      occupation: null,
      status: 'Standby', 
      location: '',
      company: null,
      email: null,
      phone_number: null,
      user_id: user.id
    };

    postClient(user.token, obj)
      .then(() => setRows((current) => [...current, obj]))
      .catch((error) => toast.error(error));
  };

  const handleProcessRowUpdate = React.useCallback((newRow: ClientProps, oldRow: ClientProps) => {
    if (!oldRow.id || !user) {
      return oldRow;
    }

    updateClient(user.token, oldRow.id, newRow)
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