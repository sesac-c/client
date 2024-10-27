import { Client } from '@stomp/stompjs';
import { MessageHookResult } from '@/types';
import { useCallback } from 'react';

// 메시지 송수신 용
export const useWebSocketMessage = (client: Client | null, onReceive: (message: any) => void): MessageHookResult => {
  const handleNewMessage = useCallback(
    (message: any) => {
      onReceive(message);
    },
    [onReceive]
  );

  const handleSendMessage = useCallback(
    (content: string, destination: string) => {
      if (content.trim() !== '' && client) {
        const message = { content };
        client.publish({
          destination,
          body: JSON.stringify(message)
        });
      }
    },
    [client]
  );

  return { handleNewMessage, handleSendMessage };
};
