import * as React from 'react';
import { Avatar, Box, Chip, Link, Table, Sheet, Typography, Skeleton } from '@mui/joy';
import { Dropdown, MenuButton, Menu, MenuItem, IconButton, Divider } from '@mui/joy';
import { MoreHorizRounded as MoreHorizRoundedIcon } from '@mui/icons-material';
import { RowContent, Headers, TableContentProps, allHeaders, StatusCode, RowMenuProps } from '../../../../types';

import { getStatusTextKorean, getStatusColor, getStatusIcon } from '../../../../utils';

const TableHeader = <T extends RowContent>({ headers }: { headers: Headers<T> }) => {
  const defaultTheadStyle = { padding: '10px 20px', alignContent: 'center' };
  return (
    <thead>
      <tr>
        {Object.entries(headers).map(([key]) => {
          const { label, width } = headers[key as keyof T];
          return (
            <th key={key} style={{ ...defaultTheadStyle, width: width }}>
              {label}
            </th>
          );
        })}
        <th style={{ ...defaultTheadStyle, width: '7%' }}>더보기</th>
      </tr>
    </thead>
  );
};

const RowMenu: React.FC<RowMenuProps> = ({ hasDeleteMenu = false, onAction }) => {
  return (
    <Dropdown>
      <MenuButton slots={{ root: IconButton }} slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}>
        <MoreHorizRoundedIcon />
      </MenuButton>
      <Menu size='sm' sx={{ minWidth: 140 }}>
        <MenuItem onClick={() => onAction('detail')}>상세보기</MenuItem>
        {hasDeleteMenu && (
          <React.Fragment>
            <Divider />
            <MenuItem onClick={() => onAction('delete')} color='danger'>
              Delete
            </MenuItem>
          </React.Fragment>
        )}
      </Menu>
    </Dropdown>
  );
};

const TableRow = <T extends RowContent>({ row, headers }: { row: T; headers: Headers<T> }) => {
  return (
    <tr>
      {(Object.keys(headers) as Array<keyof T>).map(key => (
        <td key={key as string}>
          {key === 'status' && typeof row[key] === 'number' ? (
            <Chip
              variant='soft'
              size='sm'
              startDecorator={getStatusIcon(row[key] as StatusCode)}
              color={getStatusColor(row[key] as StatusCode)}
            >
              {getStatusTextKorean(row[key] as StatusCode)}
            </Chip>
          ) : (
            <Typography level='body-xs'>{String(row[key])}</Typography>
          )}
        </td>
      ))}
      <td>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <RowMenu onAction={() => {}} />
        </Box>
      </td>
    </tr>
  );
};

const TableContent: React.FC<TableContentProps> = ({ data, isLoading }) => {
  const headers = allHeaders[data.type] as Headers<RowContent>;

  const renderSkeletonRows = () => {
    return Array.from({ length: 5 }).map((_, index) => (
      <tr key={`skeleton-${index}`}>
        {Object.keys(headers).map((header, cellIndex) => (
          <td key={`skeleton-cell-${cellIndex}`}>
            <Skeleton variant='text' width='80%' height={20} />
          </td>
        ))}
      </tr>
    ));
  };

  return (
    <Sheet
      className='TableContainer'
      variant='outlined'
      sx={{
        display: { xs: 'none', sm: 'initial' },
        width: '100%',
        borderRadius: 'sm',
        flexShrink: 1,
        overflow: 'auto',
        minHeight: 0
      }}
    >
      <Table
        aria-labelledby='tableTitle'
        stickyHeader
        hoverRow
        sx={{
          '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
          '--Table-headerUnderlineThickness': '1px',
          '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
          '--TableCell-paddingY': '2px',
          '--TableCell-paddingX': '20px'
        }}
      >
        <TableHeader headers={headers} />
        <tbody>
          {isLoading
            ? renderSkeletonRows()
            : data.contents.map((row, index) => <TableRow key={index} row={row} headers={headers} />)}
        </tbody>
      </Table>
    </Sheet>
  );
};

export default TableContent;
