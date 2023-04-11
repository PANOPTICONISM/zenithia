import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { useColumnsAndRows } from './Projects.utils';
import axios from 'axios';
import { ProductProps } from './types';

const Projects = () => {
  const { columns, rows } = useColumnsAndRows();

  const handleProcessRowUpdate = React.useCallback((newRow: ProductProps, oldRow: ProductProps) => {
    axios.put(`/api/projects/${oldRow.id}`, newRow);
    return newRow;
  }, []);

  const handleProcessRowUpdateError = React.useCallback((error: Error) => {
    console.log(error);
  }, []);

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid 
        columns={columns}
        rows={rows}
        editMode="row"
        processRowUpdate={handleProcessRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
      />
    </Box>
  );
};

export default Projects;