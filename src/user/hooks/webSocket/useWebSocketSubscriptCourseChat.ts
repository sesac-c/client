import { useEffect } from 'react';
import { SubscriptionConfig } from '../../type';

export const useWebSocketSubscriptCourseChat = ({ client, topic, onMessage, isConnected }: SubscriptionConfig) => {
  useEffect(() => {
    if (!client || !isConnected) return;

    const subscription = client.subscribe(topic, message => {
      if (message.body) {
        const parsedMessage = JSON.parse(message.body);
        onMessage(parsedMessage);
      }
    });

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [client, topic, onMessage, isConnected]);
};
