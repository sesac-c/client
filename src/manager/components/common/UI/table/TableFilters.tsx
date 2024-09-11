import React from 'react';

import { Input, FormControl, FormLabel, Select, Option } from '@mui/joy';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/material';

export const TableSearch = () => {
  return (
    <FormControl sx={{ flex: 1 }} size='sm'>
      <FormLabel>Search for order</FormLabel>
      <Input size='sm' placeholder='Search' startDecorator={<SearchIcon />} />
    </FormControl>
  );
};
export const TableFilter = () => (
  <React.Fragment>
    <FormControl sx={{ flex: 1 }} size='sm'>
      <FormLabel>Search for order</FormLabel>
      <Input size='sm' placeholder='Search' startDecorator={<SearchIcon />} />
    </FormControl>
    <FormControl size='sm'>
      <FormLabel>Status</FormLabel>
      <Select size='sm' placeholder='Filter by status' slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}>
        <Option value='paid'>Paid</Option>
        <Option value='pending'>Pending</Option>
        <Option value='refunded'>Refunded</Option>
        <Option value='cancelled'>Cancelled</Option>
      </Select>
    </FormControl>
    <FormControl size='sm'>
      <FormLabel>Category</FormLabel>
      <Select size='sm' placeholder='All'>
        <Option value='all'>All</Option>
        <Option value='refund'>Refund</Option>
        <Option value='purchase'>Purchase</Option>
        <Option value='debit'>Debit</Option>
      </Select>
    </FormControl>
    <FormControl size='sm'>
      <FormLabel>Customer</FormLabel>
      <Select size='sm' placeholder='All'>
        <Option value='all'>All</Option>
        <Option value='olivia'>Olivia Rhye</Option>
        <Option value='steve'>Steve Hampton</Option>
        <Option value='ciaran'>Ciaran Murray</Option>
        <Option value='marina'>Marina Macdonald</Option>
        <Option value='charles'>Charles Fulton</Option>
        <Option value='jay'>Jay Hoper</Option>
      </Select>
    </FormControl>
  </React.Fragment>
);

const TabletSearchAndFilter: React.FC = () => (
  <Box
    className='SearchAndFilters-tabletUp'
    sx={{
      borderRadius: 'sm',
      py: 2,
      display: { xs: 'none', sm: 'flex' },
      flexWrap: 'wrap',
      gap: 1.5,
      '& > *': {
        minWidth: { xs: '120px', md: '160px' }
      }
    }}
  >
    <TableSearch />
    <TableFilter />
  </Box>
);

export default TabletSearchAndFilter;
