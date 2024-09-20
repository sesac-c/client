import * as React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../../../../../common/stores/authStore';

import GlobalStyles from '@mui/joy/GlobalStyles';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import { listItemButtonClasses } from '@mui/joy/ListItemButton';

import { closeSidebar } from '../../../../utils';
import { MenuItemWithChildren } from '../../../../types';
import { menuItems, bottomMenuItems } from './menu/menuConfig';
import SidebarHeader from './SidebarHeader';
import SideMenu from './menu/SideMenu';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, logout } = useAuthStore();
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(['사용자 관리']));

  useEffect(() => {
    const currentPath = location.pathname;
    const findActiveItem = (items: MenuItemWithChildren[]): string | null => {
      for (const item of items) {
        if (item.path === currentPath) {
          return item.title;
        }
        if (item.children) {
          const childResult = findActiveItem(item.children);
          if (childResult) {
            return childResult;
          }
        }
      }
      return null;
    };

    const newActiveItem = findActiveItem([...menuItems, ...bottomMenuItems]);
    setActiveItem(newActiveItem);
  }, [location.pathname]);

  const handleMenuItemClick = useCallback(
    (itemTitle: string, itemPath: string) => {
      setActiveItem(itemTitle);
      navigate(itemPath);
      closeSidebar(); // Close sidebar on mobile after navigation
    },
    [navigate]
  );

  const toggleExpanded = useCallback((itemTitle: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemTitle)) {
        newSet.delete(itemTitle);
      } else {
        newSet.add(itemTitle);
      }
      return newSet;
    });
  }, []);

  return (
    <Sheet
      className='Sidebar'
      sx={{
        position: { xs: 'fixed', md: 'sticky' },
        transform: {
          xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
          md: 'none'
        },
        transition: 'transform 0.4s, width 0.4s',
        zIndex: 10000,
        height: '100dvh',
        width: 'var(--Sidebar-width)',
        top: 0,
        p: 2,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRight: '1px solid',
        borderColor: 'divider'
      }}
    >
      <GlobalStyles
        styles={theme => ({
          ':root': {
            '--Sidebar-width': '220px',
            [theme.breakpoints.up('lg')]: {
              '--Sidebar-width': '240px'
            }
          }
        })}
      />
      <Box
        className='Sidebar-overlay'
        sx={{
          position: 'fixed',
          zIndex: 9998,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          opacity: 'var(--SideNavigation-slideIn)',
          backgroundColor: 'var(--joy-palette-background-backdrop)',
          transition: 'opacity 0.4s',
          transform: {
            xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
            lg: 'translateX(-100%)'
          }
        }}
        onClick={() => closeSidebar()}
      />
      <SidebarHeader />

      <SideMenu
        activeItem={activeItem}
        expandedItems={expandedItems}
        handleMenuItemClick={handleMenuItemClick}
        listItemButtonClasses={listItemButtonClasses}
        toggleExpanded={toggleExpanded}
        loginUser={user}
        handleLogout={() => {
          const confirmLogout = confirm('정말 로그아웃하시겠습니까?');
          if (confirmLogout) logout();
        }}
      />
    </Sheet>
  );
};

export default Sidebar;
