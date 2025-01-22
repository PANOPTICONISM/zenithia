import { Draggable } from "@hello-pangea/dnd";
import CloseIcon from "@mui/icons-material/Close";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import {
  Autocomplete,
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { useUserData } from "contexts/UserProvider";
import { dateLuxonToISOForApi } from "lib/dates";
import { DateTime } from "luxon";
import React from "react";
import { toast } from "react-toastify";
import { TaskProps, deleteTask, updateTask } from "../../../api/tasks";
import { lightBlue } from "../../../App";
import { ProjectProps } from "../../../pages/Projects/Projects.types";
import { DataProps } from "../KanbanColumn.types";
import { DateAndLevel } from "./DateAndLevel";

const Task = ({
  task,
  index,
  columns,
  setColumns,
  column,
  projects,
}: {
  task: TaskProps;
  index: number;
  projects: ProjectProps[];
} & DataProps) => {
  const [isEdit, setIsEdit] = React.useState(false);
  const [editableTask, setEditableTask] = React.useState(task);

  const [user] = useUserData();

  const handleDelete = () => {
    if (!column || !user) {
      return;
    }
    const specificColumn = columns.filter((col) => col.id === column.id);
    const cleanTasks = specificColumn[0].items.filter(
      (item: TaskProps) => item.id !== task.id,
    );
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
    const updatedTask = {
      title: editableTask.title,
      importance: editableTask.importance,
      deadline: dateLuxonToISOForApi(
        editableTask.deadline as unknown as DateTime,
      ),
      table_id: editableTask.table_id,
      project_id: editableTask.project_id,
    };
    updateTask(user.token, editableTask.id, updatedTask)
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
          sx={{
            background: lightBlue,
            padding: "24px",
            position: "relative",
            ...provided.draggableProps.style,
          }}
          onDoubleClick={() => setIsEdit(true)}
        >
          {isEdit ? (
            <>
              <IconButton
                onClick={() => setIsEdit(false)}
                sx={{ position: "absolute", right: "4px", top: "4px" }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
              <Stack spacing={2}>
                <TextField
                  value={editableTask.title}
                  label="title"
                  size="small"
                  variant="standard"
                  onChange={(event) =>
                    setEditableTask((current) => ({
                      ...current,
                      title: event.target.value,
                    }))
                  }
                />
                <Box>
                  <LocalizationProvider dateAdapter={AdapterLuxon}>
                    <DatePicker
                      format="dd/MM/yyyy"
                      slotProps={{
                        textField: { size: "small", fullWidth: true },
                      }}
                      label="Deadline"
                      onChange={(value) =>
                        setEditableTask((current) => ({
                          ...current,
                          deadline: value as string,
                        }))
                      }
                    />
                  </LocalizationProvider>
                </Box>
                <FormControl size="small">
                  <InputLabel>Difficulty Level</InputLabel>
                  <Select
                    value={editableTask.importance || ""}
                    label="difficulty levels"
                    onChange={(event) =>
                      setEditableTask((current) => ({
                        ...current,
                        importance: event.target.value,
                      }))
                    }
                  >
                    <MenuItem value="personal">Blank</MenuItem>
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
                  getOptionLabel={(option) => option.title || ""}
                  renderInput={(params) => (
                    <TextField {...params} label="Project" />
                  )}
                  onChange={(event, newValue) =>
                    setEditableTask((current) => ({
                      ...current,
                      projects: newValue,
                      project_id: newValue?.id || null,
                    }))
                  }
                />
              </Stack>
              <Box sx={{ textAlign: "right", paddingTop: "16px" }}>
                <IconButton onClick={handleSave}>
                  <SaveAsIcon fontSize="small" />
                </IconButton>
              </Box>
            </>
          ) : (
            <>
              <IconButton
                onClick={handleDelete}
                sx={{ position: "absolute", right: "4px", top: "4px" }}
              >
                <CloseIcon sx={{ width: "12px", height: "12px" }} />
              </IconButton>
              <Typography fontWeight={700} fontSize="16px">
                {editableTask.title}
              </Typography>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                paddingTop="16px"
                flexWrap="wrap"
              >
                <DateAndLevel
                  deadline={DateTime.fromISO(
                    editableTask.deadline as string,
                  ).toFormat("MMMM, dd")}
                  level={editableTask.importance}
                />
                <Typography
                  fontWeight={100}
                  fontSize="14px"
                  sx={{ marginLeft: "auto" }}
                >
                  {editableTask?.projects?.title}
                </Typography>
              </Stack>
            </>
          )}
        </Box>
      )}
    </Draggable>
  );
};

export default Task;
