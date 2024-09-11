import React, { useState } from 'react';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import List from '@mui/joy/List';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box } from '@mui/material';

export interface MenuItem {
  title: string;
  icon?: React.ReactNode;
  path: string;
  children?: MenuItem[];
}
interface TogglerProps {
  defaultExpanded: boolean;
  renderToggle: (params: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => React.ReactNode;
  children: React.ReactNode;
}

const Toggler: React.FC<TogglerProps> = ({ defaultExpanded, renderToggle, children }) => {
  const [open, setOpen] = useState<boolean>(defaultExpanded);
  return (
    <React.Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={{
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          transition: '0.2s ease',
          '& > *': {
            overflow: 'hidden'
          }
        }}
      >
        {children}
      </Box>
    </React.Fragment>
  );
};

interface NestedMenuItemProps {
  item: MenuItem;
  isActive: boolean;
  onItemClick: (title: string, path: string) => void;
  defaultExpanded: boolean;
}

export const NestedMenuItem: React.FC<NestedMenuItemProps> = ({ item, isActive, onItemClick, defaultExpanded }) => (
  <ListItem nested>
    <Toggler
      defaultExpanded={defaultExpanded}
      renderToggle={({ open, setOpen }) => (
        <ListItemButton onClick={() => setOpen(!open)} selected={isActive}>
          {item.icon && item.icon}
          <ListItemContent>
            <Typography level='title-sm'>{item.title}</Typography>
          </ListItemContent>
          <KeyboardArrowDownIcon sx={{ transform: open ? 'rotate(180deg)' : 'none' }} />
        </ListItemButton>
      )}
    >
      <List sx={{ gap: 0.5 }}>
        {item.children?.map((child, index) => (
          <ListItem key={index} sx={{ mt: index === 0 ? 0.5 : 0 }}>
            <ListItemButton role='menuitem' onClick={() => onItemClick(child.title, child.path)}>
              {child.icon}
              <Typography level='body-xs'>{child.title}</Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Toggler>
  </ListItem>
);

interface MenuItemProps {
  item: MenuItem;
  isActive: boolean;
  onItemClick: (title: string, path: string) => void;
}

export const MenuItem: React.FC<MenuItemProps> = ({ item, isActive, onItemClick }) => (
  <ListItem>
    <ListItemButton selected={isActive} onClick={() => onItemClick(item.title, item.path)}>
      {item.icon && item.icon}
      <ListItemContent>
        <Typography level='title-sm'>{item.title}</Typography>
      </ListItemContent>
    </ListItemButton>
  </ListItem>
);
