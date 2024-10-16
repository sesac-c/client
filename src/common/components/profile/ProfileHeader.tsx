import React from 'react';
import { Box, Stack, Typography, Avatar, IconButton, Divider, Button } from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';
import { ProfileResponse } from '@/common/types';

const NetworkInfo: React.FC<{ title: string; num: number }> = ({ title, num }) => {
  const typographyProps = {
    variant: 'body2' as const,
    color: 'grey.700',
    fontWeight: 550
  };
  return (
    <Button variant='text' color='success'>
      <Stack spacing={2} direction='row'>
        <Typography {...typographyProps}>{title}</Typography>
        <Typography {...typographyProps}>{num}</Typography>
      </Stack>
    </Button>
  );
};

const MenuButton: React.FC = () => (
  <IconButton
    size='small'
    sx={{
      position: 'absolute',
      top: 0,
      right: 0,
      border: '1px solid rgba(24, 123, 70, 0.7)',
      backgroundColor: 'white',
      opacity: 0.8,
      boxShadow: 2,
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      '&:hover': {
        backgroundColor: 'white',
        opacity: 0.9,
        transform: 'scale(1.05)',
        boxShadow: 3
      }
    }}
  >
    <MoreHoriz fontSize='small' />
  </IconButton>
);

const FollowButton: React.FC<{ isFollowing: boolean }> = ({ isFollowing }) => {
  const commonSx = {
    color: 'white',
    fontWeight: 550,
    fontSize: '0.7rem',
    borderRadius: '12px',
    padding: '5px 10px',
    minWidth: 'unset',
    opacity: 0.9,
    boxShadow: 2,
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: 3
    }
  };

  const sx = isFollowing
    ? { ...commonSx, backgroundColor: 'grey.500', '&:hover': { ...commonSx['&:hover'], backgroundColor: 'grey.700' } }
    : {
        ...commonSx,
        backgroundColor: 'success.main',
        '&:hover': { ...commonSx['&:hover'], backgroundColor: 'success.dark' }
      };

  return (
    <IconButton
      size='small'
      sx={{
        position: 'absolute',
        top: -10,
        right: -25
      }}
    >
      <Button variant='contained' size='small' sx={sx}>
        {isFollowing ? '언팔로우' : '팔로우'}
      </Button>
    </IconButton>
  );
};

const ProfileHeader: React.FC<ProfileResponse> = ({ ...profile }) => (
  <Box display='flex' flexDirection='column' alignItems='center' pt={9}>
    <Box position='relative'>
      <Avatar
        sx={{ width: 90, height: 90, bgcolor: 'white', padding: 1, boxShadow: 3 }}
        src='/assets/images/default-profile.png'
      />
      {profile.isProfileMine ? <MenuButton /> : <FollowButton isFollowing={profile.isFollowing} />}
    </Box>
    <Typography variant='h6' sx={{ fontWeight: 'bold', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      {profile.nickname}
    </Typography>
    <div>
      <Stack
        direction='row'
        divider={<Divider orientation='vertical' flexItem />}
        spacing={2}
        sx={{
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <NetworkInfo title='팔로워' num={profile.followerCount} />
        <Typography variant='body2' color='success'>
          {profile.affiliation}
        </Typography>
        <NetworkInfo title='팔로잉' num={profile.followCount} />
      </Stack>
    </div>
  </Box>
);

export default ProfileHeader;