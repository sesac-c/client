import React from 'react';

import { Input, FormControl, FormLabel, Select, Option, Link, Button } from '@mui/joy';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/material';
import { FILTERS, FilterSortGroup, SearchAndFilterProps, SORTS, TableSearchProps } from '../../../../types/table';

export const TableSearch: React.FC<TableSearchProps> = ({ searchTitle }) => {
  return <React.Fragment></React.Fragment>;
};

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  onFilterChange,
  onSortChange,
  onSearchChange,
  onApplyFilters,
  selectedFilters,
  sortOption,
  searchTitle
}) => {
  const filters = FILTERS[searchTitle];
  const sort = SORTS[searchTitle];

  const handleFilterChange = (name: string) => (event: React.SyntheticEvent | null, newValue: string | null) => {
    if (newValue !== null) {
      onFilterChange(name, newValue);
    }
  };

  const handleSortChange = (event: React.SyntheticEvent | null, newValue: string | null) => {
    if (newValue !== null) {
      onSortChange(newValue);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  return (
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
      <Input
        size='sm'
        sx={{
          flexGrow: 1,
          '--Input-focusedInset': 'var(--joy-palette-success-500, #1F7A1F)',
          '&::before': {
            transition: 'box-shadow .15s ease-in-out'
          },
          '&:focus-within': {
            borderColor: 'var(--joy-palette-success-500, #1F7A1F)'
          }
        }}
        placeholder={`${searchTitle} 검색`}
        startDecorator={<SearchIcon />}
        onChange={handleSearchChange}
      />
      {filters.map((filter: FilterSortGroup) => (
        <FormControl size='sm' key={filter.name}>
          <Select
            size='sm'
            placeholder={`${filter.label} 선택`}
            value={selectedFilters[filter.name] || null}
            onChange={handleFilterChange(filter.name)}
            slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
          >
            {filter.options.map(option => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </FormControl>
      ))}
      <FormControl size='sm'>
        <Select
          size='sm'
          placeholder={`${sort.label}`}
          value={sortOption || null}
          onChange={handleSortChange}
          slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
        >
          {sort.options.map(option => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </FormControl>
      <Button color='success' onClick={onApplyFilters}>
        적용
      </Button>
    </Box>
  );
};
