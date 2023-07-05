import { Autocomplete, Box, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { grey, lightBlue } from '../../App';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { DateTime } from 'luxon';
import { TaskProps, deleteTask, postTask, updateTask } from '../../lib/tasks';
import { v4 as uuidv4 } from 'uuid';
import { ProjectProps } from '../../pages/Projects/Projects.types';
import { DataProps } from './KanbanColumn.types';
import { DateAndLevel } from './KanbanColumn.utils';
import { toast } from 'react-toastify';
import { ColumnProps } from 'pages/Tasks/Tasks.types';
import { useUserData } from 'contexts/UserProvider';

const Task = ({ task, index, columns, setColumns, column, projects } : { task: TaskProps, index: number, projects: ProjectProps[] } & DataProps) => {
  const [isEdit, setIsEdit] = React.useState(false);
  const [editableTask, setEditableTask] = React.useState(task);

  const [user] = useUserData();

  const handleDelete = () => {
    if (!column || !user) {
      return;
    }
    const specificColumn = columns.filter((col) => col.id === column.id);
    const cleanTasks = specificColumn[0].items.filter((item: TaskProps) => item.id !== task.id);
    specificColumn[0].items = cleanTasks;

    const otherColumns = columns.filter((col) => col.id !== column.id);
    const joinColumns = [specificColumn, otherColumns].flat();
    const sortedColumns = joinColumns.sort((a, b) => a.orderBy - b.orderBy);

    deleteTask(user.token, task.id)
      .then(() => setColumns(sortedColumns))
      .catch((error) => toast.error(error));
  };

  const handleSave = () => {
    if (!user) {
      return;
    }
    const copyTask = { ...editableTask };
    delete copyTask.projects;
    updateTask(user.token, task.id, copyTask)
      .then(() => setIsEdit(false))
      .catch((error) => toast.error(error));
  };

  return (
    <Draggable key={task.id} draggableId={task.id} index={index}>
      {(provided) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{ background: lightBlue, padding: '24px', position: 'relative', ...provided.draggableProps.style }}
          onDoubleClick={() => setIsEdit(true)}
        >
          {isEdit ? <>
            <IconButton onClick={() => setIsEdit(false)} sx={{ position: 'absolute', right: '4px', top: '4px' }}>
              <CloseIcon fontSize='small' />
            </IconButton>
            <Stack spacing={2}>
              <TextField 
                value={editableTask.title} 
                label="title" 
                size='small' 
                variant='standard'
                onChange={(event) => setEditableTask((current) => ({ ...current, title: event.target.value }))}
              />
              <Box>
                <LocalizationProvider dateAdapter={AdapterLuxon}>
                  <DatePicker 
                    slotProps={{ textField: { size: 'small', fullWidth: true } }} 
                    label="Deadline" 
                    onChange={(value) => setEditableTask((current) => ({ ...current, deadline: value as string }))} />
                </LocalizationProvider>
              </Box>
              <FormControl size="small">
                <InputLabel>Difficulty Level</InputLabel>
                <Select
                  value={editableTask.importance || ''}
                  label="difficulty levels"
                  onChange={(event) => setEditableTask((current) => ({ ...current, importance: event.target.value }))}
                >
                  <MenuItem value="personal">
                    Blank
                  </MenuItem>
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                </Select>
              </FormControl>
              <Autocomplete
                value={editableTask?.projects}
                disablePortal
                id="combo-box"
                options={projects}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => <TextField {...params} label="project" />}
                onChange={(event, newValue) => setEditableTask((current) => ({ ...current, projects: newValue, project_id: newValue?.id }))}
              />
            </Stack>
            <Box sx={{ textAlign: 'right', paddingTop: '16px' }}>
              <IconButton onClick={handleSave}>
                <SaveAsIcon fontSize='small' />
              </IconButton>
            </Box>
          </> : 
            <>
              <IconButton onClick={handleDelete} sx={{ position: 'absolute', right: '4px', top: '4px' }}>
                <CloseIcon sx={{ width: '12px', height: '12px' }} />
              </IconButton>
              <Typography fontWeight={700} fontSize="16px">{editableTask.title}</Typography>
              <Stack direction="row" justifyContent="space-between" alignItems="center" paddingTop="16px" flexWrap="wrap">
                <DateAndLevel deadline={DateTime.fromISO(editableTask.deadline).toFormat('MMMM, dd')} level={editableTask.importance} />
                <Typography fontWeight={100} fontSize="14px" sx={{ marginLeft: 'auto' }}>{editableTask?.projects?.title}</Typography>
              </Stack>
            </>
          }
        </Box>
      )}
    </Draggable>
  );
};

const Column = ({ column, columns, setColumns, projects } : 
  { column: ColumnProps, columns: ColumnProps[], setColumns: React.Dispatch<React.SetStateAction<ColumnProps[]>>, projects: ProjectProps[] }) => {
  const [user] = useUserData();

  const addItem = () => {
    if (!user) {
      return;
    }

    const specificColumn = columns.filter((col) => col.id === column.id);
    const otherColumns = columns.filter((col) => col.id !== column.id);
    const task = { id: uuidv4(), title: 'Title', deadline: DateTime.now().toFormat('yyyy-MM-dd'), column_id: column.id, importance: null };
    specificColumn[0].items.push(task);

    const joinColumns = [specificColumn, otherColumns].flat();
    const sortedColumns = joinColumns.sort((a, b) => a.orderBy - b.orderBy);

    postTask(user.token, task)
      .then(() => setColumns(sortedColumns))
      .catch((error) => toast.error(error));

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
                projects={projects}
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