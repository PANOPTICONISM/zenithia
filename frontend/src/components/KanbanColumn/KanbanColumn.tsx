import { Typography } from '@mui/material';
import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';


const Task = ({ task, index } : {task: {id: string, content: string}, index: number}) => {

  return (
    <Draggable key={task.id} draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{ border: '1px solid black', margin: '10px', padding: '10px', ...provided.draggableProps.style }}
        >
          {task.content}
        </div>
      )}
    </Draggable>
  );
};

const Column = ({ column, tasks, columnId } : {column: {title: string}, tasks: {id: string, content: string}[], columnId: string}) => {

  return (
    <div>
      <Typography>{column.title}</Typography>
      <Droppable droppableId={columnId} key={columnId}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => <Task task={task} key={task.id} index={index} />)}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;