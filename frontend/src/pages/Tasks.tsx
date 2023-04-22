import React from 'react';
import Main from '../components/Main/Main';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { Grid } from '@mui/material';
import Column from '../components/KanbanColumn/KanbanColumn';
import { DateTime } from 'luxon';
import { ColumnProps, TaskProps, getTasks, getTasksColumns, updateTask } from '../lib/tasks';
import lodash from 'lodash';

const Tasks = () => {
  const [columns, setColumns] = React.useState<ColumnProps[]>([]);

  React.useEffect(() => {
    const fetchAll = async () => {
      const [columnsRes, tasksRes] = await Promise.all([getTasksColumns(), getTasks()]);
      
      const grouppedTasks = lodash.groupBy(tasksRes, 'column_id');

      const jointArrays = columnsRes.map((col) => {
        col.items = grouppedTasks[col.id] || [];
        return col;
      });

      setColumns(jointArrays);
    };

    fetchAll().catch((error) => console.log(error));
  }, []);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { destination, draggableId } = result;
    // updateTask(draggableId, { column_id: destination.droppableId })
    //   .catch((error) => console.log('Update single field: ' + error));
    
  };

  console.log(columns);
  
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
