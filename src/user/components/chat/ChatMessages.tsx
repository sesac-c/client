import React from 'react';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';
import { scrollStyle } from '@/common/constants';
import { ChatMessagesProps } from '@/user/type';

const ChatMessages: React.FC<ChatMessagesProps> = ({ endRef, onScroll, isLoading, isLast, messages }) => {
  return (
    <Box
      onScroll={onScroll}
      sx={{
        flex: 1,
        overflow: 'auto',
        p: 2,
        backgroundColor: '#f5f5f5',
        display: 'flex',
        flexDirection: 'column',
        ...scrollStyle
      }}
    >
      {/* 상단 로딩 인디케이터 또는 안내 메시지 */}
      {!isLast && (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
          {isLoading ? (
            <CircularProgress color='success' size={20} />
          ) : (
            <Typography variant='body2' color='textSecondary'>
              스크롤하여 이전 메시지 로드하기
            </Typography>
          )}
        </Box>
      )}

      {messages.map((msg, index) => {
        console.log(msg.isMine);
        return (
          <Paper
            key={msg.id}
            sx={{
              p: 2,
              mb: 2,
              maxWidth: '50%',
              mt: index === 0 ? 2 : 0,
              ml: msg.isMine ? 'auto' : 0 // isMine이 true면 오른쪽 정렬(내 메시지)
            }}
          >
            <Typography variant='subtitle2' color='textSecondary'>
              {msg.senderName}
            </Typography>
            <Typography variant='body1'>{msg.content}</Typography>
            <Typography variant='caption' color='textSecondary'>
              {msg.createdAt}
            </Typography>
          </Paper>
        );
      })}
      <div ref={endRef} />
    </Box>
  );
};

export default ChatMessages;
