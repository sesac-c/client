import React from 'react';
import { MobileSearchProps, TableContentProps } from '../../../types';
import MobileSearch from '../../common/UI/table/mobile/MobileSearch';
import TableContent from '../../common/UI/table/TableContent';
import { Divider } from '@mui/material';

const CampusList: React.FC<MobileSearchProps & TableContentProps> = ({
  searchTitle,
  open,
  setOpen,
  data,
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
      <Divider
        sx={{
          margin: '10px 0 20px'
        }}
      />
      <TableContent data={data} isLoading={isLoading} />
    </React.Fragment>
  );
};

export default CampusList;
