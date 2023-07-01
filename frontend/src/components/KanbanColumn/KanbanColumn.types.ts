import { ColumnProps } from 'pages/Tasks/Tasks.types';

export type DataProps = {
  columns: ColumnProps[];
  setColumns: React.Dispatch<React.SetStateAction<ColumnProps[]>>;
  column?: ColumnProps;
};
