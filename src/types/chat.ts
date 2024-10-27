import React, { LegacyRef, ReactNode, UIEvent } from 'react';
import { ChatMessage } from './response';
interface DefaultStyle {
  style: React.CSSProperties; // 스타일 속성
  onMouseEnter: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  onMouseLeave: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}
export interface OpenChattingWindowTextProps {
  path: string;
  defaultStyle: DefaultStyle;
  children: ReactNode;
  newWindow: Window | null;
  setNewWindow: React.Dispatch<React.SetStateAction<Window | null>>;
}
type SetDrawerOpen = (value: React.SetStateAction<boolean>) => void;
export interface ChatMessagesProps {
  endRef: LegacyRef<HTMLDivElement>;
  onScroll: (event: UIEvent<HTMLDivElement>) => void;
  isLoading: boolean;
  isLast: boolean;
  messages: ChatMessage[];
}
export interface MessageHeaderProps {
  courseName: string;
  setDrawerOpen: SetDrawerOpen;
}
export interface MessageInputProps {
  setMessage: (value: React.SetStateAction<string>) => void;
  message: string;
  onSendMessage: () => void;
}
export interface MembersDrawerProps {
  courseId: number;
  open: boolean;
  setDrawerOpen: SetDrawerOpen;
}
