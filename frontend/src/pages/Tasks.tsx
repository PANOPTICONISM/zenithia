import React from 'react';
import Main from '../components/Main/Main';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { Stack, useMediaQuery } from '@mui/material';
import Column from '../components/KanbanColumn/KanbanColumn';

type InitialProps = {
    [key: string]: {
      title: string,
      items: {
        id: string,
        content: string
    }[],
    }
}

const tasks = [
  { id: 'task-1', content: 'Take out the garbage' },
  { id: 'task-2', content: 'Watch my favorite show' },
  { id: 'task-3', content: 'Charge my phone' },
  { id: 'task-4', content: 'Cook dinner' }];

const columnsFromBackend: InitialProps = {
  ['column-1']: {
    title: 'To-do',
    items: tasks,
  },
  ['column-2']: {
    title: 'In Progress',
    items: [],
  },
  ['column-3']: {
    title: 'Done',
    items: [],
  },
};

const Tasks = () => {
  const [columns, setColumns] = React.useState(columnsFromBackend);
  const tabletBreakpoint = useMediaQuery('(max-width:900px)');

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  }; 
  
  return (
    <Main title="Tasks">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Stack spacing={2} direction={tabletBreakpoint ? 'column' : 'row'}>
          {Object.entries(columns).map(([columnId, column]) => {
            return <Column key={columnId} column={column} columnId={columnId} tasks={column.items} />;
          })}
        </Stack>
      </DragDropContext>
    </Main>
  );
};

export default Tasks;
