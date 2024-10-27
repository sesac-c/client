import { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const baseUrl = process.env.REACT_APP_API_BASE_URL;
const wsPrefix = process.env.REACT_WS_END_POINT;
type AccessToken = { accessToken: string };

export const useConnectWebsocket = ({ accessToken }: AccessToken) => {
  const [client, setClient] = useState<Client | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const socket = new SockJS(`${baseUrl}${wsPrefix}`);
    const stompClient = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        Authorization: `Bearer ${accessToken}`
      },
      onConnect: () => {
        console.log('웹소켓 연결 성공');
        setIsConnected(true);
        setError(null);
      },
      onDisconnect: () => {
        console.log('웹소켓 연결 해제');
        setIsConnected(false);
      },
      onStompError: frame => {
        console.error('Stomp 에러:', frame);
        setError(new Error(frame.headers.message));
        setIsConnected(false);
      },
      debug: str => {
        console.log(str);
      }
    });

    try {
      stompClient.activate();
      setClient(stompClient);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('WebSocket 연결 실패'));
      setIsConnected(false);
    }

    return () => {
      if (stompClient.active) {
        stompClient.deactivate();
      }
    };
  }, [baseUrl, wsPrefix, accessToken]);

  return { client, isConnected, error };
};
