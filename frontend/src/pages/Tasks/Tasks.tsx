import React from 'react';
import Main from '../../components/Main/Main';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { Grid } from '@mui/material';
import Column from '../../components/KanbanColumn/KanbanColumn';
import { getTasks, getTasksColumns, updateTask } from '../../lib/tasks';
import lodash from 'lodash';
import { getProjects } from '../../lib/projects';
import { ProjectProps } from '../Projects/types';
import { toast } from 'react-toastify';
import { ColumnProps } from './Tasks.types';

const Tasks = () => {
  const [columns, setColumns] = React.useState<ColumnProps[]>([]);
  const [projects, setProjects] = React.useState<ProjectProps[]>([]);

  React.useEffect(() => {
    const fetchAll = async () => {
      const [columnsRes, tasksRes, projectsRes] = await Promise.all([
        getTasksColumns(),
        getTasks(),
        getProjects(),
      ]);

      const grouppedTasks = lodash.groupBy(tasksRes, 'column_id');

      const jointArrays = columnsRes.map((col) => {
        col.items = grouppedTasks[col.id] || [];
        return col;
      });

      setColumns(jointArrays);
      setProjects(projectsRes);
    };

    fetchAll().catch((error) => toast.error(error));
  }, []);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination, draggableId } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns.filter(
        (column) => column.id === source.droppableId
      );
      const destColumn = columns.filter(
        (column) => column.id === destination.droppableId
      );
      const sourceItems = [...sourceColumn][0].items;
      const destItems = [...destColumn][0].items;
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      const removedSourceColumn = columns.filter(
        (column) => column.id !== sourceColumn[0].id
      );
      const removedDestColumn = removedSourceColumn.filter(
        (column) => column.id !== destColumn[0].id
      );
      const joinColumnChanges = [
        sourceColumn,
        destColumn,
        removedDestColumn,
      ].flat();

      updateTask(draggableId, { column_id: destination.droppableId })
        .then(() =>
          setColumns(joinColumnChanges.sort((a, b) => a.orderBy - b.orderBy))
        )
        .catch((error) => toast.error('Update single field: ' + error));
    } else {
      const sourceColumn = columns.filter(
        (column) => column.id == source.droppableId
      );
      const copiedItems = [...sourceColumn][0].items;
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);

      const removedSourceColumn = columns.filter(
        (column) => column.id !== sourceColumn[0].id
      );
      const joinColumnChanges = [sourceColumn, removedSourceColumn].flat();
      setColumns(joinColumnChanges.sort((a, b) => a.orderBy - b.orderBy));
    }
  };

  return (
    <Main title="Tasks">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Grid container spacing={2}>
          {columns.map((column) => {
            return (
              <Grid item key={column.id} xs={12} lg={4}>
                <Column
                  column={column}
                  columns={columns}
                  setColumns={setColumns}
                  projects={projects}
                />
              </Grid>
            );
          })}
        </Grid>
      </DragDropContext>
    </Main>
  );
};

export default Tasks;
