import { Box, IconButton, Stack, Typography } from '@mui/material';
import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { grey, lightBlue } from '../../App';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CloseIcon from '@mui/icons-material/Close';

const Task = ({ task, index } : {task: {id: string, content: string}, index: number}) => {

  const handleOnClick = () => {
    console.log('close');
  };

  return (
    <Draggable key={task.id} draggableId={task.id} index={index}>
      {(provided) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{ background: lightBlue, padding: '24px', position: 'relative', ...provided.draggableProps.style }}
        >
          <IconButton onClick={handleOnClick} sx={{ position: 'absolute', right: '3px', top: '3px' }}>
            <CloseIcon fontSize='small' />
          </IconButton>
          {task.content}
        </Box>
      )}
    </Draggable>
  );
};

const Column = ({ column, tasks, columnId } : {column: {title: string}, tasks: {id: string, content: string}[], columnId: string}) => {

  return (
    <Stack sx={{ border: `1px solid ${grey}`, width: '100%' }}>
      <Stack sx={{ padding: '24px 24px 0 24px' }} direction="row" spacing={1}>
        <ReceiptLongIcon />
        <Typography>{column.title}</Typography>
      </Stack>
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