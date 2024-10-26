import { Client } from '@stomp/stompjs';

export interface SubscriptionConfig {
  client: Client | null;
  topic: string;
  onMessage: (message: any) => void;
  isConnected: boolean;
}
