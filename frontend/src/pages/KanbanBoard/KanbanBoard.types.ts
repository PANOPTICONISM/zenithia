import { TaskProps } from "../../api/tasks";

export type ColumnType = "TO DO" | "IN PROGRESS" | "DONE";

export type ColumnProps = {
  id: string;
  title: string;
  orderBy: number;
  items: TaskProps[];
};
