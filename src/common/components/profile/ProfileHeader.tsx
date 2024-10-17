import React, { useState, useCallback } from 'react';
import { Box, Stack, Typography, Avatar, IconButton, Divider, Button, Tooltip } from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';
import { ProfileHeaderProps } from '@/common/types';
import { followUser, unfollowUser } from '@/common/services/api/profile';
import { FollowListButton, FollowingListButton } from './FollowList';

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
    <Tooltip title='프로필 편집/설정'>
      <IconButton onClick={() => {}} size='small' sx={{ padding: 0 }}>
        <MoreHoriz fontSize='small' />
      </IconButton>
    </Tooltip>
  </IconButton>
);

const FollowButton: React.FC<{
  isFollowing: boolean;
  onFollowToggle: () => void;
}> = ({ isFollowing, onFollowToggle }) => {
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
      <Button variant='contained' size='small' sx={sx} onClick={onFollowToggle}>
        {isFollowing ? '언팔로우' : '팔로우'}
      </Button>
    </IconButton>
  );
};

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profileId, ...profile }) => {
  const [isFollowing, setIsFollowing] = useState(profile.isFollowing);
  const [followerCount, setFollowerCount] = useState(profile.followerCount);
  const [followCount, setFollowCount] = useState(profile.followCount);

  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        await unfollowUser(profileId);
        setFollowerCount(prev => prev - 1);
      } else {
        await followUser(profileId);
        setFollowerCount(prev => prev + 1);
      }
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error('팔로우/언팔로우 실패:', error);
    }
  };

  const handleFollowerCountUpdate = useCallback((change: number) => {
    setFollowerCount(prev => prev + change);
  }, []);

  const handleFollowCountUpdate = useCallback((change: number) => {
    setFollowCount(prev => prev + change);
  }, []);

  return (
    <Box display='flex' flexDirection='column' alignItems='center' pt={9}>
      <Box position='relative'>
        <Avatar
          sx={{ width: 90, height: 90, bgcolor: 'white', padding: 1, boxShadow: 3 }}
          src='/assets/images/default-profile.png'
        />
        {profile.isProfileMine ? (
          <MenuButton />
        ) : (
          <FollowButton isFollowing={isFollowing} onFollowToggle={handleFollowToggle} />
        )}
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
          <FollowingListButton
            num={followerCount}
            userId={profileId}
            isProfileMine={profile.isProfileMine}
            onCountUpdate={handleFollowerCountUpdate}
          />
          <Typography variant='body2' color='success'>
            {profile.affiliation}
          </Typography>
          <FollowListButton num={followCount} userId={profileId} onCountUpdate={handleFollowCountUpdate} />
        </Stack>
      </div>
    </Box>
  );
};

export default ProfileHeader;
