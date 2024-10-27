import { create } from 'zustand';
import axios from 'axios';

const useMessageStore = create((set, get) => ({
  messageType: 'received', // received or sent
  pageType: 'list', // list or detail or write
  message: null,
  receiver: null, // 쪽지를 보낼 때 받을 사람

  setMessageType: messageType => set({ messageType }),
  setPageType: pageType => set({ pageType }),
  setMessage: message => set({ message }),

  readMessage: async message => {
    set({ pageType: 'detail', message });
    try {
      await axios.get(`/user/messages/${message.id}`);
    } catch (e) {
      console.error(e);
    }
    message.isRead = true;
  },

  toList: () => {
    set({ pageType: 'list', message: null });
  },

  removeMessage: async () => {
    if (!confirm('정말 해당 쪽지를 삭제하시겠습니까?\n삭제 시 쪽지를 복구할 수 없습니다.')) return;

    const { toList, message } = get();

    try {
      await axios.delete(`/user/messages/${message.id}`);
    } catch (e) {
      console.error(e);
    }

    toList();
  },

  sendMessage: async content => {
    const { toList, receiver } = get();
    try {
      await axios.post(`/user/messages/${receiver.id}`, { content });

      toList();
    } catch (e) {
      console.error(e);
    }
  },

  writeForm: receiver => {
    set({ receiver, pageType: 'write' });
  },

  cancel: () => {
    const { toList, message } = get();
    if (message) return set({ pageType: 'detail' });

    toList();
  },

  resetStore: () =>
    set({
      messageType: 'received',
      pageType: 'list',
      message: null,
      receiver: null
    })
}));

export default useMessageStore;
