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
import { ColumnProps } from "pages/Tasks/Tasks.types";
import React from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { postTask } from "../../api/tasks";
import { grey } from "../../App";
import { ProjectProps } from "../../pages/Projects/Projects.types";
import Task from "./components/Task";

const Column = ({
  column,
  columns,
  setColumns,
  projects,
}: {
  column: ColumnProps;
  columns: ColumnProps[];
  setColumns: React.Dispatch<React.SetStateAction<ColumnProps[]>>;
  projects: ProjectProps[];
}) => {
  const [user] = useUserData();

  const addItem = () => {
    if (!user) {
      return;
    }

    const specificColumn = columns.filter((col) => col.id === column.id);
    const otherColumns = columns.filter((col) => col.id !== column.id);
    const task = {
      id: uuidv4(),
      title: "Title",
      importance: null,
      deadline: currentDate(),
      table_id: column.id,
      project_id: null,
    };
    specificColumn[0].items.push(task);

    const joinColumns = [specificColumn, otherColumns].flat();
    const sortedColumns = joinColumns.sort((a, b) => a.orderBy - b.orderBy);

    postTask(user.token, task)
      .then(() => setColumns(sortedColumns))
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
          <Typography>{column.title}</Typography>
        </Stack>
        <IconButton onClick={addItem}>
          <AddIcon />
        </IconButton>
      </Stack>
      <Droppable droppableId={column.id} key={column.id}>
        {(provided) => (
          <Stack
            sx={{ padding: "24px" }}
            spacing={2}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {column.items.map((task, index) => (
              <Task
                task={task}
                key={task.id}
                index={index}
                columns={columns}
                setColumns={setColumns}
                column={column}
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

export default Column;
