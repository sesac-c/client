export interface RestaurantResponse {
  id: number;
  name: string;
  category: string;
  address: string;
}
export interface RestaurantDetailResponse {
  id: number;
  name: string;
  category: string;
  address: string;
  longitude?: string;
  latitude?: string;
  type: string;
}

export interface MenuResponse {
  id: number;
  name: string;
  price: number;
}

export interface UserCourseInfoResponse {
  courseId: number;
  courseName: string;
}

export interface ChatMessage {
  id: number;
  senderId: number;
  senderName: string;
  content: string;
  createdAt: string;
  delivered: boolean;
  isMine: boolean;
}

export interface ChatMessageResponse extends ChatMessage {
  chatRoomId: number;
}

export interface ChatRoomMessagesResponse {
  content: ChatMessage[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface StudentMemberResponse {
  id: number;
  nickname: string;
  courseName: string;
  profileImage: string;
}
