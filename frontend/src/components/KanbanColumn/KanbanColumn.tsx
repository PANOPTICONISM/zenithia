import { Box, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { grey, lightBlue, red, green, yellow, white, highlight } from '../../App';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CloseIcon from '@mui/icons-material/Close';
import { ColumnProps, TaskProps } from '../../pages/Tasks';
import AddIcon from '@mui/icons-material/Add';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { DateTime } from 'luxon';

type DataProps = {
  columns: ColumnProps[],
  setColumns: React.Dispatch<React.SetStateAction<ColumnProps[]>>;
  column?: ColumnProps,
}

const DateAndLevel = ({ level, deadline } : { level: string, deadline: string | null }) => {
  if (level === 'low') {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
        <Typography 
          fontSize="14px" 
          marginRight="6px" 
          sx={{ background: green, color: white, padding: '8px', borderRadius: '4px' }}>{deadline}</Typography>
        <Stack spacing={0.5} direction="row">
          <Box sx={{ width: '24px', height: '12px', borderRadius: '0 0 60px 0', background: green }} />
          <Box sx={{ width: '24px', height: '12px', borderRadius: '0 0 60px 0', background: grey }} />
          <Box sx={{ width: '24px', height: '12px', borderRadius: '0 0 60px 0', background: grey }} />
        </Stack>
      </Box>
    );
  }
  if (level === 'medium') {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
        <Typography 
          fontSize="14px" 
          marginRight="6px" 
          sx={{ background: yellow, color: white, padding: '8px', borderRadius: '4px' }}>{deadline}</Typography>
        <Stack spacing={0.5} direction="row">
          <Box sx={{ width: '24px', height: '12px', borderRadius: '0 0 60px 0', background: yellow }} />
          <Box sx={{ width: '24px', height: '12px', borderRadius: '0 0 60px 0', background: yellow }} />
          <Box sx={{ width: '24px', height: '12px', borderRadius: '0 0 60px 0', background: grey }} />
        </Stack>
      </Box>
    );
  }
  if (level === 'high') {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
        <Typography 
          fontSize="14px" 
          marginRight="6px" 
          sx={{ background: red, color: white, padding: '8px', borderRadius: '4px' }}>{deadline}</Typography>
        <Stack spacing={0.5} direction="row">
          <Box sx={{ width: '24px', height: '12px', borderRadius: '0 0 60px 0', background: red }} />
          <Box sx={{ width: '24px', height: '12px', borderRadius: '0 0 60px 0', background: red }} />
          <Box sx={{ width: '24px', height: '12px', borderRadius: '0 0 60px 0', background: red }} />
        </Stack>
      </Box>
    );
  }
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
      <Typography 
        fontSize="14px" 
        marginRight="6px" 
        sx={{ background: highlight, color: white, padding: '8px', borderRadius: '4px' }}>{deadline}</Typography>
      <Stack spacing={0.5} direction="row">
        <Box sx={{ width: '24px', height: '12px', borderRadius: '0 0 60px 0', background: grey }} />
        <Box sx={{ width: '24px', height: '12px', borderRadius: '0 0 60px 0', background: grey }} />
        <Box sx={{ width: '24px', height: '12px', borderRadius: '0 0 60px 0', background: grey }} />
      </Stack>
    </Box>
  );
};

const Task = ({ task, index, columns, setColumns, column } : { task: TaskProps, index: number } & DataProps) => {
  const [isEdit, setIsEdit] = React.useState(false);
  const [editableTask, setEditableTask] = React.useState(task);

  const handleDoubleClick = () => {
    setIsEdit(!isEdit);
  };

  const handleDelete = () => {
    if (!column) {
      return;
    }
    const cleanItemsArr = column.items.filter((item) => item.id !== task.id);
    const updatedColumn = { ...column, items: cleanItemsArr };
    const cleanColumns = columns.filter((col) => col.id !== column.id);
    setColumns([...cleanColumns, updatedColumn].sort((a, b) => a.orderBy - b.orderBy));
  };

  const handleSave = () => {
    console.log('oi');
  };

  return (
    <Draggable key={task.id} draggableId={task.id} index={index}>
      {(provided) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{ background: lightBlue, padding: '24px', position: 'relative', ...provided.draggableProps.style }}
          onDoubleClick={handleDoubleClick}
        >
          {isEdit ? <>
            <IconButton onClick={handleDelete} sx={{ position: 'absolute', right: '4px', top: '4px' }}>
              <CloseIcon fontSize='small' />
            </IconButton>
            <Stack spacing={2}>
              <TextField 
                value={editableTask.content} 
                label="title" 
                size='small' 
                variant='standard'
                onChange={(event) => setEditableTask((current) => ({ ...current, content: event.target.value }))}
              />
              <Box>
                <LocalizationProvider dateAdapter={AdapterLuxon}>
                  <DatePicker 
                    slotProps={{ textField: { size: 'small' } }} 
                    label="Deadline" 
                    onChange={(value) => setEditableTask((current) => ({ ...current, deadline: value as string }))} />
                </LocalizationProvider>
              </Box>
              <FormControl size="small">
                <InputLabel>Project</InputLabel>
                <Select
                  value={editableTask.project}
                  label="Project"
                  onChange={(event) => setEditableTask((current) => ({ ...current, project: event.target.value }))}
                >
                  <MenuItem value="personal">
                    Personal
                  </MenuItem>
                  <MenuItem value={task.project}>{task.project}</MenuItem>
                  <MenuItem value={10}>Nissan</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            <Box sx={{ textAlign: 'right', paddingTop: '16px' }}>
              <IconButton onClick={handleSave}>
                <SaveAsIcon fontSize='small' />
              </IconButton>
            </Box>
          </> : 
            <>
              <Typography fontWeight={700} fontSize="16px">{task.content}</Typography>
              <Stack direction="row" justifyContent="space-between" alignItems="center" paddingTop="16px" flexWrap="wrap">
                <DateAndLevel deadline={task.deadline} level={task.importance} />
                <Typography fontWeight={100} fontSize="14px" sx={{ marginLeft: 'auto' }}>{task.project}</Typography>
              </Stack></>}
        </Box>
      )}
    </Draggable>
  );
};

const Column = ({ column, columns, setColumns } : { column: ColumnProps } & DataProps) => {

  const addItem = () => {
    const columnCopy = { ...column };
    columnCopy.items.push({ id: 'task-6', content: 'cheers', importance: '', project: '', deadline: DateTime.now().toFormat('dd MMMM') });
    const cleanColumns = columns.filter((col) => col.id !== column.id);
    setColumns([...cleanColumns, columnCopy].sort((a, b) => a.orderBy - b.orderBy));
  };

  return (
    <Stack sx={{ border: `1px solid ${grey}`, width: '100%' }}>
      <Stack sx={{ padding: '24px 24px 0 24px' }} direction="row" spacing={1} justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={1}>
          <ReceiptLongIcon />
          <Typography>{column.title}</Typography>
        </Stack>
        <IconButton onClick={addItem}>
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