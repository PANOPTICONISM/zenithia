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
    // if (source.droppableId !== destination.droppableId) {
    //   const sourceColumn = columns.filter((column) => column.id === source.droppableId);
    //   const destColumn = columns.filter((column) => column.id === destination.droppableId);
    //   const sourceItems = [...sourceColumn][0].items;
    //   const destItems = [...destColumn][0].items;
    //   const [removed] = sourceItems.splice(source.index, 1);
    //   destItems.splice(destination.index, 0, removed);

    //   const removedSourceColumn = columns.filter((column) => column.id !== sourceColumn[0].id);
    //   const removedDestColumn = removedSourceColumn.filter((column) => column.id !== destColumn[0].id);
    //   const joinColumnChanges = [sourceColumn, destColumn, removedDestColumn].flat();
      
    //   setColumns(joinColumnChanges.sort((a, b) => a.orderBy - b.orderBy));
    // } else {
    //   const sourceColumn = columns.filter((column) => column.id == source.droppableId);
    //   const copiedItems = [...sourceColumn][0].items;
    //   const [removed] = copiedItems.splice(source.index, 1);
    //   copiedItems.splice(destination.index, 0, removed);
      
    //   const removedSourceColumn = columns.filter((column) => column.id !== sourceColumn[0].id);
    //   const joinColumnChanges = [sourceColumn, removedSourceColumn].flat();
    //   setColumns(joinColumnChanges.sort((a, b) => a.orderBy - b.orderBy));
    // }
  };
  
  return (
    <Main title="Tasks">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Grid container spacing={2}>
          {columns.map((column) => {
            return (
              <Grid item key={column.id} xs={12} lg={4}>
                <Column column={column} columns={columns} setColumns={setColumns} />
              </Grid>);
          })}
        </Grid>
      </DragDropContext>
    </Main>
  );
};

export default Tasks;
