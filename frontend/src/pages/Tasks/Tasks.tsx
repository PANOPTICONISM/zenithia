import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { Grid } from "@mui/material";
import lodash from "lodash";
import React from "react";
import { toast } from "react-toastify";
import { getProjects } from "../../api/projects";
import {
  getTasks,
  ProjectTaskProps,
  TaskProps,
  updateTask,
} from "../../api/tasks";
import KanbanColumn from "../../components/KanbanColumn/KanbanColumn";
import Main from "../../components/Main/Main";
import { useUserData } from "../../contexts/UserProvider";

export type ColumnType = "TO DO" | "IN PROGRESS" | "DONE";

export const COLUMNS = {
  TO_DO: "TO DO",
  IN_PROGRESS: "IN PROGRESS",
  DONE: "DONE",
} as const;

const Tasks = () => {
  const [columns, setColumns] = React.useState<Map<ColumnType, TaskProps[]>>(
    new Map()
  );
  const [projects, setProjects] = React.useState<ProjectTaskProps[]>([]);

  const [user] = useUserData();

  React.useEffect(() => {
    const fetchAll = async () => {
      if (!user) {
        return;
      }
      const [tasksRes, projectsRes] = await Promise.all([
        getTasks(user.token),
        getProjects(user.token, ["id", "title"]),
      ]);

      const grouppedTasks = lodash.groupBy(tasksRes, "column_id");

      const jointArrays = new Map(
        Object.values(COLUMNS).map((column) => [
          column,
          grouppedTasks[column] || [],
        ])
      );

      setColumns(jointArrays);
      setProjects(projectsRes);
    };

    fetchAll().catch((error) => toast.error(error));
  }, [user]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination || !user) {
      return;
    }
    const { source, destination, draggableId } = result;

    const sourceColumn = columns.get(source.droppableId as ColumnType);
    const destColumn = columns.get(destination.droppableId as ColumnType);

    if (!sourceColumn || !destColumn) {
      return;
    }

    if (source.droppableId !== destination.droppableId) {
      const sourceItems = Array.from(sourceColumn);
      const destItems = Array.from(destColumn);
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      setColumns((prev) => {
        const newColumns = new Map(prev);
        newColumns.set(source.droppableId as ColumnType, sourceItems);
        newColumns.set(destination.droppableId as ColumnType, destItems);
        return newColumns;
      });

      updateTask(user.token, draggableId, {
        column_id: destination.droppableId as ColumnType,
      }).catch((error) => toast.error("Update single field: " + error));
    } else {
      const copiedItems = Array.from(sourceColumn);
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);

      setColumns((prev) => {
        const newColumns = new Map(prev);
        newColumns.set(source.droppableId as ColumnType, copiedItems);
        return newColumns;
      });
    }
  };

  return (
    <Main title="Tasks">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Grid container spacing={2}>
          {[...columns.entries()].map(([key, entries]) => {
            return (
              <Grid
                size={{
                  xs: 12,
                  lg: 4,
                }}
                key={key}
              >
                <KanbanColumn
                  columnName={key}
                  entries={entries}
                  setColumns={setColumns}
                  projects={projects}
                />
              </Grid>
            );
          })}
        </Grid>
      </DragDropContext>
    </Main>
  );
};

export default Tasks;
