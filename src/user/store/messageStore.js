import { create } from 'zustand';
import axios from 'axios';

const useMessageStore = create((set, get) => ({
  messageType: 'received', // received or sent
  pageType: 'list', // list or detail
  messageId: null,
  message: null,

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
    const { toList, message } = get();

    try {
      await axios.delete(`/user/messages/${message.id}`);
    } catch (e) {
      console.error(e);
    }

    toList();
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
