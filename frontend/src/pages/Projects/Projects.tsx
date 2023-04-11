import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { useColumnsAndRows } from './Projects.utils';

const Projects = () => {
  const { columns, rows } = useColumnsAndRows();

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid 
        columns={columns}
        rows={rows}
      />
    </Box>
  );
};

export default Projects;