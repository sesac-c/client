/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';

import { Avatar, Box, Chip, Link, Table, Sheet, Typography } from '@mui/joy';
import { Dropdown, MenuButton, Menu, MenuItem, IconButton, Divider } from '@mui/joy';

import { MoreHorizRounded as MoreHorizRoundedIcon } from '@mui/icons-material';

import { statusColors, statusIcons, getStatusIcon, RowMenuProps, TableRowProps, TableContentProps } from './types';

const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th style={{ width: 120, padding: '12px 6px' }}>Invoice</th>
        <th style={{ width: 140, padding: '12px 6px' }}>Date</th>
        <th style={{ width: 140, padding: '12px 6px' }}>Status</th>
        <th style={{ width: 240, padding: '12px 6px' }}>Customer</th>
        <th style={{ width: 140, padding: '12px 6px' }}> </th>
      </tr>
    </thead>
  );
};

const RowMenu: React.FC<RowMenuProps> = ({ onAction }) => {
  return (
    <Dropdown>
      <MenuButton slots={{ root: IconButton }} slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}>
        <MoreHorizRoundedIcon />
      </MenuButton>
      <Menu size='sm' sx={{ minWidth: 140 }}>
        <MenuItem onClick={() => onAction('edit')}>Edit</MenuItem>
        <MenuItem onClick={() => onAction('rename')}>Rename</MenuItem>
        <MenuItem onClick={() => onAction('move')}>Move</MenuItem>
        <Divider />
        <MenuItem onClick={() => onAction('delete')} color='danger'>
          Delete
        </MenuItem>
      </Menu>
    </Dropdown>
  );
};

const TableRow: React.FC<TableRowProps> = ({ row }) => {
  return (
    <tr>
      <td>
        <Typography level='body-xs'>{row.id}</Typography>
      </td>
      <td>
        <Typography level='body-xs'>{row.date}</Typography>
      </td>
      <td>
        <Chip variant='soft' size='sm' startDecorator={getStatusIcon(row.status)} color={statusColors[row.status]}>
          {row.status}
        </Chip>
      </td>
      <td>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Avatar size='sm'>{row.customer.initial}</Avatar>
          <div>
            <Typography level='body-xs'>{row.customer.name}</Typography>
            <Typography level='body-xs'>{row.customer.email}</Typography>
          </div>
        </Box>
      </td>
      <td>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Link level='body-xs' component='button'>
            Download
          </Link>
          {/**<RowMenu /> */}
        </Box>
      </td>
    </tr>
  );
};

const TableContent: React.FC<TableContentProps> = ({ rows }) => (
  <Sheet
    className='OrderTableContainer'
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
        '--TableCell-paddingY': '4px',
        '--TableCell-paddingX': '8px'
      }}
    >
      <TableHeader />
      <tbody>
        {rows.map(row => (
          <TableRow key={row.id} row={row} />
        ))}
      </tbody>
    </Table>
  </Sheet>
);

export default TableContent;
