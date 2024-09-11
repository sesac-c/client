/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';

import { Button, Divider, Input, Modal, ModalDialog, ModalClose, Sheet, Typography } from '@mui/joy';

import IconButton from '@mui/joy/IconButton';

import { FilterAlt as FilterAltIcon, Search as SearchIcon } from '@mui/icons-material';

import { TableFilter } from '../TableFilters';

const MobileSearch: React.FC<{ open: boolean; setOpen: (open: boolean) => void }> = ({ open, setOpen }) => (
  <Sheet className='SearchAndFilters-mobile' sx={{ display: { xs: 'flex', sm: 'none' }, my: 1, gap: 1 }}>
    <Input size='sm' placeholder='Search' startDecorator={<SearchIcon />} sx={{ flexGrow: 1 }} />
    <IconButton size='sm' variant='outlined' color='neutral' onClick={() => setOpen(true)}>
      <FilterAltIcon />
    </IconButton>
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog aria-labelledby='filter-modal' layout='fullscreen'>
        <ModalClose />
        <Typography id='filter-modal' level='h2'>
          Filters
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Sheet sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TableFilter />
          <Button color='primary' onClick={() => setOpen(false)}>
            Submit
          </Button>
        </Sheet>
      </ModalDialog>
    </Modal>
  </Sheet>
);

export default MobileSearch;
