import React from 'react';
import { Box } from '@mui/material';
import { ProfileLayout } from '@/common/layouts/Profile';
import { PROFILE_PATH } from '@/common/constants';
import SideMenu from '@/common/components/settings/layout/SideMenu';
import { Outlet } from 'react-router-dom';

const SettingAndArchiveRoot: React.FC = () => {
  return (
    <ProfileLayout
      header={{
        to: PROFILE_PATH,
        title: '프로필 페이지로 가기',
        isProfileMine: true
      }}
    >
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <SideMenu />
        <Box sx={{ flexGrow: 1 }}>
          <Outlet />
        </Box>
      </Box>
    </ProfileLayout>
  );
};

export default SettingAndArchiveRoot;
