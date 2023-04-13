import { DataGridProps, GridFilterModel } from '@mui/x-data-grid';
import * as React from 'react';
import { useSearchBar } from '../../contexts/SearchBarProvider';

export const useFiltering = ({ columnField }: { columnField: string }) => {
  const [search, setSearch] = useSearchBar();

  const [filterModel, setFilterModel] = React.useState<GridFilterModel>({ items: [] });

  React.useEffect(() => {
    setFilterModel((model) => {
      const filters = model.items.filter((item) =>
        !(item.field === columnField && item.operator === 'contains')
      );
      if (search !== '') {
        filters.push({
          field: columnField,
          operator: 'contains',
          value: search
        });
      }
      return { ...model, items: filters };
    });
  }, [columnField, search]);

  const handleFilterChange: NonNullable<DataGridProps['onFilterModelChange']> = React.useCallback(
    (model) => {
      const nameFilter = model.items.find(
        (item) => item.field === columnField && item.operator === 'contains'
      );
      if (model.items.some((item) => item.field === columnField &&item.operator !== 'contains'
      ) || nameFilter === undefined) {
        setSearch('');
      }
      setFilterModel(model);
    },
    [columnField, setSearch]
  );

  return {
    filterModel,
    handleFilterChange,
  };
};