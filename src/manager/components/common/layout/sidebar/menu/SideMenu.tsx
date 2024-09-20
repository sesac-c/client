import React from 'react';
import { Box, List, ButtonGroup, Button, IconButton, Typography } from '@mui/joy';
import { bottomMenuItems, menuItems } from './menuConfig';
import { MenuItem, NestedMenuItem } from './MenuItems';
import { navIcons } from '../../../../../assets/icon';
import ColorSchemeToggle from '../../../UI/ColorSchemeToggle';
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
type BottomButtonGroupMenuItem = {
  title: string;
  icon: keyof typeof navIcons;
  path: string;
};

type BottomButtonGroupMenuProps = {
  activeItem: string | null;
  handleMenuItemClick: (arg0: string, arg1: string) => void;
  handleLogout: () => void;
  loginUser: {
    role?: string;
    nickname: string;
  };
};

const BottomButtonGroupMenu: React.FC<BottomButtonGroupMenuProps> = ({
  activeItem,
  handleMenuItemClick,
  handleLogout,
  loginUser
}) => {
  const renderMenuItem = (item: BottomButtonGroupMenuItem) => {
    return (
      <IconButton
        key={item.title}
        onClick={() => handleMenuItemClick(item.title, item.path)}
        variant={activeItem === item.title ? 'solid' : 'plain'}
      >
        {navIcons[item.icon]}
      </IconButton>
    );
  };

  return (
    <ButtonGroup
      variant='soft'
      aria-label='soft button group'
      sx={{
        width: '100%',
        '& > *': {
          flex: 1
        }
      }}
    >
      <Button>
        <Typography
          level='body-sm'
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {loginUser?.nickname}
        </Typography>
      </Button>
      <ColorSchemeToggle />
      {bottomMenuItems.map(renderMenuItem)}
      <IconButton onClick={handleLogout} variant='plain'>
        {navIcons.logout}
      </IconButton>
    </ButtonGroup>
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
  loginUser: {
    role?: string;
    nickname: string;
  };
  handleLogout: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({
  activeItem,
  expandedItems,
  handleMenuItemClick,
  listItemButtonClasses,
  toggleExpanded,
  handleLogout,
  loginUser
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
      <BottomButtonGroupMenu
        activeItem={activeItem}
        handleMenuItemClick={handleMenuItemClick}
        handleLogout={handleLogout}
        loginUser={loginUser}
      />
    </Box>
  );
};

export default SideMenu;
