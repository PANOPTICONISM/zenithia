import React from 'react';
import Main from '../components/Main/Main';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { Grid } from '@mui/material';
import Column from '../components/KanbanColumn/KanbanColumn';
import { DateTime } from 'luxon';
import { ColumnProps, TaskProps, getTasks, getTasksColumns } from '../lib/tasks';

const Tasks = () => {
  const [columns, setColumns] = React.useState<ColumnProps[]>([]);

  React.useEffect(() => {
    getTasksColumns()
      .then((data) => setColumns(data))
      .catch((error) => console.log(error));
  }, []);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;
    console.log(source, destination);
    
  };
  
  return (
    <Main title="Tasks">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Grid container spacing={2}>
          {columns.map((column) => {
            return (
              <Grid item key={column.id} xs={12} lg={4}>
                <Column column={column} />
              </Grid>);
          })}
        </Grid>
      </DragDropContext>
    </Main>
  );
};

export default Tasks;
