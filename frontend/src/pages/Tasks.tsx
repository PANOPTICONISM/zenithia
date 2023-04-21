import React from 'react';
import Main from '../components/Main/Main';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { Stack, useMediaQuery } from '@mui/material';
import Column from '../components/KanbanColumn/KanbanColumn';
import { DateTime } from 'luxon';

export type TaskProps = {
  id: string;
  content: string;
  importance: string,
  project: string,
  deadline: string | null,
}

export type ColumnProps = {
  id: string,
  title: string;
  orderBy: number,
  items: TaskProps[];
};

const tasks = [
  { id: 'task-1', content: 'Take out the garbage', importance: 'medium', project: 'walmart', deadline: DateTime.now().toFormat('dd MMMM') },
  { id: 'task-2', content: 'Watch my favorite show', importance: 'high', project: 'walmart', deadline: DateTime.now().toFormat('dd MMMM') },
  { id: 'task-3', content: 'Charge my phone', importance: 'low', project: 'walmart', deadline: DateTime.now().toFormat('dd MMMM') },
  { id: 'task-4', content: 'Cook dinner', importance: 'medium', project: 'walmart', deadline: DateTime.now().toFormat('dd MMMM') }];

const columnsFromBackend: ColumnProps[] = [
  {
    id: 'to-do',
    title: 'To-do',
    items: tasks,
    orderBy: 1,
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    items: [],
    orderBy: 2,
  },
  {
    id: 'done',
    title: 'Done',
    items: [],
    orderBy: 3,
  },
];

const Tasks = () => {
  const [columns, setColumns] = React.useState(columnsFromBackend);
  const tabletBreakpoint = useMediaQuery('(max-width:900px)');

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns.filter((column) => column.id === source.droppableId);
      const destColumn = columns.filter((column) => column.id === destination.droppableId);
      const sourceItems = [...sourceColumn][0].items;
      const destItems = [...destColumn][0].items;
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      const removedSourceColumn = columns.filter((column) => column.id !== sourceColumn[0].id);
      const removedDestColumn = removedSourceColumn.filter((column) => column.id !== destColumn[0].id);
      const joinColumnChanges = [sourceColumn, destColumn, removedDestColumn].flat();
      
      setColumns(joinColumnChanges.sort((a, b) => a.orderBy - b.orderBy));
    } else {
      const sourceColumn = columns.filter((column) => column.id == source.droppableId);
      const copiedItems = [...sourceColumn][0].items;
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      
      const removedSourceColumn = columns.filter((column) => column.id !== sourceColumn[0].id);
      const joinColumnChanges = [sourceColumn, removedSourceColumn].flat();
      setColumns(joinColumnChanges.sort((a, b) => a.orderBy - b.orderBy));
    }
  }; 
  
  return (
    <Main title="Tasks">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Stack spacing={2} direction={tabletBreakpoint ? 'column' : 'row'}>
          {columns.map((column) => {
            return <Column key={column.id} column={column} columns={columns} setColumns={setColumns} />;
          })}
        </Stack>
      </DragDropContext>
    </Main>
  );
};

export default Tasks;
