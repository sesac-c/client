import { create } from 'zustand';
import axios from 'axios';

const useNotificationStore = create((set, get) => ({
  pageType: 'list', // list or detail
  notification: null,
  receiver: null, // 쪽지를 보낼 때 받을 사람

  setPageType: pageType => set({ pageType }),
  setNotification: notification => set({ notification }),

  readNotification: async notification => {
    console.log(notification);
    set({ pageType: 'detail', notification });
    try {
      await axios.get(`/user/notifications/${notification.notificationId}`);
    } catch (e) {
      console.error(e);
    }
    notification.isRead = true;
  },

  toList: () => {
    set({ pageType: 'list', notification: null });
  },

  cancel: () => {
    const { toList, notification } = get();
    if (notification) return set({ pageType: 'detail' });

    toList();
  },

  content: type => {
    switch (type) {
      case 'LIKE':
        return (
          <div>
            회원님의 게시글에 <span className='text-red-600'>좋아요</span>를 눌렀습니다.
          </div>
        );
      case 'REPLY':
        return (
          <div>
            회원님의 게시글에 <span className='text-green-600'>댓글</span>을 눌렀습니다.
          </div>
        );
      case 'FOLLOW':
        return (
          <div>
            회원님을 <span className='text-blue-600'>팔로우</span>하였습니다.
          </div>
        );
    }
  },

  resetStore: () =>
    set({
      pageType: 'list',
      notification: null,
      receiver: null
    })
}));

export default useNotificationStore;
