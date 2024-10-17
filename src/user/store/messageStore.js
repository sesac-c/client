import { create } from 'zustand';
import axios from 'axios';

const useMessageStore = create((set, get) => ({
  messageType: 'received', // received or sent
  pageType: 'list', // list or detail or write
  messageId: null,
  message: null,

  receiverId: null, // 쪽지를 보낼 때 받을 사람

  setMessageType: messageType => set({ messageType }),
  setPageType: pageType => set({ pageType }),
  setMessageId: messageId => set({ messageId }),
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
    const { toList, receiverId } = get();
    try {
      await axios.post(`/user/messages/${receiverId}`, { content });
      toList();
    } catch (e) {
      console.error(e);
    }
  },

  writeForm: receiverId => {
    set({ receiverId, pageType: 'write' });
  },

  cancel: () => {
    set({ pageType: 'detail' });
  },

  resetStore: () =>
    set({
      messageType: 'received',
      pageType: 'list',
      messageId: null,
      message: null
    })
}));

export default useMessageStore;
