import { Box, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { grey, lightBlue } from '../../App';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CloseIcon from '@mui/icons-material/Close';
import { ColumnProps, TaskProps } from '../../pages/Tasks';
import AddIcon from '@mui/icons-material/Add';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import SaveAsIcon from '@mui/icons-material/SaveAs';

type DataProps = {
  columns: ColumnProps[],
  setColumns: React.Dispatch<React.SetStateAction<ColumnProps[]>>;
  column?: ColumnProps,
}

const Task = ({ task, index, columns, setColumns, column } : { task: TaskProps, index: number } & DataProps) => {
  const [isEdit, setIsEdit] = React.useState(false);
  const [company, setCompany] = React.useState(task.project);

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
              <TextField value={task.content} label="title" size='small' variant='standard' />
              <Box>
                <LocalizationProvider dateAdapter={AdapterLuxon}>
                  <DatePicker slotProps={{ textField: { size: 'small' } }} label="Deadline" />
                </LocalizationProvider>
              </Box>
              <FormControl size="small">
                <InputLabel>Project</InputLabel>
                <Select
                  value={company}
                  label="Project"
                  onChange={(event) => setCompany(event.target.value)}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={company}>{company}</MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
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
              <Typography fontWeight={700} fontSize="14px">{task.content}</Typography>
              <Stack direction="row" justifyContent="space-between" paddingTop="16px">
                <Box>
                  <Typography fontSize="14px">{task.deadline}</Typography>
                </Box>
                <Typography fontWeight={100} fontSize="14px">{task.project}</Typography>
              </Stack></>}
        </Box>
      )}
    </Draggable>
  );
};

const Column = ({ column, columns, setColumns } : { column: ColumnProps } & DataProps) => {

  const addItem = () => {
    const columnCopy = { ...column };
    columnCopy.items.push({ id: 'task-6', content: 'cheers', importance: '', project: '', deadline: 'Fri' });
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