import React, { useState } from 'react';
import { Box, Fab } from '@mui/material';
import { ArrowDownward as ArrowDownwardIcon } from '@mui/icons-material';
import { useCourseChat, useScrollManagement } from '@/hooks/chat';
import ChatMessages from './ChatMessages';
import Header from './Header';
import Input from './Input';
import MembersDrawer from './MembersDrawer';
import TokenUtil from '@/utils/auth';

const ChatRoom: React.FC<{ courseId: number; courseName: string }> = ({ courseId, courseName }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [message, setMessage] = useState('');

  // 채팅 관련 훅
  const { messages, isConnected, error, isNewMessage, sendMessage, setMessages, setIsNewMessage } = useCourseChat({
    courseId,
    accessToken: TokenUtil.getTokens().accessToken || ''
  });

  // 스크롤 관리 훅
  const { messagesEndRef, isLoading, isLast, showScrollButton, handleScroll, scrollToBottom } = useScrollManagement(
    courseId,
    setMessages
  );

  // 메시지 전송 핸들러
  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
      scrollToBottom();
    }
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header courseName={courseName} setDrawerOpen={setDrawerOpen} />

      <ChatMessages
        isLoading={isLoading}
        isLast={isLast}
        messages={messages}
        onScroll={handleScroll}
        endRef={messagesEndRef}
      />

      {showScrollButton && (
        <Fab
          color='success'
          size='small'
          sx={{
            position: 'fixed',
            right: '20px',
            bottom: '100px',
            zIndex: 1000
          }}
          onClick={scrollToBottom}
        >
          <ArrowDownwardIcon />
        </Fab>
      )}

      <Input message={message} onSendMessage={handleSendMessage} setMessage={setMessage} />

      <MembersDrawer courseId={courseId} open={drawerOpen} setDrawerOpen={setDrawerOpen} />
    </Box>
  );
};

export default ChatRoom;
