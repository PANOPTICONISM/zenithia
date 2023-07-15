import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { useColumnsAndRows } from './Projects.utils';
import { ProjectProps } from './Projects.types';
import Main from '../../components/Main/Main';
import { useFiltering } from '../../components/SearchBar/SearchBar.utils';
import { postProject, updateProject } from '../../lib/projects';
import { toast } from 'react-toastify';
import { useUserData } from 'contexts/UserProvider';
import { v4 as uuidv4 } from 'uuid';

const Projects = () => {
  const { columns, rows, setRows } = useColumnsAndRows();
  const { filterModel, handleFilterChange } = useFiltering({ columnField: 'title' });

  const [user] = useUserData();

  const handleProcessRowUpdate = React.useCallback((newRow: ProjectProps, oldRow: ProjectProps) => {
    if (!oldRow.id || !user) {
      return oldRow;
    }

    const fixDateFormat = (date: string) => {
      return new Date(date).toLocaleDateString('en-US');
    };

    delete newRow.clients;

    if (newRow.client_id === '') {
      newRow.client_id = null;
    }

    const row = { ...newRow, start_date: fixDateFormat(newRow.start_date), finish_date: fixDateFormat(newRow.finish_date) };
    updateProject(user.token, oldRow.id, row)
      .catch((error) => toast.error(error));
    return newRow;
  }, [user]);

  const handleProcessRowUpdateError = React.useCallback((error: Error) => {
    console.log(error);
  }, []);

  const addProject = () => {
    const date = new Date().toLocaleDateString('en-US');

    if (!user) {
      return;
    }
    const obj = {
      id: uuidv4(),
      title: '', 
      start_date: date, 
      finish_date: date, 
      status: 'Standby', 
      revenue: 'Hourly',
      client_id: null,
      base_price: null,
      user_id: user.id
    };

    postProject(user.token, obj)
      .then(() => setRows((current) => [...current, obj]))
      .catch((error) => toast.error(error));
  };

  return (
    <Main title="Projects" handleClick={addProject} buttonText='Add project' isSearch>
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

export default Projects;