import React from 'react';
import { Box } from '@mui/material';
import { ProfileLayout } from '@/common/layouts/Profile';
import { PROFILE_PATH } from '@/common/constants';
import SideMenu from '@/common/components/common/layout/SideMenu';
import { Outlet } from 'react-router-dom';

import { archives, settings } from '@/common/constants';

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
        <div className='bg-[#f5f5f5]'>
          <SideMenu
            page='settings'
            menu={[
              { title: '설정', items: settings },
              { title: '보관함', items: archives }
            ]}
          />
        </div>
        <Box sx={{ flexGrow: 1 }}>
          <Outlet />
        </Box>
      </Box>
    </ProfileLayout>
  );
};

export default SettingAndArchiveRoot;
