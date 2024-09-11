import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemContent,
  ListItemDecorator,
  ListDivider,
  Typography,
  Chip,
  Link,
  Avatar,
  IconButton
} from '@mui/joy';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { ItemComponentProps, getStatusColor, getStatusIcon } from '../types';
import RowMenu from '../TableContent';

// tbody의 내용
const MobileItemList: React.FC<ItemComponentProps> = ({ items, onDownload, onRowAction }) => {
  return (
    <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
      {items.map(item => (
        <List key={item.id} size='sm' sx={{ '--ListItem-paddingX': 0 }}>
          <ListItem
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start'
            }}
          >
            <ListItemContent sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
              <ListItemDecorator>
                <Avatar size='sm'>{item.customer.initial}</Avatar>
              </ListItemDecorator>
              <div>
                <Typography level='body-xs' fontWeight={600}>
                  {item.customer.name}
                </Typography>
                <Typography level='body-xs' sx={{ mb: 1 }}>
                  {item.customer.email}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 0.5,
                    mb: 1
                  }}
                >
                  <Typography level='body-xs'>{item.date}</Typography>
                  <Typography level='body-xs'>&bull;</Typography>
                  <Typography level='body-xs'>{item.id}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Link level='body-sm' component='button' onClick={() => onDownload && onDownload(item.id)}>
                    Download
                  </Link>
                  {/*<RowMenu onAction={action => onRowAction && onRowAction(action, item)} />*/}
                </Box>
              </div>
            </ListItemContent>
            <Chip
              variant='soft'
              size='sm'
              startDecorator={getStatusIcon(item.status)}
              color={getStatusColor(item.status)}
            >
              {item.status}
            </Chip>
          </ListItem>
          <ListDivider />
        </List>
      ))}
      <Box className='Pagination-mobile' sx={{ display: 'flex', alignItems: 'center', py: 2 }}>
        <IconButton aria-label='previous page' variant='outlined' color='neutral' size='sm'>
          <KeyboardArrowLeftIcon />
        </IconButton>
        <Typography level='body-sm' sx={{ mx: 'auto' }}>
          Page 1 of {Math.ceil(items.length / 6)}
        </Typography>
        <IconButton aria-label='next page' variant='outlined' color='neutral' size='sm'>
          <KeyboardArrowRightIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default MobileItemList;
