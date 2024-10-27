import React from 'react';
import { SearchAndFilterProps, TableContentProps, MobileSearchProps } from '@/types';
import MobileSearch from '@/components/manager/UI/table/mobile/MobileSearch';
import { SearchAndFilter } from '@/components/manager/UI/table/TableFilters';
import TableContent from '@/components/manager/UI/table/TableContent';

const RestaurantList: React.FC<MobileSearchProps & SearchAndFilterProps & TableContentProps> = ({
  open,
  setOpen,
  searchTitle,
  searchInputProps,
  onApplyFilters,
  data,
  isLoading
}) => {
  return (
    <React.Fragment>
      <MobileSearch open={open} setOpen={setOpen} searchTitle={searchTitle} />
      <SearchAndFilter searchInputProps={searchInputProps} onApplyFilters={onApplyFilters} />
      <TableContent data={data} isLoading={isLoading} />
    </React.Fragment>
  );
};
export default RestaurantList;
