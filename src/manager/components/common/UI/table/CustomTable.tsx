import * as React from 'react';
import MobileSearch from './mobile/MobileSearch';
import { SearchAndFilter } from './TableFilters';
import TableContent from './TableContent';
import Paginations from './Paginations';
import { CustomTableProps } from '../../../../types/table';

const CustomTable: React.FC<CustomTableProps> = ({
  data,
  searchTitle,
  open,
  setOpen,
  selectedFilters,
  onFilterChange,
  sortOption,
  onSortChange,
  onSearchChange,
  onApplyFilters,
  page,
  onPageChange,
  isLoading
}) => {
  return (
    <React.Fragment>
      <MobileSearch
        open={open}
        setOpen={setOpen}
        searchTitle={searchTitle}
        // onSearchChange={onSearchChange}
      />
      <SearchAndFilter
        searchTitle={searchTitle}
        onFilterChange={onFilterChange}
        sortOption={sortOption}
        onSortChange={onSortChange}
        onSearchChange={onSearchChange}
        selectedFilters={selectedFilters}
        onApplyFilters={onApplyFilters}
      />
      <TableContent data={data} isLoading={isLoading} />
      <Paginations page={page} onPageChange={onPageChange} />
    </React.Fragment>
  );
};

export default CustomTable;
