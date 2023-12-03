import { TaskProps } from "api/tasks";

export type ColumnProps = {
  id: string;
  title: string;
  orderBy: number;
  items: TaskProps[];
};
