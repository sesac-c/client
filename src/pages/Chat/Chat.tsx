import React from 'react';
import { useLocation } from 'react-router-dom';
import ChatRoom from '@/components/chat/ChatRoom';

const ChatPage: React.FC = () => {
  const location = useLocation();
  const courseId = location.state?.courseId;
  const courseName = location.state?.courseName;

  return courseId && courseName ? (
    <ChatRoom courseId={courseId} courseName={courseName} />
  ) : (
    <p>잠시 뒤 시도해주세요.</p>
  );
};
export default ChatPage;
