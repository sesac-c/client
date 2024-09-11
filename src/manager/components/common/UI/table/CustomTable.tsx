/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import MobileSearch from './mobile/MobileSearch';
import TabletSearchAndFilter from './TableFilters';
import TableContent from './TableContent';
import Paginations from './Pagenations';
import MobileItemList from './mobile/MobileItemList';

import { rows } from '../../../../_mock';

// =============================================================OrderTable

// theader 등의 내용

export default function CustomTable() {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <MobileSearch open={open} setOpen={setOpen} />
      <TabletSearchAndFilter />
      {/* <TableContent rows={rows}/> */}
      <Paginations />
      {/* <MobileItemList/> */}
    </React.Fragment>
  );
}
