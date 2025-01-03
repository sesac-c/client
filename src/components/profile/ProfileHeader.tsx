import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Stack, Typography, Avatar, IconButton, Divider, Button, Tooltip } from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';

import { FollowListButton, FollowingListButton } from './FollowList';

import { ProfileHeaderProps } from '@/types';
import { followUser, unfollowUser } from '@/services/api';
import { THUMBNAIL_API_URL } from '@/constants';
import { USER_SETTING_CHILDREN_PATH, USER_SETTING_PATH } from '@/routes/paths';

const MenuButton: React.FC = () => {
  const navigate = useNavigate();
  return (
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
        <IconButton
          onClick={() => {
            navigate(`${USER_SETTING_PATH}/${USER_SETTING_CHILDREN_PATH.profile}`);
          }}
          size='small'
          sx={{ padding: 0 }}
        >
          <MoreHoriz fontSize='small' />
        </IconButton>
      </Tooltip>
    </IconButton>
  );
};

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
        <Box
          sx={{
            width: 100,
            height: 100,
            borderRadius: '50%',
            border: '2px solid rgba(24,123,70,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2px',
            boxSizing: 'border-box',
            bgcolor: '#f8fff6',
            boxShadow: 5
          }}
        >
          <Avatar
            src={THUMBNAIL_API_URL(profile.profileImage)}
            alt='Uploaded Image'
            sx={{
              width: '100%',
              height: '100%'
            }}
          />
        </Box>
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
