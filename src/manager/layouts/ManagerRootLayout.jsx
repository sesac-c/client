import React, { useState, useMemo, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { NAVIGATION } from '../components/common/layout/Nav';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const createSesacCTheme = mode =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: '#187b46' // 라이트 모드와 다크 모드에서 동일
      },
      secondary: {
        main: '#f8fff6' // 라이트 모드와 다크 모드에서 동일
      },
      background: {
        default: mode === 'light' ? '#ffffff' : '#121212',
        paper: mode === 'light' ? '#ffffff' : '#1e1e1e'
      },
      text: {
        primary: mode === 'light' ? '#000000' : '#ffffff',
        secondary: mode === 'light' ? '#666666' : '#a0a0a0'
      }
    },
    cssVariables: {
      colorSchemeSelector: 'data-toolpad-color-scheme'
    },
    colorSchemes: { light: true, dark: true },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 600,
        lg: 1200,
        xl: 1536
      }
    },
    components: {
      MuiDrawer: {
        styleOverrides: {
          paper: {
            paddingTop: '20px' // 네비게이션에 상단 패딩 추가
          }
        }
      }
    }
  });

export default function ManagerRootLayout() {
  const [mode, setMode] = useState('light');
  const sesacCTheme = useMemo(() => createSesacCTheme(mode), [mode]);

  const location = useLocation();
  const navigate = useNavigate();

  const [pathname, setPathname] = useState('/dashboard');

  useEffect(() => {
    setPathname(location.pathname);
  }, [location]);

  const router = useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(location.search),
      navigate: path => navigate(path)
    };
  }, [pathname, location.search, navigate]);

  const toggleColorMode = () => {
    setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={sesacCTheme}>
      <AppProvider
        navigation={NAVIGATION}
        branding={{
          logo: <img src='/assets/images/sesacc-logo.png' alt='sesacc logo' />,
          title: 'SeSACC'
        }}
        router={router}
        theme={sesacCTheme}
        sx={{
          '& .MuiDrawer-root': {
            '& .MuiList-root': {
              paddingTop: '100px' // navigation에 상단 패딩 추가
            }
          }
        }}
      >
        <DashboardLayout>
          <Box
            sx={{
              py: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center'
            }}
          >
            <Typography>
              <Outlet />
            </Typography>
          </Box>
        </DashboardLayout>
      </AppProvider>
    </ThemeProvider>
  );
}
