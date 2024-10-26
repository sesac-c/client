import React, { useCallback, useEffect, useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  LinearProgress
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { MembersDrawerProps } from '@/user/type';
import { getCourseMember } from '@/user/services/api';
import { StudentMemberResponse } from '@/user/type';
import { IMAGE_API_URL, scrollStyle } from '@/common/constants';
import GradientDivider from '@/common/components/settings/layout/GradientDivider';

const MembersDrawer: React.FC<MembersDrawerProps> = ({ courseId, open, setDrawerOpen }) => {
  const [users, setUsers] = useState<StudentMemberResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false); // 데이터 로드 여부 상태
  const [error, setError] = useState({
    isError: false,
    message: ''
  });

  // 비동기 요청 함수
  const loadUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getCourseMember(courseId);
      setUsers(data);
      setIsDataLoaded(true); // 데이터가 로드되었음을 표시
    } catch (error: any) {
      setError({ isError: true, message: error?.message || '오류가 발생했습니다' });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [courseId]);

  // Drawer가 열릴 때만 비동기 요청 실행
  useEffect(() => {
    if (open && !isDataLoaded) {
      loadUsers(); // 처음 열릴 때만 데이터 로드
    }
  }, [open, isDataLoaded, loadUsers]);

  return (
    <Drawer anchor='right' open={open} onClose={() => setDrawerOpen(false)}>
      <Box sx={{ width: 250 }}>
        <AppBar position='static' sx={{ backgroundColor: '#FAFAFA' }}>
          <Toolbar className='flex gap-4 text-gray-basic'>
            <IconButton edge='start' sx={{ p: 0 }} color='inherit' onClick={() => setDrawerOpen(false)}>
              <ArrowBackIosNewIcon />
            </IconButton>
            <Typography fontWeight={700}>채팅멤버 목록</Typography>
          </Toolbar>
        </AppBar>
        {error.isError ? (
          <p>{error.message}</p>
        ) : isLoading ? (
          <LinearProgress color='success' />
        ) : (
          <Box px={1} mt={3}>
            <Typography
              className='text-gray-basic'
              fontWeight={550}
              sx={{ width: '30%', textAlign: 'center', py: 1, letterSpacing: -1, userSelect: 'none' }}
            >
              목록
            </Typography>
            <GradientDivider />
            <List sx={{ ...scrollStyle, overflow: 'auto', height: '90%' }}>
              {users &&
                users.length > 0 &&
                users.map(member => (
                  <ListItem key={member.id}>
                    <ListItemAvatar>
                      <Box sx={{ display: 'flex', width: '100%' }}>
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            border: '2px solid #ccc',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '2px',
                            boxSizing: 'border-box'
                          }}
                        >
                          <Avatar
                            src={IMAGE_API_URL(member.profileImage)}
                            alt='Uploaded Image'
                            sx={{
                              width: '100%',
                              height: '100%'
                            }}
                          />
                        </Box>
                      </Box>
                    </ListItemAvatar>
                    <ListItemText primary={member.nickname} />
                  </ListItem>
                ))}
            </List>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default MembersDrawer;
