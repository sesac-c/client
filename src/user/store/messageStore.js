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
    await axios.get(`/user/messages/${message.id}`);
    message.isRead = true;
  },

  toList: () => {
    set({ pageType: 'list', message: null });
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
