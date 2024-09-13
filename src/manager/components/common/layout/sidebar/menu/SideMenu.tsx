import React from 'react';
import { Box, List } from '@mui/joy';
import { bottomMenuItems, menuItems } from './menuConfig';
import { MenuItem, NestedMenuItem } from './MenuItems';
import { ListItemButton } from '@mui/material';
import { navIcons } from '../../../../../assets/icon';

interface MainMenuListProps {
  activeItem: string | null;
  expandedItems: Set<string>;
  handleMenuItemClick: (title: string, path: string) => void;
  toggleExpanded: (title: string) => void;
}

const MainMenuList: React.FC<MainMenuListProps> = ({
  activeItem,
  expandedItems,
  handleMenuItemClick,
  toggleExpanded
}) => {
  const renderMenuItem = (item: MenuItem) => {
    if (item.children) {
      return (
        <NestedMenuItem
          key={item.title}
          item={item}
          isActive={activeItem === item.title}
          onItemClick={(title, path) => {
            handleMenuItemClick(title, path);
            toggleExpanded(item.title);
          }}
          defaultExpanded={expandedItems.has(item.title)}
        />
      );
    } else {
      return (
        <MenuItem key={item.title} item={item} isActive={activeItem === item.title} onItemClick={handleMenuItemClick} />
      );
    }
  };

  return (
    <List
      size='sm'
      sx={{
        gap: 1,
        '--List-nestedInsetStart': '30px',
        '--ListItem-radius': theme => theme.vars.radius.sm
      }}
    >
      {menuItems.map(renderMenuItem)}
    </List>
  );
};

interface BottomMenuProps {
  handleLogout: () => void;
  activeItem: string | null;
  handleMenuItemClick: (title: string, path: string) => void;
}

const BottomMenu: React.FC<BottomMenuProps> = ({ activeItem, handleMenuItemClick, handleLogout }) => {
  const renderMenuItem = (item: MenuItem) => {
    return (
      <MenuItem key={item.title} item={item} isActive={activeItem === item.title} onItemClick={handleMenuItemClick} />
    );
  };

  return (
    <List
      size='sm'
      sx={{
        mt: 'auto',
        flexGrow: 0,
        '--ListItem-radius': theme => theme.vars.radius.sm,
        '--List-gap': '8px'
      }}
    >
      {bottomMenuItems.map(renderMenuItem)}
      <MenuItem
        item={{
          title: '로그아웃',
          icon: navIcons.logout,
          path: ''
        }}
        onItemClick={handleLogout}
        isActive={false}
      />
    </List>
  );
};

export interface SideMenuProps {
  activeItem: string | null;
  expandedItems: Set<string>;
  handleMenuItemClick: (title: string, path: string) => void;
  listItemButtonClasses: {
    root: string;
  };
  toggleExpanded: (title: string) => void;
  handleLogout: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({
  activeItem,
  expandedItems,
  handleMenuItemClick,
  listItemButtonClasses,
  toggleExpanded,
  handleLogout
}) => {
  return (
    <Box
      sx={{
        minHeight: 0,
        overflow: 'hidden auto',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        [`& .${listItemButtonClasses.root}`]: {
          gap: 1.5
        }
      }}
    >
      <MainMenuList
        activeItem={activeItem}
        expandedItems={expandedItems}
        handleMenuItemClick={handleMenuItemClick}
        toggleExpanded={toggleExpanded}
      />
      <BottomMenu activeItem={activeItem} handleMenuItemClick={handleMenuItemClick} handleLogout={handleLogout} />
    </Box>
  );
};

export default SideMenu;
