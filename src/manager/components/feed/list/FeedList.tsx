import React from 'react';
import {
  SearchTitle,
  SearchAndFilterProps,
  TableContentProps,
  PaginationsProps,
  MobileSearchProps
} from '../../../types';
import MobileSearch from '../../common/UI/table/mobile/MobileSearch';
import { SearchAndFilter } from '../../common/UI/table/TableFilters';
import TableContent from '../../common/UI/table/TableContent';
import Paginations from '../../common/UI/table/Paginations';

const FeedList: React.FC<MobileSearchProps & SearchAndFilterProps & TableContentProps & PaginationsProps> = ({
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
      <MobileSearch open={open} setOpen={setOpen} searchTitle={searchTitle} />
      <SearchAndFilter searchInputProps={searchInputProps} onApplyFilters={onApplyFilters} />
      <TableContent data={data} isLoading={isLoading} />
      <Paginations page={page} onPageChange={onPageChange} />
    </React.Fragment>
  );
};
export default FeedList;
