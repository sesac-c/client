import { useState, useRef, useEffect } from 'react';
import { UIEvent } from 'react';
import { ChatRoomMessagesResponse } from '@/user/type';
import { getChatRoomMessages } from '@/user/services/api';

export const useScrollManagement = (courseId: number, setMessages: React.Dispatch<React.SetStateAction<any[]>>) => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [scrollState, setScrollState] = useState<{
    page: number;
    isLast: boolean;
  }>({
    page: 0,
    isLast: false
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScroll = async (event: UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;

    // 스크롤 버튼 표시 여부 결정
    const isAtBottom = target.scrollHeight - target.scrollTop - target.clientHeight < 100;
    setShowScrollButton(!isAtBottom);

    // 상단 도달시 이전 메시지 로드
    if (target.scrollTop === 0 && !isLoading && !scrollState.isLast) {
      setIsLoading(true);

      try {
        const nextPage = scrollState.page + 1;
        const response: ChatRoomMessagesResponse = await getChatRoomMessages(courseId, nextPage);

        setMessages(prevMessages => [...response.content.reverse(), ...prevMessages]);
        setScrollState({
          page: nextPage,
          isLast: response.last
        });
      } catch (error) {
        console.error('이전 메시지 로드 중 오류 발생:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // 초기 메시지 로드
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const response: ChatRoomMessagesResponse = await getChatRoomMessages(courseId, 0);
        setMessages(response.content.reverse());
        setScrollState(prev => ({
          ...prev,
          page: 0,
          isLast: response.last
        }));
        // 초기 로드 후 스크롤을 맨 아래로 이동
        setTimeout(() => {
          scrollToBottom();
        }, 100);
      } catch (error) {
        console.error('메시지 로드 중 오류 발생:', error);
      }
    };

    loadMessages();
  }, [courseId, setMessages]);

  return {
    messagesEndRef,
    showScrollButton,
    isLoading,
    isLast: scrollState.isLast,
    handleScroll,
    scrollToBottom
  };
};
