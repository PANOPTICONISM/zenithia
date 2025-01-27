import { Droppable } from "@hello-pangea/dnd";
import AddIcon from "@mui/icons-material/Add";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import {
  IconButton,
  Stack,
  Typography
} from "@mui/material";
import { useUserData } from "contexts/UserProvider";
import { currentDate } from "lib/dates";
import { ColumnType } from "pages/Tasks/Tasks";
import React from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { postTask, TaskProps } from "../../api/tasks";
import { grey } from "../../App";
import { ProjectProps } from "../../pages/Projects/Projects.types";
import Task from "./components/Task";

const KanbanColumn = ({
  columnName,
  entries,
  setColumns,
  projects,
}: {
  columnName: ColumnType;
  entries: TaskProps[];
  setColumns: React.Dispatch<React.SetStateAction<Map<ColumnType, TaskProps[]>>>;
  projects: ProjectProps[];
}) => {
  const [user] = useUserData();

  const addItem = () => {
    if (!user) {
      return;
    }

    const task = {
      id: uuidv4(),
      title: "Title",
      importance: null,
      deadline: currentDate(),
      column_id: columnName,
      project_id: null,
    };

    postTask(user.token, task)
      .then(() => {
        setColumns((prev) => {
          const newColumns = new Map(prev);
          const updatedColumn = newColumns.get(columnName) || [];
          newColumns.set(columnName, [...updatedColumn, task]);
          return newColumns;
        });
      })
      .catch((error) => toast.error(error));
  };

  return (
    <Stack sx={{ border: `1px solid ${grey}`, width: "100%" }}>
      <Stack
        sx={{ padding: "24px 24px 0 24px" }}
        direction="row"
        spacing={1}
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack direction="row" spacing={1}>
          <ReceiptLongIcon />
          <Typography>{columnName}</Typography>
        </Stack>
        <IconButton onClick={addItem}>
          <AddIcon />
        </IconButton>
      </Stack>
      <Droppable droppableId={columnName}>
        {(provided) => (
          <Stack
            sx={{ padding: "24px" }}
            spacing={2}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {entries.map((task, index) => (
              <Task
                task={task}
                key={task.id}
                index={index}
                setColumns={setColumns}
                projects={projects}
              />
            ))}
            {provided.placeholder}
          </Stack>
        )}
      </Droppable>
    </Stack>
  );
};

export default KanbanColumn;
