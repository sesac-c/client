import React from 'react';
import MobileSearch from '../../common/UI/table/mobile/MobileSearch';
import TableContent from '../../common/UI/table/TableContent';
import Paginations from '../../common/UI/table/Paginations';
import { MobileSearchProps, SearchAndFilterProps, TableContentProps, PaginationsProps } from '../../../types';
import { SearchAndFilter } from '../../common/UI/table/TableFilters';

const CourseList: React.FC<MobileSearchProps & SearchAndFilterProps & TableContentProps & PaginationsProps> = ({
  open,
  setOpen,
  searchTitle,
  searchInputProps,
  filtersProps,
  sortsProps,
  onApplyFilters,
  data,
  isLoading,
  page,
  onPageChange
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
        // search
        searchInputProps={searchInputProps}
        // filter
        filtersProps={filtersProps}
        // sort
        sortsProps={sortsProps}
        onApplyFilters={onApplyFilters}
      />
      <TableContent data={data} isLoading={isLoading} />
      <Paginations page={page} onPageChange={onPageChange} />
    </React.Fragment>
  );
};

export default CourseList;
