import { Box, IconButton, Stack, Typography } from '@mui/material';
import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { grey, lightBlue } from '../../App';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CloseIcon from '@mui/icons-material/Close';
import { ColumnProps } from '../../pages/Tasks';
import AddIcon from '@mui/icons-material/Add';

type DataProps = {
  columns: ColumnProps[],
  setColumns: React.Dispatch<React.SetStateAction<ColumnProps[]>>;
  column?: ColumnProps,
}

const Task = ({ task, index, columns, setColumns, column } : { task: { id: string, content: string }, index: number } & DataProps) => {

  const handleOnClick = () => {
    if (!column) {
      return;
    }
    const cleanItemsArr = column.items.filter((item) => item.id !== task.id);
    const updatedColumn = { ...column, items: cleanItemsArr };
    const cleanColumns = columns.filter((col) => col.id !== column.id);
    setColumns([...cleanColumns, updatedColumn].sort((a, b) => a.orderBy - b.orderBy));
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

const Column = ({ column, columns, setColumns } : { column: ColumnProps } & DataProps) => {

  return (
    <Stack sx={{ border: `1px solid ${grey}`, width: '100%' }}>
      <Stack sx={{ padding: '24px 24px 0 24px' }} direction="row" spacing={1} justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={1}>
          <ReceiptLongIcon />
          <Typography>{column.title}</Typography>
        </Stack>
        <IconButton>
          <AddIcon />
        </IconButton>
      </Stack>
      <Droppable droppableId={column.id} key={column.id}>
        {(provided) => (
          <Stack
            sx={{ padding: '24px' }}
            spacing={2}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {column.items.map((task, index) => 
              <Task 
                task={task}
                key={task.id}
                index={index}
                columns={columns} 
                setColumns={setColumns}
                column={column}
              />
            )}
            {provided.placeholder}
          </Stack>
        )}
      </Droppable>
    </Stack>
  );
};

export default Column;