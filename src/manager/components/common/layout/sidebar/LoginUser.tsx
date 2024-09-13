import React from 'react';
import { Avatar, Box, Typography } from '@mui/joy';
import ColorSchemeToggle from '../../UI/ColorSchemeToggle';

interface LoginUserProps {
  loginUser: {
    profileImage?: string;
    nickname: string;
  };
}

const LoginUser: React.FC<LoginUserProps> = ({ loginUser }) => {
  const { profileImage, nickname } = loginUser;
  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      <Avatar
        variant='outlined'
        size='sm'
        src={profileImage ?? '/assets/images/default-profile.png'}
        sx={{
          padding: '4px', // 원하는 패딩 값 설정
          '& img': {
            width: '100%', // 이미지 크기 설정
            height: '100%',
            objectFit: 'cover' // 이미지 비율 유지
          }
        }}
      />
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Typography level='body-sm' fontWeight={700}>
          {nickname} 캠퍼스
        </Typography>
      </Box>

      <ColorSchemeToggle sx={{ ml: 'auto' }} />
    </Box>
  );
};
export default LoginUser;
