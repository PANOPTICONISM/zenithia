import { GridColDef } from '@mui/x-data-grid';
import React from 'react';
import { getTimeTracker } from '../../lib/timetracker';

export const useColumnsAndRows = () => {
  const [rows, setRows] = React.useState<string[]>([]);

  React.useEffect(() => {
    getTimeTracker()
      .then((res) => setRows(res))
      .catch((error) => console.log('GET: ' + error));
  }, []);

  const columns: GridColDef[] = [
    { field: 'id', 
      headerName: 'ID', 
      hideable: true,
    },
    {
      field: 'start_time',
      headerName: 'Start',
      flex: 1,
      valueFormatter: params => new Date(params.value).toLocaleDateString(),
      type: 'date',
      editable: true,
    },
  ];

  return { columns, rows, setRows };
};