import { useState, useCallback } from 'react';
import { ChatMessage, CourseChatConfig } from '@/types';
import { COURSE_CHAT_DESTINATION_PRFIX, SUBSCRIBE_COURSE_CHAT } from '@/constants';
import { useConnectWebsocket, useWebSocketMessage, useWebSocketSubscriptCourseChat } from '../webSocket';

export const useCourseChat = ({ courseId, accessToken }: CourseChatConfig) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isNewMessage, setIsNewMessage] = useState(false);

  // WebSocket 연결
  const { client, isConnected, error } = useConnectWebsocket({
    accessToken
  });

  // 메시지 수신 콜백
  const onReceiveMessage = useCallback((newMessage: ChatMessage) => {
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setIsNewMessage(true);
  }, []);

  // 메시지 송수신 핸들러
  const { handleNewMessage, handleSendMessage } = useWebSocketMessage(client, onReceiveMessage);

  // WebSocket 구독
  useWebSocketSubscriptCourseChat({
    client,
    topic: SUBSCRIBE_COURSE_CHAT(courseId),
    onMessage: handleNewMessage,
    isConnected
  });

  // 메시지 전송 함수 래핑
  const sendMessage = useCallback(
    (content: string) => {
      handleSendMessage(content, `${COURSE_CHAT_DESTINATION_PRFIX}${courseId}`);
    },
    [handleSendMessage, courseId]
  );

  return {
    messages,
    setMessages,
    isConnected,
    error,
    isNewMessage,
    sendMessage,
    setIsNewMessage
  };
};
