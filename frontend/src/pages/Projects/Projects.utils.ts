import { GridColDef } from '@mui/x-data-grid';

export const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'title',
    headerName: 'Title',
    flex: 1,
    editable: true,
  },
  {
    field: 'company',
    headerName: 'Company',
    width: 150,
    editable: true,
  },
  {
    field: 'start_date',
    headerName: 'Start',
    width: 200,
    valueFormatter: params => new Date(params?.value).toLocaleDateString(),
    type: 'date',
    editable: true,
  },
  {
    field: 'finish_date',
    headerName: 'Finish',
    width: 200,
    valueFormatter: params => new Date(params?.value).toLocaleDateString(),
    type: 'date',
    editable: true,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 200,
    type: 'singleSelect',
    valueOptions: ['Active', 'Archived'],
    editable: true,
  },
  {
    field: 'revenue',
    headerName: 'Revenue',
    width: 200,
    type: 'singleSelect',
    valueOptions: ['Hourly', 'Project'],
    editable: true,
  },
];