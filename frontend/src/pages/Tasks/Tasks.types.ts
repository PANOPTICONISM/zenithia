import { TaskProps } from "lib/tasks";

export type ColumnProps = {
  id: string;
  title: string;
  orderBy: number;
  items: TaskProps[];
};
