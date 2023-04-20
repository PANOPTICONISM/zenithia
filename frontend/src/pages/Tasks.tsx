import React from 'react';
import Main from '../components/Main/Main';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Typography } from '@mui/material';
import Column from '../components/KanbanColumn/KanbanColumn';

type InitialProps = {
  tasks: {
      id: string,
      content: string
  }[],
  columns: {
    [key: string]: {
      id: string,
      title: string,
      taskIds: string[]
    }
  }
  columnOrder: string[]
}

const initialData: InitialProps = {
  tasks: [
    { id: 'task-1', content: 'Take out the garbage' },
    { id: 'task-2', content: 'Watch my favorite show' },
    { id: 'task-3', content: 'Charge my phone' },
    { id: 'task-4', content: 'Cook dinner' }],
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      taskIds: ['task-1', 'task-2'],
    },
    'column-2': {
      id: 'column-2',
      title: 'In progress',
      taskIds: ['task-3', 'task-4'],
    },
  },
  columnOrder: ['column-1', 'column-2'],
};

const Tasks = () => {
  const [items, setItems] = React.useState(initialData.tasks);

  const handleDragEnd = (result: DropResult) => {  
    const handleDragEnd = (result: DropResult) => {
      if (!result.destination) {
        return;
      }
      const newItems = [...items];
      const [removed] = newItems.splice(result.source.index, 1);
      newItems.splice(result.destination.index, 0, removed);
      setItems(newItems);
    }; 
  };
  
  return (
    <Main title="Tasks">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {initialData.columnOrder.map((columnId) => {
                const column = initialData.columns[columnId];
                const tasks = items.filter((task) => column.taskIds.includes(task.id));
                return <Column key={column.id} column={column} tasks={tasks} />;
              })}
            </div>)}
        </Droppable>
      </DragDropContext>
    </Main>
  );
};

export default Tasks;
