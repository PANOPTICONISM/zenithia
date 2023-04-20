import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { grey, lightBlue } from '../../App';


const Task = ({ task, index } : {task: {id: string, content: string}, index: number}) => {

  return (
    <Draggable key={task.id} draggableId={task.id} index={index}>
      {(provided) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{ background: lightBlue, padding: '24px', ...provided.draggableProps.style }}
        >
          {task.content}
        </Box>
      )}
    </Draggable>
  );
};

const Column = ({ column, tasks, columnId } : {column: {title: string}, tasks: {id: string, content: string}[], columnId: string}) => {

  return (
    <Stack spacing={3} sx={{ border: `1px solid ${grey}`, width: '100%' }}>
      <Typography>{column.title}</Typography>
      <Droppable droppableId={columnId} key={columnId}>
        {(provided) => (
          <Stack
            sx={{ padding: '24px' }}
            spacing={2}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => <Task task={task} key={task.id} index={index} />)}
            {provided.placeholder}
          </Stack>
        )}
      </Droppable>
    </Stack>
  );
};

export default Column;