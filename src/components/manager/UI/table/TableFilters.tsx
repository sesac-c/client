import React from 'react';

import { Input, FormControl,  Select, Option,  Button, Typography } from '@mui/joy';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/material';
import {
  FILTERS,
  FilterSortGroup,
  FiltersProps,
  SearchAndFilterProps,
  SearchInputProps,
  SORTS,
  SortsProps
} from '@/types';

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchInputProps,
  filtersProps,
  sortsProps,

  onApplyFilters,
  buttonText = '적용'
}) => {
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
      {searchInputProps && (
        <SearchInput onSearchChange={searchInputProps.onSearchChange} searchTitle={searchInputProps.searchTitle} />
      )}
      {filtersProps && (
        <Filters
          onFilterChange={filtersProps.onFilterChange}
          searchTitle={filtersProps.searchTitle}
          selectedFilters={filtersProps.selectedFilters}
          lazyLoadedFilters={filtersProps.lazyLoadedFilters}
        />
      )}
      {sortsProps && (
        <Sorts
          onSortChange={sortsProps.onSortChange}
          searchTitle={sortsProps.searchTitle}
          sortOption={sortsProps.sortOption}
        />
      )}
      <Button color='success' onClick={onApplyFilters}>
        {buttonText}
      </Button>
    </Box>
  );
};

const SearchInput: React.FC<SearchInputProps> = ({ searchTitle, onSearchChange }) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };
  return (
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
  );
};

const Filters: React.FC<FiltersProps> = ({ searchTitle, lazyLoadedFilters, selectedFilters, onFilterChange }) => {
  const filters = lazyLoadedFilters || FILTERS[searchTitle];

  const handleFilterChange = (name: string) => (event: React.SyntheticEvent | null, newValue: string | null) => {
    if (newValue !== null) {
      onFilterChange(name, newValue);
    }
  };
  return (
    <React.Fragment>
      {filters.map((filter: FilterSortGroup) => (
        <FormControl size='sm' key={filter.name}>
          <Select
            size='md'
            placeholder={`${filter.label} 선택`}
            value={selectedFilters[filter.name] ?? null}
            onChange={handleFilterChange(filter.name)}
            slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
          >
            {filter.options?.map(option => (
              <Option key={option.value} value={option.value}>
                <Typography level='body-sm'>{option.label}</Typography>
              </Option>
            ))}
          </Select>
        </FormControl>
      ))}
    </React.Fragment>
  );
};

const Sorts: React.FC<SortsProps> = ({ searchTitle, sortOption, onSortChange }) => {
  const sort = SORTS[searchTitle];

  const handleSortChange = (event: React.SyntheticEvent | null, newValue: string | null) => {
    if (newValue !== null) {
      onSortChange(newValue);
    }
  };
  return (
    <FormControl size='sm'>
      <Select
        size='md'
        placeholder={`${sort.label}`}
        value={sortOption || null}
        onChange={handleSortChange}
        slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
      >
        {sort.options?.map(option => (
          <Option key={option.value} value={option.value}>
            <Typography level='body-sm'>{option.label}</Typography>
          </Option>
        ))}
      </Select>
    </FormControl>
  );
};
