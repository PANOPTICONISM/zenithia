import { ColumnProps } from 'pages/Tasks';

export type DataProps = {
    columns: ColumnProps[],
    setColumns: React.Dispatch<React.SetStateAction<ColumnProps[]>>;
    column?: ColumnProps,
  }