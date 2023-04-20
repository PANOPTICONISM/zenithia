import React from 'react';
import Main from '../components/Main/Main';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

type InitialProps = {
  tasks: {
    [key: string]: {
      id: string,
      name: string,
      thumb: string
    }
  },
  columns: {
    [key: string]: {
      id: string,
      title: string,
      tasksId: string[]
    }
  }
  columnOrder: string[]
}

const initialData: InitialProps = {
  tasks: {
    'task-1': {
      id: 'task-1',
      name: 'Gary Goodspeed',
      thumb: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg'
    },
    'task-2': {
      id: 'task-2',
      name: 'Little Cato',
      thumb: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg'
    },
    'task-3': {
      id: 'task-3',
      name: 'KVN',
      thumb: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg'
    },
    'task-4': {
      id: 'task-4',
      name: 'Quinn Ergon',
      thumb: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg'
    }
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      tasksId: ['task-1', 'task-2', 'task-3', 'task-4']
    }
  },
  columnOrder: ['column-1']
};

const Column = ({ column, tasks } : {column: {title: string}, tasks: any}) => {

  return (
    <div>
      {column.title}
    </div>
  );
};

const Tasks = () => {
  const column = initialData.columns['column-1'];
  const tasks = column.tasksId.map((taskId) => console.log(initialData.tasks[taskId]));
  
  return (
    <Main title="Tasks">
      {initialData.columnOrder.map((order: string) => {
        return <Column key={column.id} column={column} tasks={tasks} />;
      })}
    </Main>
  );
};

export default Tasks;
