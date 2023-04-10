import axios from 'axios';
import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { ProductProps } from './types';
import { columns } from './Projects.utils';

const Projects = () => {
  const [data, setData] = React.useState<ProductProps[] | undefined>(undefined);

  React.useEffect(() => {
    axios.get('/projects')
      .then((res) => setData(res.data));
  }, []);

  console.log(data);

  if (!data) {
    return <>Is loading...</>;
  }

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid 
        columns={columns}
        rows={data}
      />
    </Box>
  );
};

export default Projects;