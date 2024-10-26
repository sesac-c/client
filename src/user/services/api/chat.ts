import { CHAT_ROOM_MESSAGES } from '@/common/constants';
import { RouteBaseError } from '@/common/types';
import { ChatRoomMessagesResponse } from '@/user/type';
import axios, { AxiosResponse } from 'axios';

export const getChatRoomMessages = async (
  courseId: number,
  page: number = 0,
  size: number = 10
): Promise<ChatRoomMessagesResponse> => {
  try {
    const response: AxiosResponse<ChatRoomMessagesResponse> = await axios.get(CHAT_ROOM_MESSAGES(courseId), {
      params: {
        page,
        size
      }
    });
    return response.data;
  } catch (error: any) {
    const status = error.errorState || error.response?.status || 500;
    const message =
      error.data.message ||
      error.response?.data?.message ||
      '채팅방 메시지 로드 중 오류가 발생했습니다. 다시 시도해 주세요.';
    throw new RouteBaseError(status, message);
  }
};
