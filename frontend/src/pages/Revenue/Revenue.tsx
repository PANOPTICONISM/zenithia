import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Main from 'components/Main/Main';
import React from 'react';
import { useColumnsAndRows } from './Revenue.utils';

const Revenue = () => {
  const { columns, rows } = useColumnsAndRows();

  //   const handleProcessRowUpdate = React.useCallback((newRow: ProjectProps, oldRow: ProjectProps) => {
  //     if (!oldRow.id) {
  //       return oldRow;
  //     }
    
  //     const fixDateFormat = (date: string) => {
  //       return new Date(date).toLocaleDateString('en-US');
  //     };
    
  //     const row = { ...newRow, start_date: fixDateFormat(newRow.start_date), finish_date: fixDateFormat(newRow.finish_date) };
    
  //     // updateProject(oldRow.id, row).catch((error) => console.log('UPDATE: ' + error));
  //     return newRow;
  //   }, []);
    
  const handleProcessRowUpdateError = React.useCallback((error: Error) => {
    console.log(error);
  }, []);

  return (
    <Main title="Revenue">
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid 
          columns={columns}
          rows={rows}
          editMode="row"
        //   processRowUpdate={handleProcessRowUpdate}
        //   onProcessRowUpdateError={handleProcessRowUpdateError}
        />
      </Box>
    </Main>
  );
};

export default Revenue;