import React from 'react';
import { MobileSearchProps, SearchAndFilterProps, TableContentProps, PaginationsProps } from '@/types';
import MobileSearch from '@/components/manager/UI/table/mobile/MobileSearch';
import { SearchAndFilter } from '@/components/manager/UI/table/TableFilters';
import TableContent from '@/components/manager/UI/table/TableContent';
import Paginations from '@/components/manager/UI/table/Paginations';

const RunningmateList: React.FC<MobileSearchProps & SearchAndFilterProps & TableContentProps & PaginationsProps> = ({
  open,
  setOpen,
  searchTitle,
  searchInputProps,
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
        onApplyFilters={onApplyFilters}
      />
      <TableContent data={data} isLoading={isLoading} />
      <Paginations page={page} onPageChange={onPageChange} />
    </React.Fragment>
  );
};

export default RunningmateList;
