import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { Grid } from "@mui/material";
import { useUserData } from "contexts/UserProvider";
import lodash from "lodash";
import React from "react";
import { toast } from "react-toastify";
import { getProjects } from "../../api/projects";
import { getTasks, TaskProps } from "../../api/tasks";
import KanbanColumn from "../../components/KanbanColumn/KanbanColumn";
import Main from "../../components/Main/Main";
import { ProjectProps } from "../Projects/Projects.types";

export type ColumnType = "TO DO" | "IN PROGRESS" | "DONE";

const COLUMNS = {
  TO_DO: "TO DO",
  IN_PROGRESS: "IN PROGRESS",
  DONE: "DONE",
} as const;

const Tasks = () => {
  const [columns, setColumns] = React.useState<Map<ColumnType, TaskProps[]>>(new Map());
  const [projects, setProjects] = React.useState<ProjectProps[]>([]);

  const [user] = useUserData();

  React.useEffect(() => {
    const fetchAll = async () => {
      if (!user) {
        return;
      }
      const [tasksRes, projectsRes] = await Promise.all([
        getTasks(user.token),
        getProjects(user.token),
      ]);

      const grouppedTasks = lodash.groupBy(tasksRes, "table_id");

      const jointArrays = new Map(
        Object.values(COLUMNS).map((column) => [
          column, grouppedTasks[column] || [],
        ])
      );

      setColumns(jointArrays);
      setProjects(projectsRes);
    };

    fetchAll().catch((error) => toast.error(error));
  }, [user]);

  const handleDragEnd = (result: DropResult) => {

    // TODO: Update drag and drop
    // if (!result.destination || !user) {
    //   return;
    // }
    // const { source, destination, draggableId } = result;

    // if (source.droppableId !== destination.droppableId) {
    //   const sourceColumn = columns.filter(
    //     (column) => column.id === source.droppableId,
    //   );
    //   const destColumn = columns.filter(
    //     (column) => column.id === destination.droppableId,
    //   );
    //   const sourceItems = [...sourceColumn][0].items;
    //   const destItems = [...destColumn][0].items;
    //   const [removed] = sourceItems.splice(source.index, 1);
    //   destItems.splice(destination.index, 0, removed);

    //   const removedSourceColumn = columns.filter(
    //     (column) => column.id !== sourceColumn[0].id,
    //   );
    //   const removedDestColumn = removedSourceColumn.filter(
    //     (column) => column.id !== destColumn[0].id,
    //   );
    //   const joinColumnChanges = [
    //     sourceColumn,
    //     destColumn,
    //     removedDestColumn,
    //   ].flat();

    //   updateTask(user.token, draggableId, {
    //     column_id: destination.droppableId,
    //   })
    //     .then(() =>
    //       setColumns(joinColumnChanges.sort((a, b) => a.orderBy - b.orderBy)),
    //     )
    //     .catch((error) => toast.error("Update single field: " + error));
    // } else {
    //   const sourceColumn = columns.filter(
    //     (column) => column.id == source.droppableId,
    //   );
    //   const copiedItems = [...sourceColumn][0].items;
    //   const [removed] = copiedItems.splice(source.index, 1);
    //   copiedItems.splice(destination.index, 0, removed);

    //   const removedSourceColumn = columns.filter(
    //     (column) => column.id !== sourceColumn[0].id,
    //   );
    //   const joinColumnChanges = [sourceColumn, removedSourceColumn].flat();
    //   setColumns(joinColumnChanges.sort((a, b) => a.orderBy - b.orderBy));
    // }
  };

  return (
    <Main title="Tasks">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Grid container spacing={2}>
          {[...columns.entries()].map(([key, entries]) => {
            console.log(key, entries);
            return (
              <Grid item key={key} xs={12} lg={4}>
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
