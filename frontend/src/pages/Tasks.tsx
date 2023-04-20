import React from 'react';
import Main from '../components/Main/Main';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Typography } from '@mui/material';
import Column from '../components/KanbanColumn/KanbanColumn';
import { OnDragEndResponder } from 'react-beautiful-dnd';

type InitialProps = {
  tasks: {
    [key: string]: {
      id: string,
      content: string
    }
  },
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
  tasks: {
    'task-1': { id: 'task-1', content: 'Take out the garbage' },
    'task-2': { id: 'task-2', content: 'Watch my favorite show' },
    'task-3': { id: 'task-3', content: 'Charge my phone' },
    'task-4': { id: 'task-4', content: 'Cook dinner' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
    },
  },
  columnOrder: ['column-1'],
};

const Tasks = () => {
  const [items, setItems] = React.useState(initialData.tasks);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
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
                const tasks = column.taskIds.map(taskId => initialData.tasks[taskId]);
                return <Column key={column.id} column={column} tasks={tasks} />;
              })}
            </div>)}
        </Droppable>
      </DragDropContext>
    </Main>
  );
};

export default Tasks;
