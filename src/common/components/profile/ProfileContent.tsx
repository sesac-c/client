import React from 'react';
import { Box, Chip, Divider } from '@mui/material';
import PostGridContainer from './PostGridContainer';
import { ProfileResponse } from '@/common/types';
import ProfileHeader from './ProfileHeader';

const ProfileContent: React.FC<{ profileId: number; profile: ProfileResponse }> = ({ profileId, profile }) => {
  return (
    <Box sx={{ height: '90vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flexShrink: 0 }}>
        <div className='board-container'>
          <div className='board-inner justify-end'>
            {profile && <ProfileHeader profileId={profileId} {...profile} />}
          </div>
        </div>
        <Divider sx={{ marginBottom: 1, userSelect: 'none' }}>
          <Chip size='small' label='게시글' sx={{ opacity: 0.8, color: 'text.primary' }} variant='outlined' />
        </Divider>
      </Box>
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <PostGridContainer profileId={profileId} />
      </Box>
    </Box>
  );
};

export default ProfileContent;
